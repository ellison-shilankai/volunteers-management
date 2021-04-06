<template>
  <div id="index">
    <!-- <div class="main-fix-window">
      <div class="main-fix-item1" onClick="goTop()">回到顶部</div>
    </div> -->
    <el-container>
      <el-header height=93px>
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
              onClick="window.location.href='/web/site/activity'"
            >
              活动
            </li>
            <li
              class="header-ul-li"
              id="org-li"
              onClick="window.location.href='/web/site/org'"
            >
              组织
            </li>
            <li
              class="header-ul-li"
              id="information-li"
              onClick="window.location.href='/web/information'"
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
      <el-main>
        <el-carousel :interval="5000" arrow="always" height="400px">
          <el-carousel-item v-for="(item,index) in carousel_img" :key="index">
            <img :src='item.url' alt />
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>
    
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data(){
    return {
      // carousel_img: ['@/assets/images/carousel-1.jpg', '@/assets/images/carousel-2.jpg'],
      carousel_img: [
        {url:require('@/assets/images/carousel-1.jpg')},
        {url:require('@/assets/images/carousel-2.jpg')},
        {url:require('@/assets/images/carousel-3.jpg')},
        {url:require('@/assets/images/carousel-4.jpg')}
      ]
    }
  },
  computed: {
    ...mapState({
      User: state => state.user
    })
  },
  created () {
  }
};
</script>

<style>
</style>