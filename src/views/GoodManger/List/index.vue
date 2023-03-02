<template>
  <div class="list">
    <!-- 面包屑 -->
    <Breadcrumb></Breadcrumb>
    <!-- 1. 搜索区域 -->
    <!-- el-form
            :inline="true" 开启行内表单 
            :model="formInline"  表单数据 
            size="small"      表单大小
     -->
    <div class="header">
      <div class="search">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item label="产品名称">
            <el-input
              v-model="formInline.name"
              placeholder="产品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker
              v-model="formInline.time"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            <!-- <el-input v-model="formInline.user" placeholder="添加的时间"></el-input> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="OnSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="add-goods">
        <el-button type="warning" icon="el-icon-plus" size="mini" @click="GoAdd"
          >添加商品</el-button
        >
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="handelAll"
          >批量删除</el-button
        >
      </div>
    </div>

    <!-- 2. 表格  -->
    <div class="list-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-row-style="{ color: '#333', textAlgin: 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品编号" width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="商品名称"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="100">
        </el-table-column>
        <el-table-column prop="category" label="商品类目" width="100">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="添加时间"
          width="180"
          show-overflow-tooltip
        >
          <!-- slot-scope="scope"  这里的scope可以获取当前这一行的数据-->
          <template slot-scope="scope">
            {{ dayjs(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="hanldeEditor(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handelDelete(scope.$index, scope.row)"
            >
              删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination :total="total" @pageNum="getPageNum"></pagination>
  </div>
</template>

<script>
import pagination from "@/components/pagination";
import { mapMutations } from "vuex";
import { removeHTMLTag } from "@/utils/index";
import dayjs from "dayjs";
export default {
  data() {
    return {
      formInline: {
        name: "",
        time: "",
      },
      tableData: [],
      total: 100,
      pageSize: 1,
      listTotal: [], //搜索查询的所有的数据集合
      searchStatus: false, //查看状态打开了
      ids: [], //存储选中的id号
      currentPage: 1,
      page: 1,
    };
  },

  methods: {
    //这里dayjs由于在标签里面使用，要先methods里面存储
    dayjs,
    ...mapMutations("goods", ["changeTitle", "changeGoods"]),
    //获取列表数据
    async getGoodDate(pages) {
      this.page = pages;
      let res = await this.$api.getGoodsList({ page: this.page });
      //对数据进行处理，把获取来的描述清除标签
      let arr = res.data.data;
      arr.forEach((item) => {
        item.descs = removeHTMLTag(item.descs);
      });
      this.tableData = arr;
      this.total = res.data.total;
    },
    //接收子组件传来的页数，获取列表数据
    getPageNum(e) {
      //判断是不是搜索返回的结果，如果是对返回的数据进行裁剪
      if (this.searchStatus) {
        this.tableData = this.listTotal.slice((e - 1) * 8, e * 8);
      } else {
        //否则对请求的全部数据进行分页
        this.getGoodDate(e);
      }
    },
    //搜索
    OnSearch() {
      if (!this.formInline.name) {
        this.getGoodDate(1);
        this.$message.error("输入不能为空");
      } else {
        this.$api
          .getGoodsSearch({
            search: this.formInline.name,
          })
          .then((res) => {
            //判断响应状态码
            if (res.data.status === 200) {
              this.listTotal = res.data.result;
              //判断返回的长度，如果大于8，对其进行裁剪到8，否则就全部赋值
              if (res.data.result.length > 8) {
                this.searchStatus = true;
                this.tableData = res.data.result.slice(0, 8);
                this.total = res.data.result.length;
              } else {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
              }
            } else {
              this.tableData = [];
              this.total = 0;
            }
          });
      }
    },
    //添加商品
    GoAdd() {
      this.changeTitle("添加");
      this.$router.push("/goods/addgoods");
    },
    //删除单个商品
    handelDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteGoods(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //多选删除
    handelAll() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = this.ids.join(",");
          this.batchDelete(ids);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑 获取当前数据传递给Vuex
    hanldeEditor(index, row) {
      this.changeTitle("编辑"), this.changeGoods(row);
      this.$router.push("/goods/addgoods");
    },
    //获取选择的id
    handleSelectionChange(val) {
      let arr = [];
      val.forEach((item) => {
        arr.push(item.id);
      });
      this.ids = arr;
    },
    //删除方法
    async deleteGoods(id) {
      let res = await this.$api.deleteGoods({ id });
      if (res.data.status === 200) {
        //删除之后重新获取数据
        this.getGoodDate(this.page);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      }
    },
    //多选删除方法
    async batchDelete(ids) {
      console.log(ids);
      let res = await this.$api.batchDelete({ ids });
      if (res.data.status === 200) {
        this.getGoodDate(this.page);
      }
    },
  },
  created() {
    //获取表单数据
    this.getGoodDate(this.page);
  },
  components: {
    pagination,
  },
  watch: {
    //监视formInline，如果用户删除了搜索结果，那么重新请求一个表单数据
    formInline: {
      handler: function () {
        if (!this.formInline.name) {
          this.getGoodDate(this.page);
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  padding: 10px;

  .header {
    background: #fff;
    padding: 10px;
    margin-top: 10px;
    .search {
      padding-bottom: 20px;

      .el-form-item {
        margin-bottom: 0;
      }
    }

    .add-goods {
      background: #fff;
      padding: 10px;
      border: 1px solid #eee;
    }
  }

  .list-table {
    margin-top: 20px;

    /deep/ .cell {
      text-align: center;
    }
  }
}
</style>