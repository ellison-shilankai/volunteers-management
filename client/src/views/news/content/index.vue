<template>
  <div class="new-content">
    <h1>{{this.newsTitle}} </h1>
    <div class="new-content-info">
      <img :src=this.newsContent>
    </div>
  </div>
</template>
 
<script>
// import { mapState } from "vuex";
export default {
  name: 'new-content',
  data(){
    return {
      newsTitle: '',
      newsContent: '',
    }
  },
  computed: {
    // ...mapState('news', {
    //   info: state => state.news.info
    // }),
  },
  created () {
    this.temp = JSON.parse(localStorage.getItem("newsInfo"))
    this.newsTitle = this.temp[this.$route.query.id].title
    this.newsContent = this.temp[this.$route.query.id].content
  },
}
</script>

<style>

</style>