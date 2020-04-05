import Vue from 'vue';
import App from './App.vue';
import router from './router';
//导入 vant ui组件库
import Vant from 'vant';
//导入axios
import axios from "axios";
//引入vant ui组件库
import vant, { Toast } from 'vant';

// 绑定到原型，加上之后以后就可以在组件中通过this.$axios来调用请求方法
Vue.prototype.$axios = axios;

// 给axios添加基准路径，添加完了之后请求的url就会拼接这个地址
axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL = "http://192.168.31.94:3000/";
// axios.defaults.baseURL = "http://hmtoutiao-api.atlansic.com";
// axios.defaults.baseURL = "http://127.0.0.1:3000/";


Vue.use(Vant);

Vue.config.productionTip = false;

// 添加路由的守卫
router.beforeEach((to, from, next) => {
  // 判断是否去的个人中心页
  if (to.meta.authorization) {
    // console.log(to)
    // 判断是否是登录状态，时候有token
    // 如果本地的数据是空会返回null，null是没有token属性，会导致js报错，
    // 所以可以加个判断，如果本地的数据空的，等于空的对象
    const userJson = JSON.parse(localStorage.getItem('userInfo')) || {};

    // 有token可以正常访问
    if (userJson.token) {
      next();
    } else {
      // 跳转到登录页,next这个函数可以传递路径，并且会跳转该路径
      next("/login");
    }
  } else {
    // 非个人中心页
    next();
  }
})

//axios的响应拦截器
axios.interceptors.response.use(res => {
  // Do something before request is sent
  return res;
}, error => {
  // Do something with request error
  const { statusCode, message } = error.response.data;
  if (statusCode === 400) {
    Toast.fail(message);
  }
  return Promise.reject(error);
});


// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

// 创建一个根实例
// .$mount('#app') 相当于el配置，指定id为app的元素作为模板
new Vue({
  // 路由对象
  router,
  // 加载第一个子组件，最底层的组件，（写法是固定的）
  render: h => h(App)
}).$mount('#app')




