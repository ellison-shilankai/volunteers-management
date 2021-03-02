<template>
  <div class="register-container">
    <h3>志愿者注册</h3>
    <el-form
      ref="registerForm"
      :model="registerForm"
      class="register-form"
      :rules="registerRules"
    >
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="string"
          v-model="registerForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comparePassword">
        <el-input type="string" v-model="registerForm.comparePassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"
          >提交</el-button
        >
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
      <div class='register-info'>如果已注册账号请<router-link :to="{name: 'Login'}">点击登录</router-link></div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        email: "",
        password: "",
        comparePassword: "",
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
            if(value === ''){
              callback(new Error('请再次输入密码'))
            } else if(value !== this.registerForm.password) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          }.bind(this)
        },
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs['registerForm'].resetFields();
    },
  },
};
</script>

<style>
</style>