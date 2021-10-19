<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <div class="mb20">
        <el-divider direction="vertical"/> <span class="weight">新增</span>
      </div>
      <el-form-item label="类别" required prop="">
        <el-select size="small mr5" value="">
        <el-option value="" label="咨询"></el-option>
        <el-option value="1" label="回复"></el-option>
      </el-select>
      </el-form-item>
       <el-form-item label="内容" required>
        <el-input v-model="form.name" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="附件" prop="" required>
        <ImageUpload></ImageUpload>
      </el-form-item>
      <el-form-item label="联系人" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="联系手机号" required>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <div>
        <el-form-item label=" ">
          <el-button type="primary" plain @click="submitForm('form')">确定</el-button>
              <el-button  plain @click="submitForm('form')">取消</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import ImageUpload  from '../../../../components/ImageUpload/index'
export default {
  data(){
    let checkCompany = (rule , value , callback) => {
      if(!value) {
        return callback(new Error('不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          console.log(value)
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      },1000)

    }
    return {
      form:{
        name:''
      },
      rules:{
        companyName:[
          {required:true , message:'不能为空'},
          {validator:checkCompany , trigger : 'blur'}
        ]
      }
    }
  },
  components:{
    ImageUpload
  },
  methods:{
    submitForm(formName) {
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
