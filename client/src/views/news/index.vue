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
          <div class="news-list-box-right-time">{{news.time}}</div>
        </div>
      </div>
    </div>
    <div class="news-relevant" >
      <div class="news-relevant-h3">相关资讯</div>
      <div class="news-relevant-item" v-for="(news, index) in news.slice(0,3)"   :key="index">
        {{news.title}}
      </div>
    </div>
    <Pagination/>
  </div>
</template>

<script>
import Pagination from "@/components/pagination";
export default {
  name: 'news',
  components: {
    Pagination,
  },
  data() {
    return {
      news:[
        {
          img: 'http://image.zyz.org.cn/admin/information/o_1deqp9va910rb11rbq901mjqjig.jpg?imageView2/2/w/270/h/190',
          title: '寸草心爱老敬老行动',
          introduce: '爱老敬老是中华民族的传统美德，也是青年志愿服务工作重要内容。',
          time: '2019-07-03 10:29:52'
        },
        {
          img: 'http://image.zyz.org.cn/admin/information/o_1deqp9va910rb11rbq901mjqjig.jpg?imageView2/2/w/270/h/190',
          title: '寸草心爱老敬老行动2',
          introduce: '爱老敬老是中华民族的传统美德，也是青年志愿服务工作重要内容。',
          time: '2019-07-03 10:29:52'
        },
        {
          img: 'http://image.zyz.org.cn/admin/information/o_1deqp9va910rb11rbq901mjqjig.jpg?imageView2/2/w/270/h/190',
          title: '寸草心爱老敬老行动3',
          introduce: '爱老敬老是中华民族的传统美德，也是青年志愿服务工作重要内容。',
          time: '2019-07-03 10:29:52'
        },
        {
          img: 'http://image.zyz.org.cn/admin/information/o_1deqp9va910rb11rbq901mjqjig.jpg?imageView2/2/w/270/h/190',
          title: '寸草心爱老敬老行动',
          introduce: '爱老敬老是中华民族的传统美德，也是青年志愿服务工作重要内容。',
          time: '2019-07-03 10:29:52'
        },
      ],
      info: {
        title: {

        }
      }
    }
  }
};
</script>

<style>
</style>