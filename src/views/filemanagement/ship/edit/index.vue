<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="160px" inline>

      <div class="mb20">
        <el-divider direction="vertical"/> <span class="weight">基础信息</span>
      </div>
      <el-form-item label="所属船东" prop="companyName">
        <el-select>
          <el-option>1</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="船舶名称" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="MMSI(9位码)" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="船舶类型" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="载货吨(吨)" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="船舶属性" prop="companyName">
        <el-checkbox-group v-model="form.name">
          <el-checkbox label="有封仓" ></el-checkbox>
          <el-checkbox label="前驾驶" ></el-checkbox>
          <el-checkbox label="后驾驶"></el-checkbox>
          <el-checkbox label="马钢水尺" ></el-checkbox>
          <el-checkbox label="武钢水尺" ></el-checkbox>
          <el-checkbox label="有隔舱"></el-checkbox>
          <el-checkbox label="有横梁" ></el-checkbox>
          <el-checkbox label="有打孔" ></el-checkbox>
          <el-checkbox label="可自卸"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <div class="mb20">
        <el-divider direction="vertical"/> <span class="weight">详细信息</span>
      </div>
      <el-form-item label="船长(米）" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="船宽(米）" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="满载吃水(米）" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="船籍港" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>


      <div class="mb20">
        <el-divider direction="vertical"/> <span class="weight">证件信息</span>
      </div>
      <div>
        <el-form-item label="上传船舶所有权证" prop="">
          <span class="color999">含封面前三页（或国籍证两页）</span>
          <ImageUpload></ImageUpload>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="上传船舶营运证" prop="">
          <span class="color999">（含年审合格证共三张）</span>
          <ImageUpload></ImageUpload>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="上传船舶所有人身份证" prop="">
          <span class="color999">（请保证图片清晰完整）</span>
          <ImageUpload class="mb10"></ImageUpload>

          <ImageUpload></ImageUpload>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="上传船AIS证书" prop="">
          <ImageUpload></ImageUpload>
        </el-form-item>
      </div>


      <div>
        <el-form-item label="上传船舶产权协议"  >
          <ImageUpload></ImageUpload>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="上传产权协议签订人身份证"  prop="">
          <ImageUpload class="mb10"></ImageUpload>

          <ImageUpload></ImageUpload>
        </el-form-item>
      </div>


      <el-form-item label="审核结果" prop="companyName">
        <el-radio-group v-model="radio">
          <el-radio :label="0">审核通过</el-radio>
          <el-radio :label="1">审核不通过</el-radio>
        </el-radio-group>
      </el-form-item>

      <div>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
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
