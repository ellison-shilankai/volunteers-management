<template>
  <div id="index"> 
    <!-- <div class="main-fix-window">
      <div class="main-fix-item1" onClick="goTop()">回到顶部</div>
    </div> -->
    <el-container>
      <el-main>
        <el-carousel :interval="5000" arrow="always" height="400px">
          <el-carousel-item v-for="(item,index) in carousel_img" :key="index">
            <img :src='item.url' alt />
          </el-carousel-item>
        </el-carousel>
        <e-activity class="e-activity"></e-activity>
      </el-main>
      
    </el-container>
    
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import eActivity from "@/components/activities/e-activity";
export default {
  components: { eActivity },
  name: 'index',
  data(){
    return {
      // carousel_img: ['@/assets/images/carousel-1.jpg', '@/assets/images/carousel-2.jpg'],
      carousel_img: [
        {url:require('@/assets/images/carousel-1.jpg')},
        {url:require('@/assets/images/carousel-2.jpg')},
        {url:require('@/assets/images/carousel-3.jpg')},
        {url:require('@/assets/images/carousel-4.jpg')}
      ]
    }
  },
  computed: {
    // ...mapState({
    //   User: state => state.user
    // })
  },
  created () {
  }
};
</script>

<style>
</style>