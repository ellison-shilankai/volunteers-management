<template>
  <div class="userManagement">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb
      class="userManagement-nav"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资讯管理</el-breadcrumb-item>
      <el-breadcrumb-item>资讯列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20" class="userManagement-title">
        <el-col :span="8">
          <el-input
            placeholder="请输入想要查询的资讯名称"
            v-model="queryInfo.query"
            clearable
            @clear="findNew"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="findNew"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >创建资讯</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table
        :data="
          newsList.slice(
            (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize,
            this.queryInfo.pagenum * this.queryInfo.pagesize
          )
        "
        border
        stripe
        class="userManagement-body"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="图片" prop="img">
          <template slot-scope="scope">
            <img :src="scope.row.img" width="80" height="80" />
          </template>
        </el-table-column>
        <el-table-column label="介绍" prop="introduce"></el-table-column>
        <el-table-column label="内容" prop="content"></el-table-column>
        <el-table-column label="操作" width="120px">
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
        :page-sizes="[1, 2, 4, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="userManagement-pagination"
      ></el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="创建资讯"
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
        <el-form-item label="资讯标题" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-input v-model="addForm.img"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduce">
          <el-input v-model="addForm.introduce" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="addForm.content" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddForm()"
          >立即创建</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改资讯"
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
       <el-form-item label="资讯标题" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-input v-model="editForm.img"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduce">
          <el-input v-model="editForm.introduce" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="editForm.content" type="textarea"></el-input>
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
import Api from "@/api/index";
export default {
  name: "HomeNews",
  data() {
    return {
      selectedOptions: [],
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 4,
      },
      newsList: [],
      findNewsList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      editDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        title: "",
        img: "",
        introduce: "",
        content: "",
      },
      editForm: {
        id: "",
        title: "",
        img: "",
        introduce: "",
        content: "",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        img: [
          {
            required: false,
            message: "请上传图片",
            trigger: "blur",
          },
        ],
        introduce: [
          {
            required: true,
            message: "请输入活动介绍",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  created() {
    this.getAllNew();
  },
  methods: {
    async findNew() {
      let flag = false;
      for (let item of this.newsList) {
        if (item.title === this.queryInfo.query) {
          // console.log(item)
          this.findNewsList.push(item);
          this.total++;
          flag = true;
        }
      }
      this.newsList = this.findNewsList
      if (!this.queryInfo.query) {
        this.getAllNew();
      } else {
        if (flag) {
          this.$message({
            message: "搜索成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "请输入正确的资讯名称",
            type: "error",
          });
        }
      }
    },
    async getAllNew() {
      const { data: res } = await Api.getAllNew();
      this.newsList = res.info;
      this.total = res.count;
    },
    async submitAddForm() {
      try {
        const response = await Api.createNew(this.addForm);
        if (response.data.code !== 200) {
          this.$message({
            showClose: true,
            message: response.data.error,
            type: "error",
            center: true,
          });
        } else {
          this.$message({
            message: "成功创建资讯",
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
            message: "创建失败，请稍后重试",
            type: "error",
            center: true,
          });
        }
      }
      this.getAllNew();
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getAllNew();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getAllNew();
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
        const response = await Api.updateNew(this.editForm);
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
      this.getAllNew();
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该活动, 是否继续?",
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
      const res = await Api.deleteNew(id); 

      if (res.data.code !== 200) {
        return this.$message.error("删除失败！");
      } else {
        this.$message.success("删除成功！");
      }
      this.getAllNew();
    },
  },
};
</script>

<style lang="less" scoped>
</style>
