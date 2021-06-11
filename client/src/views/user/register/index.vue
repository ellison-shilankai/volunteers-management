<template>
  <div class="register-container">
    <h3>志愿者注册</h3>
    <el-form
      ref="registerForm"
      :model="registerForm"
      class="register-form"
      :rules="registerRules"
    >
      <div class="register-error text-center">{{ this. error }}</div>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="registerForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comparePassword">
        <el-input
          type="password"
          v-model="registerForm.comparePassword"
        ></el-input>
      </el-form-item>
      <el-radio-group v-model="registerForm.status">
        <el-radio label="volunteer">志愿者</el-radio>
        <el-radio label="organizer">组织</el-radio>
        <el-radio label="admin">管理员</el-radio>
      </el-radio-group>
      <el-form-item class="m22">
        <el-button type="primary" @click="register()" :loading="loading"
          >提交</el-button
        >
        <el-button class="pull-right" @click="resetForm()">重置</el-button>
      </el-form-item>
      <div class="register-info">
        如果已注册账号请<router-link :to="{ name: 'Login' }"
          >点击登录</router-link
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import Api from "@/api/index";

export default {
  name: "Register",
  data() {
    return {
      loading: false,
      error: "",
      registerForm: {
        email: "",
        password: "",
        comparePassword: "",
        status: ''
      },
      registerRules: {
        email: {
          type: "email",
          required: true,
          message: "请输入有效的邮箱",
          trigger: "blur",
        },
        password: {
          type: "string",
          required: true,
          message: "密码不能为空",
          trigger: "blur",
        },
        comparePassword: {
          type: "string",
          required: true,
          message: "请输入正确密码",
          trigger: "blur",
          validator: function (rule, value, callback) {
            if (value === "") {
              callback(new Error("请再次输入密码"));
            } else if (value !== this.registerForm.password) {
              callback(new Error("两次输入密码不一致"));
            } else {
              callback();
            }
          }.bind(this),
        },
      },
    };
  },
  created () {
  },
  methods: {
    register() {
      this.$refs["registerForm"].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          this.error = "";
          try { 
            const response = await Api.register({
              email: this.registerForm.email,
              password: this.registerForm.password,
              status: this.registerForm.status
            });
            if (response.data.code !== 200) {
              this.$message({
                showClose: true,
                message: response.data.error,
                type: 'error',
                center: true
              });
            } else {
              this.$message({
                showClose: true,
                message: '注册成功',
                type: 'success',
                center: true
              });
              this.$store.dispatch('setToken', response.data.token)
              this.$router.push("/users/login");
            }
            this.loading = false;
          } catch (error) {
            if(error.response.data.error) {
              this.$message({
                showClose: true,
                message: error.response.data.error,
                type: 'error',
                center: true
              });
            }else {
              this.$message({
                showClose: true,
                message:  "注册失败，请稍后重试",
                type: 'error',
                center: true
              });
            }
            this.loading = false;
          }
        }
      });
    },
    resetForm() {
      this.$refs["registerForm"].resetFields();
    },
  },
};
</script>

<style>
</style>