<template>
  <div class="activities-content">
    <div class="activities-content-left">
      <div class="activities-content-left-box">
        <div class="box-img"><img :src="activity.img" /></div>
        <h3>{{ activity.name }}</h3>
        <template v-if="activity.status==='招募中'">
          <el-button type="success" class="box-join" @click="joinAct" >报名参加</el-button>
        </template>
        <el-button v-else type="success" class="box-join" @click="joinAct" disabled>报名参加</el-button>
        <!-- <div class="box-join"></div> -->
        <div class="box-city"><i class="el-icon-place"></i>活动地址：{{ activity.place }}</div>
        <div class="box-city"><i class="el-icon-folder-add"></i>活动类型：{{ activity.type }}</div>
        <div class="box-city"><i class="el-icon-document"></i>发起组织：{{ activity.orgName }}</div>
        <div class="box-city"><i class="el-icon-phone"></i>联系电话：{{ activity.tel }}</div>
      </div>
    </div>
    <div class="activities-content-right">
      <h2>活动介绍</h2>
      <div class="activities-content-right-info" v-html="activity.introduce"></div>
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
      userAct: [],
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
    },
    async joinAct() {
      let userAct = {
        userId: this.$store.state.user.id,
        actId: this.activity.id,
        userName: this.$store.state.user.name,
        actName: this.activity.name,
        userEmail: this.$store.state.user.email,
        actTime: this.activity.time
      }
      let { data: res } =  await Api.getUserAct()
      let flag = true
      this.userAct = res.info
      for (let item of this.userAct){
        if(userAct.userId === item.userId && item.actId === userAct.actId){
          flag = false
          break;
        }
      }
      if(flag) {
        let { data: res1 } = await Api.createUserAct(userAct)
        if(res1.code === 200) {
          this.$message({
              message: "申请成功",
              type: "success",
          });
        }
      }else {
        this.$message({
          message: "不要重复加入",
          type: "error",
        });
      }
      
    }
  },
};
</script>

<style>
</style>