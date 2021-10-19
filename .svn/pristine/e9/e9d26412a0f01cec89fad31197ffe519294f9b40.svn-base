<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="180px">

      <div class="mb20">
        <el-divider content-position="left">身份信息</el-divider>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="身份证头像面" prop="">
            <ImageOCRUpload  :url="idCardZ.idCardOrcUrl"  :isShowTip="false" @ocrData="ocrData" ></ImageOCRUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="司机姓名" prop="companyName">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="注册手机号" prop="companyName">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="companyName">
            <el-input v-model="form.idcard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="身份证国徽面" prop="">
            <ImageOCRUpload  :url="idCardF.idCardOrcUrl"  :isShowTip="false"></ImageOCRUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证永久有效" prop="companyName">
            <el-select v-model="form.idCardLongEff" placeholder="请选择">
              <el-option label="是" :value="0"></el-option>
              <el-option label="否" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证有效开始日期" prop="companyName">
            <el-date-picker
              v-model="form.idCardPeriodStartTime"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="身份证有效结束日期" prop="companyName">
            <el-date-picker
              v-model="form.idCardPeriodEndTime"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="mb20">
        <el-divider content-position="left">驾驶证信息</el-divider>
        <!-- <el-divider content-position="left"/> <span class="weight">驾驶证信息</span> -->
      </div>

      <el-row>
        <el-col :span="8">
          <el-form-item label="驾驶证正本" prop="">
            <ImageOCRUpload  :url="DLCardZ.idCardOrcUrl" :isShowTip="false" ></ImageOCRUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="驾驶证号" prop="companyName">
            <el-input v-model="form.drivingNumber"></el-input>
          </el-form-item>
          <el-form-item label="准驾车型" prop="companyName">
            <el-input v-model="form.vehicleType"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="驾驶证副本" prop="">
            <ImageOCRUpload  :url="DLCardF.idCardOrcUrl"  :isShowTip="false" ></ImageOCRUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="驾驶证有效开始日期" prop="companyName">
            <el-date-picker
              v-model="form.drivingStartTime"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="驾驶证有效结束日期" prop="companyName">
            <el-date-picker
              v-model="form.drivingEndTime"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="mb20">
        <!-- <el-divider content-position="left"/> <span class="weight">从业资格证信息</span> -->
         <el-divider content-position="left">从业资格证信息</el-divider>
      </div>

      <el-row>
        <el-col :span="8">
          <el-form-item label="从业资格证" prop="">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="从业资格证号" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
          <el-form-item label="从业资格证有效开始日期" prop="companyName">
            <el-date-picker
              v-model="form.qualifiedPeriodStartTime"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="从业资格证有效结束日期" prop="companyName">
            <el-date-picker
              v-model="form.qualifiedPeriodEndTime"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="mb20">
        <!-- <el-divider content-position="left"/> <span class="weight">其他信息</span> -->
         <el-divider content-position="left">其它信息</el-divider>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="代收款协议" prop="">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关联车辆" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
            <el-button class="ml5" @click="" plain>+</el-button>
          </el-form-item>
          <el-form-item label="关联收款人" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
            <el-button class="ml5" @click="" plain>+</el-button>
          </el-form-item>
        </el-col>
      </el-row>



      <div>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('form')" plain>提交</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { saveDriver } from "../../../../api/capacity/driver"
import ImageOCRUpload from '../../../../components/ImageOCRUpload/index'
import ImageUpload from '../../../../components/ImageUpload/index'

export default {
  data(){
    return {
      form:{

      },
      idCardZ:{
        idCardOrcUrl:  '/transport/file/IDCardOCRAndUpload',
        imageUrl:'',
        hasPermi:'transport:file:IDCardOCRAndUpload'
      },
      idCardF:{
        idCardOrcUrl:  '/transport/file/IDCardOCRAndUpload',
        imageUrl:'',
        hasPermi:'transport:file:IDCardOCRAndUpload'
      },
      DLCardZ:{
        idCardOrcUrl:  '/transport/file/DLCardOCRAndUpload',
        imageUrl:'',
        hasPermi:'transport:file:DLCardOCRAndUpload'
      },
      DLCardF:{
        idCardOrcUrl:  '/transport/file/DLCardOCRAndUpload',
        imageUrl:'',
        hasPermi:'transport:file:DLCardOCRAndUpload'
      },
      headers: {
        Authorization: "Consign " + getToken(),
      },
      carList:[],
      payeeList:[],
      rules:{
        companyName:[
          {required:true , message:'不能为空'}
        ]
      }
    }
  },
  components:{
    ImageOCRUpload,
    ImageUpload
  },

  methods:{
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    saveDriver(){
      saveDriver().then(res => {
        console.log(res)
      })
    },
    //上传成功
    idCardData(res, file, fileList){
      console.log(res)
      if(res.code == 200 ) {
        this.form.idcard = res.data.idcard;
        this.form.name = res.data.name;
        this.imageUrl = res.data.fileUrl;
      }
    },
    ocrData(val){
      console.log(val + '~~~~~~~~')
    }
  }
}
</script>

<style scoped>

.el-divider--vertical {
  width: 5px;
  height: 1.5em;
  background-color: #1890ff;
}
</style>
