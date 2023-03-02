<template>
  <div class="pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ["total"],
  data() {
    return {
      currentPage4: 1,
    };
  },
  methods: {
    //把当前选的页数传递给父组件
    handleCurrentChange(val) {
      this.$emit("pageNum", val);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  padding-top: 20px;
  padding-right: 20px;
  background: #fff;
  text-align: right;
}
</style>