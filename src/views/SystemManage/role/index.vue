<template>
  <div class="role">
    <div class="nav">
      <Breadcrumb></Breadcrumb>
    </div>

    <div class="top">一共存在{{ sum }}个用户</div>

    <div class="table">
      <div class="list">
        <el-table
          :data="tableData"
          style="width: 100%; text-align: center"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="id" label="序号" width="200">
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="200">
          </el-table-column>
          <el-table-column prop="role" label="身份" width="200">
          </el-table-column>
          <el-table-column prop="timer" label="上次登录时间" width="200">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template scope="scope">
              <div v-if="scope.row.username != 'admin'">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleDaillog(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteuser(scope.row)"
                >
                  删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="修改用户权限" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="请选择活动区域">
            <el-option label="admin" value="admin"></el-option>
            <el-option label="vip" value="vip"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { UserList, DeleteUser, updateRole } from "@/api/system";

export default {
  data() {
    return {
      sum: 0, //用户总数
      dialogFormVisible: false, //编辑弹框
      tableData: [
        {
          id: 1,
          username: "smash",
          role: "Admin",
          timer: "2022-12-29",
        },
      ],
      form: {
        username: "",
        role: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getuser();
  },
  methods: {
    async submitUpdate() {
      console.log(this.form);
      let role = this.form.role;
      let username = this.form.username;
      let res = await updateRole({ username, role });
      if (res.data.status === 200) {
        this.dialogFormVisible = false;
        this.getuser();
        this.$message({
          type: "success",
          message: "修改成功!",
        });
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    //点击编辑，并把用户数据传入
    handleDaillog(data) {
      this.dialogFormVisible = true;

      this.form.username = data.username;
      this.form.role = data.role;
    },
    //获取用户列表
    async getuser() {
      let res = await UserList();
      this.tableData = res.data.result;
      this.sum = res.data.total;
    },
    //删除用户
    deleteuser(data) {
      console.log(data);
      let id = data.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delete(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除用户方法
    async delete(id) {
      let res = await DeleteUser({ id });
      console.log(res);
      this.getuser();
    },
  },
};
</script>

<style lang="less">
.role {
  padding: 10px;
  .nav {
    margin: 10px 0;
  }
  .top {
    text-align: center;
    font-weight: bolder;
    color: red;
    margin: 20px 0;
  }
  .table {
    text-align: center;
    display: flex;
  }
  .list {
    width: 1000px !important;

    margin: auto;

    .cell {
      text-align: center;
    }
  }
}
</style>