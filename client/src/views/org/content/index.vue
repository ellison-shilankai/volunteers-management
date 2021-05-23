<template>
  <div class="org-content">
    <div class="org-content-info">
      <div class="box-img"><img :src="orgList.img" /></div>
      <h3>{{ orgList.name }}</h3>
      <el-button type="success" class="box-join" @click="joinOrg"
        >加入该组织</el-button
      >
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
      <div class="detail-item-box" v-for="(act, index) in orgAct" :key="index" @click ="skipContent(act.id)">
        <div class="img">
          <img
            :src="act.img"
          />
        </div>
        <div class="detail-item-box-right">
          <p class="time">活动时长:{{ act.time }}</p>
        </div>
        <h3>{{ act.name }}</h3>
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
import { mapState } from "vuex";
export default {
  name: "org-content",
  data() {
    return {
      orgList: {},
      userOrg: [],
      orgAct: [], //组织创建的志愿活动
    };
  },
  computed: {
    ...mapState({
      activityList: (state) => state.activity.activityList,
    }),
  },
  watch: {
    $route() {
      if (this.$route.query.id) {
        this.getOrganize();
      }
    },
  },
  created() {
    this.getOrganize();
  },
  methods: {
    async getOrganize() {
      let { data: res } = await Api.getOrganizeById(this.$route.query.id);
      this.orgList = res.orgList;
      this.orgAct = [];
      this.activityList.forEach((item) => {
        if (item.orgName === this.orgList.name && item.status === "招募中") {
          this.orgAct.push(item);
        }
      });
    },
    async joinOrg() {
      let userId = this.$store.state.user.id;
      let orgId = this.orgList.id;
      let orgName = this.orgList.name;
      let totalPeople = this.orgList.totalPeople+1;
      let { data: res } = await Api.getUserOrg();
      let flag = true;
      this.userOrg = res.info;
      for (let item of this.userOrg) {
        if (userId === item.userId && item.orgId === orgId) {
          flag = false;
          break;
        }
      }
      if (flag) {
        await Api.updateOrganize({
          id: orgId,
          totalPeople
        })
        let { data: res1 } = await Api.createUserOrg({
          userId,
          orgId,
          orgName
        });
        
        if (res1.code === 200) {
          this.$message({
            message: "加入成功",
            type: "success",
          });
          this.getOrganize();
        }
      } else {
        this.$message({
          message: "不要重复加入",
          type: "error",
        });
      }
    },
    skipContent(id) {
      const { href } = this.$router.resolve({
        path: `/activities/content`,
        query: {
          id: id,
        }
      });
      window.open(href, '_blank');
    }
  },
};
</script>

<style>
</style>