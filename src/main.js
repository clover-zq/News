import Vue from 'vue';
import App from './App.vue';
import router from './router';
//导入 vant ui组件库
import Vant from 'vant';
//导入axios
import axios from "axios";

// 绑定到原型，加上之后以后就可以在组件中通过this.$axios来调用请求方法
Vue.prototype.$axios = axios;

// 给axios添加基准路径，添加完了之后请求的url就会拼接这个地址
axios.defaults.baseURL = "http://localhost:3000"

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
