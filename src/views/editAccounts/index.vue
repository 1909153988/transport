<template>
  <div class="editAccounts">
    <el-form
      label-position="left"
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="editAccountsform"
    >
      <h3 class="title">找回密码</h3>

      <el-form-item prop="phoneNumber" label="手机号码">
        <el-input
          type="text"
          v-model.trim="ruleForm.phoneNumber"
          clearable
          auto-complete="off"
          placeholder="请输入手机号"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <el-input
        v-if="disabled ==false"
          style="margin-right: 10px; min-width: 160px"
          clearable
          auto-complete="off"
          placeholder="请输入验证码"
          v-model.trim="ruleForm.code"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
         <el-input
          v-if="disabled ==true"
          style="margin-right: 20px;min-width: 110px;"
          clearable
          auto-complete="off"
          placeholder="请输入验证码"
          v-model.trim="ruleForm.code"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
        <el-button
          style="height: 36px"
          type="button"
          size="mini"
          @click="getSendcode"
          :disabled="disabled"
          v-if="disabled == false"
          >获取验证码
        </el-button>
        <el-button
          type="button"
          @click="getSendcode"
          :disabled="disabled"
          v-if="disabled == true"
          >{{ btntxt }}
        </el-button>
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input
          type="text"
          v-model.trim="ruleForm.password"
          clearable
          auto-complete="off"
          placeholder="密码"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="conPassword" label="确认密码">
        <el-input
          type="text"
          v-model.trim="ruleForm.conPassword"
          clearable
          auto-complete="off"
          placeholder="请输入确认密码"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="goTo()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { resetUserInfo } from "@/api/editAccount";
import { getPhoneCode } from "@/api/reg";
import {isvalidateCode, isvalidPass, isvalidPhone, isvalidUsername,} from "../reg/js/index.js";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!isvalidPass(value)) {
        callback(new Error("密码必须由数字和字母组成,长度在8~16字符"));
      } else {
        if (this.ruleForm.repassword !== "") {
          this.$refs.ruleForm.validateField("repassword");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };

    var validPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!isvalidPhone(value)) {
        callback(new Error("请填写正确的手机号码"));
      } else {
        callback();
      }
    };

    var validUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!isvalidUsername(value)) {
        callback(new Error("登录名必须要由数字和字母组成,长度为8-20个字符"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (!isvalidateCode(value)) {
        callback(new Error("验证码的长度为6位数"));
      } else {
        callback();
      }
    };
    return {
      disabled: false,
      time: 0,
      btntxt: "重新发送",
      activeName: "second",
      ruleForm: {
        userName: "zz1111111",
        phoneNumber: "",
        password: "",
        conPassword: "",
        code: "1234",
        type: "",
      },
      rules: {
        phoneNumber: [
          { required: true, trigger: "blur", message: "手机号码不能为空" },
          { required: true, validator: validPhone, trigger: "blur" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        conPassword: [
          { required: true, trigger: "blur", message: "确认密码不能为空" },
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        code: [
          { required: true, trigger: "blur", message: "验证码不能为空" },
          // { required: true, validator: validateCode, trigger: "blur" }
        ],
      },
    };
  },
  methods: {
    goTo() {
      //直接跳转
      this.$router.push("/login");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          resetUserInfo(this.ruleForm).then((res) => {
            // console.log(11,res);
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
                center: true,
              });
              this.$router.push("/login");
            } else {
              this.$message({
                message: res.msg,
                type: "error",
                center: true,
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取验证码的接口
    getSendcode() {
      getPhoneCode(this.ruleForm.phoneNumber, "reset").then((res) => {
        // console.log(11,res);
        this.time = 60;
        this.disabled = true;
        this.timer();
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success",
            center: true,
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            center: true,
          });
        }
      });
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
  },
};
</script>
<style lang="scss" scoped>
.editAccounts {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../../assets/images/loginbg.jpg");
  background-size: cover;
}
.editAccountsform {
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
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
  padding-top: 20px;
}
</style>
