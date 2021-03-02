<template>
  <div class='login'>
    <h3>志愿者登录</h3>
    <el-form ref="LoginForm" :rules='rules' :model="LoginForm" class='loginContainer'>
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          auto-complete="false"
          v-model="LoginForm.username"
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
      <el-form-item pro="code">
        <el-input
          type="text"
          auto-complete="false"
          v-model="LoginForm.code"
          placeholder="点击图片更换验证码"
          style="width:240px; margin-right: 5px"
        ></el-input>
        <img :src="captchaUrl" />
      </el-form-item>
      <el-checkbox v-model="checked">记住我</el-checkbox>
      <el-button type="primary" class="btn-bolck" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      captchaUrl: '',
      LoginForm: {
        username: "admin",
        password: "123456",
        code: "",
      },
      checked: true,
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        code:  [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitLogin() {
      this.$refs.LoginForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            this.$message.error('请输入正确的账号密码');
            return false;
          }
        });
    }
  }
};
</script>

<style>
</style>