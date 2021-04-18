<template>
    <el-header height="93px">
      <!-- <div class="header" style="background-color: ; color: "> -->
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
            onClick="window.location.href='activities'"
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
          <!-- <li class="header-ul-li" id="timeshow-li" onClick="window.location.href='/web/site/timeshow'">时长公示</li> -->
          <li
            class="header-ul-li"
            id="help-li"
            onClick="window.location.href='/web/site/help'"
          >
            使用帮助
          </li>
          <ul class="header-user">
            <li class="header-ul-li header-user-downlist">
              <a href="/users/login" id="user" val="0" style="color: ">
                登录
              </a>
            </li>
            |
            <li class="header-ul-li header-user-downlist">
              <a href="/users/register" style="color: ">注册</a>
            </li>
          </ul>
        </ul>
      </nav>
      <!-- </div> -->
    </el-header>
</template>

<script>
export default {};
</script>

<style>
</style>