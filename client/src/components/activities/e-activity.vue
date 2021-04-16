<template>
  <div>
    <div
      class="activity-item"
      v-for="(activity, index) of activities"
      :key="index"
    >
      <div class="activity-item-img" ><img :src="activity.img" /></div>
      <div class="activity-item-title">{{ activity.title }}</div>
      <div class="activity-item-day">
        <span class="activity-item-day-content">报名截止：</span>
        <el-progress :percentage="50"></el-progress>
        <p class="activity-item-day-content">{{ activity.deadline }}天</p>
      </div>
      <div class="activity-item-other">
        <div class="activity-item-other-city"><i></i></div>
        <div class="activity-item-other-join"><i></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [
        {
          img: "http://image.zyh365.com/vms/2021/27//1617067638973ccc9ba0d8b064aa7bb9c263f294a3868?imageView2/2/w/400/h/270",
          title: "三位一体",
          deadline: 1
        },
        {
          img: "http://image.zyh365.com/vms/2021/27//1617067638973ccc9ba0d8b064aa7bb9c263f294a3868?imageView2/2/w/400/h/270",
          title: "三位一体",
          deadline: 1
        },
        {
          img: "http://image.zyh365.com/vms/2021/27//1617067638973ccc9ba0d8b064aa7bb9c263f294a3868?imageView2/2/w/400/h/270",
          title: "三位一体",
          deadline: 1
        },
        {
          img: "http://image.zyh365.com/vms/2021/27//1617067638973ccc9ba0d8b064aa7bb9c263f294a3868?imageView2/2/w/400/h/270",
          title: "三位一体",
          deadline: 1
        },
        {
          img: "http://image.zyh365.com/vms/2021/27//1617067638973ccc9ba0d8b064aa7bb9c263f294a3868?imageView2/2/w/400/h/270",
          title: "三位一体",
          deadline: 1
        },
        
      ]
    }
  }
};
</script>

<style>
</style>