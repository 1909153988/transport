<template>
  <div class="app-container">
    <div class="mb20">
      <!-- <el-divider direction="vertical" /> <span class="weight">基本资料</span> -->
      <el-divider content-position="left">基本资料</el-divider>
    </div>

    <el-row :gutter="20" style="margin-top:40px">


      <el-col :span="8" v-if="pageInfo.identity=='1'"
      >
        <div class="grid-content bg-purple fontbold">公司名称: {{pageInfo.shipperFullName}}</div>
      </el-col>

      <el-col :span="8" v-else-if="pageInfo.identity=='0'"
      >
        <div class="grid-content bg-purple fontbold">姓名: {{pageInfo.businessPersonName}}</div>
      </el-col>


      <el-col :span="8"
      >
        <div class="grid-content bg-purple">
          <el-button
            style="margin-right: 10px"
            type="success"
            size="mini"
            icon="el-icon-check"
            circle
          ></el-button
          >
          {{pageInfo.status=='0'?'待审核':pageInfo.status=='1'?'认证通过':pageInfo.status=='3'?'认证未通过':'未知'}}
        </div>
      </el-col
      >
    </el-row>
    <el-row :gutter="20" v-if="pageInfo.identity=='1'">
      <el-col :span="8"
      >
        <div class="grid-content bg-purple fontbold">统一社会信用代码：{{pageInfo.societyCreditCode}}</div>
      </el-col
      >

    </el-row>

    <el-row :gutter="20" v-else-if="pageInfo.identity=='0'">
      <el-col :span="8"
      >
        <div class="grid-content bg-purple fontbold">身份证号码：{{pageInfo.idCardNumber}}</div>
      </el-col
      >

    </el-row>


    <el-row :gutter="20" v-if="pageInfo.identity=='1'">
      <el-col :span="8"
      >
        <div class="grid-content bg-purple fontbold">法定代表人：{{pageInfo.businessPersonName}}</div>
      </el-col
      >
    </el-row>


    <el-row :gutter="20" v-if="pageInfo.identity=='0'">
      <el-col :span="8"
      >
        <div class="grid-content bg-purple fontbold">联系手机号：{{pageInfo.contactPhone}}</div>
      </el-col
      >
    </el-row>


    <el-row :gutter="20" v-if="pageInfo.identity=='1'">
      <el-col :span="8"
      >
        <div class="grid-content bg-purple fontbold">认证联系人：{{pageInfo.legalPersonName}}</div>
      </el-col
      >
      <el-col :span="8">
        <div class="grid-content bg-purple"  v-hasPermi="['consign:clientData:getUserClientAuthInfo']" >
          <el-link type="primary" @click="goFrist()">查看认证信息</el-link>
        </div>
      </el-col>
    </el-row>


    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple fontbold">
          联系人手机号：{{pageInfo.contactPhone}}
        </div>
      </el-col
      >
    </el-row>

    <div class="mb20">
      <el-divider content-position="left">安全设置</el-divider>
    </div>

    <el-row :gutter="20" style="margin-top:40px">
      <el-col :span="8"
      >
        <div class="grid-content bg-purple fontbold">登录名: {{pageInfo.userName}}</div>
      </el-col
      >
