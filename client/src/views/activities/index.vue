<template>
  <div class="activities">
    <div class="search-form">
      <div>
        <el-input
          placeholder="请输入内容"
          v-model="activity.name"
          class="input-with-select"
        >
          <el-select
            v-model="activity.status"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option label="不限状态" value="不限状态"></el-option>
            <el-option label="招募中" value="招募中"></el-option>
            <el-option label="已结束" value="已结束"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="findActivity"
          ></el-button>
        </el-input>
      </div>
    </div>
    <div class="activity-list">
      <e-activity :data="data" :find="findActivity"></e-activity>
    </div>
  </div>
</template>
 
<script>
import eActivity from "@/components/activities/e-activity";
import { mapState } from "vuex";
export default {
  name: "activities",
  components: {
    eActivity,
  },
  data() {
    return {
      activity: {
        status: "",
        name: "",
      },
      data: {
        findActivityList: [],
        total: 0,
      },
    };
  },
  computed: {
    ...mapState({
      activityList: (state) => state.activity.activityList,
    }),
  },
  created() {},
  methods: {
    async findActivity() {
      let flag = false;
      this.data.findActivityList = [];
      this.data.total = 0;
      for (let item of this.activityList) {
        if (this.activity.status === "不限状态") {
          this.data.findActivityList = this.activityList;
          this.data.total = this.activityList.length;
          flag = true
        } else {
          if (this.activity.name && item.status === this.activity.status && item.name === this.activity.name) {
            this.data.findActivityList.push(item);
            this.data.total++;
            flag = true;
          } else if (
            !this.activity.name &&
            item.status === this.activity.status
          ) {
            this.data.findActivityList.push(item);
            this.data.total++;
            flag = true;
          }
        }
      }
      if (flag) {
        this.$message({
          message: "搜索成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "请输入正确的活动名称",
          type: "error",
        });
      }
    },
  },
};
</script>

<style>
</style>