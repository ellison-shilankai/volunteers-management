<template>
  <div class="details-activity">
    <h3 class="detail-h3">待审核活动</h3>
    <div v-for="(activity,index) of findActivities" :key="index">
    
    <div class="detail-item-box">
      <div class="img">
        <img
          :src="activity.img"
        />
      </div>
      <div class="detail-item-box-right">
        <p class="type">活动时长:{{ activity.time }}</p>
        <p class="time">{{ activity.place }}</p>
      </div>
      <h3  @click="toDestination(activity.id)">{{ activity.name }}</h3>
      <div class="detail-item-box-day">
        <span>人数：</span>
        <el-progress :percentage="activity.percentage" class="progress"></el-progress>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userAct: [],
      findActId: [],
      findActivities: [],
    };
  },
  computed: {
    ...mapState({
      activityList: (state) => state.activity.activityList,
    }),
  },
  created() {
    this.getActivity();
  },
  methods: {
    toDestination(id) {
      this.$router.push({
        path: "/activities/content"  ,
        query: {
          id: id
        }
      })
    },
    async getActivity () {
      const { data: res } = await Api.getUserAct();
      this.userAct = res.info;
      let id = this.$store.state.user.id
      this.findActId = []
     
      this.userAct.forEach( item => {
        if(item.userId === id && item.isPass === null) {
          this.findActId.push(item.actId)
        }
      })
      this.activityList.forEach( item => {
        if(this.findActId.indexOf(item.id) !== -1) {
          this.findActivities.push(item)
        }
      })
    }
  }
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
          margin: 14px 22px;
      }
      .time {
        padding-top: 60px;
        padding-right: 20px;
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
      .progress {
        float: left;
        margin: 0px 10px;
        width: 216px;
        height: 16px;
        border-radius: 10px;
        -moz-border-radius: 10px;
        overflow: hidden;
      }
    }
  }
</style>