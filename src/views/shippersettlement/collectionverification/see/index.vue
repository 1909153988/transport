<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
      <el-button size="small" type="danger" plain>取消核销</el-button>
    </div>

    <!-- <div class="mb20">
      <el-button size="small" type="primary" @click="goAdd" plain>取消核销</el-button>
      <el-button size="small" type="warning" @click="goEdit" plain>编辑</el-button>
      <el-button size="small" type="danger" plain>删除</el-button>
      <el-button size="small" type="warning" plain>导出</el-button>
    </div> -->

    <el-table
      :data="tableData"

      style="width: 100%">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="date" label="序号" ></el-table-column>
      <el-table-column prop="date" label="汇款方" ></el-table-column>
      <el-table-column prop="date" label="汇款账号" ></el-table-column>
      <el-table-column prop="date" label="汇款银行" ></el-table-column>
      <el-table-column prop="date" label="核销金额" ></el-table-column>
      <el-table-column prop="date" label="汇款时间" width="120"></el-table-column>
      <el-table-column prop="date" label="核销人" width="120"></el-table-column>
      <el-table-column prop="date" label="核销时间" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tableData:[
        {date:'1111'}
      ],
      time:[]
    }
  },
  methods: {
    goAdd(){
      this.$router.push("/shippersettlement/reconciliationdetails")
    },
    goEdit(){
      this.$router.push("/filemanagement/editcar")
    }
  }
}
</script>

<style scoped>

</style>

