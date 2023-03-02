<template>
  <div>
    <template v-for="(item, index) in menuList">
      <el-submenu
        :index="item.name"
        :key="index"
        v-if="item.children && item.children.length > 0"
      >
        <template slot="title">
          <i class="el-icon-s-cooperation"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <!-- 渲染二级导航 需要循环遍历  注意：递归组件   -->
          <Menultem :menuList="item.children"></Menultem>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item
        :index="item.name"
        :key="index + 100"
        v-else
        @click="tiao(item.name)"
        v-show="!item.meta.isShow"
      >
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "Menultem",
  data() {
    return {};
  },
  props: ["menuList"],
  methods: {
    tiao(name) {
      console.log(this.$router);
      this.$router.push({
        name,
      });
    },
  },
  mounted() {
    console.log("menulistmenulistmenulist-----", this.menuList);
  },
};
</script>

<style>
</style>