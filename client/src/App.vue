<template>
  <div id="app">
    <el-container v-if="$route.meta.keepAlive">
      <keep-alive>
        <!-- 导航栏 -->
        <header-nav></header-nav>
      </keep-alive>
    </el-container>
    <!-- Body -->
    <router-view></router-view>
    <footer-nav v-if="$route.meta.keepAlive"></footer-nav>
    <!-- 登录页 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import header from "@/components/header";
import footer from "@/components/footer";
export default {
  name: "app",
  components: {
    headerNav: header,
    footerNav: footer,
  },
};
</script>

