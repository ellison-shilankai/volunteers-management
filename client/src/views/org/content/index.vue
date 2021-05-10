<template>
  <div class="org-content">
    <div class="org-content-info">
      <div class="box-img"><img :src="orgList.img" /></div>
      <h3>{{ orgList.name }}</h3>
      <el-button type="success" class="box-join" @click="joinOrg">加入该组织</el-button>
    </div>
    <div class="org-content-right">
      <div class="three hour">
        <p>为社会输送志愿时间</p>
        <h3>{{ orgList.totalTime }}</h3>
        <p>小时</p>
      </div>
      <div class="three people">
        <p>输送志愿者</p>
        <h3>{{ orgList.totalPeople }}</h3>
        <p>人</p>
      </div>
      <div class="three act">
        <p>发起活动</p>
        <h3>{{ orgList.content }}</h3>
        <p>场</p>
      </div>
      <h3 class="detail-h3">发起的活动</h3>
      <div class="detail-item-box">
        <div class="img">
          <img src="http://image.zyh365.com/162026569633201428f24db3b4067bde00032dfb2001e.jpg?imageView2/2/w/140/h/100">
        </div>
        <div class="detail-item-box-right">
          <p class="time">2021年05月06日</p>
        </div>
        <h3>生化学院第十周学生审核盖章活动</h3>
        <div class="detail-item-box-day">
          <span>报名截止：</span>
          <el-progress :percentage="50" class="progress"></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import Api from "@/api/index";
export default {
  name: "org-content",
  data() {
    return {
      orgList: {},
      userOrg: []
    };
  },
  computed: {},
  created() {
    this.getOrganize();
  },
  methods: {
    async getOrganize() {
      let { data: res } = await Api.getOrganizeById(this.$route.query.id);
      this.orgList = res.orgList;
    },
    async joinOrg() {
      let userId = this.$store.state.user.id
      let orgId = this.orgList.id
      let { data: res } =  await Api.getUserOrg()
      let flag = true
      this.userOrg = res.info
      console.log(orgId)
      for (let item of this.userOrg){
        if(userId === item.userId && item.orgId === orgId){
          flag = false
          break;
        }
      }
      if(flag) {
        let { data: res1 } = await Api.createUserOrg({
          userId,
          orgId
        })
        if(res1.code === 200) {
          this.$message({
              message: "加入成功",
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