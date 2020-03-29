<template>
  <div class="container">
    <!-- 头部导航条 -->
    <NavigateBar title="编辑资料"></NavigateBar>
    <div class="avater">
      <img :src="$axios.defaults.baseURL + userInfo.head_img" />
      <van-uploader :after-read="afterRead" class="uploader" />
    </div>

    <!--列表 -->
    <Listbar label="昵称" :tips="userInfo.nickname" @click.native="show=true" />

    <Listbar label="密码" tips="******" @click.native="showPassword=true" />

    <Listbar label="性别" :tips="['女','男'][ userInfo.gender ]" @click.native="showGender=true" />

    <!-- 修改昵称的按钮 -->
    <van-dialog v-model="show" title="请输入昵称" show-cancel-button @confirm="handleChangeNickname">
      <!-- <input type="text" placeholder="请输入用户名" /> -->
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>

    <!-- 修改密码的按钮 -->
    <van-dialog
      v-model="showPassword"
      title="*****"
      show-cancel-button
      @confirm="handleChangePassword"
    >
      <!-- <input type="text" placeholder="请输入用户名" /> -->
      <van-field v-model="password" placeholder="请输入密码" type="password" />
    </van-dialog>

    <!-- 编辑性别的按钮 -->
    <van-action-sheet
      v-model="showGender"
      :actions="actions"
      @select="onSelect"
      close-on-click-action
    />
  </div>
</template>

<script>
//引入组件
import NavigateBar from "@/components/NavigateBar";
import Listbar from "@/components/Listbar";
import { Uploader } from "vant";

//注册组件
export default {
  components: {
    NavigateBar,
    Listbar
  },
  //准备数据
  data() {
    return {
      userInfo: {},
      userJson: {},
      show: false,
      showPassword: false,
      showGender: false,
      nickname: "",
      password: "",
      actions: [
        { name: "男", vlue: 1 },
        { name: "女", vlue: 0 }
      ]
    };
  },

  mounted() {
    //请求用户详情信息
    //从本地获取到token和id
    const jsonStr = localStorage.getItem("userInfo");
    const userJson = JSON.parse(jsonStr);
    this.userJson = userJson;

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
      this.nickname = data.nickname;
      this.password = data.password;
    });
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      //   console.log(file);
      const formData = new FormData();
      formData.append("file", file.file);
      // 把图片上传到服务器
      this.$axios({
        url: "/upload",
        method: "POST",
        //设置一个请求头
        headers: {
          Authorization: this.userJson.token
        },
        data: formData
      }).then(res => {
        // console.log(res);
        const { url } = res.data.data;
        this.userInfo.head_img = url;
        this.handleEdit({
          head_img: url
        });
      });
    },
    //封装编辑用户信息的函数
    handleEdit(data) {
      this.$axios({
        method: "POST",
        url: "/user_update/" + this.userInfo.id,
        //设置一个请求头
        headers: {
          Authorization: this.userJson.token
        },
        data
      }).then(res => {
        // console.log(res);
        // 获取到返回的信息
        const { message } = res.data;
        // 使用vant的弹窗提示用，success表示成功的弹窗
        this.$toast.success(message);
      });
    },
    handleChangeNickname() {
      this.handleEdit({
        nickname: this.nickname
      });
      this.userInfo.nickname = this.nickname;
    },
    handleChangePassword() {
      this.handleEdit({
        password: this.password
      });
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      console.log(item);
      this.handleEdit({
        gender: item.gender
      });
      this.userInfo.gender = item.vlue;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  .avater {
    position: relative;
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
    .uploader {
      position: absolute;
      margin-left: 50%;
      margin-top: 50%;
      top: -44/360 * 100vw;
      left: -44/360 * 100vw;
      opacity: 0;
    }
  }
}
</style>