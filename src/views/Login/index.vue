<template>
  <div class="clearfix" id="login_wrap">
    <div id="login">
      <h2 class="title">登录页</h2>
      <div class="login--account">
        <span>账号：</span>
        <input
          type="text"
          placeholder="输入用户名"
          name="account"
          v-model.trim="username"
        />
      </div>
      <div class="login--password">
        <span>密码：</span>
        <input
          type="password"
          placeholder="输入密码"
          name="password"
          v-model.trim="password"
        />
      </div>
      <p class="login--btn">
        <el-button id="loginBtn" type="primary" @click="goLogin"
          >登录</el-button
        >
      </p>
      <!-- <p>账号和密码随意输入---账号: admin是超级管理员</p> -->
      <p @click="resgiter" id="resgiter">注册账号</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { dengLu } from "@/api/system";
import dayjs from "dayjs";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations("login", ["setUser"]),
    //点击登录
    goLogin() {
      console.log(this.username, this.password);

      this.denglu(this.username, this.password);

      // this.login(this.username, this.password);
    },
    //登录方法
    // async login(user, pwd) {
    //   let res = await this.$api.login({ user, pwd });

    //   if (res.data.status === 200) {
    //     let obj = {
    //       user,
    //       token: res.data.token,
    //     };
    //     this.setUser(obj);
    //     this.$router.push("/");
    //   } else {
    //     console.log(111);
    //     this.$message({
    //       message: "你还为注册",
    //       type: "warning",
    //     });
    //   }
    // },

    //登录接口
    async denglu(username, password) {
      let timer = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      let res = await dengLu({ username, password, timer });
      console.log(res);
      //判断是否登录成功，如果成功了，那么把数据存入vuex
      if (res.data.status === 200) {
        let obj = {
          user: username,
          token: res.data.result[0].role,
        };
        this.setUser(obj);
        this.$router.push("/");
        //如果数据库里面没有用户，那么提醒用户去注册
      } else if (res.data.msg === "不存在用户") {
        this.$message({
          message: "亲，你还未注册",
          type: "warning",
        });
      }
    },
    //点击跳转到注册页面
    resgiter() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped lang="less">
#resgiter {
  padding: 20px;
  color: blue;
}
.title {
  text-align: center;
  font-size: 22px;
}
#login_wrap {
  position: relative;
  background: rgba(64, 64, 194, 0.1);
  height: 100%;
  > div {
    background: #fff;
    width: 479px;
    height: 325px;
    padding: 30px 40px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    > div {
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      &.login--account {
        margin: 25px 0 30px;
      }
      span {
        color: #666;
        display: inline-block;
        width: 84px;
        font-size: 20px;
      }
      input {
        background: none;
        font-size: 16px;
        border: none;
        height: 30px;
        width: 280px;
        padding-left: 12px;
        box-sizing: border-box;
        color: #666;
        &.error {
          border: 1px solid #f00;
        }
        &::-webkit-input-placeholder {
          color: #aaa;
        }
      }
    }

    p {
      text-align: right;
      &.login--btn {
        button {
          width: 100%;
          height: 50px;
          font-size: 18px;
          // border: none;
          margin-top: 30px;
          // color: #fff;
          // border-radius: 6px;
          // cursor: pointer;
        }
      }
      a {
        color: #fff;
        display: inline-block;
        padding: 0 15px;
        font-size: 14px;
      }
    }
  }
}
</style>
