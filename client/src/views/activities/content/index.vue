<template>
  <div class="activities-content">
    <div class="activities-content-left">
      <div class="activities-content-left-box">
        <div class="box-img"><img :src="activity.img" /></div>
        <h3>{{ activity.name }}</h3>
        <!-- <div class="box-day">
          <span class="box-day-content">报名截止：</span>
          <el-progress :percentage="activity.percentage"></el-progress>
          <p class="box-day-content">{{ activity.deadline }}</p>
        </div> -->
        <el-button type="success" class="box-join">报名参加</el-button>
        <!-- <div class="box-join"></div> -->
        <div class="box-city"><i class="el-icon-place"></i>{{ activity.place }}</div>
        <div class="box-city"><i class="el-icon-folder-add"></i>{{ activity.type }}</div>
        <div class="box-city"><i class="el-icon-document"></i>{{ activity.orgName }}</div>
        <div class="box-city"><i class="el-icon-phone"></i>{{ activity.tel }}</div>
      </div>
    </div>
    <div class="activities-content-right">
      <h2>活动介绍</h2>
      <div class="activities-content-right-info">{{ activity.introduce }}</div>
      <h2>活动内容</h2>
      <div class="activities-content-right-info">{{ activity.content }}</div>
    </div>
  </div>
</template>
 
<script>
import Api from "@/api/index";
export default {
  name: "activities-content",
  data() {
    return {
      activity: {},
    };
  },
  computed: {},
  created() {
    this.getActivity();
  },
  methods: {
    async getActivity() {
      let { data: res } = await Api.getActivityById(this.$route.query.id);
      this.activity = res.activities;
      console.log(this.activity);
    },
  },
};
</script>

<style>
</style>