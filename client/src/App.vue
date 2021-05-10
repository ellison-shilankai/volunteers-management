<template>
  <div id="app">
    <el-container v-if="$route.meta.keepAlive">
      <keep-alive>
        <!-- 导航栏 -->
        <header-nav></header-nav>
      </keep-alive>
    </el-container>
    <!-- Body -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 底部 -->
    <footer-nav v-if="$route.meta.keepAlive"></footer-nav>
  </div>
</template>
<script>
import header from "@/components/header";
import footer from "@/components/footer";
import { initDynamicRoutes } from '@/router.js';
export default {
  name: "app",
  components: {
    headerNav: header,
    footerNav: footer,
  },
  created () {
    initDynamicRoutes();
  }
};
</script>

