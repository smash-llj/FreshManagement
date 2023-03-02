<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="item in NavList"
      :key="item.path"
      :to="{ path: item.path }"
      >{{ item.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    NavList() {
      let matched = this.$route.matched;
      matched[0].path = "/";
      return matched;
    },
  },
};
</script>

<style>
</style>