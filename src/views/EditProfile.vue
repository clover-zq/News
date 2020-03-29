<template>
  <div class="container">
    <!-- 头部导航条 -->
    <NavigateBar title="编辑资料"></NavigateBar>
    <div class="avater">
      <img :src="$axios.defaults.baseURL + userInfo.head_img" />
    </div>

    <!--列表 -->
    <Listbar label="昵称" :tips="userInfo.nickname" />
    <Listbar label="密码" tips="******" />
    <Listbar label="性别" :tips="['女','男'][ userInfo.gender ]" />
  </div>
</template>

<script>
//引入组件
import NavigateBar from "@/components/NavigateBar";
import Listbar from "@/components/Listbar";

//注册组件
export default {
  components: {
    NavigateBar,
    Listbar
  },
  //准备数据
  data() {
    return {
      userInfo: {}
    };
  },

  mounted() {
    //请求用户详情信息
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
  }
};
</script>

<style lang="less" scoped>
.container {
  .avater {
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    margin: 20/360 * 100vw auto 26/360 * 100vw;
    img {
      display: block;
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      border-radius: 50%;
      //   margin: 20/360 * 100vw 0;
      object-fit: cover;
    }
  }
}
</style>