<template>
  <div class="userManagement">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb
      class="userManagement-nav"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      <el-breadcrumb-item>组织列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20" class="userManagement-title">
        <el-col :span="8">
          <el-input
            placeholder="请输入想要查询的组织名称"
            v-model="queryInfo.query"
            clearable
            @clear="findOrganize"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="findOrganize"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加组织</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table
        :data="
          orgList.slice(
            (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize,
            this.queryInfo.pagenum * this.queryInfo.pagesize
          )
        "
        border
        stripe 
        class="userManagement-body"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="组织名称"
          prop="name"
          class=""
        ></el-table-column>
        <el-table-column label="介绍" prop="introduce"></el-table-column>
        <el-table-column label="总场数" prop="content"></el-table-column>
        <el-table-column label="图片" prop="img">
          <template slot-scope="scope">
            <img :src="scope.row.img" width="80" height="80" />
          </template>
        </el-table-column>
        <el-table-column label="电话" prop="tel"></el-table-column>
        <el-table-column
          label="总时长"
          prop="totalTime"
          width="50"
        ></el-table-column>
        <el-table-column label="总人数" prop="totalPeople"></el-table-column>
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
      title="添加组织"
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
        <el-form-item label="组织名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="introduce">
          <el-input v-model="addForm.introduce" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="addForm.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-input v-model="addForm.img"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="addForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="总时长" prop="totalTime">
          <el-input v-model="addForm.totalTime"></el-input>
        </el-form-item>
        <el-form-item label="总人数" prop="totalPeople">
          <el-input v-model="addForm.totalPeople"></el-input>
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
        <el-form-item label="组织名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="introduce">
          <el-input v-model="editForm.introduce" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="editForm.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-input v-model="editForm.img"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="editForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="总时长" prop="totalTime">
          <el-input v-model="editForm.totalTime"></el-input>
        </el-form-item>
        <el-form-item label="总人数" prop="totalPeople">
          <el-input v-model="editForm.totalPeople"></el-input>
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
  name: "Org",
  data() {
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
        pagesize: 4,
      },
      orgList: [],
      findorgList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      editDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        name: "中国计量大学",
        img:
          "http://image.zyh365.com/vms/2018/27//1531985272644ce177a4c7e0848fc87632da36d216379?imageView2/2/w/100/h/100",
        introduce:
          "中国计量大学青年志愿者队伍成立于1996年，在各级团委的领导下，在杭州市志愿者协会的协助下，已经走过了22个春秋，现有注册志愿者9000余名，已成为浙江省各高校中最为悠久的志愿者队伍之一。自成立以来，一直坚持以“立足校园，服务社会”为宗旨，积极开展校内外的志愿者服务活动。",
        content:
          "  经过全体青年志愿者多年来不断的努力，我们的工作得到了学校以及社会各界的认可和赞许，总队几乎囊括了省、市各类志愿者活动的奖项。我校也连续多年被评为“浙江省杰出青年志愿者集体”， “西湖国际博览会”志愿行动先进集体， “中国国际动漫节志愿者行动优秀集体”，“浙江省优秀志愿服务集体”，“浙江省G20杭州峰会志愿服务工作优秀组织奖”等荣誉称号。",
        tel: "18888888888",
        totalPeople: "19501",
        totalTime: "143315.9",
      },
      editForm: {
        id: "",
        name: "",
        img: "",
        introduce: "",
        content: "",
        tel: "",
        totalPeople: "",
        totalTime: "",
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
      },
    };
  },
  computed: {},
  created() {
    this.getOrganizeList();
  },
  methods: {
    async findOrganize() {
      let flag = false;
      for (let item of this.orgList) {
        if (item.name === this.queryInfo.query) {
          this.findorgList.push(item);
          this.total++;
          flag = true;
        }
      }
      this.orgList = this.findorgList
      if (!this.queryInfo.query) {
        this.getOrganizeList();
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
    async getOrganizeList() {
      const { data: res } = await Api.getOrganizeList();
      this.orgList = res.orgList;
      this.total = res.count;
    },
    async submitAddForm(addForm) {
      try {
        const response = await Api.createOrganize(addForm);
        if (response.data.code !== 200) {
          this.$message({
            showClose: true,
            message: response.data.error,
            type: "error",
            center: true,
          });
        } else {
          this.$message({
            message: "成功添加一位新组织",
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
      this.getOrganizeList();
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize;
      this.getOrganizeList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrganizeList();
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    updateData(data) {
      this.editForm = { ...data };
      this.editDialogVisible = true;
    },
    async updateById() {
      try {
        const response = await Api.updateOrganize(this.editForm);
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
      this.getOrganizeList();
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
      const res = await Api.deleteOrganize(id);

      if (res.data.code !== 200) {
        return this.$message.error("删除失败！");
      } else {
        this.$message.success("删除成功！");
      }
      this.getOrganizeList();
    },
  },
};
</script>

<style lang="less" scoped>
</style>
