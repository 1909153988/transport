<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <div class="mb20 flex justify-end">
        <!-- <el-select size="small mr5" value="">
        <el-option value="" label="已启用"></el-option>
        <el-option value="1" label="已停用"></el-option>
        <el-option value="1" label="待审核"></el-option>
      </el-select>

      <el-date-picker
        class="mr10"
        size="small"
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker> -->
        <!-- 
      <el-select size="small mr5" value="">
        <el-option value="" label="司机姓名"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select> -->
        <el-form-item label="未收金额">
          <el-input class="search mr5" size="small"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input class="search mr5" size="small"></el-input>
        </el-form-item>
        <!-- <el-button size="small" type="primary" plain>查询</el-button> -->
      </div>

      <!-- <div class="mb20">
        <el-button size="small" type="primary" @click="goAdd" plain
          >收款核销</el-button
        >
        <el-button size="small" type="warning" @click="goEdit" plain
          >编辑</el-button
        >
        <el-button size="small" type="danger" plain>删除</el-button>
        <el-button size="small" type="warning" plain>导出</el-button>
      </div> -->

      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="date" label="序号"></el-table-column>
        <el-table-column prop="date" label="流水"></el-table-column>
        <el-table-column prop="date" label="汇款金额"></el-table-column>
        <el-table-column prop="date" label="未核销金额"></el-table-column>
        <el-table-column prop="date" label="收款时间"></el-table-column>
      </el-table>

      <!-- <el-form-item  label=" " style="margin-left: 0px !important;"> -->
        <el-button type="primary" style="margin-top:20px" @click="submitForm('form')" plain
          >确定</el-button
        >
           <el-button  @click="submitForm('form')" plain
          >取消</el-button
        >
      <!-- </el-form-item> -->
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
      tableData: [{ date: "1111" }],
      time: [],
    };
  },
  methods: {
    goAdd() {
      this.$router.push("/shippersettlement/reconciliationdetails");
    },
    goEdit() {
      this.$router.push("/filemanagement/editcar");
    },
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
.el-form-item{
    margin-left: 0px;
}
</style>

