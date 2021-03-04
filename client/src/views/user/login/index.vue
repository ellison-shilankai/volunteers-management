<template>
  <div class="login">
    <h3>志愿者登录</h3>
    <el-form
      ref="LoginForm"
      :rules="rules"
      :model="LoginForm"
      class="loginContainer"
    >
      <div class="login-error text-center">{{ this.error }}</div>
      <el-form-item label="邮箱" prop="email">
        <el-input
          type="text"
          auto-complete="false"
          v-model="LoginForm.email"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          auto-complete="false"
          v-model="LoginForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item pro="code">
        <el-input
          type="text"
          auto-complete="false"
          v-model="LoginForm.code"
          placeholder="点击图片更换验证码"
          style="width: 240px; margin-right: 5px"
        ></el-input>
        <img :src="captchaUrl" />
      </el-form-item> -->
      <el-button type="primary" class="btn-bolck" @click="submitLogin" :loading="loading"
        >登录</el-button
      >
      <div class="login-info">如果没有册账号请<router-link :to="{name: 'Register'}">点击注册</router-link></div>
    </el-form>
  </div>
</template>

<script>
import Api from "@/api/index";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      error: '',
      captchaUrl: "",
      loading: false,
      LoginForm: {
        email: "1067168009@qq.com",
        password: "12345678",
        // code: "",
      },
      checked: true,
      rules: {
        email: [
          { type: 'email', required: true, message: "请输入邮箱", trigger: "blur" },
        ],
        password: [
          { type: 'string', required: true, message: "请输入密码", trigger: "blur" },
        ],
        // code: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions(["setToken", "setUser"]),
    submitLogin() {
      this.$refs.LoginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const response = await Api.login({
              email: this.LoginForm.email,
              password: this.LoginForm.password,
            }); 
            if (response.data.code !== 200) {
              // this.error = response.data.error;
              this.$message({
                showClose: true,
                message: error.response.data.error,
                type: 'error',
                center: true
              });
            } else {
              this.$store.dispatch('setToken', response.data.token)
              this.$store.dispatch('setUser', response.data.user)
              this.$router.push("/");
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
                message: "登录失败，请重新登陆",
                type: 'error',
                center: true
              });
            }
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style>
</style>