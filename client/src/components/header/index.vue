<template>
  <el-header class="header" height="93px">
    <nav>
      <img
        class="header-logo"
        onClick="window.location.href='/'"
        src="@/assets/images/logo.jpg"
      />
      <ul class="header-ul">
        <li
          class="header-ul-li"
          id="home-li"
          onClick="window.location.href='/'"
        >
          首页
        </li>
        <li
          class="header-ul-li"
          id="activity-li"
          onClick="window.location.href='/activities'"
        >
          活动
        </li>
        <li
          class="header-ul-li"
          id="org-li"
          onClick="window.location.href='/org'"
        >
          组织
        </li>
        <li
          class="header-ul-li"
          id="information-li"
          onClick="window.location.href='/news'"
        >
          资讯
        </li>
        <li
          class="header-ul-li"
          id="help-li"
          onClick="window.location.href='/details'"
        >
          个人信息页
        </li>
        <template v-if="$store.state.user.status != 'volunteer'">
          <li class="header-ul-li" id="help-li" @click="skipToHome">
            后台管理
          </li>
        </template>
        <ul class="header-user">
          <template v-if="!$store.state.isUserLogin">
            <li class="header-ul-li header-user-downlist">
              <a href="/users/login" id="user" val="0" style="color: ">
                登录
              </a>
            </li>
            |
            <li class="header-ul-li header-user-downlist">
              <a href="/users/register" style="color: ">注册</a>
            </li>
          </template>
          <template v-else>
            <li class="header-ul-li header-user-downlist">
              <a style="color: " @click="logout"
                >{{ this.$store.state.user.name }},退出</a
              >
            </li>
          </template>
        </ul>
      </ul>
    </nav>
  </el-header>
</template>

<script>
export default {
  methods: {
    logout() {
      // 删除sessionStorage中的数据
      sessionStorage.clear();
      this.$router.push("/login");
      // 删除vuex中的数据，就是让当前页面进行刷新
      window.location.reload();
    },
    skipToHome() {
      const { href } = this.$router.resolve({
        path: "/home",
      });
      window.open(href, "_blank");
    },
  },
};
</script>

<style>
</style>