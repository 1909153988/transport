<template>
  <div class="app-container">
    <el-row>
      <div class="mb20 flex justify-end">
        <el-col :span="6">
          <el-input v-model="approve" placeholder="受票方"></el-input
        ></el-col>
        <el-col :span="6">
          <el-input v-model="approve" placeholder="发票号"></el-input
        ></el-col>
        <el-col :span="6">
          <el-date-picker
            class="mr10"
            size="small"
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker
        ></el-col>
        <el-col :span="6"
          ><el-input v-model="approve" placeholder="发票代码"></el-input></el-col>

        <el-col :span="6">
          <el-button size="small" type="primary" plain>查询</el-button>
          <el-button size="small" type="primary" plain>清空</el-button>
         </el-col
        >
      </div>
    </el-row>
    <div class="mb20">
      <el-button size="small" type="danger"  plain
        >作废发票</el-button
      >
       <el-button size="small" type="primary" plain>导出</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="date" label="序号"></el-table-column>
      <el-table-column prop="date" label="受票方"></el-table-column>
      <el-table-column prop="date" label="发票代码"></el-table-column>
      <el-table-column prop="date" label="发票号码"></el-table-column>
      <el-table-column prop="date" label="开票日期"></el-table-column>
      <el-table-column
        prop="date"
        label="发票金额"
        width="120"
      ></el-table-column>
      <el-table-column prop="date" label="操作人" width="120"></el-table-column>
      <el-table-column
        prop="date"
        label="对账单号"
        width="120"
      ></el-table-column>
      <el-table-column prop="date" label="出票方"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      approve: "",
      tableData: [{ date: "1111" }],
      time: [],
    };
  },
  methods: {
    goAdd() {
      this.$router.push("/carriersettlement/addpaymentaudit");
    },
    goEdit() {
      this.$router.push("/filemanagement/editcar");
    },
    goyundan() {
      this.$router.push("/transport/editwaybill");
    },
  },
};
</script>

<style scoped>
</style>

