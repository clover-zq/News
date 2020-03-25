<template>
  <div id="login">
    <div class="top-bar"></div>
    <span class="iconfont iconicon-test"></span>
    <span class="iconfont iconnew"></span>
    <input type="text" placeholder="用户名 / 手机号码" class="user" />
    <input type="password" name id placeholder="密码" class="psd" />
    <button class="login-btn">登录</button>
    <div class="bottom-bar"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
#login {
  width: 360px;
  height: 100%;
  margin: 0 auto;
  background-color: #f2f2f2;
  .top-bar {
    height: 24px;
    background-color: #757575;
  }
  .iconicon-test {
    display: inline-block;
    font-size: 27px;
    color: #141414;
    margin: 20px 0 0 20px;
  }
  .iconnew {
    display: block;
    font-size: 126px;
    color: #d81e06;
    width: 126px;
    margin: 0 auto;
  }
  .psd,
  .user {
    display: block;
    margin: 0 auto;
    font-size: 18px;
    color: #757575;
    width: 318px;
    height: 58px;
    background-color: #f2f2f2;
    border: none;
    border-bottom: 1px solid #757575;
    padding-left: 10px;
    padding: 30px 0 16px 10px;
  }
  input::placeholder {
    font-size: 18px;
    color: rgba(134, 134, 134, 0.866666666666667);
  }
  .login-btn {
    font-size: 18px;
    color: #fff;
    display: block;
    width: 318px;
    height: 48px;
    background-color: #d81e06;
    border: none;
    border-radius: 24px;
    margin: 54px auto 200px;
  }
  .bottom-bar {
    height: 48px;
    background-color: #000;
  }
}
</style>