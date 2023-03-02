<template>
  <div class="department">
    <div class="nav"><Breadcrumb></Breadcrumb></div>

    <div class="title">部门管理</div>
    <div class="departmentTab">
      <div class="top">
        <div class="t-l">
          关键字<el-input
            placeholder="请输入内容"
            clearable
            v-model="searchValue"
          >
          </el-input>
        </div>
        <div class="t-r">
          <el-button type="primary" round @click="goSearch">查询</el-button>
          <el-button type="success" round @click="add">新增</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%; text-align: center"
        >
          <el-table-column prop="id" label="序号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="name" label="部门名称" align="center">
          </el-table-column>
          <el-table-column
            prop="manage"
            label="部门主管"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="edit(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="del(scope.row)"
              >
                删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-drawer
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="40%"
    >
      <div class="main">
        <div class="addname">
          <span>部门名称</span><el-input v-model="name"> </el-input>
        </div>

        <div class="addManage">
          <span>主管</span><el-input v-model="manage"></el-input>
        </div>

        <el-button type="primary" plain @click="addSystem">{{
          title
        }}</el-button>
      </div>
    </el-drawer>

    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/pagination";
import {
  Apartment,
  Search,
  AddSystem,
  UpdateSystem,
  Delsystem,
} from "@/api/system";
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "产品自检",
          manage: "李小福",
        },
      ],
      drawer: false, //弹框
      direction: "btt", //弹框开启方向
      searchValue: "", //search名
      total: 0, //总共数量
      currentPage4: 1, //当前page
      name: "",
      manage: "",
      title: "添加",
      id: 0,
    };
  },
  methods: {
    //分页器
    handleCurrentChange(page) {
      this.getApartment(page);
    },
    //查询部门列表
    async goSearch() {
      let search = this.searchValue;
      let res = await Search({ search });

      this.tableData = res.data.result;
    },
    //获取部门列表
    async getApartment(page) {
      let res = await Apartment({ page });

      this.tableData = res.data.data;

      this.tableData.reverse();
      console.log(this.tableData);
      this.total = res.data.total;
    },
    //关闭弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //添加
    add() {
      this.drawer = true;
    },
    //更新
    edit(row) {
      this.drawer = true;
      this.name = row.name;
      this.manage = row.manage;
      this.id = row.id;
      this.title = "修改";
    },

    //部门增加和更新部门
    async addSystem() {
      let id = this.id;
      let name = this.name;
      let manage = this.manage;
      if (this.title === "修改") {
        let res = await UpdateSystem({ name, manage, id });
        if (res.data.status === 200) {
          this.drawer = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getApartment(1);
        }
      } else {
        let res = await AddSystem({
          name,
          manage,
        });
        if (res.data.status === 200) {
          this.drawer = false;
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.getApartment(1);
        }
      }
    },

    //删除部门
    async del(row) {
      let id = row.id;
      let res = await Delsystem({ id });

      if (res.data.status === 200) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.getApartment(1);
      }
    },
  },
  created() {
    this.getApartment(1);
  },
  //用户删除输入结果过后，重新获取列表
  watch: {
    searchValue(oldv, newv) {
      if (this.searchValue === "") {
        this.getApartment(1);
      }
    },
  },
  components: {
    pagination,
  },
};
</script>

<style lang="less" scoped>
.nav {
  padding: 20px;
}
.page {
  margin-top: 80px;
  margin-right: 40px;
  float: right;
  background-color: #eee;
}
.title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #eee;
  padding-left: 20px;
  box-sizing: border-box;
}
.departmentTab {
  box-sizing: border-box;
  padding: 5px 40px;
  width: 100%;
  height: 400px;
  margin-top: 10px;

  .top {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .t-l {
      width: 250px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .el-input {
        width: 200px;
        height: 50px;
      }
    }
  }
  .table {
    margin-top: 20px;
    text-align: center;
  }
}

.main {
  width: 500px;

  margin: 0 auto;
  position: relative;

  button {
    position: absolute;
    top: 135px;
    left: 55%;
    transform: translate(-50%);
    width: 200px;

    border-radius: 20px;
  }
  .addname {
    display: flex;
    align-items: center;
    margin: 0 auto;
    span {
      width: 100px;
      height: 50px;
      display: inline-block;
      text-align: center;
      line-height: 50px;
    }
    .el-input {
      width: 400px;
      height: 30px;
    }
  }

  .addManage {
    display: flex;
    align-items: center;
    margin: 0 auto;
    span {
      width: 100px;
      height: 50px;
      display: inline-block;
      text-align: center;
      line-height: 50px;
    }
    .el-input {
      width: 400px;
      height: 30px;
    }
  }
}
</style>