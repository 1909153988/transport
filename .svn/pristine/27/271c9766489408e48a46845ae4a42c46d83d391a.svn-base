<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
      <el-input
        style="width:100px;height:32px"
          class="search mr5"
          size="medium"
          placeholder="汇款方"
        ></el-input>
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
        end-placeholder="结束日期">
      </el-date-picker>

      <el-button size="small" type="primary" plain>查询</el-button>
    </div>

    <div class="mb20">
      <el-button size="small" type="primary" @click="goAdd" plain>创建</el-button>
      <!-- <el-button size="small" type="warning" @click="goEdit" plain>编辑</el-button> -->
      <el-button size="small" type="danger" plain>删除</el-button>
      <el-button size="small"  type="primary" plain>导出</el-button>
    </div>

    <el-table
      :data="tableData"

      style="width: 100%">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="date" label="序号" ></el-table-column>
      <el-table-column prop="date" label="汇款方" ></el-table-column>
      <el-table-column prop="date" label="联系电话" ></el-table-column>
      <el-table-column prop="date" label="汇款账号" ></el-table-column>
      <el-table-column prop="date" label="流水号" ></el-table-column>
      <el-table-column prop="date" label="汇款金额" width="120"></el-table-column>
      <el-table-column prop="date" label="核销金额" width="120"></el-table-column>
      <el-table-column prop="date" label="收款类型" width="120"></el-table-column>
      <el-table-column prop="date" label="支付方式" ></el-table-column>
      <el-table-column prop="date" label="核销状态" width="120"></el-table-column>
      <el-table-column prop="date" label="关联单据" ></el-table-column>
      <el-table-column prop="date" label="收款账号" ></el-table-column>
      <el-table-column prop="date" label="汇款时间" ></el-table-column>
      <el-table-column prop="date" label="录入时间" ></el-table-column>
      <el-table-column prop="date" label="录入人" ></el-table-column>
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
      this.$router.push("/shippersettlement/addcollection")
    },
    goEdit(){
      this.$router.push("/filemanagement/editcar")
    }
  }
}
</script>

<style scoped>

</style>

