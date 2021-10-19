<template>
  <div>
    <div class="mb20">
      <!-- <el-divider direction="vertical" /> <span class="weight">绑定发票</span> -->
       <el-divider content-position="left">绑定发票</el-divider>
    </div>

    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="发票代码" required>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="发票代码" required>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="发票代码" required>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="发票代码" required>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="发票代码" required>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="发票类型" required>
        <el-select size="small mr5" value="">
          <el-option value="" label="司机姓名"></el-option>
          <el-option value="1" label="手机号"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择时间" required>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" plain @click="onSubmit">确认</el-button>
        <el-button  type="primary">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "RuoyiUiIndex",
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      value1: "",
    };
  },
  mounted() {},
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.mb20 {
  margin-top: 20px;
}
.el-divider--vertical {
  width: 5px;
  height: 1.5em;
  background-color: #1890ff;
}
.el-form {
}
</style>