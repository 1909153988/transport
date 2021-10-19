<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" inline>
      <div class="mb20">
        <el-divider direction="vertical" /> <span class="weight">基础信息</span>
      </div>
      <el-form-item label="运单编号" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="运单状态">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="签收时间">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="是否开票">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="关联单号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="开单时间">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="计划提货时间">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="计划到货时间">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="托运人">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="运输类型">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="选择常发线路">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <div class="mb20">
            <el-divider direction="vertical" />
            <span class="weight">发货方</span>
          </div>
          <el-form-item label="发货联系人">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="地区（省市区（县））">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="街道-门牌号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div class="mb20">
            <el-divider direction="vertical" />
            <span class="weight">收货方</span>
          </div>
          <el-form-item label="发货联系人">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="地区（省市区（县））">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="街道-门牌号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="mb20">
        <el-divider direction="vertical" /> <span class="weight">货物信息</span>
      </div>
      <el-form-item label="货物名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="货物类型">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="计划装货量">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="货值(元)">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="合理亏吨">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="结算重量">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <div class="mb20">
        <el-divider direction="vertical" /> <span class="weight">交易信息</span>
      </div>
      <el-form-item label="单价">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="付款方式">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="亏吨单价">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="实装数量">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="实收数量">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="结算运费">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="货运险方案">
        <el-input v-model="form.name"></el-input>
        <span>具体以保险对接方案为准（要有保险方案说明以及保险金额显示）</span>
      </el-form-item>
      <el-form-item label="是否为长期货源">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="总运费：">
        <span>100000元（服务费：100元；保险费：xxx元）</span>
      </el-form-item>
      <el-form-item label="承运司机">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="承运车辆">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="计划配载量">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="运费收款人">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <div class="mb20">
        <el-divider direction="vertical" /> <span class="weight">其它</span>
      </div>

      <el-form-item label="车型要求">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="车长要求">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="货源码">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input v-model="form.name" type="textarea" :rows="5"></el-input>
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
