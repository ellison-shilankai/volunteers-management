<template>
  <div class="userManagement">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb
      class="userManagement-nav"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20" class="userManagement-title">
        <el-col :span="8">
          <el-input
            placeholder="请输入想要查询的活动名称"
            v-model="queryInfo.query"
            clearable
            @clear="findActivity"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="findActivity"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >创建活动</el-button
          >
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
        <el-table-column label="活动名称" prop="name" >
          <template slot-scope="scope">
            <div @click="skipToContent(scope.row.id)">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="图片" prop="img">
          <template slot-scope="scope">
            <img :src="scope.row.img" width="80" height="80" />
          </template>
        </el-table-column>
        <el-table-column label="介绍" prop="introduce"></el-table-column>
        <!-- <el-table-column label="内容" prop="content"></el-table-column> -->
        <el-table-column label="截止日期" prop="deadline" :formatter="formatDate"></el-table-column>
        <el-table-column label="地址" prop="place"></el-table-column>
        <el-table-column label="组织名字" prop="orgName"></el-table-column>
        <!-- <el-table-column label="类型" prop="type"></el-table-column> -->
        <el-table-column label="电话" prop="tel" width="125"></el-table-column>
        <el-table-column label="时长" prop="time" width="50"></el-table-column>
        <el-table-column
          label="状态"
          prop="status"
          width="70"
        ></el-table-column>
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
      title="创建活动"
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
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
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
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              v-model="addForm.deadline"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="截止日期" prop="deadline">
          <el-input v-model="addForm.deadline"></el-input>
        </el-form-item> -->
        <el-form-item label="地址" prop="place">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
          <!-- <el-input v-model="addForm.place"></el-input> -->
        </el-form-item>
        <el-form-item label="活动人数" prop="tel">
          <el-input v-model="addForm.totalPeople"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="addForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="组织名称" prop="orgName">
          <el-input v-model="addForm.orgName"></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="time">
          <el-input v-model="addForm.time"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="addForm.type"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="addForm.status">
            <el-radio label="招募中"></el-radio>
            <el-radio label="已结束"></el-radio>
          </el-radio-group>
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
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
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
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              v-model="editForm.deadline"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="截止日期" prop="deadline">
          <el-input v-model="addForm.deadline"></el-input>
        </el-form-item> -->
        <el-form-item label="地址" prop="place">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
          <!-- <el-input v-model="addForm.place"></el-input> -->
        </el-form-item>
        <el-form-item label="活动人数" prop="totalPeople">
          <el-input v-model="editForm.totalPeople"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="editForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="组织名称" prop="orgName">
          <el-input v-model="editForm.orgName"></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="time">
          <el-input v-model="editForm.time"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="editForm.type"></el-input> 
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="editForm.status">
            <el-radio label="招募中"></el-radio>
            <el-radio label="已结束"></el-radio>
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
import Api from "@/api/index";
import { regionData, CodeToText } from "element-china-area-data";
import { mapState, mapActions } from "vuex";
export default {
  name: "Activities",
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
      //时间选择器
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      //地区选择器
      options: regionData,
      selectedOptions: [],
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
      // 添加活动的表单数据
      addForm: {
        name: "志愿先锋行",
        img: "http://image.zyh365.com/vms/2021/21//162035407447288884a15b6284edcbb34147140d4aa4e?imageView2/2/w/400/h/270",
        introduce: "",
        content: "于浙江大学紫金港校区进行反诈宣传，主要以发放宣传单页，播放反诈视频，推广反诈码的工作为主。",
        deadline: "",
        place: "",
        totalPeople: '',
        tel: "17888888888",
        orgName: "蒋村街道蝶园社区团支部",
        time: "2",
        type: "社区服务",
        status: "",
      },
      editForm: {
        id: "",
        name: "",
        img: "",
        introduce: "",
        content: "",
        deadline: "",
        place: "",
        totalPeople: '',
        tel: "17888888888",
        orgName: "",
        time: "2",
        type: "",
        status: "",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
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
    this.getActivityList();
  },
  methods: {
    ...mapActions("activity", ["getOrgAct"]),
    formatDate(row, column) {
      // 获取单元格数据
      let data = row[column.property]
      if(data == null) {
          return null
      }
      let dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes()
    },
    handleChange() {
      var loc = "";
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]];
      }
      // alert(loc);
      this.addForm.place = loc;
      this.editForm.place = loc;
    },
    async findActivity() {
      let flag = false;
      this.findActivityList = []
      this.total = 0
      for (let item of this.activityList) {
        if (item.name === this.queryInfo.query) {
          // console.log(item)
          this.findActivityList.push(item);
          this.total++;
          flag = true;
        }
      }
      this.activityList = this.findActivityList
      if (!this.queryInfo.query) {
        this.getActivityList();
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
    async getActivityList() {
      const { data: res } = await Api.getActivityList();
      this.activityList = []
      if(this.status === "organizer") {
        const name = this.name
        res.activities.forEach((item) => {
          if(item.orgName === name){
            this.activityList.push(item) 
          }
        })
      } else {
        this.activityList =  res.activities
      }
      this.$store.dispatch('activity/getOrgAct', this.activityList)
      this.total = this.activityList.length
    },
    async submitAddForm() {
      try {
        const response = await Api.createActivity(this.addForm);
        if (response.data.code !== 200) {
          this.$message({
            showClose: true,
            message: response.data.error,
            type: "error",
            center: true,
          });
        } else {
          this.$message({
            message: "成功创建活动",
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
      this.getActivityList();
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
    updateData(data) {
      this.editForm = { ...data };
      this.editDialogVisible = true;
      // console.log(this.editForm)
    },
    async updateById() {
      try {
        const response = await Api.updateActivity(this.editForm);
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
      this.getActivityList();
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
      const res = await Api.deleteActivity(id); 

      if (res.data.code !== 200) {
        return this.$message.error("删除失败！");
      } else {
        this.$message.success("删除成功！");
      }
      this.getActivityList();
    },
    skipToContent(id) {
      const { href } = this.$router.resolve({
        path: `/home/activities/join`,
        query: {
          id: id
        }
      })
      window.open(href, '_blank');
    }
  },
 
};
</script>

<style lang="less" scoped>
</style>
