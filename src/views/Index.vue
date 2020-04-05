<template>
  <div class="container">
    <!-- 首页头部 -->
    <div class="header">
      <span class="iconfont iconnew"></span>
      <router-link to="#" class="search">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </router-link>
      <router-link to="/personal">
        <span class="iconfont iconwode"></span>
      </router-link>
    </div>
    <!-- tab栏切换 -->
    <van-tabs v-model="active" sticky swipeable @scroll="handleScroll">
      <van-tab v-for="(item, index) in categories" :key="index" :title="item.name">
        <!-- <div>
          <p>内容 {{ index }}</p>
        </div>-->
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- van的列表组件 -->
          <!-- @load 滚动到底部时候触发的函数 -->
          <!-- immediate-check关闭list加载后触发一次 load 事件 -->
          <van-list
            immediate-check
            v-model="item.loading"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad"
          >
            <!-- 假设list是后台返回的数组，里有10个元素 -->
            <div v-for="(subItem, subIndex) in item.list" :key="subIndex">
              <!-- 只有单张图片的 -->
              <PostItem1 :data="subItem" v-if="subItem.type==1&&subItem.cover.length<3" />
              <!-- 大于等于3张图片的组件 -->
              <PostItem2 :data="subItem" v-if="subItem.type==1&&subItem.cover.length>=3" />
              <!-- 视频的列表组件 -->
              <PostItem3 :data="subItem" v-if="subItem.type==2" />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 文章列表的组件,只有单张图片的
import PostItem1 from "@/components/PostItem1";
// 大于等于3张图片的组件
import PostItem2 from "@/components/PostItem2";
// 视频的列表组件
import PostItem3 from "@/components/PostItem3";

export default {
  data() {
    return {
      categories: [],
      active: 0,
      // list: [],
      // loading: false,
      // finished: false,
      refreshing: false,
      token: ""
      // categoryId: 999
    };
  },
  // 监听属性
  watch: {
    // 监听tab栏的切换
    active() {
      // 判断如果点击的是最后一个图标，跳转到栏目管理页
      if (this.active === this.categories.length - 1) {
        this.$router.push("/栏目管理");
      }
      this.getList();
      //需要等文章列表数据渲染完成再滚动
      setTimeout(() => {
        window.scrollTo(0, this.categories[this.active].scrollY);
      }, 10);
    }
  },
  components: {
    PostItem1,
    PostItem2,
    PostItem3
  },
  mounted() {
    //渲染栏目列表
    // 获取本地的token
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};

    // console.log(token);
    this.token = token;
    //获取本地的栏目数据

    const categories = JSON.parse(localStorage.getItem("categories"));
    // console.log(categories);
    //如果token有值，说明当前是登录状态
    if (categories) {
      //如果是登录状态，但是栏目第一项不是‘关注’，需要重新请求栏目数据
      //如果当前为登录，但是栏目第一项是‘关注’，需要重新请求栏目数据
      if (
        (token && categories[0].name !== "关注") ||
        (!token && categories[0].name === "关注")
      ) {
        this.getCategories();
      } else {
        //如果在登录状态下，本地有数据或者非登录状态下本地有数据就要把本地数据传给data直接渲染
        this.categories = categories;
        this.handleCategories();
      }
    } else {
      this.getCategories();
    }
    // this.getCategories();
  },
  methods: {
    handleCategories() {
      this.categories = this.categories.map(v => {
        v.pageIndex = 1;
        v.list = [];
        v.finished = false;
        v.loading = false;
        v.iload = false;
        v.scrollY = 0;
        return v;
        // console.log(v);
      });
      this.getList();
      // console.log(this.categories);
    },
    //封装一个请求栏目数据的函数getCategories
    getCategories() {
      const config = {
        url: "/category"
      };
      //如果token有值，给请求配置加上headers
      if (this.token) {
        config.headers = {
          Authorization: this.token
        };
      }
      this.$axios(config).then(res => {
        // console.log(res);
        const { data } = res.data;
        data.push({
          name: "∨"
        });
        this.categories = data;
        //保存到本地存储
        // localStorage.setItem("categories", JSON.stringify(data));
        // console.log(data);
        localStorage.setItem("categories", JSON.stringify(data));
        // console.log(localStorage.getItem("categories"));
        this.handleCategories();
      });
    },
    //请求文章的列表函数封装
    getList() {
      const {
        id,
        pageIndex,
        finished,
        list,
        loading,
        isload,
        name
      } = this.categories[this.active];
      if (isload) return; //如果当前正在加载，直接返回，即等待上一次请求完成再加载
      this.categories[this.active].isload = true;
      this.categories[this.active].pageIndex += 1;
      // 如果数据加载到最后一页了
      if (finished) return;
      const config = {
        url: "post",
        params: {
          pageIndex,
          pageSize: 5,
          category: id
        }
      };
      if (name === "关注") {
        config.headers = { Authorization: this.token };
      }
      this.$axios(config).then(res => {
        // console.log(res);
        const { data, total } = res.data;
        this.categories[this.active].list = [
          ...this.categories[this.active].list,
          ...data
        ];
        this.categories = [...this.categories];
        //告诉组件请求完毕
        this.categories[this.active].loading = false;
        if (this.categories[this.active].list.length === total) {
          this.categories[this.active].finished = true;
        }
        // console.log(this.categories[this.active].list.length, total);
        this.categories[this.active].isload = false;
      });
    },
    onLoad() {
      this.getList();
    },

    //监听tab滚动条高度的事件
    handleScroll(data) {
      if (this.categories.length === 0) return;
      const { scrollTop } = data;
      // console.log(scrollTop);
      this.categories[this.active].scrollY = scrollTop;
    },

    onRefresh() {
      // 表示加载完毕
      this.refreshing = false;
      console.log("正在下拉刷新");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 50/360 * 100vw;
  background: #ff0000;
  display: flex;
  padding: 0 20/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  .iconnew {
    font-size: 20px;
    transform: scale(3);
    position: relative;
    left: 20/360 * 100vw;
  }

  .search {
    flex: 1;
    height: 32/360 * 100vw;
    margin: 0 50/360 * 100vw;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    font-size: 13px;
    line-height: 1;
    vertical-align: middle;

    span {
      margin-right: 5px;
    }
  }

  .iconwode {
    font-size: 20px;
  }
}

// 重置vant组件的样式
// 如果在scoped声明中去修改第三方库的class样式，必须要在前面添加/deep/
/deep/ .van-tabs__nav {
  background: #eee;
}

/deep/ .van-tab {
  flex-basis: 15% !important;
}

/deep/ .van-tab:nth-last-child(2) {
  background: #eee;
  width: 20px !important;
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: unset;
}

/deep/ .van-tabs__wrap {
  padding-right: 20px;
}

/deep/ .van-tabs__nav {
  position: static;
}

/deep/ .van-tabs__line {
  display: none;
}

/deep/ .van-tab--active {
  border-bottom: 1px #ff0000 solid;
}
</style>