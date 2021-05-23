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
      <el-row :gutter="20" class="userManagement-title">
        <el-col :span="12">
          <el-button type="primary" @click="export2Excel()">导出用户</el-button>
        </el-col>
      </el-row>

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
        <el-table-column label="是否签到" prop="isFinish" width="120px" :formatter="finishFormatter"></el-table-column>
        <el-table-column label="签到" width="120px">
          <template slot-scope="scope">
            <!-- 接受按钮 -->
            <el-button
              v-if="scope.row.isFinish !== true "
              type="primary"
              icon="el-icon-circle-check"
              size="mini"
              @click="updateData(scope.row, 1)"
            >
            </el-button>
            <!-- 拒绝按钮 -->
            <el-button
              v-if="scope.row.isFinish !== false "
              type="danger"
              icon="el-icon-error"
              size="mini"
              @click="updateData(scope.row, 0)"
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
      name: (state) => state.user.name,
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
    finishFormatter(row) {
      switch (row.isFinish) {
        case true :
          return '已签到'
        case false :
          return '未签到'
        default :
          return '待处理'
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
          this.orgAct.forEach((item) => {
            actId.push(item.id)
          }) 
        }
        res.info.forEach((item) => {
          if(actId.indexOf(item.actId) !== -1 && item.isPass === true){
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
    async updateData(row, flag) {
      try {
        const { data: res} = await Api.findUser(row.userId)

        let time = flag ? row.actTime : 0 - row.actTime
        const response = await Api.updateUserAct({
          id: row.id,
          isFinish: flag === 1,
        })
        // 志愿时长增加或减少
        const response2 = await Api.updateUser({
          id: row.userId,
          time: time + res.user.time,
        })
        if (response.data.code !== 200 && response2.data.code !== 200) {
          this.$message({
            showClose: true,
            message: response.data.error,
            type: "error",
            center: true,
          });
        } else {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          // 操作成够增加或减少该组织的志愿时长
          let { data: res } = await Api.getOrganizeList();
          let orgList = res.orgList;
          let totalTime;
          let orgId
          orgList.forEach((item) =>{
            if(item.name === this.name ) {
              console.log(item.totalTime)
              totalTime = parseFloat(item.totalTime) + time
              orgId = item.id
            }
          })
          await Api.updateOrganize({
            id: orgId,
            totalTime
          })
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
            message: "操作错误，请稍后重试",
            type: "error",
            center: true,
          });
        }
      }
      this.getActivityList()
    },
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel");
        const tHeader = ["活动名称", "姓名", "邮箱", "活动时长", "是否签到"]; //对应表格输出的title
        const filterVal = ["actName", "userName", "userEmail", "actTime", "isFinish"]; // 对应表格输出的数据
        const list = this.activityList;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "志愿者名单"); //对应下载文件的名字
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    skipToContent(id) {
      const { href } = this.$router.resolve({
        path: `/home/activities/finish`,
        query: {
          id: id
        }
      })
      window.open(href, '_blank');
    }
  }
};
</script>

<style lang="less" scoped>
</style>
