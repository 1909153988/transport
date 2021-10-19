<template>
  <div class="app-container"><div class="mb20 flex justify-end">
    <el-row>
      <div class="mb20">
        <el-input
        style="width:100px;height:32px"
          class="search mr5"
          size="medium"
          placeholder="对账单号"
        ></el-input>

        <el-select size="small mr5" value="">
          <el-option value="" label="结算状态"></el-option>
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
          end-placeholder="结束日期"
        >
        </el-date-picker>

      
        <el-input
        style="width:100px;height:32px"
          class="search mr5"
          size="medium"
          placeholder="结算对象"
        ></el-input>
        <el-button size="small" type="primary" plain>查询</el-button>
         <el-button size="small" type="primary" plain>清空</el-button>
      </div>
    </el-row>
</div>
     
    <div class="mb20">
      <!-- <el-button size="small" type="primary" @click="goAdd" plain
        >解除对账单</el-button
      > -->
       <el-button size="small" type="danger" plain
        >解除对账单</el-button
      >
       <el-button size="small" type="primary" plain>导出</el-button>
      <!-- <el-button size="small" type="warning" @click="goEdit" plain
        >编辑</el-button
      >
      <el-button size="small" type="danger" plain>删除</el-button>
      <el-button size="small" type="warning" plain>导出</el-button> -->
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="date" label="序号"></el-table-column>
      <el-table-column prop="date" label="对账单号"> <span  @click="goAdd()" class="operate mr10">201270105</span></el-table-column>
      <el-table-column prop="date" label="结算对象"></el-table-column>
      <el-table-column prop="date" label="结算状态"></el-table-column>
      <el-table-column prop="date" label="应收金额"></el-table-column>
      <el-table-column
        prop="date"
        label="已收金额"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="未收金额"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
        width="120"
      ></el-table-column>
      <el-table-column prop="date" label="退回时间"></el-table-column>
      <el-table-column
        prop="date"
        label="退回原因"
        width="120"
      ></el-table-column>
      <el-table-column prop="date" label="退回人"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  },
};
</script>

<style scoped>
</style>

