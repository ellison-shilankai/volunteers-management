<template>
  <div class="userManagement">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb
      class="userManagement-nav"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>申请列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <!-- <el-row :gutter="20" class="userManagement-title">
        <el-col :span="8">
          <el-input
            placeholder="请输入想要查询的活动名称"
            v-model="queryInfo.query"
            clearable
            @clear="findActivity"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="findActivity"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >创建活动</el-button
          >
        </el-col>
      </el-row> -->

      <!-- 用户列表区域 -->
      <el-table
        :data="
          activityList.slice(
            (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize,
            this.queryInfo.pagenum * this.queryInfo.pagesize
          )
        "
        border
        stripe
        class="userManagement-body"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column label="活动名称" prop="actName">
          <template slot-scope="scope">
            <div @click="skipToContent(scope.row.actId)">{{ scope.row.actName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="userName" width="120px">
        </el-table-column>
        <el-table-column label="用户邮箱" prop="userEmail"></el-table-column>
        <el-table-column label="活动时长" prop="actTime" width="120px"></el-table-column>
        <el-table-column label="审核状态" prop="isPass" width="120px" :formatter="passFormatter"></el-table-column>
        <el-table-column label="申请" width="120px">
          <template slot-scope="scope">
            <!-- 接受按钮 -->
            <el-button
              type="primary"
              icon="el-icon-circle-check"
              size="mini"
              @click="updateData(scope.row.id, 1)"
            >
            </el-button>
            <!-- 拒绝按钮 -->
            <el-button
              type="danger"
              icon="el-icon-error"
              size="mini"
              @click="updateData(scope.row.id, 0)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 4, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="userManagement-pagination"
      ></el-pagination>
    </el-card>

  </div>
</template>

<script>
import Api from "@/api/index";
import { mapState } from "vuex"; 
export default {
  name: "Activities",
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 4,
      },
      activityList: [],
      findActivityList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      editDialogVisible: false,
    };
  }, 
  computed: {
    ...mapState({
      status: (state) => state.user.status,
      //该组织发布的活动
      orgAct: (state) => state.activity.orgAct
    })
  },
  created() {
    this.getActivityList();
  },
  methods: {
    passFormatter(row) {
      switch (row.isPass) {
        case true :
          return '已通过'
        case false :
          return '未通过'
        default :
          return '待审核'
      }
    },
    async getActivityList() {
      const { data: res } = await Api.getUserAct();
      if(this.status === "organizer") {
        let actId = []
        this.activityList = []
        let id =  parseInt(this.$route.query.id)
        // 如果是点击某一活动则搜索该活动名单
        if(id){
          actId.push(id)
        }else {
          // 从组织发布的活动中获取该活动的id
          this.orgAct.forEach((item) => {
            actId.push(item.id)
          })
        }
        //从志愿者参与的活动
        res.info.forEach((item) => {
          if(actId.indexOf(item.actId) !== -1){
            this.activityList.push(item) 
          }
        })
      } else {
        this.activityList =  res.info
      }
      this.total = this.activityList.length
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getActivityList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getActivityList();
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    async updateData(id, flag) {
      try {
        const response = await Api.updateUserAct({
          id: id,
          isPass: flag === 1
        })
        if (response.data.code !== 200) {
          this.$message({
            showClose: true,
            message: response.data.error,
            type: "error",
            center: true,
          });
        } else {
          this.$message({
            message: "审核成功",
            type: "success",
          });
        }
        this.editDialogVisible = false;
      } catch (error) {
        if (error.response.data.error) {
          this.$message({
            showClose: true,
            message: error.response.data.error,
            type: "error",
            center: true,
          });
        } else {
          this.$message({
            showClose: true,
            message: "审核失败，请稍后重试",
            type: "error",
            center: true,
          });
        }
      }
      this.getActivityList()
    },
    skipToContent(id) {
      const { href } = this.$router.resolve({
        path: `/home/activities/join`,
        query: {
          id: id
        }
      })
      window.open(href, '_blank');
    }
  },
};
</script>

<style lang="less" scoped>
</style>
