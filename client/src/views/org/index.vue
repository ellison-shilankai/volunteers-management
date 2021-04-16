<template>
  <div class="org">
    <div class="search-form">
        <el-input
          placeholder="请输入内容" 
          v-model="input"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>
    <div class="org-list" >
      <div class="org-list-item" v-for="(org, index) of orgs"
      :key="index">
        <div class="org-list-item-content">
          <div class="org-list-item-content-img">
            <img :src="org.img" />
          </div>
          <div class="org-list-item-content-title">{{org.title}}</div>
          <p>累计社会服务时数
            <span>{{org.sumTime}}</span>
          </p>
        </div>
        <div class="org-list-item-other"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      orgs: [
        {
          img: 'http://image.zyz.org.cn/1536116662483bfbc2c03b85c4eda87f3231e7e22b456.jpg?imageView2/2/w/100/h/100&v=1618559110000',
          title: '中国计量大学志愿者',
          sumTime: 1021,
        },
        {
          img: 'http://image.zyz.org.cn/1536116662483bfbc2c03b85c4eda87f3231e7e22b456.jpg?imageView2/2/w/100/h/100&v=1618559110000',
          title: '中国计量大学志愿者',
          sumTime: 1021,
        },
        {
          img: 'http://image.zyz.org.cn/1536116662483bfbc2c03b85c4eda87f3231e7e22b456.jpg?imageView2/2/w/100/h/100&v=1618559110000',
          title: '中国计量大学志愿者',
          sumTime: 1021,
        },
        {
          img: 'http://image.zyz.org.cn/1536116662483bfbc2c03b85c4eda87f3231e7e22b456.jpg?imageView2/2/w/100/h/100&v=1618559110000',
          title: '中国计量大学志愿者',
          sumTime: 1021,
        },
        {
          img: 'http://image.zyz.org.cn/1536116662483bfbc2c03b85c4eda87f3231e7e22b456.jpg?imageView2/2/w/100/h/100&v=1618559110000',
          title: '中国计量大学志愿者',
          sumTime: 1021,
        },
      ]
    }
  }
}
</script>

<style>

</style>