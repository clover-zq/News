<template>
  <div class="container">
    <!-- 返回上一页按钮 -->
    <div class="back-btn">
      <span class="iconfont iconicon-test"></span>
    </div>

    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 使用vant表单 -->
    <van-form @submit="onSubmit" class="form">
      <!-- van-field是表单的字段 -->
      <!-- rules是表单字段的规则，required表示这个输入框是必填 -->
      <van-field
        v-model="form.username"
        name="手机号码"
        placeholder="手机号码"
        :rules="[{ required: true, message: '请填写手机号码' }]"
      />
      <!-- 密码输入框，和上面的属性是一样的 -->
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div>
        <!-- 如果这个按钮是在van-form组件内部，
        并且按钮的native-type="submit"，说明点击这个按钮就会触发submit事件-->
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 去注册按钮 -->
    <router-link to="/register">
      <van-button round block class="link-register">注册</van-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit(values) {
      this.$axios({
        url: "/login",
        method: "POST",
        data: this.form
      }).then(res => {
        const { message, data } = res.data;
        this.$toast.success(message);
        //把登录时的token保存到本地存储
        localStorage.setItem("userInfo", JSON.stringify(data));
        //登录成功跳转个人中心页
        this.$router.push("/personal");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20 / 360 * 100vw;
  background-color: #f2f2f2;
  .back-btn span {
    font-size: 27 / 360 * 100vw;
    color: #757575;
    line-height: 1;
  }
  .logo {
    text-align: center;
    margin-top: 20 / 360 * 100vw;
    span {
      font-size: 126 / 360 * 100vw;
      color: #c30;
    }
  }
  .form {
    .van-cell {
      padding: 10px 0;
      font-size: 16px;
      margin-bottom: 20 / 360 * 100vw;
      background-color: #f2f2f2;
    }
    .van-cell:not(:last-child)::after {
      border-bottom: 1px solid #333;
      left: 0;
    }
    .van-button--info {
      margin-top: 50 / 360 * 100vw;
      background-color: #cc3300;
      border: 1px solid #cc3300;
    }
  }
  .link-register {
    margin-top: 20/360 * 100vw;
  }
}
</style>
