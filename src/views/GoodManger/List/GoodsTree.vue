<template>
  <el-tree :props="props" :load="loadNode" lazy @node-click="subTree"></el-tree>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    async loadNode(node, resolve) {
      //请求第一层数据
      if (node.level === 0) {
        let res = await this.getTreeDate(1);
        return resolve(res);
      }
      //点击下一层的时候请求数据
      if (node.level === 1) {
        let res = await this.getTreeDate(node.data.cid);
        return resolve(res);
      }
      if (node.level === 2) {
        return resolve([]);
      }
    },
    //请求树状结构数据
    async getTreeDate(type) {
      let res = await this.$api.goodsItemCategory({ type });
      if (res.status === 200) {
        return res.data.result;
      } else {
        return [];
      }
    },

    subTree(data) {
      this.$emit("TreeTiTle", data);
    },
  },
};
</script>

<style>
</style>