<template>
  <div class="clearfix" id="login_wrap">
    <div id="login">
      <h2 class="title">注册页</h2>
      <div class="login--account">
        <span>账号：</span>
        <input
          type="text"
          placeholder="输入注册名"
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
        <el-button id="loginBtn" type="primary" @click="RegisterUser"
          >注册</el-button
        >
      </p>
    </div>
  </div>
</template>

<script>
import { Register } from "@/api/order";
export default {
  data() {
    return {
      username: "", //用户名
      password: "", //用户密码
    };
  },
  methods: {
    //点击注册
    RegisterUser() {
      this.Register(this.username, this.password);
    },
    //注册接口
    async Register(username, password) {
      let res = await Register({ username, password });
      //如果已经存在该用户，那么提示用户，如果没有。就注册
      if (res.data.status === 400) {
        this.$message({
          message: "该用户已经存在",
          type: "warning",
        });
      } else {
        //跳转到登录页面
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="less">
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