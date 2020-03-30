<template>
  <div class="container">
    <!-- 头部导航条 -->
    <NavigateBar title="我的关注"></NavigateBar>

    <!-- 关注列表 -->
    <div class="user-item" v-for="(item,index) in follows" :key="index">
      <img :src="$axios.defaults.baseURL+ item.head_img" />

      <div class="user-info">
        <div>{{ item.nickname }}</div>
        <p>{{ moment(item.create_date).format("YYYY-MM-DD hh:mm:ss") }}</p>
      </div>

      <span class="cancel" @click="handleCancel(item.id,index)">取消关注</span>
    </div>
  </div>
</template>

<script>
//引入组件
import NavigateBar from "@/components/NavigateBar";
import moment from "moment";

//注册组件
export default {
  data() {
    return {
      follows: [],
      userJson: [],
      moment
    };
  },
  components: {
    NavigateBar
  },
  mounted() {
    //请求我的关注列表数据
    //从本地获取到token和id
    const jsonStr = localStorage.getItem("userInfo");
    const userJson = JSON.parse(jsonStr);
    this.userJson = userJson;

    // 发异步请求
    this.$axios({
      url: "/user_follows",
      //设置一个请求头
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      const { data } = res.data;
      this.follows = data;
      console.log(data);
      //   console.log(data.nickname);
    });
  },
  methods: {
    handleCancel(id, index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要取消关注吗？"
        })
        .then(() => {
          this.$axios({
            url: "/user_unfollow/" + id,
            headers: {
              Authorization: this.userJson.token
            }
          }).then(res => {
            this.$toast.success("取消关注成功");

            // 通过id移除返回的follow数组实现页面刷新
            this.follows.splice(index, 1);
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.user-item {
  padding: 20 / 360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #dedede solid;

  img {
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    display: block;
    margin-right: 20 / 360 * 100vw;
    border-radius: 50%;
    object-fit: cover; // 防止图片变形
  }

  .user-info {
    flex: 1;
    margin-right: 20 / 360 * 100vw;

    p {
      font-size: 14px;
      color: #999;
    }
  }

  .cancel {
    padding: 5px 15px;
    font-size: 12px;
    background: #ccc;
    border-radius: 50px;
  }
}
</style>