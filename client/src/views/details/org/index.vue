<template>
  <div class="details-activity">
    <h3 class="detail-h3">加入的组织</h3>
    <div v-for="(org,index) of findOrgs" :key="index">
    <div class="detail-item-box">
      <div class="img">
        <img
          :src="org.img"
        />
      </div>
      <div class="detail-item-box-right">
        <p class="type">{{ org.totalPeople }} 人</p>
        <p class="time">{{ org.totalTime }} 小时</p>
      </div>
      <h3 @click="toDestination(org.id)">{{ org.name }}</h3>
      <div class="detail-item-box-day">
        <span>介绍:</span>
        <span class="content">{{ org.introduce }}</span>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index";
export default {
  data() {
    return {
      userOrg: [],
      orgList: [],
      findOrgId: [],
      findOrgs: [],
    };
  },
  created() {
    this.getOrganizeList();
    this.getOrganize();
  },
  methods: {
    toDestination(id) {
      this.$router.push({
        path: "/org/content"  ,
        query: {
          id: id
        }
      })
    },
    async getOrganizeList() {
      const { data: res } = await Api.getOrganizeList();
      this.orgList = res.orgList;
    },
    async getOrganize () {
      const { data: res } = await Api.getUserOrg();
      this.userOrg = res.info;
      let id = this.$store.state.user.id
      this.userOrg.forEach( item => {
        if(item.userId === id) {
          this.findOrgId.push(item.orgId)
        }
      })
      this.orgList.forEach( item => {
        if(this.findOrgId.indexOf(item.id) != -1) {
          this.findOrgs.push(item)
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
  .details-activity {
    margin-left: 30px;
  }
  .detail-item-box {
    margin-top: 10px;
    width: 770px;
    height: 99px;
    border: 1px solid #dcdddd;
    border-radius: 5px;
    .img {
      img {
        float: left;
        margin-right: 20px;
        width: 140px;
        height: 99px;
        background-size: cover;
        background-position: center
      }
    }
    .detail-item-box-right {
      float: right;
      width: 180px;
      height: 99px;
      .type {
          float: right;
          margin: 14px 10px 14px 0px;
      }
      .time {
        padding-top: 60px;
        padding-right: 10px;
        font-size: 14px;
        text-align: right;
        color: #999;
      }
    }
    h3 {
      padding: 17px 0px;
      font-size: 18px;
      font-weight: 400;
    }
    .detail-item-box-day {
      margin: 0px 10px;
      span {
        float: left;
        color: #999;
        font-size: 14px;
      }
      .content {
        margin-left: 10px;
        width: 360px;
        height: 36px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
</style>