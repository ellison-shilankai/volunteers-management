<template>
  <div class="news">
    <div class="news-list">
      <div class="news-list-box" v-for="(news, index) in dataShow[currentPage-1]" :key="index" >
        <div class="news-list-box-left">
          <img :src="news.img" />
        </div>
        <div @click='skipContent(currentPage, index)'>
        <div class="news-list-box-right">
          <div class="news-list-box-right-h3">{{ news.title }}</div>
          <div class="news-list-box-right-p">{{ news.introduce }}</div>
          <div class="news-list-box-right-time"></div>
        </div>
        </div>
      </div>
    </div>
    <div class="news-relevant">
      <div class="news-relevant-h3">相关资讯</div>
      <div
        class="news-relevant-item"
        v-for="(news, index) in newsTitle"
        :key="index"
      >
        {{ news.title }}
      </div>
    </div>

    <!-- 分页加载 -->
    <div class="pagination">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[4, 8, 16, 32]"
          :page-size="4"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.newsData.totalNum"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index";
export default {
  name: "news",
  data() {
    return {
      newsData: {
        news: null,
        totalNum: 0,
      },
      dataShow: [],
      pageSize: 4,
      currentPage: 1,
    };
  },
  watch: {
    pageSize: {
      handler(newValue){
        this.paging(newValue)
      }
    }
  }, 
  computed: {
    newsTitle: function () {
      return this.newsData.news && this.newsData.news.slice(0, 3);
    },
  },
  async created() {
    this.newsData.news = await Api.getAllNew().then((res) => {
      this.$store.commit(`news/SET_NEWS`, res.data);
      this.newsData.totalNum = res.data.count;
      localStorage.setItem("newsInfo",JSON.stringify(res.data.info))
      return res.data.info;
    });
    this.paging(this.pageSize);
  },
  methods: {
    paging(pageSize) {
      this.dataShow = [];
      for (let i = 0; i < Math.ceil(this.newsData.totalNum / pageSize); i++) {
        this.dataShow[i] = this.newsData.news.slice(
          pageSize * i,
          pageSize * (i + 1)
        );
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    skipContent(currentPage, index) {
      let id = this.getIndex(currentPage, index)
      this.$router.push({
        path: "/news/content"  ,
        query: {
          id: id
        }
        })
    },
    getIndex(currentPage, index) {
      return (currentPage-1)* this.pageSize + index
    }
  },
};
</script>

<style>
</style>