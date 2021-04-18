<template>
  <div class="activities">
    <div class="search-form">
      <div>
        <el-input
          placeholder="请输入内容" 
          v-model="input"
          class="input-with-select"
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="不限状态" value="1"></el-option>
            <el-option label="招募中" value="2"></el-option>
            <el-option label="已结束" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <div class="activity-list">
      <e-activity></e-activity>
    </div>
    <Pagination/>
  </div>
</template>

<script>
import eActivity from "@/components/activities/e-activity";
import Pagination from "@/components/pagination";
export default {
  name:'activities',
  components: {
    eActivity,
    Pagination,
  },
  data() {
    return {
      currentPage4: 5,
      // activities: [
      //   {
      //     img: "http://image.zyh365.com/vms/2021/27//1617067638973ccc9ba0d8b064aa7bb9c263f294a3868?imageView2/2/w/400/h/270",
      //     title: "三位一体",
      //     deadline: 1
      //   },

      // ]
      input: "",
      select: "",
    };
  },
  created() {
    console.log(this.activities);
  },
  methods: {
    
  },
};
</script>

<style>
</style>