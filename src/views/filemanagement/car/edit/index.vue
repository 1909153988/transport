<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" inline>

      <div class="mb20">
        <!-- <el-divider direction="vertical"/> <span class="weight">基础信息</span> -->
         <el-divider content-position="left">车辆信息</el-divider>
      </div>
      <el-form-item label="车牌号" prop="companyName">
        <el-input v-model="form.vehicleNumber"></el-input>
      </el-form-item>
      <el-form-item label="车辆颜色" prop="companyName">
        <el-input v-model="form.vehicleColor"></el-input>
      </el-form-item>
      <el-form-item label="外廓尺寸(mm)" prop="companyName">
        <el-input v-model="form.vehicleSize"></el-input>
      </el-form-item>
      <el-form-item label="车辆总质量类型" prop="companyName">
        <el-input v-model="form.qualityType"></el-input>
      </el-form-item>
      <el-form-item label="整备质量(kg)" prop="companyName">
        <el-input v-model="form.tonnage"></el-input>
      </el-form-item>
      <el-form-item label="核定载质量(kg)" prop="companyName">
        <el-input v-model="form.hzdQuality"></el-input>
      </el-form-item>
      <el-form-item label="车辆分类" prop="companyName">
        <el-input v-model="form.vehicleType"></el-input>
      </el-form-item>
      <el-form-item label="牌照类型" prop="companyName">
        <el-input v-model="form.vehicleNumberType"></el-input>
      </el-form-item>
      <el-form-item label="车辆所有人" prop="companyName">
        <el-input v-model="form.master"></el-input>
      </el-form-item>
      <el-form-item label="车辆识别代码" prop="companyName">
        <el-input v-model="form.vehicleCode"></el-input>
      </el-form-item>
      <el-form-item label="车轴数(含悬浮轴)" prop="companyName">
        <el-input v-model="form.axleAmount"></el-input>
      </el-form-item>
      <el-form-item label="使用性质" prop="companyName">
        <el-input v-model="form.nature"></el-input>
      </el-form-item>
      <el-form-item label="能源类型" prop="companyName">
        <el-input v-model="form.energyType"></el-input>
      </el-form-item>


      <div class="mb20">
        <el-divider content-position="left">证照信息</el-divider>
        <!-- <el-divider direction="vertical"/> <span class="weight">证照信息</span> -->
      </div>

      <el-form-item label="车辆行驶证档案编号" prop="companyName">
        <el-input v-model="form.licenseNumber"></el-input>
      </el-form-item>
      <el-form-item label="行驶证发证机关" prop="companyName">
        <el-input v-model="form.licenseAward"></el-input>
      </el-form-item>

      <el-form-item label="车辆行驶证注册日期" prop="companyName">
        <el-input v-model="form.licenseLoginTime"></el-input>
      </el-form-item>
      <el-form-item label="行驶证发证日期" prop="companyName">
        <el-input v-model="form.licenseAwardTime"></el-input>
      </el-form-item>
      <el-form-item label="行驶证到期日期" prop="companyName">
        <el-input v-model="form.licenseExpirationTime"></el-input>
      </el-form-item>
      <el-form-item label="道路运输证字号" prop="companyName">
        <el-input v-model="form.dlysNumber"></el-input>
      </el-form-item>
      <el-form-item label="道路运输证到期日期" prop="companyName">
        <el-input v-model="form.dlysExpirationTime"></el-input>
      </el-form-item>

      <div class="mb20">
        <!-- <el-divider direction="vertical"/> <span class="weight">业户信息</span> -->
        <el-divider content-position="left">业户信息</el-divider>
      </div>

      <el-form-item label="业户名称" prop="companyName">
        <el-input v-model="form.yhName"></el-input>
      </el-form-item>
      <el-form-item label="业户类型" prop="companyName">
        <el-input v-model="form.yhType"></el-input>
      </el-form-item>
      <!-- <el-form-item label="业户社会信用代码 / 身份证" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item> -->
      <el-form-item label="经营许可证号" prop="companyName">
        <el-input v-model="form.businessCertificate"></el-input>
      </el-form-item>
      <el-form-item label="所属辖区" prop="companyName">
        <el-input v-model="form.belongingTo"></el-input>
      </el-form-item>

      <div class="mb20">
        <!-- <el-divider direction="vertical"/> <span class="weight">证件照片列表</span> -->
          <el-divider content-position="left">证件照片列表</el-divider>
      </div>

      <div class="mb20 flex justify-center">
        <div class="imgBox">
          <el-image class="imgs" v-for="url in urls" :key="url" :src="url" lazy @click="getImg(url)"></el-image>
        </div>
        <div class="ml20 showBox flex justify-center">
          <el-image fit="contain" :src="url"></el-image>
        </div>
      </div>


      <div>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('form')" plain>提交</el-button>
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
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ],
      url:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      carList:[],
      payeeList:[],
      radio:'',
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

    },
    getImg(url) {
      this.url = url;
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

.imgBox {
  width: 220px;
  height: 400px;
  overflow: auto;
}

.showBox {
  height: 400px;
  min-width: 600px;
  width: 60%;

}

/*.showBox .el-image__inner {*/
/*  width: auto;*/
/*  height: 360px;*/
/*}*/


.imgs {
  width: 200px;
}
</style>