<!--      <el-col :span="8"-->
<!--      >-->
<!--        <div class="grid-content bg-purple">-->
<!--          <el-link type="primary" @click="loginnamedialogVisible = true"-->
<!--          >修改登录名-->
<!--          </el-link-->
<!--          >-->
<!--        </div>-->
<!--      </el-col-->
<!--      >-->
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"
      >
        <div class="grid-content bg-purple fontbold">登录手机号: {{pageInfo.phoneNumber}}</div>
      </el-col
      >

      <el-col :span="8"
      >
        <div class="grid-content bg-purple">
          <el-link type="primary" @click="phonedialogVisible = true"
          >修改手机号
          </el-link
          >
        </div>
      </el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"
      >
        <div class="grid-content bg-purple fontbold">登录密码：**********</div>
      </el-col
      >
      <el-col :span="8"
      >
        <div class="grid-content bg-purple">
          <el-link type="primary" @click="passworddialogVisible = true"
          >修改密码
          </el-link
          >
        </div>
      </el-col
      >
    </el-row>


    <!-- 修改手机号码弹框 -->
    <el-dialog
      title="修改手机号码"
      :visible.sync="phonedialogVisible"
      width="30%"
    >
      <el-form
        :model="phoneform"
        ref="phoneformrules"
        :rules="phoneformrules"

        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="当前密码" prop="oldPassword">
          <el-input prefix-icon="el-icon-unlock" placeholder="请输入密码" v-model="phoneform.oldPassword"
                    show-password></el-input>
        </el-form-item>
        <el-form-item label="原手机号">
          <el-input v-model="pageInfo.phoneNumber" readonly disabled></el-input>
        </el-form-item>
        <el-form-item label="新手机号" prop="phoneNumber">
          <el-input v-model="phoneform.phoneNumber" placeholder="请输入新的手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="phoneform.code" autocomplete="off" placeholder="请输入验证码">

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
            :disabled="disabled"
            v-if="disabled == true"
          >{{ btntxt }}
          </el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="phonedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePhone"
        >保存</el-button>
      </div>
    </el-dialog>


    <!-- 修改密码弹框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="passworddialogVisible"
      width="30%"
    >
      <el-form
        :model="pwdform"
        ref="pwdformrules"
        :rules="pwdformrules"
        label-width="100px"
        class="demo-ruleForm">

        <el-form-item label="当前密码" prop="oldPassword">
          <el-input prefix-icon="el-icon-unlock" placeholder="请输入当前密码" v-model="pwdform.oldPassword"
                    show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input prefix-icon="el-icon-unlock" placeholder="请输入新密码" v-model="pwdform.password"
                    show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="conPassword">
          <el-input prefix-icon="el-icon-unlock" placeholder="确认密码" v-model="pwdform.conPassword"
                    show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passworddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassWord">保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getPhoneCode, getUserInfo, toUpdatePassWord,toUpdatePhone} from "@/api/client/userInfo";

  export default {
    data() {
      return {

        // loginnamedialogVisible: false, //修改登录名弹框
        phonedialogVisible: false, //修改手机号弹框
        passworddialogVisible: false, //修改密码弹框


        // 页面数据
        pageInfo: {},

        //修改密码
        pwdform: {
          oldPassword: null,
          password: null,
          conPassword: null,
          userId: null
        },

        //修改手机
        phoneform: {
          oldPassword: null,
          phoneNumber: null,
          code: null,
          userId: null
        },

        // 表单校验 修改密码
        pwdformrules: {

          oldPassword: [
            {required: true, message: "请输入当前认证账号密码", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入新密码", trigger: "blur"}
          ],

          conPassword: [
            {required: true, message: "请确认新密码", trigger: "blur"}
          ],
        },


        disabled: false,
        time: 0,
        btntxt: "重新发送",

        // 表单校验 修改手机号

        phoneformrules: {
          oldPassword: [
            {required: true, message: "请输入当前认证账号密码", trigger: "blur"}
          ],
          phoneNumber: [
            {required: true, message: "请输入新手机号", trigger: "blur"}
          ],
          code: [
            {required: true, message: "请输入验证码", trigger: "blur"}
          ],
        },

      };
    },
    created() {
      this.toUserInfo();
    },
    methods: {
      //查询用户信息
      toUserInfo() {
        this.loading = true;
        getUserInfo().then(response => {

          if (response != null && response.code === 200) {

            const datas = response.data;
            if (datas != null) {
              const identity = datas.identity;
              if (identity == '1') { //企业类型
                console.log("企业类型");

                this.pageInfo = datas;

              } else if (identity == '0') { //个人
                console.log("个人");
                this.pageInfo = datas;

              }

            }


          } else {
            this.msgSuccess("查询失败");
          }
          this.loading = false;
        });
      },

      ///修改密码
      updatePassWord() {

        this.$refs['pwdformrules'].validate(valid => {
          if (valid) {

            if (this.pageInfo.userId != null) {
              this.pwdform.userId = this.pageInfo.userId;

              toUpdatePassWord(this.pwdform).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('更新成功');
                  this.pwdform = {};
                  this.passworddialogVisible = false;
                } else {
                  this.msgError('更新失败');
                }
              })

            } else {
              this.msgError('用户信息异常！')
            }
          } else {
            this.msgError('请完成必填项！')
          }
        })


      },

//修改手机
      updatePhone() {

        this.$refs['phoneformrules'].validate(valid => {
          if (valid) {

            if (this.pageInfo.userId != null) {
              this.phoneform.userId = this.pageInfo.userId;

              toUpdatePhone(this.phoneform).then(response => {

                if (response.code === 200) {
                  this.msgSuccess('更新成功');
                  this.phoneform = {};
                  this.phonedialogVisible = false;
                } else {
                  this.msgError('更新失败');
                }
              })

            } else {
              this.msgError('用户信息异常！')
            }
          } else {
            this.msgError('请完成必填项！')
          }
        })


      },
      //获取验证码的接口
      getSendcode() {

        getPhoneCode(this.phoneform.phoneNumber, "reg").then((res) => {
          this.time = 60;
          this.disabled = true;
          this.timer();

          if (res.code == 200) {
            this.msgSuccess(res.msg);
          } else {
            this.msgError(res.msg);
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


      //跳转查看认证信息
      goFrist() {
        this.$router.push("/basicdata/fristenterprise");
      },

    },
  };
</script>

<style lang="scss" scoped>
  .el-divider--vertical {
    width: 5px;
    height: 1.5em;
    background-color: #1890ff;
  }

  .el-row {
    padding-left: 46px;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .fontbold {
    // font-weight: bold;
  }

  .el-col {
    border-radius: 4px;
    font-size: 15px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
