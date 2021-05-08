<template>
  <div>
      <div
      class="activity-item"
      v-for="(activity, index) of activityList.slice(
            (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize,
            this.queryInfo.pagenum * this.queryInfo.pagesize
          )"
      :key="index"
       @click ="skipContent(activity.id)"
    >
      <div class="activity-item-img"><img :src="activity.img" /></div>
      <div class="activity-item-title">{{ activity.name }}</div>
      <div class="activity-item-day">
        <span class="activity-item-day-content">报名截止：</span>
        <el-progress :percentage="activity.percentage" ></el-progress>
        <p class="activity-item-day-content">{{ activity.deadline }}</p>
      </div>
      <div class="activity-item-other">
        <div class="activity-item-other-city"><i class="el-icon-place"></i>{{ activity.place }}</div>
        <div class="activity-item-other-join"><i></i></div>
      </div>
    </div>
    <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[6, 12, 18, 24]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class= "activity-item-pagination"
      ></el-pagination>
  </div>
</template>

<script>
import Api from "@/api/index";
import { mapActions } from "vuex"; 
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 6,
      },
      percentage: 20,
      activityList: [],
      findActivityList: [],
      total: 0,
      nowTime: null, //获取当前时间
      timer: "", //定义一个定时器的变量
    };
  },
  props: {
    data: Object,
    findActivity: Object
  },
  created() {
    this.getActivityList();
    this.timer = setInterval(this.getTime(), 10000);
  },
  watch: {
    data: {
      handler (newVal){
        this.activityList = newVal.findActivityList
        this.total = newVal.total
      },
      deep: true,
      immediate:true 
    }
  },
  methods: { 
    ...mapActions("activity", ["getActivity"]),
    formatDate(time) {
      // 获取单元格数据
      let data = time;
      if (data == null) {
        return null;
      }
      let dt = new Date(data);
      return (
        dt.getFullYear() +
        "-" +
        (dt.getMonth() + 1) +
        "-" +
        dt.getDate() +
        " " +
        dt.getHours() +
        ":" +
        dt.getMinutes()
      );
    },
    async getActivityList() {
      const { data: res } = await Api.getActivityList();
      this.activityList = res.activities;
      this.total = res.count;
      for (let item of this.activityList) {
        item.deadline = this.getDeadline(new Date(item.deadline), this.nowTime);
        item.percentage = this.percentage
      }
      this.$store.dispatch('activity/getActivity', this.activityList)
    },
    getDeadline(firstDate, secondDate) {
      let deadline = firstDate.getTime();
      let currentTime = secondDate.getTime();
      if(deadline <= currentTime) {
        this.percentage = 100
        return "已结束"
      }else {
        let diff = Math.abs(deadline - currentTime)
        let result = parseInt(diff / (1000 * 60 * 60 * 24));
        if(result === 0) {
          result = 1
          this.percentage = 90
        }else {
          this.percentage = 50
        }
        return result + "天"
      }
    },
    getTime() {
      this.nowTime = new Date()
    },
     // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getActivityList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getActivityList();
    },
    skipContent(id) {
      this.$router.push({
        path: "/activities/content"  ,
        query: {
          id: id
        }
      })
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除定时器
    }
  },
};
</script>

<style>
</style>