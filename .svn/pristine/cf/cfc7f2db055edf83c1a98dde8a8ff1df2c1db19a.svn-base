<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" inline>
      <div v-if="">
        <div >
          <el-form-item label="调车方式" prop="companyName">
            <el-radio-group v-model="radio">
              <el-radio :label="3">指派车辆（指派给指定车辆和司机）</el-radio>
            </el-radio-group>
            <el-radio-group v-model="radio">
              <el-radio :label="3">平台找车</el-radio>
            </el-radio-group>
            <el-radio-group v-model="radio">
              <el-radio :label="3">货源码找车</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-form-item label="单价">
          <el-input v-model="form.name"></el-input>

          <el-select size="" value="元/车">
            <el-option value="1" label="元/车"></el-option>
            <el-option value="2" label="元/吨"></el-option>
            <el-option value="3" label="元/方"></el-option>
            <el-option value="4" label="元/件"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款方式">
          <el-select size="" value="现付">
            <el-option value="1" label="现付"></el-option>
            <el-option value="1" label="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否开票">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>

        <el-row>
          <el-form-item label="货运险方案">
            <el-radio-group v-model="radio">
              <el-radio :label="3">不投保</el-radio>
              <el-radio :label="6">综合险</el-radio>
              <el-radio :label="9">基本险</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="margin-left: 40px"
            >具体以保险对接方案为准（要有保险方案说明以及保险金额显示）</el-form-item
          >
        </el-row>
      </div>

      <div v-if style="margin-top: 60px">
        <el-form-item label="承运司机">
          <el-select size="" value="">
            <el-option value="1" label="货车"></el-option>
            <el-option value="1" label="大货车"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="承运车辆">
          <el-select size="" value="">
            <el-option value="1" label="货车"></el-option>
            <el-option value="1" label="大货车"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划配载量">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="运费收款人">
          <el-select size="" value="">
            <el-option value="1" label="货车"></el-option>
            <el-option value="1" label="大货车"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="mb10">
            <el-button type="primary" plain>新增</el-button>
          </div></el-form-item
        >

        <el-table :data="tableData" class="mb20" style="width: 100%">
          <el-table-column prop="date" label="承运司机"></el-table-column>
          <el-table-column prop="date" label="承运车辆"></el-table-column>
          <el-table-column prop="date" label="计划配载量"></el-table-column>
          <el-table-column prop="date" label="运费收款人"></el-table-column>
          <el-table-column prop="date" label="操作"
            ><span class="operate mr10" @click="isShow = true"
              >删除</span
            ></el-table-column
          >
        </el-table>
      </div>

      <div style="display: flex; justify-content: center">
        <el-form-item label="">
          <el-button type="primary" plain @click="submitForm('form')"
            >发布</el-button
          >
          <el-button type="primary" plain @click="submitForm('form')"
            >取消</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    let checkCompany = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          console.log(value);
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      value: "",
      tableData: [{ date: "1111" }],
      radio: 1,
      
      form: {},
      rules: {
        companyName: [
          { required: true, message: "不能为空" },
          { validator: checkCompany, trigger: "blur" },
        ],
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
