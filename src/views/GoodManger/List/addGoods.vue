<template>
  <div class="addGoods">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="menu">
          <div class="title">产品类型列表</div>
          <div class="tree">
            <GoodsTree @TreeTiTle="TreeTiTle"></GoodsTree>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <div class="subTitle">{{ title }}商品</div>
          <div class="wrapper">
            <!-- 
                            el-form
                                :model="ruleForm" 表单数据 object
                                :rules="rules"    校验规则
                                ref="ruleForm"    获取组件from组件 dom 
                                label-width="100px" 标题占据宽度
                                size="small"     用于控制该表单内组件的尺寸	string	medium / small / mini
                            el-form-item
                                label="活动名称"   标题
                                prop="name"         字段标识--调用element-ui内置方法操作 必须写prop
                         -->
            <el-form
              :model="goodsForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              size="small"
              class="demo-ruleForm"
            >
              <el-form-item label="所属分类" prop="category">
                <span class="category">{{ goodsForm.category }}</span>
              </el-form-item>
              <el-form-item label="商品名称" prop="title">
                <el-input v-model="goodsForm.title"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="price">
                <el-input v-model="goodsForm.price"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="num">
                <el-input v-model="goodsForm.num"></el-input>
              </el-form-item>
              <el-form-item label="商品卖点" prop="sellPoint">
                <el-input v-model="goodsForm.sellPoint"></el-input>
              </el-form-item>
              <el-form-item label="上传图片" prop="image">
                <UploadImg @ImgUrl="ImgUrl" :fileList="fileList"></UploadImg>
              </el-form-item>
              <el-form-item label="商品描述" prop="descs">
                <WangEditor
                  @getDate="getDate"
                  :editorData="editor"
                  ref="WangEditor"
                ></WangEditor>
              </el-form-item>
              <el-form-item label="首页轮播推荐" prop="isBanner">
                <el-switch
                  v-model="goodsForm.isBanner"
                  active-color="#13ce66"
                ></el-switch>
              </el-form-item>
              <el-form-item label="是否推荐商品" prop="recommend">
                <el-switch
                  v-model="goodsForm.recommend"
                  active-color="#13ce66"
                ></el-switch>
              </el-form-item>
              <el-form-item label="是否上架商品" prop="shelves">
                <el-switch
                  v-model="goodsForm.shelves"
                  active-color="#13ce66"
                ></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >保存</el-button
                >
                <el-button @click="handleReset('ruleForm')">重置</el-button>
                <el-button type="info" @click="hanldeBack">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GoodsTree from "./GoodsTree.vue";
import UploadImg from "./UploadImg.vue";
import WangEditor from "@/components/WangEditor";
import { mapState } from "vuex";
export default {
  components: {
    GoodsTree,
    UploadImg,
    WangEditor,
  },
  data() {
    return {
      editor: "", //编译器的数据
      fileList: [], //图片容器[{url:''}]
      goodsForm: {
        cid: "",
        category: "请选择你的分类", //分类
        title: "", //名称
        price: "",
        num: "",
        sellPoint: "",
        image: [],
        descs: "",
        isBanner: true, //轮推荐
        recommend: true, //推荐
        shelves: true, //商品上架
      },
      rules: {
        category: [{ required: true, message: "请输入商品类目" }],
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("goods", ["title", "goodsData"]),
  },
  mounted() {
    //判断为编辑的时候获取数据
    if (this.title === "编辑") {
      this.goodsForm = { ...this.goodsData };

      let imageArr = JSON.parse(this.goodsData.image);

      this.editor = this.goodsForm.descs;
      this.goodsForm.image = imageArr;
      let arr = [];

      imageArr.forEach((item) => {
        arr.push({ url: item });
      });
      this.fileList = arr;
    }
  },
  methods: {
    //获取商品类别数据
    TreeTiTle(e) {
      this.goodsForm.category = e.name;
      this.goodsForm.cid = e.cid;
    },

    //获取WangEditor传来用户输入的描述
    getDate(e) {
      this.goodsForm.descs = e;
    },

    //获取上传图片组件传来的图片地址
    ImgUrl(e) {
      this.goodsForm.image.push(e);
    },

    //添加商品接口
    async addGoods(params) {
      let res = await this.$api.addGoods(params);
      if (res.data.status === 200) {
        //添加成功--
        //跳转到产品列表界面---
        this.$router.push("/goods/list");
        //信息提示
        this.$message({
          message: "恭喜你，添加商品成功",
          type: "success",
        });
      } else {
        //错误信息提示
        this.$message.error("错了哦，添加商品失败");
      }
    },

    //修改商品数据接口
    async changeGoods(params) {
      let res = await this.$api.changeGoods(params);
      if (res.data.status === 200) {
        //添加成功--
        //跳转到产品列表界面---
        this.$router.push("/goods/list");
        //信息提示
        this.$message({
          message: "恭喜你，修改成功",
          type: "success",
        });
      } else {
        //错误信息提示
        this.$message.error("错了哦，修改失败");
      }
    },

    //返回商品列表
    hanldeBack() {
      this.$router.push("/goods/list");
    },
    //重置按钮
    handleReset(formName) {
      if (this.title === "添加") {
        //调用element-ui里面的方法
        this.$refs[formName].resetFields();
        //调用组件里面的清除
        this.$refs.WangEditor.clear();
        //清空上传的图片
        this.fileList = [];
      } else {
        this.goodsForm = { ...this.goodsData };
        let imageArr = JSON.parse(this.goodsData.image);

        // this.editor = this.goodsForm.descs;
        this.$refs.WangEditor.editor.setHtml(this.goodsForm.descs);
        this.goodsForm.image = imageArr;
        let arr = [];

        imageArr.forEach((item) => {
          arr.push({ url: item });
        });
        this.fileList = arr;
      }
    },

    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log("获取表单的输入信息：----", this.goodsForm);
          let {
            id,
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            descs,
            image,
          } = this.goodsForm;
          if (this.title === "添加") {
            this.addGoods({
              title,
              cid,
              category,
              sellPoint,
              price,
              num,
              descs,
              image: JSON.stringify(image),
              paramsInfo: "",
            });
          } else {
            //修改商品数据
            this.changeGoods({
              id,
              title,
              cid,
              category,
              sellPoint,
              price,
              num,
              descs,
              image: JSON.stringify(image),
              paramsInfo: "",
            });
          }
        } else {
          this.$message.error("网络忽然走了个神，请稍后");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.addGoods {
  margin: 10px;
  // background: #fff;
  padding: 10px;
}

.menu {
  border: 1px solid #eee;
  height: 600px;
  background: #fff;

  .title {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background: skyblue;
    padding-left: 10px;
    font-size: 14px;
  }

  .tree {
    padding: 20px;
  }
}

.content {
  min-height: 800px;
  background: #fff;
  font-size: 14px;

  .subTitle {
    background: #eee;
    color: #000;
    padding: 10px;
    font-weight: bold;
  }

  .wrapper {
    padding: 20px;
  }

  .category {
    color: skyblue;
    font-size: 16px;
  }
}
</style>