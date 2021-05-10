<template>
  <div class="details">
    <div class="details-left">
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title" @click="toDestination('/details/info')">个人信息</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title" @click="toDestination('/details/activity')">申请的活动</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title" @click="toDestination('/details/org')">加入的组织</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <!-- 右侧内容主体 -->
    <el-main class="details-right">
      <!-- 路由占位符 -->
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataForm: {
        nickName: "超级管理员",
        phone: "173567777777",
        homeUrl: "http://www.baidu.com",
      },
    };
  },
  methods: {
    toDestination(path) {
      this.$router.push(path)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.details {
  display: flex; 
  flex-direction: row;
  margin: 0px auto;
  width: 1190px;
  padding-top: 40px;
  overflow: hidden;
  .details-left {
    padding-left: 100px;
    width: 300px;
    // float: left;
  }
  .details-right {
    padding: 0;
    margin-left: -170px;
    overflow: hidden;
  }
}
//卡片样式
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
//文本样式区
.name-role {
  font-size: 16px;
  padding: 5px;
  text-align: center;
}
.sender {
  text-align: center;
}
.registe-info {
  text-align: center;
  padding-top: 10px;
}
.personal-relation {
  font-size: 16px;
  padding: 0px 5px 15px;
  margin-right: 1px;
  width: 100%;
}

.relation-item {
  padding: 12px;
}
.dialog-footer {
  padding-top: 10px;
  padding-left: 10%;
}
//布局样式区
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>