<template>
  <div class="org">
    <div class="search-form">
      <el-input
        placeholder="请输入组织名称"
        v-model="queryInfo.query"
        clearable
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" @click="findOrg"></el-button>
      </el-input>
    </div>
    <div class="org-list">
      <div
        class="org-list-item"
        v-for="(org, index) in orgs.slice(
          (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize,
          this.queryInfo.pagenum * this.queryInfo.pagesize
        )"
        :key="index"
         @click ="skipContent(org.id)"
      >
        <div class="org-list-item-content">
          <div class="org-list-item-content-img">
            <img :src="org.img" />
          </div>
          <div class="org-list-item-content-title">{{ org.name }}</div>
          <p>
            累计社会服务时数
            <span>{{ org.totalTime }}</span>
          </p>
        </div>
        <div class="org-list-item-other">
          <div class="box-city">
            <i class="el-icon-user"></i>{{ org.totalPeople }}
          </div>
        </div>
      </div>
    </div>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[12, 16, 20, 24]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="activity-item-pagination"
    ></el-pagination>
  </div>
</template>

<script>
// import Pagination from "@/components/pagination";
import Api from "@/api/index";
export default {
  name: "org",
  components: {
    // Pagination,
  },
  data() {
    return {
      orgs: [],
      findOrgList: [],
      total: 0,
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 20,
      },
    };
  },
  created() {
    this.getOrganizeList();
  },
  methods: {
    async getOrganizeList() {
      const { data: res } = await Api.getOrganizeList();
      this.orgs = res.orgList;
      this.total = res.count;
    },
     // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getOrganizeList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrganizeList();
    },
    findOrg () {
      let flag = false;
      this.findOrgList = [];
      this.total = 0;
      for (let item of this.orgs) {
        if (item.name === this.queryInfo.query) {
          this.findOrgList.push(item);
          this.total++;
          flag = true;
        }
      }
      this.orgs = this.findOrgList
      if (!this.queryInfo.query) {
        this.getOrganizeList();
      } else {
        if (flag) {
          this.$message({
            message: "搜索成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "请输入正确的邮箱",
            type: "error",
          });
        }
      }
    },
    skipContent(id) {
      this.$router.push({
        path: "/org/content"  ,
        query: {
          id: id
        }
      })
    }
  },
};
</script>

<style>
</style>