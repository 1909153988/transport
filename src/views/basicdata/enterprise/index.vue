


<template>
  <div class="app-container">

    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">

      <el-tab-pane label="个人认证信息" name="third">
        <el-form ref="form" :model="form" label-width="160px">
          <el-row>
            <el-col :span="6">

              <el-form-item label="身份证头像页">
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :auto-upload="false"
                  action=""
                  :on-change="uploadSectionFileB">
                  <img v-if="idCardPersonImageUrl" :src="idCardPersonImageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>


            </el-col>
            <el-col :span="8">

              <el-form-item label="身份证国徽页">
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :auto-upload="false"
                  action=""

                  :on-change="uploadSectionFileC">

                  <img v-if="idCardBadgeImageUrl" :src="idCardBadgeImageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>

                </el-upload>
              </el-form-item>


            </el-col>
          </el-row>

          <el-row>

            <el-col :span="4">
              <el-form-item label="法定代表人姓名" required>
                <el-input id="legalPersonName" v-model.trim="form.legalPersonName"></el-input>
              </el-form-item>
            </el-col>


            <el-col :span="20">
              <el-form-item required prop="">
                <div style="margin-left:40px">请填写营业执照上面的法定代表人</div>
              </el-form-item>
            </el-col>
          </el-row>


          <el-form-item label="法定代表人身份证号" required>
            <el-input id="idCardNumber" v-model.trim="form.idCardNumber"></el-input>
          </el-form-item>


          <el-row>
            <el-col :span="4">
              <el-form-item label="法定代表人手机号" required>
                <el-input v-model.trim="form.contactPhone"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="20">
              <el-form-item required prop="">
                <div style="margin-left:40px">请填写营业执照法定代表人的常用手机号</div>
              </el-form-item>
            </el-col>
          </el-row>


          <div>
            <el-form-item label=" ">
              <el-button type="primary" @click="submitPersonForm('form')" plain
              >保存法人信息
              </el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>



      <el-tab-pane label="企业认证信息" name="first"  v-if="form.identity=='1'">

        <el-form ref="form" :model="form" label-width="140px">
          <el-row>
            <el-col :span="4">

              <el-form-item label="营业执照">
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :auto-upload="false"
                  action=""
                  :on-change="uploadSectionFileA">
                  <img v-if="businessLicenseImageUrl" :src="businessLicenseImageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item required prop="">
                <div>请上传营业执照照片，支持PNG、JPG、JPEG格式，大小不超过8M</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="企业名称" required>
                <el-input v-model="form.shipperFullName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item required prop="">
                <div style="margin-left:40px">企业名称需严格按照证件填写，在注册确认后不可更改</div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="企业简称" required>
                <el-input v-model="form.shipperShortName"></el-input>
              </el-form-item>
              <el-form-item label="统一社会信用代码" required>
                <el-input v-model="form.societyCreditCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="法定代表人" required>
                <el-input v-model="form.businessPersonName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item required prop="">
                <div style="margin-left:40px">请填写营业执照上面的法定代表人</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业实际经营地" required>
                <el-input v-model="form.businessAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="form.businessContactPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div>
            <el-form-item label=" ">
              <el-button type="primary" @click="submitBusinessForm('form')" plain
              >保存企业信息
              </el-button>
            </el-form-item>
          </div>
        </el-form>


      </el-tab-pane>
      <el-tab-pane label="开票信息" name="second"  v-if="form.identity=='1'">
        <el-form ref="form" :model="form" label-width="140px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="发票抬头" required prop="invoiceTitle">
                <el-input v-model="form.invoiceTitle"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册地址" prop="registerAddress">
                <el-input v-model="form.registerAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="纳税人识别号" required prop="nashuiIdNumber">
                <el-input v-model="form.nashuiIdNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册电话" required prop="redisterPhone">
                <el-input v-model="form.redisterPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="开户行" required prop="kaihuBank">
                <el-input v-model="form.kaihuBank"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户账号" required prop="accountBank">
                <el-input v-model="form.accountBank"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="发票收件人" required prop="invoiceCollectName">
                <el-input v-model="form.invoiceCollectName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件人电话" required prop="invoiceCollectPhone">
                <el-input v-model="form.invoiceCollectPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="发票收件地址" required prop="invoiceCollectAddress">
                <el-input v-model="form.invoiceCollectAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div>
            <el-form-item label=" ">
              <el-button type="primary" @click="submitInvoiceForm('form')" plain
              >保存开票信息
              </el-button
              >
              <!-- <el-button type="primary" plain @click="next">下一步</el-button> -->
            </el-form-item>
          </div>
        </el-form>


      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
  import {
    toUpdateCompanyAuth,
    toUpdateCompanyInvoice,
    toUpdatePersonalAuth,
    toUploadPersonalIdCardFile,
    toUserAuthInfo
  } from "@/api/client/userAuth";

  export default {
    data() {
      return {
        activeName: 'third',
        form: {},
        businessLicenseImageUrl: '', //企业营业执照
        idCardPersonImageUrl: '', //负责人身份证人像面
        idCardBadgeImageUrl: '', //负责人身份证国徽面

        businessLicenseImageFile: null,
        idCardPersonImageFile: null,
        idCardBadgeImageFile: null,

        idcolor: '',


      };
    }, created() {
      this.getUserAuthInfo();

    },
    methods: {

      //查询认证信息

      getUserAuthInfo() {
        this.loading = true;
        toUserAuthInfo().then(response => {

          if (response != null && response.code === 200) {

            const datas = response.data;
            console.log(datas);

            if (datas != null) {
              const identity = datas.identity;
              if (identity == '1') { //企业类型
                console.log("企业类型");

                this.form = datas;
                this.businessLicenseImageUrl = datas.businessLicense;
                this.idCardPersonImageUrl = datas.idCardPerson;
                this.idCardBadgeImageUrl = datas.idCardBadge;

              } else if (identity == '0') { //个人
                console.log("个人");
                this.form = datas;
                this.idCardPersonImageUrl = datas.idCardPerson;
                this.idCardBadgeImageUrl = datas.idCardBadge;
              }

            }


          } else {
            this.msgError("查询失败");
          }
          this.loading = false;
        });
      },

      //上传营业执照
      uploadSectionFileA(file) {
        this.uploadSectionFile(file, 1);
      },

      //身份证正面
      uploadSectionFileB(file) {
        this.uploadSectionFile(file, 2);

      },

      //身份证反面
      uploadSectionFileC(file) {
        this.uploadSectionFile(file, 3);

      },

      uploadSectionFile(file, type) {
        const typeArr = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
        const isJPG = typeArr.indexOf(file.raw.type) !== -1;
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.msgError('上传图片只能是 png 、jpeg 、jpg  格式!');

        }
        if (!isLt2M) {
          this.msgError('上传图片大小不能超过 2MB!');
        }

        if (type == 1) {
          this.businessLicenseImageUrl = URL.createObjectURL(file.raw);
          this.businessLicenseImageFile = file.raw; ////上传就用 this.imageFile
        } else if (type == 2) {
          this.idCardPersonImageUrl = URL.createObjectURL(file.raw);
          this.idCardPersonImageFile = file.raw; ////上传就用 this.imageFile

          this.idCardPersonOCR();
        } else if (type == 3) {
          this.idCardBadgeImageUrl = URL.createObjectURL(file.raw);
          this.idCardBadgeImageFile = file.raw; ////上传就用 this.imageFile
        }
        return isJPG && isLt2M;
      },

      //身份证正面照 识别
      idCardPersonOCR() {
        let formData = new FormData();
        formData.append("idCardFrontFile", this.idCardPersonImageFile);

        toUploadPersonalIdCardFile(formData).then(response => {


          console.log(response);

          if (response != null && response.code != null && response.code === 200) {

            this.form.idCardNumber = response.idcard;

            this.form.legalPersonName = response.name;

            this.inputColor();

          } else {

          }

        });

      },

      ////颜色
      inputColor() {
        var i = 3;
        var idCardNumberInput = document.getElementById("idCardNumber");
        var legalPersonName = document.getElementById("legalPersonName");
        var interval = setInterval(function () {
          legalPersonName.style.color = 'red';
          idCardNumberInput.style.color = 'red';
          setTimeout(function () {
            idCardNumberInput.style.color = '';
            legalPersonName.style.color = '';
          }, 400)
          i--;
          if (i == 0) {
            clearInterval(interval);
            return false;
          }
        }, 500);
      },


      //保存企业信息
      submitBusinessForm() {
        const userIdChar = this.form.userIdChar;
        const businessLicenseImageUrl = this.businessLicenseImageUrl;

        const shipperFullName = this.form.shipperFullName;
        const shipperShortName = this.form.shipperShortName;
        const societyCreditCode = this.form.societyCreditCode;

        const businessPersonName = this.form.businessPersonName;
        const businessAddress = this.form.businessAddress;
        const businessContactPhone = this.form.businessContactPhone;


        if (userIdChar == undefined || userIdChar == null || userIdChar == "") {
          this.msgError("信息异常");
          return;
        }
        if (businessLicenseImageUrl == undefined || businessLicenseImageUrl == null || businessLicenseImageUrl == "") {
          this.msgError("请上传营业执照");
          return;
        }


        let formData = new FormData();
        formData.append("businessLicenseFile", this.businessLicenseImageFile);

        formData.append("businessLicenseImageUrl", businessLicenseImageUrl);

        formData.append("shipperFullName", shipperFullName);
        formData.append("shipperShortName", shipperShortName);
        formData.append("societyCreditCode", societyCreditCode);
        formData.append("businessPersonName", businessPersonName);
        formData.append("businessAddress", businessAddress);
        formData.append("businessContactPhone", businessContactPhone);

        formData.append("userIdChar", userIdChar);
        this.loading = true;

        toUpdateCompanyAuth(formData).then(response => {
          if (response != null && response.code != null && response.code === 200) {
            this.msgSuccess(response.msg);
          } else {
            this.msgError(response.msg);
          }
          this.loading = false;

        });
      },

      //保存开票信息
      submitInvoiceForm() {
        const userIdChar = this.form.userIdChar;

        if (userIdChar == undefined || userIdChar == null || userIdChar == "") {
          this.msgError("信息异常");
          return;
        }


        let formData = {
          userIdChar: userIdChar,
          invoiceTitle: this.form.invoiceTitle,
          registerAddress: this.form.registerAddress,
          nashuiIdNumber: this.form.nashuiIdNumber,
          redisterPhone: this.form.redisterPhone,
          kaihuBank: this.form.kaihuBank,
          accountBank: this.form.accountBank,
          invoiceCollectName: this.form.invoiceCollectName,
          invoiceCollectPhone: this.form.invoiceCollectPhone,
          invoiceCollectAddress: this.form.invoiceCollectAddress
        };

        this.loading = true;

        toUpdateCompanyInvoice(formData).then(response => {

          if (response != null && response.code != null && response.code === 200) {
            this.msgSuccess(response.msg);
          } else {
            this.msgError(response.msg);
          }
          this.loading = false;

        });

      },

      //保存个人信息
      submitPersonForm() {

        const userIdChar = this.form.userIdChar;
        const idCardPersonImageUrl = this.idCardPersonImageUrl;
        const idCardBadgeImageUrl = this.idCardBadgeImageUrl;

        const legalPersonName = this.form.legalPersonName;
        const idCardNumber = this.form.idCardNumber;
        const contactPhone = this.form.contactPhone;

        if (userIdChar == undefined || userIdChar == null || userIdChar == "") {
          this.msgError("信息异常");
          return;
        }
        if (idCardPersonImageUrl == undefined || idCardPersonImageUrl == null || idCardPersonImageUrl == "") {
          this.msgError("请上传身份证正面照");
          return;
        }
        if (idCardBadgeImageUrl == undefined || idCardBadgeImageUrl == null || idCardBadgeImageUrl == "") {
          this.msgError("请上传身份证反面照");
          return;
        }
        if (legalPersonName == undefined || legalPersonName == null || legalPersonName == "") {
          this.msgError("请输入身份证姓名");
          return;
        }
        if (idCardNumber == undefined || idCardNumber == null || idCardNumber == "") {
          this.msgError("请输入身份证号码");
          return;
        }
        if (contactPhone == undefined || contactPhone == null || contactPhone == "") {
          this.msgError("请输入联系手机号");
          return;
        }


        let formData = new FormData();
        formData.append("idCardFrontFile", this.idCardPersonImageFile);
        formData.append("idCardVersoFile", this.idCardBadgeImageFile);

        formData.append("idCardPersonImageUrl", idCardPersonImageUrl);
        formData.append("idCardBadgeImageUrl", idCardBadgeImageUrl);

        formData.append("name", legalPersonName);
        formData.append("idcard", idCardNumber);
        formData.append("phonenumber", contactPhone);
        formData.append("userIdChar", userIdChar);
        this.loading = true;


        toUpdatePersonalAuth(formData).then(response => {
          if (response != null && response.code != null && response.code === 200) {
            this.msgSuccess(response.msg);
          } else {
            this.msgError(response.msg);
          }
          this.loading = false;

        });

      },


      //标题切换事件
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    },


  };
</script>

