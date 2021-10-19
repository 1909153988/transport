<template>
  <div class="reg">
    <el-form
      label-position="left"
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="editAccountsform"
    >
      <h3 class="title">货主注册</h3>
      <el-form-item prop="userName" label="登录名">
        <el-input
          type="text"
          v-model.trim="ruleForm.userName"
          clearable
          auto-complete="off"
          placeholder="请输入登录名"
        >
        </el-input>
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

      <el-form-item prop="phoneNumber" label="手机号码">
        <el-input
          type="text"
          v-model.trim="ruleForm.phoneNumber"
          clearable
          auto-complete="off"
          placeholder="请输入手机号"
          oninput="if(value.length>11)value=value.slice(0,11)"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <el-input
          v-if="disabled == false"
          style="margin-right: 20px;min-width: 250px;"
          clearable
          auto-complete="off"
          placeholder="请输入验证码"
          v-model.trim="ruleForm.code"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
        <el-input
          v-if="disabled == true"
          style="margin-right: 20px;min-width: 200px;"
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
      <el-form-item prop="type" label="选择角色">
        <el-select v-model="ruleForm.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="xieyidiv">
          <el-checkbox
            style="margin-right: 10px"
            v-model="checked"
          ></el-checkbox
          >
          我同意并遵守
          <div class="xieyi" style="margin-left: 5px">
            <div @click="fuwudialogVisible = true">《xxxxxxx物流服务协议》</div>
            <div @click="jiaoyidialogVisible = true">
              《xxxxxxx物流交易规则》
            </div>
          </div>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
        >同意条款并注册
        </el-button
        >
        <el-button @click="goTo()">返回</el-button>
      </el-form-item>
    </el-form>

    <!-- 物流服务协议对话框 -->
    <el-dialog
      custom-class="role-mask"
      style="margin-top: 100px"
      title="法律声明及隐私政策"
      :visible.sync="fuwudialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="fu-modal-content">
        <div style="max-height: 500px; overflow-y: scroll">
          <h1 class="dialogh1">法律声明及隐私政策</h1>

          <h3>第1条钜盛科技用户注册协议的接受</h3>
          <p>
            （g）不得利用钜盛科技网络服务以任何形式侵害任何人之专利、商标、商业秘密、著作权或其他专属权利的行为；
            （h）应遵循的其他义务。
            4.2您应不时关注并遵守本平台不时公布或修改的各类合法规则规定。
            4.3本平台保有删除站内各类不符合法律政策或不真实的信息内容而无须通知用户的权利。
            4.4若您未遵守以上规定的，本平台有权作出独立判断并采取暂停或关闭用户帐号等措施。用户须对自己在网上的言论和行为承担法律责任。
          </p>

          <h3>第2条钜盛科技用户注册协议的接受</h3>

          <p>
            5.1您同意并已充分了解本协议的条款，承诺不将已发表于本平台的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。
            5.2上海钜盛信息科技有限公司是本平台的制作者，拥有此网站内容及资源的著作权等合法权利，受国家法律保护，有权不时地对本协议及本平台的内容进行修改，并在本平台张贴，无须另行通知用户。在法律允许的最大限度范围内，上海钜盛信息科技有限公司对本协议及本平台内容拥有解释权。
            5.3除法律另有强制性规定外，未经上海钜盛信息科技有限公司明确的特别书面许可，任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用本平台的信息内容，否则，上海钜盛信息科技有限公司有权追究其法律责任。
            5.4钜盛科技所刊登的资料信息（诸如文字、标识、图表、图像、视频、按钮图标、声音文件片段、数字下载、数据编辑和软件等），均是钜盛科技或其内容提供者的财产，受中国和国际版权法的保护。本平台上所有内容的汇编是钜盛科技的排他财产，受中国和国际版权法的保护。本平台上所有软件都是上海钜盛信息科技有限公司或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。
          </p>

          <h3>第6条用户隐私制度</h3>

          <p>
            6.1
            保护用户隐私是钜盛科技的一项基本政策，当您注册本平台时，您须提供个人信息。钜盛科技保证不对外公开或提供您注册资料及您在使用网络服务时存储在钜盛科技的非公开内容，但下列情况除外：
            （a）事先获得您的明确授权；
            （b）根据有关的法律法规要求；（g）不得利用钜盛科技网络服务以任何形式侵害任何人之专利、商标、商业秘密、著作权或其他专属权利的行为；
            （h）应遵循的其他义务。
            4.2您应不时关注并遵守本平台不时公布或修改的各类合法规则规定。
            4.3本平台保有删除站内各类不符合法律政策或不真实的信息内容而无须通知用户的权利。
            4.4若您未遵守以上规定的，本平台有权作出独立判断并采取暂停或关闭用户帐号等措施。用户须对自己在网上的言论和行为承担法律责任。
          </p>

          第5条所有权
          5.1您同意并已充分了解本协议的条款，承诺不将已发表于本平台的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。
          5.2上海钜盛信息科技有限公司是本平台的制作者，拥有此网站内容及资源的著作权等合法权利，受国家法律保护，有权不时地对本协议及本平台的内容进行修改，并在本平台张贴，无须另行通知用户。在法律允许的最大限度范围内，上海钜盛信息科技有限公司对本协议及本平台内容拥有解释权。
          5.3除法律另有强制性规定外，未经上海钜盛信息科技有限公司明确的特别书面许可，任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用本平台的信息内容，否则，上海钜盛信息科技有限公司有权追究其法律责任。
          5.4钜盛科技所刊登的资料信息（诸如文字、标识、图表、图像、视频、按钮图标、声音文件片段、数字下载、数据编辑和软件等），均是钜盛科技或其内容提供者的财产，受中国和国际版权法的保护。本平台上所有内容的汇编是钜盛科技的排他财产，受中国和国际版权法的保护。本平台上所有软件都是上海钜盛信息科技有限公司或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。
          第6条用户隐私制度 6.1
          保护用户隐私是钜盛科技的一项基本政策，当您注册本平台时，您须提供个人信息。钜盛科技保证不对外公开或提供您注册资料及您在使用网络服务时存储在钜盛科技的非公开内容，但下列情况除外：
          （a）事先获得您的明确授权； （b）根据有关的法律法规要求；
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="fuwudialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="fuwudialogVisible = false"
        >已读</el-button
        >
      </span>
    </el-dialog>

    <!-- 物流交易协议对话框 -->
    <el-dialog
      custom-class="role-mask"
      style="margin-top: 100px"
      title="法律声明及隐私政策"
      :visible.sync="jiaoyidialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="fu-modal-content">
        <div style="max-height: 500px; overflow-y: scroll">
          <h1 class="dialogh1">法律声明及隐私政策</h1>

          <h3>第1条钜盛科技用户注册协议的接受</h3>
          <p>
            （g）不得利用钜盛科技网络服务以任何形式侵害任何人之专利、商标、商业秘密、著作权或其他专属权利的行为；
            （h）应遵循的其他义务。
            4.2您应不时关注并遵守本平台不时公布或修改的各类合法规则规定。
            4.3本平台保有删除站内各类不符合法律政策或不真实的信息内容而无须通知用户的权利。
            4.4若您未遵守以上规定的，本平台有权作出独立判断并采取暂停或关闭用户帐号等措施。用户须对自己在网上的言论和行为承担法律责任。
          </p>

          <h3>第2条钜盛科技用户注册协议的接受</h3>

          <p>
            5.1您同意并已充分了解本协议的条款，承诺不将已发表于本平台的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。
            5.2上海钜盛信息科技有限公司是本平台的制作者，拥有此网站内容及资源的著作权等合法权利，受国家法律保护，有权不时地对本协议及本平台的内容进行修改，并在本平台张贴，无须另行通知用户。在法律允许的最大限度范围内，上海钜盛信息科技有限公司对本协议及本平台内容拥有解释权。
            5.3除法律另有强制性规定外，未经上海钜盛信息科技有限公司明确的特别书面许可，任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用本平台的信息内容，否则，上海钜盛信息科技有限公司有权追究其法律责任。
            5.4钜盛科技所刊登的资料信息（诸如文字、标识、图表、图像、视频、按钮图标、声音文件片段、数字下载、数据编辑和软件等），均是钜盛科技或其内容提供者的财产，受中国和国际版权法的保护。本平台上所有内容的汇编是钜盛科技的排他财产，受中国和国际版权法的保护。本平台上所有软件都是上海钜盛信息科技有限公司或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。
          </p>

          <h3>第6条用户隐私制度</h3>

          <p>
            6.1
            保护用户隐私是钜盛科技的一项基本政策，当您注册本平台时，您须提供个人信息。钜盛科技保证不对外公开或提供您注册资料及您在使用网络服务时存储在钜盛科技的非公开内容，但下列情况除外：
            （a）事先获得您的明确授权；
            （b）根据有关的法律法规要求；（g）不得利用钜盛科技网络服务以任何形式侵害任何人之专利、商标、商业秘密、著作权或其他专属权利的行为；
            （h）应遵循的其他义务。
            4.2您应不时关注并遵守本平台不时公布或修改的各类合法规则规定。
            4.3本平台保有删除站内各类不符合法律政策或不真实的信息内容而无须通知用户的权利。
            4.4若您未遵守以上规定的，本平台有权作出独立判断并采取暂停或关闭用户帐号等措施。用户须对自己在网上的言论和行为承担法律责任。
          </p>

          第5条所有权
          5.1您同意并已充分了解本协议的条款，承诺不将已发表于本平台的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。
          5.2上海钜盛信息科技有限公司是本平台的制作者，拥有此网站内容及资源的著作权等合法权利，受国家法律保护，有权不时地对本协议及本平台的内容进行修改，并在本平台张贴，无须另行通知用户。在法律允许的最大限度范围内，上海钜盛信息科技有限公司对本协议及本平台内容拥有解释权。
          5.3除法律另有强制性规定外，未经上海钜盛信息科技有限公司明确的特别书面许可，任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用本平台的信息内容，否则，上海钜盛信息科技有限公司有权追究其法律责任。
          5.4钜盛科技所刊登的资料信息（诸如文字、标识、图表、图像、视频、按钮图标、声音文件片段、数字下载、数据编辑和软件等），均是钜盛科技或其内容提供者的财产，受中国和国际版权法的保护。本平台上所有内容的汇编是钜盛科技的排他财产，受中国和国际版权法的保护。本平台上所有软件都是上海钜盛信息科技有限公司或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。
          第6条用户隐私制度 6.1
          保护用户隐私是钜盛科技的一项基本政策，当您注册本平台时，您须提供个人信息。钜盛科技保证不对外公开或提供您注册资料及您在使用网络服务时存储在钜盛科技的非公开内容，但下列情况除外：
          （a）事先获得您的明确授权； （b）根据有关的法律法规要求；
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="fuwudialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="jiaoyidialogVisible = false"
        >已读</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {isvalidateCode, isvalidPass, isvalidPhone, isvalidUsername,} from "./js/index.js";
  import {getPhoneCode, regUserInfo} from "@/api/reg";

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
        options: [
          {
            value: "personal",
            label: "个人",
          },
          {
            value: "enterprise",
            label: "企业",
          },
        ],
        value: "",
        fuwudialogVisible: false, //物流服务协议对话框
        jiaoyidialogVisible: false, //物流交易协议对话框
        disabled: false,
        time: 0,
        btntxt: "重新发送",
        activeName: "second",
        checked: true,
        ruleForm: {
          userName: "",
          phoneNumber: "",
          password: "",
          conPassword: "",
          code: "1234",
          type: "",
        },
        rules: {
          userName: [
            {required: true, trigger: "blur", message: "登录名不能为空"},
            {required: true, validator: validUsername, trigger: "blur"},
          ],
          phoneNumber: [
            {required: true, trigger: "blur", message: "手机号码不能为空"},
            {required: true, validator: validPhone, trigger: "blur"},
          ],
          password: [
            {required: true, trigger: "blur", message: "密码不能为空"},
            {required: true, validator: validatePass, trigger: "blur"},
          ],
          conPassword: [
            {required: true, trigger: "blur", message: "确认密码不能为空"},
            {required: true, validator: validatePass2, trigger: "blur"},
          ],
          code: [
            {required: true, trigger: "blur", message: "验证码不能为空"},
            // { required: true, validator: validateCode, trigger: "blur" }
          ],
          type: [{required: true, trigger: "blur", message: "角色不能为空"}],
        },
      };
    },
    methods: {

      goTo() {
        //直接跳转
        this.$router.push("/login");
      },
      //提交表单信息
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            regUserInfo(this.ruleForm).then((res) => {
              //  console.log(res.code)
              if (res.code == 200) {
                this.$router.push("/registersuccessful");
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
      //表单重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //获取验证码的接口
      getSendcode() {
        getPhoneCode(this.ruleForm.phoneNumber, "reg").then((res) => {
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
      handleClose(done) {
        // this.$confirm('确认关闭？')
        // .then(_ => {
        //     done();
        // })
        // .catch(_ => {});
      },
    },
  };
</script>
<style lang="scss" scoped>
  .dialogh1 {
    text-align: center;
  }

  .fu-modal {
    width: auto;
    margin: 0 auto;
    position: relative;
    outline: 0;
    top: 100px;
  }

  .fu-modal-content {
    line-height: 1.5;
    position: relative;
    background-color: #39ff55;
    border: 0;
    background-clip: padding-box;
    // box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  }

  .xieyidiv {
    display: flex;
  }

  .xieyi {
    display: flex;
    flex-direction: column;
  }

  .reg {
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
    width: 500px;
    padding: 0px 25px 5px 25px;

    .el-input {
      height: 38px;
      min-width: 100%;

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
<style>
  /* 顶部下划线 */
  .role-mask .el-dialog__header {
    border-bottom: 1px solid #ccc;
  }
</style>
