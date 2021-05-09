<template>
  <div class="org-content">
    <div class="org-content-info">
      <div class="box-img"><img :src="orgList.img" /></div>
      <h3>{{ orgList.name }}</h3>
      <el-button type="success" class="box-join">加入该组织</el-button>
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
      <div class="detail-item-box"></div>
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
      console.log(this.orgList);
    },
  },
};
</script>

<style>
</style>