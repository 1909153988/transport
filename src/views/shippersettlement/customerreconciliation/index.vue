<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
      <el-select size="small mr5" value="">
        <el-option value="" label="开单时间"></el-option>
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

      <el-select size="small mr5" value="">
        <el-option value="" label="订单号"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>
        <el-select size="small mr5" value="">
        <el-option value="" label="装货地点"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>
      <el-select size="small mr5" value="">
        <el-option value="" label="卸货地点"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>
       <el-select size="small mr5" value="">
        <el-option value="" label="客户名称"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>
         <el-select size="small mr5" value="">
        <el-option value="" label="对账状态"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>
       <el-select size="small mr5" value="">
        <el-option value="" label="核销状态"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>
    </div>
<div class="mb20 flex justify-end"> <el-select size="small mr5" value="">
        <el-option value="" label="开票状态"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>
      <el-button size="small" type="primary" plain>查询</el-button>
       <el-button size="small" type="primary" plain>清空</el-button>
        <el-button size="small" type="primary" plain>导出</el-button></div>
    <div class="mb20">
      <el-button size="small" type="primary" @click="goAdd" plain>生成对账单</el-button>
      <!-- <el-button size="small" type="warning" @click="goEdit" plain>编辑</el-button>
      <el-button size="small" type="danger" plain>删除</el-button>
      <el-button size="small" type="warning" plain>导出</el-button> -->
    </div>

    <el-table
      :data="tableData"

      style="width: 100%">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="date" label="序号" ></el-table-column>
      <el-table-column prop="date" label="订单号" ><span class="operate mr10" @click="goEdit">D12341516</span></el-table-column>
      <el-table-column prop="date" label="客户名称" ></el-table-column>
      <el-table-column prop="date" label="始发地" ></el-table-column>
      <el-table-column prop="date" label="目的地" ></el-table-column>
      <el-table-column prop="date" label="对账单号" width="120"></el-table-column>
      <el-table-column prop="date" label="对账状态" width="120"></el-table-column>
      <el-table-column prop="date" label="开票状态" width="120"></el-table-column>
      <el-table-column prop="date" label="核销状态" ></el-table-column>
      <el-table-column prop="date" label="付款方式" width="120"></el-table-column>
      <el-table-column prop="date" label="总运费" ></el-table-column>
      <el-table-column prop="date" label="已收金额" ></el-table-column>
      <el-table-column prop="date" label="未收金额" ></el-table-column>
      <el-table-column prop="date" label="开单时间" ></el-table-column>
          <el-table-column prop="date" label="完成时间" ></el-table-column>
            <el-table-column prop="date" label="备注" ></el-table-column>
      <!-- <el-table-column prop="date" label="操作" fixed="right" width="200px">
        <template slot-scope="data">
          <span class="operate mr10">编辑</span>
          <span class="operate">删除</span>
        </template>
      </el-table-column> -->
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
       this.$router.push("/order/orderdetails")  
    }
  }
}
</script>

<style scoped>

</style>

