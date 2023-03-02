<template>
  <div>
    <!-- 内容展示区顶部 -->
    <div class="header">
      <div @click="changeMenu">折叠</div>
      <div class="header-right">
        <span>{{ nowTime }}</span>
        <span class="line">|</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            语言<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="myzh">中文</el-dropdown-item>
            <el-dropdown-item command="myen">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="line">|</span>
        <span>欢迎 {{ userinfo.user }}</span>
        <span class="line">|</span>
        <span class="exit" @click="exitLogin">
          <i class="iconfont icon-tuichu"></i>
        </span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
const dayjs = require("dayjs");
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      nowTime: "",
    };
  },
  //获取vuex里面的用户信息
  computed: {
    ...mapState("login", ["userinfo"]),
  },
  methods: {
    ...mapMutations("login", ["deleteUser"]),
    ...mapMutations("menu", ["deleteMenu"]),
    //退出登录
    exitLogin() {
      //调用退出登录接口
      this.deleteUser();
      //将储存在vuex里面的数据删除
      this.deleteMenu();
      //跳转到登录页面
      this.$router.push("/login");
    },

    changeMenu() {
      this.$emit("changeMenu");
    },
    //获取时间
    getDate() {
      //获取当前的时间-----------------
      // let time = new Date()  //1.自己封装获取日期格式 2.moment.js  3. dayjs

      setInterval(() => {
        this.nowTime = dayjs(new Date()).format("YYYY年MM月DD日 HH:mm:ss");
      }, 1000);
    },
  },
  created() {
    //调用获取时间
    this.getDate();
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #fff;
  background: #1e78bf;

  display: flex;
  justify-content: space-between;

  .icon {
    i {
      font-size: 24px;
    }
  }

  .header-right {
    font-size: 12px;
    flex: 1;
    text-align: right;

    padding-right: 20px;

    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }

    .line {
      font-size: 12px;
      color: #f5f5f5f5;
      padding: 10px;
    }

    .exit {
      // display: inline-block;
      float: right;
      position: relative;
      height: 50px;
      width: 30px;

      i {
        font-size: 18px;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>