<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <div class="mb20">
        <!-- <el-divider direction="vertical" /> -->
        <!-- <span class="weight">创建收款记录</span> -->
        <el-divider content-position="left">创建收款记录</el-divider>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="收款方" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收款账号" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="收款银行" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="汇款方" prop="companyName">
            <el-select size="small mr5" value="">
              <el-option value="" label="司机姓名"></el-option>
              <el-option value="1" label="手机号"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="汇款账号" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="收款方" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收款账号" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="收款方" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="汇款时间" prop="companyName">
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="收款方" prop="companyName">
            <el-select size="small mr5" value="">
              <el-option value="" label="司机姓名"></el-option>
              <el-option value="1" label="手机号"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="汇款时间" prop="companyName">
            <el-select size="small mr5" value="">
              <el-option value="" label="司机姓名"></el-option>
              <el-option value="1" label="手机号"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注说明">
        <el-input v-model="form.name" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <div>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('form')" plain
            >确定</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: [],
      },
      value1: "",
      carList: [],
      payeeList: [],
      rules: {
        companyName: [{ required: true, message: "不能为空" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addCar() {},
    addPayee() {},
  },
};
</script>

<style scoped>
.el-divider--vertical {
  width: 5px;
  height: 1.5em;
  background-color: #1890ff;
}
</style>
