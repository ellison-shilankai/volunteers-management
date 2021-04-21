<template>
  <div class="pagination">
    <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[4, 8, 16, 32]"
        :page-size="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="32"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 4,
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  }
};
</script>

<style>
</style>