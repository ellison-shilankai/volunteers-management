<template>
  <div class="userManagement">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb
      class="userManagement-nav"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20" class="userManagement-title">
        <el-col :span="8">
          <el-input
            placeholder="请输入想要查询的邮箱"
            v-model="queryInfo.query"
            clearable
            @clear="findUser"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="findUser"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-button type="info" @click="export2Excel()">导出用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table
        :data="
          userlist.slice(
            (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize,
            this.queryInfo.pagenum * this.queryInfo.pagesize
          )
        "
        border
        stripe
        class="userManagement-body"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="tel"></el-table-column>
        <el-table-column label="时长" prop="time" width="50"></el-table-column>
        <el-table-column label="角色" prop="status"></el-table-column>
        <!-- <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="updateData(scope.row)"
            >
            </el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.id)"
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
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="userManagement-pagination"
      ></el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="addForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="time">
          <el-input v-model="addForm.time"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-radio-group v-model="addForm.status">
            <el-radio label="volunteer">志愿者</el-radio>
            <el-radio label="organizer">组织</el-radio>
            <el-radio label="admin">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddForm(addForm)"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="editForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="time">
          <el-input v-model="editForm.time"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-radio-group v-model="editForm.status">
            <el-radio label="volunteer">志愿者</el-radio>
            <el-radio label="organizer">组织</el-radio>
            <el-radio label="admin">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateById(editForm)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Api from "@/api/index";
export default {
  name: "Users",
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }

      cb(new Error("请输入合法的邮箱"));
    };
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if (regMobile.test(value)) {
        return cb();
      }

      cb(new Error("请输入合法的手机号"));
    };
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      userlist: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      editDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        name: "张三",
        password: "123456",
        email: "admin@163.com",
        tel: "17888888888",
        time: "2",
        status: "",
      },
      editForm: {
        id: "",
        name: "",
        password: "",
        email: "",
        tel: "",
        time: "",
        status: "",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "用户名的长度在6~18个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        tel: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            validator: checkMobile,
            trigger: "blur",
          },
        ],
        time: [
          {
            required: false,
            message: "请输入志愿者时长",
            trigger: "blur",
          },
          {
            min: 0,
            message: "请输入正数",
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: "请选择权限",
            trigger: "blur",
          },
          {
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      status: (state) => state.user.status,
      name: (state) => state.user.name,
    }),
  },
  created() {
    this.getUserList();
  },
  methods: {
    async findUser() {
      let flag = false;
      for (let item of this.userlist) {
        if (item.email === this.queryInfo.query) {
          this.userlist = [item];
          this.total = 1;
          flag = true;
        }
      }
      if (!this.queryInfo.query) {
        this.getUserList();
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
    async getUserList() {
      let temp = []
      const { data: res } = await Api.getUserList();
      temp = res.userList;
      let userId = []
      if(this.status === "organizer") {
        const { data: res } = await Api.getUserOrg()
        const name = this.name
        res.info.forEach((item) => {
          if(item.orgName === name){
             userId.push(item.userId)
          }
        })
        this.userlist = temp.filter((item) => {
          return userId.indexOf(item.id) !== -1
        })
        this.total = this.userlist.length
      } else {
        this.userlist = res.userList;
        this.total = res.count;
      }
    },
    async submitAddForm(addForm) {
      try {
        const response = await Api.register(addForm);
        if (response.data.code !== 200) {
          this.$message({
            showClose: true,
            message: response.data.error,
            type: "error",
            center: true,
          });
        } else {
          this.$message({
            message: "成功添加一位新用户",
            type: "success",
          });
        }
        this.addDialogVisible = false;
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
            message: "添加失败，请稍后重试",
            type: "error",
            center: true,
          });
        }
      }
      this.getUserList();
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    updateData(data) {
      this.editForm = { ...data };
      this.editDialogVisible = true;
      // console.log(this.editForm)
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
      this.getUserList();
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("已经取消删除！");
      }
      const res = await Api.deleteUser(id);

      if (res.data.code !== 200) {
        return this.$message.error("删除失败！");
      } else {
        this.$message.success("删除成功！");
      }
      this.getUserList();
    },
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel");
        const tHeader = ["序号", "姓名", "邮箱", "电话", "时长"]; //对应表格输出的title
        const filterVal = ["id", "name", "email", "tel", "time"]; // 对应表格输出的数据
        const list = this.userlist;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "志愿者名单"); //对应下载文件的名字
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>

<style lang="less" scoped>
</style>
