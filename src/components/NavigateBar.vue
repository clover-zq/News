<template>
  <!-- 顶部的导航条 -->
  <div class="navigate-bar">
    <!-- $router.back()是实例下的属性，可以直接在模板中渲染 -->
    <span class="iconfont iconjiantou2" @click="$router.back()"></span>
    <strong>{{ title }}</strong>
    <!-- $router.push()是实例下的属性，可以直接在模板中渲染 -->
    <span class="iconfont iconshouye" @click="$router.push('/')" v-if="showHome"></span>
    <span v-else class="iconfont iconshouye" style="opacity:0"></span>
  </div>
</template>

<script>
export default {
  props: ["title", "showHome"]
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
</style>