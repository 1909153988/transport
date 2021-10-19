<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" inline>

      <div class="mb20">
         <el-divider content-position="left">身份信息</el-divider>
        <!-- <el-divider direction="vertical"/> <span class="weight">身份信息</span> -->
      </div>
      <el-form-item label="姓名" prop="companyName">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="姓别" prop="companyName">
        <el-radio-group v-model="form.sex" style="min-width: 240px">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="注册手机号" prop="companyName">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="companyName">
        <el-input v-model="form.idCardNumber"></el-input>
      </el-form-item>
      <el-form-item label="身份地址" prop="companyName">
        <el-input v-model="form.idCardAddress"></el-input>
      </el-form-item>
      <el-form-item label="身份证签发机关" prop="companyName">
        <el-input v-model="form.idCardOffice"></el-input>
      </el-form-item>
      <el-form-item label="身份证有效期" prop="companyName">
        <el-input v-model="form.idCardPeriod"></el-input>
      </el-form-item>
      <el-form-item label="创建人" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>


      <div class="mb20">
         <el-divider content-position="left">驾驶证信息</el-divider>
        <!-- <el-divider direction="vertical"/> <span class="weight">驾驶证信息</span> -->
      </div>

      <el-form-item label="驾驶证号" prop="companyName">
        <el-input v-model="form.drivingNumber"></el-input>
      </el-form-item>
      <el-form-item label="档案号" prop="companyName">
        <el-input v-model="form.fnNumber"></el-input>
      </el-form-item>

      <el-form-item label="准驾车型" prop="companyName">
        <el-input v-model="form.vehicleType"></el-input>
      </el-form-item>
      <el-form-item label="驾驶证有效期" prop="companyName">
<!--        <el-input v-model="form.companyName"></el-input>-->
        <el-date-picker
          v-model="form.drivingEndTime"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd hh:mm:ss"
        >
        </el-date-picker>
      </el-form-item>

      <div class="mb20">
        <!-- <el-divider direction="vertical"/> <span class="weight">从业资格证信息</span> -->
          <el-divider content-position="left">从业资格证信息</el-divider>
      </div>

      <el-form-item label="从业资格证号" prop="companyName">
        <el-input v-model="form.qualifiedNumber"></el-input>
      </el-form-item>
      <el-form-item label="从业资格证有效期" prop="companyName">
        <el-date-picker
          v-model="form.qualifiedPeriod"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd hh:mm:ss"
        >
        </el-date-picker>
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
          <el-button type="primary" plain @click="submitForm">提交</el-button>
           <el-button >取消</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from '../../../../components/ImageUpload/index'
import {queryDriverById, updateDriver} from "../../../../api/capacity/driver"

export default {
  data(){
    return {
      form:{
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
      chauffeurId:'',
      rules:{
        // companyName:[
        //   {required:true , message:'不能为空'}
        // ]
      },

    }
  },
  created() {
    this.chauffeurId = this.$route.query.id
    if(this.chauffeurId){
      this.getDriverById(this.chauffeurId)
    }
  },
  components:{
    ImageUpload
  },
  methods:{
    //查看详情
    getDriverById(id){
      console.log(id)
      queryDriverById({chauffeurId:id}).then(res => {
        if(res.code == 200) {
          this.form = res.data;
        }
      })
    },
    //编辑
    submitForm(formName){
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
      let form = {
        chauffeurId:this.chauffeurId,
        name:this.form.name,
        sex:this.form.sex,
        phone:this.form.phone,
        qualifiedPeriod:this.form.qualifiedPeriod,
        qualifiedNumber:this.form.qualifiedNumber,
        drivingEndTime:this.form.drivingEndTime,
        vehicleType:this.form.vehicleType,
        fnNumber:this.form.fnNumber,
        drivingNumber:this.form.drivingNumber,
        idCardPeriod:this.form.idCardPeriod,
        idCardOffice:this.form.idCardOffice,
        idCardAddress:this.form.idCardAddress,
        idCardNumber:this.form.idCardNumber,
      }
      console.log(form)
      updateDriver(form).then(res => {
        console.log(res)
        if(res.code == 200) {
          this.msgSuccess("编辑成功！");
          this.$router.push("/filemanagement/driver")
        }
      })
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
