<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class="num">{{ CountObj.saleTotal }}</div>
        <div class="bottom">今日销售额 {{ CountObj.sale }}</div>
      </div>
      <div class="item">
        访问量
        <div class="num">{{ CountObj.viewsTotal }}</div>
        <div class="bottom">今日访问量 {{ CountObj.views }}</div>
      </div>
      <div class="item">
        商品收藏
        <div class="num">{{ CountObj.collectTotal }}</div>
        <div class="bottom">今日收藏量 {{ CountObj.collect }}</div>
      </div>
      <div class="item">
        支付量
        <div class="num">{{ CountObj.payTotal }}</div>
        <div class="bottom">今日支付量 {{ CountObj.pay }}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id="box13">
        <div id="charts" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area" id="box1">
        <div id="charts1" style="width: 100%; height: 300px"></div>
      </div>
    </div>

    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">今日订单</div>
              <div>{{ Oder.curOrderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ Oder.curCollect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
              <div>{{ Oder.curMoney }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">本月订单</div>
              <div>{{ Oder.orderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ Oder.collect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
              <div>{{ Oder.money }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      CountObj: {}, //头部数据
      Oder: {}, //订单数据
    };
  },
  created() {
    //调用获取头部数据总计
    this.getDateCount();
    //调用获取折线图和饼状图数据
    this.getLineDate();
    //获取订单数据
    this.getOrder();
  },
  mounted() {},
  methods: {
    //获取首页头部数据总计
    async getDateCount() {
      let res = await this.$api.getHomeCount();
      this.CountObj = res.data.data.list;
    },

    //获取折线图和饼状图数据
    async getLineDate() {
      let res = await this.$api.getHomeFromat();

      // console.log(res.data.result.data);

      let arrDate = res.data.result.data.sale_money;

      //定义多个数组
      let xDate = [],
        yDate = [],
        yBarDate = [],
        rounDate = [];

      arrDate.forEach((item) => {
        //获取折线图数据
        xDate.push(item.name);
        yDate.push(item.total_amount);
        yBarDate.push(item.num);

        //获取饼状图数据
        let obj = {};
        obj.name = item.name;
        obj.value = item.total_amount;
        rounDate.push(obj);
      });
      this.line(xDate, yDate, yBarDate);
      this.round(rounDate);
    },

    //首页折线图
    line(xDate, yDate, yBarDate) {
      var chartDom = document.getElementById("charts");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "axis", //设置鼠标经过显示详情
        },
        xAxis: {
          type: "category",
          axisTick: {
            alignWithLabel: true, //设置柱状图居中
          },
          data: xDate,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: yDate,
            type: "line",
            smooth: true,
          },
          {
            data: yBarDate,
            type: "bar",
            smooth: true,
          },
        ],
      };

      option && myChart.setOption(option);
    },

    //首页饼状图
    round(rounDate) {
      var chartDom = document.getElementById("charts1");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {},
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "销售额",
            type: "pie",
            radius: "50%",
            data: rounDate,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },

    //获取订单数据
    async getOrder() {
      let res = await this.$api.getHomeOrder();
      console.log(res.data.list);
      this.Oder = res.data.list;
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  margin: 10px;
}
.header {
  display: flex;
  padding-right: 30px;
  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;
    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }
    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }
  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }
  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }
  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }
  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

// 图表

.content {
  margin: 20px;
  display: flex;
  height: 320px;
  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }
  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

//内容

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;
  .box-card {
    flex: 1;
    margin-right: 30px;
    span {
      font-weight: 600;
    }
  }
  .item {
    text-align: center;
    font-size: 24px;
    color: #333;
    .el-col {
      border-right: 1px solid #eee;
    }
    .el-col:last-child {
      border-right: none;
    }
    .title {
      margin-bottom: 10px;
      font-size: 6px;
    }
  }
}
</style>