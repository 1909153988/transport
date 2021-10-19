<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
      <el-select size="small mr5" value="">
        <el-option value="" label="审核通过"></el-option>
        <el-option value="1" label="审核不通过"></el-option>
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
      </el-date-picker>

      <el-select size="small mr5" value="">
        <el-option value="" label="船舶名称"></el-option>
        <el-option value="1" label="船东手机号"></el-option>
        <el-option value="2" label="船东名称"></el-option>
      </el-select>
      <el-input class="search mr5" size="small"></el-input>
      <el-button size="small" type="primary">查询</el-button>
    </div>

    <div class="mb20">
      <el-button size="small" type="primary" @click="goAdd()">新建</el-button>
      <el-button size="small" type="danger">删除</el-button>
      <el-button size="small" type="warning">导出</el-button>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="date" label="序号" ></el-table-column>
      <el-table-column prop="date" label="船舶" ></el-table-column>
      <el-table-column prop="date" label="船东姓名" ></el-table-column>
      <el-table-column prop="date" label="审核状态" ></el-table-column>
      <el-table-column prop="date" label="MMSI(9位码)" ></el-table-column>
      <el-table-column prop="date" label="载货(吨)" ></el-table-column>
      <el-table-column prop="date" label="创建人" ></el-table-column>
      <el-table-column prop="date" label="创建时间" ></el-table-column>
      <el-table-column prop="date" label="操作" fixed="right" width="200px">
        <template slot-scope="data">
          <span class="operate mr10">编辑</span>
          <span class="operate">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tableData:[],
      time:[]
    }
  },
  methods: {
    goAdd(){
      this.$router.push("/member/ship/edit")
    }
  }
}
</script>

<style scoped>

</style>

