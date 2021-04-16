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
    <div class="pagination">
      <div class="block">
        <!-- <span class="demonstration">完整功能</span> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import eActivity from "@/components/activities/e-activity";
export default {
  components: {
    eActivity,
  },
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style>
</style>