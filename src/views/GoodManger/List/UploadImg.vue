<template>
  <div>
    <el-upload
      :action="url"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      ref="upload"
      :limit="3"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :file-list="fileList"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import { upload, host } from "@/api/base";
export default {
  props: {
    fileList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      url: upload,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed() {
      this.$message.warning("只能上传三张图片哦，亲——");
    },
    //上传成功后把图片传递给addGoods组件
    handleSuccess(response, file, fileList) {
      let url = response.url.slice(7);
      let imgUrl = host + "/" + url;
      this.$emit("ImgUrl", imgUrl);
      this.$message({
        showClose: true,
        message: "上传成功",
        type: "success",
      });
    },
  },
};
</script>

<style>
</style>