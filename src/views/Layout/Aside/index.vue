<template>
  <el-menu
    :default-active="addMenu()"
    class="el-menu-vertical-demo"
    background-color="#112f50"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="showMenu"
  >
    <el-menu-item>
      <span slot="title">首客生鲜采购系统</span>
    </el-menu-item>
    <Menultem :menuList="menuList"></Menultem>
  </el-menu>
</template>

<script>
import Menultem from "./Menultem.vue";
import { mapState } from "vuex";
export default {
  props: ["showMenu"],
  data() {
    return {};
  },
  computed: {
    ...mapState("menu", ["menuList"]),
  },
  mounted() {
    console.log(this.menuList);
  },
  methods: {
    //判断路由，如果跳转到添加页面的时候页归为/goods/list，其他的按原来自己的路径
    addMenu() {
      let route = this.$route;
      let { name, meta } = route;
      if (meta.activeMenu) {
        console.log("这是路由信息", meta.activeMenu);
        return meta.activeMenu;
      } else {
        return name;
      }
    },
  },
  components: {
    Menultem,
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu .is-active {
  background: #1e78bf !important;
  color: #fff !important;
}
</style>