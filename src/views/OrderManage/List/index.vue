<template>
  <div class="list">
    <!-- 面包屑 -->
    <Breadcrumb></Breadcrumb>

    <div class="header">
      <div class="search">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <div class="top">
            <el-form-item label="订单编号">
              <el-input
                v-model="formInline.code"
                placeholder="订单编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="预定时间">
              <el-date-picker
                v-model="formInline.yudingTime"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
              <!-- <el-input v-model="formInline.user" placeholder="添加的时间"></el-input> -->
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </div>
          <div class="bottom">
            <el-form-item label="下单人">
              <el-input
                v-model="formInline.ordername"
                placeholder="输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input
                v-model="formInline.phone"
                placeholder="输入电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属单位">
              <el-input
                v-model="formInline.company"
                placeholder="输入单位"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="headerTolls">
      <el-button type="primary" size="mini" @click="order">订单汇总</el-button>

      <template>
        <download-excel
          class="export-excel-wrapper"
          :data="tableData"
          :fields="json_fields"
          :header="title"
          name="生鲜订单列表"
          style="display: inline-block; margin: 0 10px"
        >
          <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
          <el-button type="success" size="mini">导出</el-button>
        </download-excel>
      </template>
    </div>

    <div class="TableList">
      <el-table
        :data="tableData"
        style="width: 100%; text-align: center"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :selectable="selectFun">
        </el-table-column>
        <el-table-column prop="code" label="订单编号" width="180">
          <template slot-scope="scope">
            <span style="color: blue" @click="orderDetail(scope.row)">{{
              scope.row.code
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ordername" label="姓名"> </el-table-column>
        <el-table-column prop="company" label="所属单位"> </el-table-column>
        <el-table-column prop="phone" label="联系电话"> </el-table-column>
        <el-table-column prop="yudingTime" label="预定时间"> </el-table-column>
        <el-table-column prop="price" label="订单总价格"> </el-table-column>
        <el-table-column prop="huizongStatus" label="汇总状态">
        </el-table-column>
      </el-table>
    </div>

    <pagination :total="total" @pageNum="pageNum"></pagination>
  </div>
</template>

<script>
import dayjs from "dayjs";
import pagination from "@/components/pagination";
import { orderList, setChangeStatus } from "@/api/order";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      tableData: [],
      total: 10,
      result: null,
      formInline: {},
      json_fields: {
        订单编号: {
          field: "code",
          callback: (value) => {
            return "&nbsp;" + value;
          },
        },
        姓名: "ordername",
        所属单位: "company",
        电话: {
          field: "phone",
          callback: (value) => {
            return "&nbsp;" + value;
          },
        },
        预定时间: "yudingTime",
        价格: "price",
        汇总状态: "huizongStatus",
      },
      title: "生鲜订单列表",
    };
  },
  mounted() {
    //获取列表数据
    this.getListDate(1);
  },
  methods: {
    ...mapMutations("orderDetail", ["changeOrder"]),
    //获取列表数据
    async getListDate(page) {
      let res = await orderList({ page });
      // console.log(res);

      let arr = res.data.data;
      //处理汇总状态
      arr.forEach((item) => {
        item.yudingTime = dayjs(item.yudingTime).format("YYYY-MM-DD HH:mm:ss");
        if (item.huizongStatus === 2) {
          item.huizongStatus = "已汇总";
        } else {
          item.huizongStatus = "未汇总";
        }
      });
      this.tableData = arr;
      this.total = res.data.total;
    },

    //获取分页组件传来的page
    pageNum(e) {
      let page = e;
      this.getListDate(page);
    },

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },

    //把已汇总的复选框进行禁用
    selectFun(row, index) {
      if (row.huizongStatus === "已汇总") {
        return false;
      } else {
        return true;
      }
    },

    //对订单进行汇总
    order() {
      if (this.result === null) {
        this.$message({
          message: "你还为选选择一些内容 亲",
          type: "warning",
        });
      } else {
        this.$confirm("是否对选中的汇总?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.setChangeStatus(this.result);
            this.result = null;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      }
    },

    //汇总选项
    handleSelectionChange(num) {
      // console.log(num);
      let sum = [];
      num.forEach((item) => {
        sum.push(item.id);
      });
      this.result = sum.join(",");
    },

    //汇总接口
    async setChangeStatus(params) {
      let res = await setChangeStatus({ ids: params });
      if (res.data.status === 200) {
        this.getListDate(1);
      }
    },

    orderDetail(e) {
      this.changeOrder(e);
      this.$router.push("/orderManger/orderdetail");
    },
  },
  components: {
    pagination,
  },
};
</script>

<style lang="less" scoped>
.list {
  margin: 10px;
  background: #fff;
  padding: 20px;
  height: 100%;
  .header {
    background: #fff;

    margin-top: 10px;
    text-align: left;

    .search {
      .top {
        margin: 20px 0px;
        .el-col {
          text-align: center;
        }
      }
      .bottom {
        margin-top: 20px;
      }
      .el-form-item {
        margin-bottom: 0;
        margin-left: 20px;
      }
    }
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  /deep/ .cell {
    text-align: center;
  }
}

.headerTolls {
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  padding: 10px;
}
</style>