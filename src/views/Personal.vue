<template>
  <div class="container">
    <!-- 顶部的导航条 -->
    <div class="navigate-bar">
      <!-- $router.back()是实例下的属性，可以直接在模板中渲染 -->
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <strong>个人中心</strong>
      <!-- $router.push()是实例下的属性，可以直接在模板中渲染 -->
      <span class="iconfont iconshouye" @click="$router.push('/')"></span>
    </div>

    <!-- 头部 -->
    <div class="header">
      <div class="avater">
        <img :src="$axios.defaults.baseURL + userInfo.head_img" alt />
      </div>
      <!-- 姓名 -->
      <div class="profile">
        <div>
          <span class="iconfont iconxingbienan" v-if="userInfo.gender===1"></span>
          <span class="iconfont iconxingbienv" v-if="userInfo.gender===0"></span>
          {{ userInfo.nickname }}
        </div>
        <p>{{ moment(userInfo.create_date).format('YYYY-MM-DD') }}</p>
      </div>
      <!-- 右箭头 -->
      <div>
        <span class="iconfont iconjiantou1 arrow"></span>
      </div>
    </div>
    <Listbar v-for="(item,index) in rows" :key="index" :label="item.label" :tips="item.tips" />
    <!-- click.native这个事件类型，会给Listbar这个徐建最外部的div强制绑定点击事件 -->
    <Listbar label="退出" @click.native="handleClick" />
  </div>
</template>

<script>
//导入列表按纽栏的组件，import后面接上组件变量名
// @代表src目录
import Listbar from "@/components/Listbar";

//引入momentjs工具库
import moment from "moment";

export default {
  //注册组件
  components: {
    Listbar
  },
  data() {
    return {
      rows: [
        { label: "我的关注", tips: "关注的用户" },
        { label: "我的跟帖", tips: "跟帖回复" },
        { label: "我的收藏", tips: "文章/视频" },
        { label: "设置", tips: "" }
      ],
      userInfo: {},
      //把moment日期处理的工具库挂载到data
      moment
    };
  },
  mounted() {
    //从本地获取到token和id
    const jsonStr = localStorage.getItem("userInfo");
    const userJson = JSON.parse(jsonStr);

    // 发异步请求
    this.$axios({
      url: "/user/" + userJson.user.id,
      //设置一个请求头
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      const { data } = res.data;
      this.userInfo = data;
    });
  },
  methods: {
    //退出按钮
    handleClick() {
      this.$dialog
        .confirm({
          title: "标题",
          message: "弹窗内容"
        })
        .then(() => {
          // on confirm
          localStorage.removeItem("userInfo");
          // 跳转到登录页,必须要使用replace。因为退出不可能再返回个人中心
          this.$router.replace("/login");
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="less" scoped>
// 顶部导航条样式
.navigate-bar {
  line-height: 40 / 360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10 / 360 * 100vw;
  border-bottom: 1px #ddd solid;

  .iconshouye {
    font-size: 20px;
  }
}
// 头部样式
.header {
  display: flex;
  padding: 20/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid #eee;
}
.avater {
  width: 70/360 * 100vw;
  img {
    display: block;
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    border-radius: 50%;
    object-fit: cover; //内容将被缩放，以在填充元素的内容框时保持其宽高比
  }
}
.profile {
  flex: 1;
  padding-left: 20/360 * 100vw;

  line-height: 1.5;
  p {
    color: #999;
  }
  .iconxingbienan {
    color: blue;
  }

  .iconxingbienv {
    color: palevioletred;
  }
}
</style>