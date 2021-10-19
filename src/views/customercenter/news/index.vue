<template>
  <div class="app-container">

    <div class="mb20">
      <el-button size="small" class="mr20" type="warning" @click="goInfo" plain>批量删除</el-button>

      <el-select size="small" class="mr20" value="" placeholder="状态" clearable>
        <el-option value="" label="全部"></el-option>
        <el-option value="2" label="未处理"></el-option>
        <el-option value="1" label="已处理"></el-option>
      </el-select>


      <el-date-picker
        class="mr10"
        size="small"
        v-model="time"
        type="month">
      </el-date-picker>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="date" label="" >
        <template slot-scope="data">
          <h2>会员信息审核</h2>
          <p class="color999">会员信息审核不通过</p>
          <span class="color999">2021.05.24</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="" fixed="right" width="200px">
        <template slot-scope="data">
          <span class="operate mr10" @click="goInfo">详情</span>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog
      title="会员信息审核"
      :visible.sync="dialogVisible"
      width="50%"
      center
    >
      <p class="color333">会员信息审核不通过</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tableData:[{
        date:'111'
      },{
        date:'111'
      }],
      time:[],
      dialogVisible: false,
      form:{},
    }
  },
  methods: {
    goInfo(){
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>

</style>

