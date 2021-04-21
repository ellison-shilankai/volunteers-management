<template>
  <div class="news">
    <div class="news-list">
      <div class="news-list-box" v-for="(news, index) in news"   :key="index">
        <div class="news-list-box-left">
          <img :src="news.img" />
        </div>
        <div class="news-list-box-right">
          <div class="news-list-box-right-h3">{{news.title}}</div>
          <div class="news-list-box-right-p">{{news.introduce}}</div>
          <div class="news-list-box-right-time"></div>
        </div>
      </div>
    </div>
    <div class="news-relevant" >
      <div class="news-relevant-h3">相关资讯</div>
      <div class="news-relevant-item" v-for="(news, index) in news_title"   :key="index">
        {{news.title}}
      </div>
    </div>
    <Pagination/>
  </div>
</template>

<script>
import Api from "@/api/index";
import Pagination from "@/components/pagination";
export default {
  name: 'news',
  components: {
    Pagination,
  },
  data() {
    return {
      news: null,
      new_title: null,
    }
  },
  computed: {
    news_title: function(){
      return this.news && this.news.slice(0, 3)
    }
  },
  async created () {
    this.news = await Api.getAllNew().then(res =>{
      // res.data.count
      this.$store.commit('SET_NEWS', res.data)
      return res.data.info
    })
  },
  methods: {
   }
};
</script>

<style>
</style>