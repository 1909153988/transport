<template>
  <div class="app-container">
      <div class="mb20">
        <el-form ref="form" :model="form" label-width="150px" inline>
          <el-form-item label="运单编号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="运单状态">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="签收时间">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>

        <el-table
          :data="tableData"

          style="width: 100%">
          <el-table-column type="selection" ></el-table-column>
          <el-table-column prop="date" label="序号" ></el-table-column>
          <el-table-column prop="date" label="卡号" ></el-table-column>
          <el-table-column prop="date" label="加油金额" ></el-table-column>
          <el-table-column prop="date" label="抵扣运费" ></el-table-column>
          <el-table-column prop="date" label="油气服务商" ></el-table-column>
          <el-table-column prop="date" label="油气类型" ></el-table-column>
          <el-table-column prop="date" label="油气卡类型" ></el-table-column>
          <el-table-column prop="date" label="状态" ></el-table-column>
          <el-table-column prop="date" label="申请时间" ></el-table-column>
          <el-table-column prop="date" label="申请人" >
<!--            <template slot-scope="data">-->
<!--              <span class="operate mr10">查看</span>-->
<!--              <span class="operate mr10">删除</span>-->
<!--            </template>-->
          </el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script>
export default {
  data(){

    return {
      form:{name:''},
         tableData: [{ date: "1111" }],
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.el-divider--vertical {
  width: 5px;
  height: 1.5em;
  background-color: #1890ff;
}
</style>
