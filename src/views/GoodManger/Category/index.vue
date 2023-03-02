<template>
  <div class="category">
    <Breadcrumb></Breadcrumb>
    <div class="wrapper">
      <div class="title">产品类目管理</div>
      <div class="tree">
        <el-button type="warning" style="margin-bottom: 20px" @click="show"
          >新增一级导航类目</el-button
        >

        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expand-all="false"
          :expand-on-click-node="false"
          :render-content="renderContent"
        >
        </el-tree>
      </div>
    </div>
    <propTable ref="show" @update="update" :title="title"></propTable>
  </div>
</template>

<script>
import propTable from "./propTable.vue";
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          name: "一级 1",
          children: [
            {
              id: 4,
              name: "二级 1-1",
            },
          ],
        },
      ],
      title: "",
    };
  },
  created() {
    this.itemCategory();
  },
  methods: {
    //添加完重新获取数据
    update() {
      this.itemCategory();
    },
    //显示弹框组件
    show(item) {
      //判断是一级类目添加还是二级类目添加
      if (item.cid === undefined) {
        this.$refs.show.showFrom();
        this.title = "添加类目";
      } else {
        this.$refs.show.showFrom();
        this.title = "子类目添加";
        this.$refs.show.additem(item.cid);
      }
    },
    //获取分类列表
    async itemCategory() {
      let res = await this.$api.itemCategory();
      let resultArr = res.data.result;
      // console.log(res.data.result);
      let arrFather = [];
      let arrSon = [];
      resultArr.forEach((item) => {
        if (item.type === 1) {
          item.children = [];
          arrFather.push(item);
        } else {
          arrSon.push(item);
        }
      });
      arrFather.forEach((item) => {
        arrSon.forEach((sitem) => {
          if (item.cid === sitem.type) {
            item.children.push(sitem);
          }
        });
      });
      // console.log(arrFather);
      this.data = arrFather;
    },

    //修改类目名称，调用子组件里面的方法
    updated(data) {
      this.title = "修改类目";
      this.$refs.show.showFrom();
      this.$refs.show.updateItem(data);
    },
    //删除类目
    remove(node, data) {
      console.log(data);
      this.$confirm("此操作将永久删除该, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let id = data.id;
          this.$api.deleteContentCategoryById({ id });
          this.update();
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

    renderContent(h, { node, data, store }) {
      if (data.type === 1) {
        return (
          <span class="custom-tree-node">
            <span>{data.name}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.updated(data)}
              >
                修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.show(data)}
              >
                新增
              </el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span>{data.name}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.updated(data)}
              >
                修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                删除
              </el-button>
            </span>
          </span>
        );
      }
    },
  },
  components: {
    propTable,
  },
};
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.category {
  margin: 10px;
}

.wrapper {
  padding: 10px;
  margin-top: 10px;
  background: #fff;

  .title {
    background: #f6f6f6;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    padding-left: 10px;
  }

  .tree {
    margin: 10px;

    /deep/ .mini {
      padding: 4px 10px;
      font-size: 14px;
    }
    /deep/.el-button--text {
      padding-left: 10px;
    }
    /deep/ .el-tree-node__content {
      margin-bottom: 10px;
    }
  }

  /deep/ .name {
    width: 300px;
    display: inline-block;
  }
}
</style>
