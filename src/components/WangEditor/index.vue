<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 300px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import Vue from "vue";
export default Vue.extend({
  components: { Editor, Toolbar },
  props: ["editorData"],
  //监测组件传来的editorData数据
  watch: {
    editorData(newDate) {
      //这是使用nextTick因为watch执行的时候无法访问到data里面的参数
      this.$nextTick(() => {
        this.html = newDate;
      });
    },
  },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {
        excludeKeys: ["fullScreen"],
      },
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    //当每一次输入都把输入的内容传递给父组件
    onChange() {
      let date = this.editor.getHtml();
      this.$emit("getDate", date);
    },
    //将数据清空
    clear() {
      this.html = "";
    },
  },
  mounted() {},
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>