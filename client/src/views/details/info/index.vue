<template>
  <div>
    <el-row :gutter="20" style="">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>个人中心</span>
              </div>
              <div class="name-role">
                <span class="sender">昵称 - {{ userlist.name }}</span>
              </div>
              <div class="registe-info">
                <span class="registe-info">
                  注册时间：
                  <li class="fa fa-clock-o"></li>
                  2020/4/10 9:40:33
                </span>
              </div>
              <el-divider></el-divider>
              <div class="personal-relation">
                <div class="relation-item">
                  手机号:
                  <div style="float: right; padding-right: 20px">
                    {{ userlist.tel }}
                  </div>
                </div>
              </div>
              <div class="personal-relation">
                <div class="relation-item">
                  邮箱:
                  <div style="float: right; padding-right: 20px">{{ userlist.email }}</div>
                </div>
              </div>
              <div class="personal-relation">
                <div class="relation-item">
                  志愿时长:
                  <div style="float: right; padding-right: 20px">
                    {{ userlist.time }}
                  </div>
                </div>
              </div>
              <div class="personal-relation">
                <div class="relation-item">
                  权限:
                  <div style="float: right; padding-right: 20px">
                    {{ userlist.status }}
                  </div>
                </div>
              </div>

            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本资料</span>
            </div>
            <div>
              <el-form
                label-width="80px"
                v-model="editForm"
                size="small"
                label-position="right"
              >
                <el-form-item label="用户昵称" prop="name">
                  <el-input
                    auto-complete="off"
                    v-model="editForm.name"
                  ></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="tel">
                  <el-input
                    auto-complete="off"
                    v-model="editForm.tel"
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    maxlength="18"
                    v-model="editForm.email"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    maxlength="18"
                    v-model="editForm.password"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="updateById(editForm)">提交</el-button>
                <el-button size="mini" type="warning">关闭</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import Api from "@/api/index"
export default {
  data() {
    return {
      userlist: {},
      editForm: {
        id: "",
        name: "",
        password: "",
        email: "",
        tel: "",
        time: "",
        status: "",
      },
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser() {
      let id = this.$store.state.user.id
      const { data: res } = await Api.findUser(id);
      this.userlist = res.user;
      this.editForm = { ...this.userlist }
      console.log(this.editForm)
    },
    async updateById() {
      try {
        const response = await Api.updateUser(this.editForm);
        if (response.data.code !== 200) {
          this.$message({
            showClose: true,
            message: response.data.error,
            type: "error",
            center: true,
          });
        } else {
          this.$message({
            message: "更新成功",
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
            message: "更新失败，请稍后重试",
            type: "error",
            center: true,
          });
        }
      }
      this.getUser();
    },
  }
};
</script>

<style>
</style>