<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="类目名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      form: {
        name: "",
      },
      id: 0,
      cid: 0,
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  methods: {
    //关闭弹窗
    showFrom() {
      this.dialogFormVisible = true;
    },
    //提交
    async submit() {
      let name = this.form.name;
      if (this.title === "添加类目") {
        let res = await this.$api.insertCategory({ name });
      } else if (this.title === "修改类目") {
        let id = this.id;
        this.$api.updateCategory({ name, id });
      } else if (this.title === "子类目添加") {
        let cid = this.cid;
        this.$api.insertItemCategory({ name, cid });
      }
      this.dialogFormVisible = false;
      this.$emit("update");
    },
    //获取父亲组件传来的数据
    updateItem(item) {
      // console.log(item);
      this.form.name = item.name;
      this.id = item.id;
    },
    //添加子类目，获取父组件传来的cid
    additem(cid) {
      this.cid = cid;
    },
  },
};
</script>

<style>
</style>