<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
      <el-select size="small mr5" value="">
        <el-option value="" label="核销状态"></el-option>
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
        style="width: 100px; height: 32px"
        class="search mr5"
        size="medium"
        placeholder="对账单号,结算对象"
      ></el-input>

      <el-button size="small" type="primary" plain>查询</el-button>
    </div>

    <div class="mb20">
      <el-button size="small" type="primary" @click="goAdd" plain
        >收款核销</el-button
      >
      <!-- <el-button size="small" type="warning" @click="goEdit" plain
        >编辑</el-button
      > -->
      <!-- <el-button size="small" type="danger" plain>删除</el-button> -->
      <el-button size="small"  type="primary" plain>导出</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="date" label="序号"></el-table-column>
      <el-table-column prop="date" label="客户名称"></el-table-column>
      <el-table-column prop="date" label="客户联系电话"></el-table-column>
      <el-table-column prop="date" label="对账单号"></el-table-column>
      <el-table-column prop="date" label="核销状态"></el-table-column>
      <el-table-column
        prop="date"
        label="应收金额(元)"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="已收金额(元)"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="未收金额(元)"
        width="120"
      ></el-table-column>
      <el-table-column prop="date" label="创建时间"></el-table-column>
      <el-table-column prop="date" label="创建人"></el-table-column>
      <el-table-column prop="date" label="创建时间"></el-table-column>
      <el-table-column prop="date" label="操作" fixed="right" width="200px">
        <template slot-scope="data">
          <!--          <el-button class="mr5" size="mini">编辑</el-button>-->
          <!--          <el-button class="mr5" size="mini" plain type="danger">删除</el-button>-->
          <span class="operate mr10" @click="goEdit">核销详情</span>
          <!-- <span class="operate">删除</span> -->
        </template>
      </el-table-column>
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
      this.$router.push("/shippersettlement/addcollectionverification");
    },
    goEdit() {
      this.$router.push("/shippersettlement/seecollectionverification");
    },
  },
};
</script>

<style scoped>
</style>

