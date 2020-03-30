<template>
  <div class="container">
    <!-- 头部导航条 -->
    <NavigateBar title="我的收藏"></NavigateBar>

    <!-- 循环出收藏列表 -->
    <div v-for="(item, index) in stars" :key="index">
      <!-- 循环的结构,少于3张图片的布局 -->
      <div class="imgText" v-if="item.cover.length < 3 && item.cover.length > 0">
        <div class="imgText-left">
          <h4>{{item.title}}</h4>
          <p>{{item.user.nickname}} {{item.comments.length}}跟帖</p>
        </div>
        <img :src="$axios.defaults.baseURL + item.cover[0].url" />
      </div>

      <!-- 循环的结构,大于3张图片的布局 -->
      <!-- <div class="imgList">
                <h4>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</h4>
                <div class="images">
                    <img src="https://www.baidu.com/img/bd_logo1.png">
                    <img src="https://www.baidu.com/img/bd_logo1.png">
                    <img src="https://www.baidu.com/img/bd_logo1.png">
                </div>
                <p>火星时报  52跟帖</p>
      </div>-->
    </div>
  </div>
</template>

<script>
// 引入组件
import NavigateBar from "@/components/NavigateBar";

export default {
  data() {
    return {
      stars: []
    };
  },
  components: {
    NavigateBar
  },

  mounted() {
    // 本地的数据
    const localUserJson = JSON.parse(localStorage.getItem("userInfo"));

    // 请求我的收藏数据
    this.$axios({
      url: "/user_star",
      // 添加头信息
      headers: {
        Authorization: localUserJson.token
      }
    }).then(res => {
      // 我的收藏文章列表
      const { data } = res.data;
      // 把列表数据保存到data
      this.stars = data;
    });
  }
};
</script>

<style lang="less" scoped>
.imgText {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #dedede solid;

  .imgText-left {
    h4 {
      // 文字超出两行出现省略号
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-weight: normal;
    }

    p {
      color: #999;
      margin-top: 5px;
    }
  }

  img {
    width: 110/360 * 100vw;
    height: 75/360 * 100vw;
    display: block;
    object-fit: cover;
    margin-left: 10/360 * 100vw;
    flex-shrink: 0;
  }
}

.imgList {
  padding: 20/360 * 100vw;
  border-bottom: 1px #dedede solid;

  h4 {
    // 文字超出两行出现省略号
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: normal;
  }

  .images {
    margin: 10/360 * 100vw 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 33%;
      height: 75/360 * 100vw;
      object-fit: cover;
    }
  }

  p {
    color: #999;
    margin-top: 5px;
  }
}
</style>