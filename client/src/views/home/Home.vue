<template>
  <div class="home">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div>
          <!-- <img src="../assets/heima.png" alt /> -->
          <!-- <i class="iconfont iconhuodongguanli"></i> -->
          <span>志愿者管理系统</span>
        </div>
        <el-button type="info" @click="logout">user退出</el-button>
      </el-header>

      <el-container class="left-aside">
        <el-aside :width="isCollapse ? '65px' : '201px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#FFFFFF"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item class="pull-left-20" index="1-1" @click="toUser">用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">活动管理</span>
              </template>
              <el-menu-item class="pull-left-20" index="2-1">活动列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">组织管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-message"></i>
              <span slot="title">资讯管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    logout() {
      // 删除sessionStorage中的数据
      sessionStorage.clear();
      this.$router.push("/login");
      // 删除vuex中的数据，就是让当前页面进行刷新
      window.location.reload();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    toUser() {
      this.$router.push('/users')
    }
  },
};
</script>

<style>
</style>