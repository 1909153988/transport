<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">

      <div class="mb20">
        <!-- <el-divider direction="vertical"/> <span class="weight">身份信息</span> -->
        <el-divider content-position="left">身份信息</el-divider>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="行驶证正本" prop="">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车牌号" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
          <el-form-item label="车辆识别代号" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="行驶证副本" prop="">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="核定载质量" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
          <el-form-item label="车辆所有人" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="最新年检信息" prop="">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行驶证发证日期" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
          <el-form-item label="行驶证到期日期" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="mb20">
        <!-- <el-divider direction="vertical"/> <span class="weight">道路运输证信息</span> -->
         <el-divider content-position="left">道路运输证信息</el-divider>
        <span>(车辆载重质量大于4.5吨需准备证件)</span>
      </div>

      <el-row>
        <el-col :span="8">
          <el-form-item label="道路运输证正页" prop="">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业户名称" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
          <el-form-item label="业户类型" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="道路运输证副页" prop="">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="道路运输证号" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
          <el-form-item label="道路运输证到期日期" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="人车合照" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>



      <!-- <div class="mb20">
        <el-divider direction="vertical"/> <span class="weight">其他信息</span>
      </div> -->
       <el-divider content-position="left">其他信息</el-divider>



      <div>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('form')" plain>提交</el-button>
          <el-button type="info" @click="submitForm('form')" plain>提交并继续添加</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from '../../../../components/ImageUpload/index'

export default {
  data(){
    return {
      form:{
        name:[],
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
    addCar(){

    },
    addPayee(){

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
