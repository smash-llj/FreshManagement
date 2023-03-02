<template>
  <div class="layout">
    <!-- 左边导航栏 -->
    <div class="menu">
      <!-- 把Content修改的值给Aside -->
      <Aside :showMenu="showMenu"></Aside>
    </div>
    <!-- 内容展示区 -->
    <div class="content" :class="{ active: showMenu }">
      <Content @changeMenu="changeMenu"></Content>
    </div>
  </div>
</template>

<script>
import Aside from "@/views/Layout/Aside";
import Content from "@/views/Layout/Content";
export default {
  data() {
    return {
      showMenu: false, //折叠栏的开启和关闭
    };
  },
  methods: {
    //子组件触发父组件方法，修改值，并给拎一个组件
    changeMenu() {
      this.showMenu = !this.showMenu;
    },
  },
  components: {
    Aside,
    Content,
  },
};
</script>

<style lang="less" scoped>
.menu {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  // width: 200px;
  background: #112f50;
  /deep/ .el-menu {
    border-right: none;
  }
}
.content {
  padding-left: 200px;
  transition: all 0.3s linear;
}
.active {
  padding-left: 64px;
}
</style>