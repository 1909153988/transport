<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <!-- <h3 class="title">钜盛后台管理系统</h3> -->

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="密码登录" name="first"></el-tab-pane>
        <el-tab-pane label="验证码登录" name="second"></el-tab-pane>
      </el-tabs>

      <el-form-item prop="username" v-if="activeName == 'first'">
        <el-input
          style="min-width: 340px"
          v-model="loginForm.username"
          type="text"
          clearable
          auto-complete="off"
          placeholder="请输入用户名或手机号"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password" v-if="activeName == 'first'">
        <el-input
          style="min-width: 340px"
          v-model.trim="loginForm.password"
          :type="passw"
          clearable
          @blur="onBlur"
          auto-complete="off"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
          <!-- input中加图标必须要有slot="suffix"属性，不然无法显示图标 -->
          <i slot="suffix" :class="icon" @click="showPass"></i>
        </el-input>
      </el-form-item>

      <!-- 验证码登录 loginForm-->
      <el-form-item prop="username" v-if="activeName == 'second'">
        <el-input
          style="min-width: 340px; margin-right: 10px"
          type="text"
          v-model="loginForm.phone"
          clearable
          auto-complete="off"
          placeholder="请输入手机号"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password" v-if="activeName == 'second'">
        <el-input
        v-if="disabled == false"
          style="min-width: 220px; margin-right: 10px"
          type="text"
          clearable
          @blur="onBlur"
          auto-complete="off"
          placeholder="请输入验证码"
          v-model="loginForm.sendcode"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
         <el-input
          v-if="disabled == true"
          style="min-width: 190px; margin-right: 10px"
          type="text"
          clearable
          @blur="onBlur"
          auto-complete="off"
          placeholder="请输入验证码"
          v-model="loginForm.sendcode"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
        <el-button
          type="button"
          @click="sendcode"
          :disabled="disabled"
          v-if="disabled == false"
          >获取验证码
        </el-button>
        <el-button
          type="button"
          @click="sendcode"
          :disabled="disabled"
          v-if="disabled == true"
          >{{ btntxt }}
        </el-button>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <el-link
                :underline="false"
                style="text-align: left; padding-left: 4px; color: #1890ff"
                @click="goTo('/editAccounts')"
                >忘记密码?</el-link
              >
            </div></el-col
          >
          <el-col :span="6"
            ><div
              class="grid-content bg-purple-light"
              style="text-align: right; padding-right: 4px; color: #1890ff"
            >
              <el-link
                :underline="false"
                style="text-align: right; color: #1890ff"
                @click="goTo('/reg')"
                >立即注册</el-link
              >
            </div></el-col
          >
        </el-row>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";

export default {
  name: "Login",
  data() {
    return {
      icon: "el-input__icon el-icon-view",
      passw: "password",
      activeName: "first",
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "yff123456",
        password: "11111111",
        rememberMe: false,
        code: "",
        uuid: "",
        phone: "",
        sendcode: "1234",
      },
      disabled: false,
      time: 0,
      btntxt: "重新发送",
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "用户名或手机号不能为空",
          },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
        code: [
          { required: true, trigger: "change", message: "验证码不能为空" },
        ],
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    console.log(this.loginForm.sendcode)
    this.getCode();
    this.getCookie();
  },
  methods: {
    //手机验证发送验证码
    sendcode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.loginForm.phone == "") {
        this.$message({
          message: "手机号不能为空",
          center: true,
        });
        return;
      }
      if (!reg.test(this.loginForm.phone)) {
        this.$message({
          message: "请输入正确的手机号",
           type: "error",
          center: true,
        });
        return;
      } else {
        console.log(this.loginForm.phone);
        this.$message({
          message: "发送成功",
          type: "success",
          center: true,
        });
        this.time = 60;
        this.disabled = true;
        this.timer();
      }
    },
    //60S倒计时
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    //密码的隐藏和显示
    showPass() {
      //点击图标是密码隐藏或显示
      if (this.passw == "text") {
        this.passw = "password";
        //更换图标
        this.icon = "el-input__icon el-icon-view";
      } else {
        this.passw = "text";
        this.icon = "el-input__icon el-icon-loading";
        setTimeout(() => {
          this.icon = "";
        }, 500);
      }
    },
    //密码失焦事件
    onBlur() {
      this.passw = "password";
      this.icon = "el-input__icon el-icon-view";
    },
    //切换登录密码,验证码登录
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getCode() {
      getCodeImg().then((res) => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    goTo(path) {
      //直接跳转
      this.$router.push(path);
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" }).catch(() => {});
            })
            .catch(() => {
              this.loading = false;
              this.getCode();
            });
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.el-tabs__nav-scroll {
  height: 70px !important;
  display: flex;
  /* align-items: center; */
  /* width: 40%; */
  text-align: center;
  /* float: left; */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  color: 16px;
}
.el-tabs__nav-wrap::after {
  background-color: #cccc !important;
}
.el-tabs__item {
  padding: 0 50px;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/loginbg.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #cccc;
  width: 400px;
  padding: 0px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
