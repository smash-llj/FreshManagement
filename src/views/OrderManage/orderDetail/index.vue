<template>
  <div class="detail">
    <!-- 面包屑 -->
    <Breadcrumb></Breadcrumb>
    <!-- 头部 -->
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
    <!-- 表单 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="title" label="产品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="180"> </el-table-column>
      <el-table-column prop="guige" label="规格"> </el-table-column>
      <el-table-column prop="num" label="数量"> </el-table-column>
      <el-table-column prop="sum" label="小计(元)"> </el-table-column>
    </el-table>
    <!-- 审批人和订单状态 -->
    <el-form :inline="true" :model="sizeForm" class="demo-form-inline desc">
      <el-form-item label="审批人">
        <el-input v-model="sizeForm.name" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="sizeForm.status"></el-input>
      </el-form-item>
    </el-form>
    <!-- 返回 -->
    <div class="back">
      <el-button type="primary" @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getDetail } from "@/api/order";
import { mapState } from "vuex";
export default {
  data() {
    return {
      formInline: {}, //头部数据
      tableData: [], //表单数据
      sizeForm: {
        name: "",
        status: "",
      }, //底部数据
    };
  },
  mounted() {
    //获取订单详情数据
    this.getDetail();
    //获取订单数据
    this.formInline = this.orderData;
    //获取订单状态
    this.sizeForm.status = this.orderData.huizongStatus;
  },
  computed: {
    //从vuex获取orderlist获取来的数据
    ...mapState("orderDetail", ["orderData"]),
  },
  methods: {
    //获取订单详情数据
    async getDetail() {
      let res = await getDetail();
      this.tableData = res.data.result.list;
      this.sizeForm.name = res.data.result.shenhename;
    },
    //返回到订单列表
    back() {
      this.$router.push("/orderManger/orderlist");
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  margin: 10px;
  background: #fff;
  padding: 20px;
  height: 100%;
  .header {
    background: #fff;
    padding: 10px;
    margin-top: 10px;
    text-align: left;

    .search {
      padding-bottom: 20px;

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
  .el-table {
    margin: 5px;
  }
  .desc {
    margin-top: 20px;
  }
  .desc .el-form-item {
    margin-top: 20px;
    margin: 0 20px;
  }
  .back {
    float: right;
    margin-top: -40px;
  }
}
</style>