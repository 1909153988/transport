<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <div class="mb20">
         <el-divider content-position="left">编辑收款人（请勿输入信用卡卡号及对公账户）</el-divider>
        <!-- <el-divider direction="vertical"/> <span class="weight">编辑收款人（请勿输入信用卡卡号及对公账户）</span> -->
      </div>
      <el-form-item label="开户人姓名" prop="companyName">
        <el-input v-model="form.kaihuName"></el-input>
      </el-form-item>
      <el-form-item label="银行卡号" required>
        <el-input v-model="form.accountBank"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" required>
        <el-input v-model="form.idCardNumber"></el-input>
      </el-form-item>
      <el-form-item label="开户银行" required>
        <el-input v-model="form.kaihuBank"></el-input>
      </el-form-item>
      <el-form-item label="收款人电话" >
        <el-input v-model="form.payeePhone"></el-input>
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
      form:{},
      rules:{
        companyName:[
          {required:true , message:'不能为空'},
          {validator:checkCompany , trigger : 'blur'}
        ]
      }
    }
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
