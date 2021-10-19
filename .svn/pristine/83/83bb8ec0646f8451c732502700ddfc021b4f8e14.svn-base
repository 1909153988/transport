<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <div class="mb20 flex justify-end">
        <!-- <el-select size="small mr5" value="">
        <el-option value="" label="已启用"></el-option>
        <el-option value="1" label="已停用"></el-option>
        <el-option value="1" label="待审核"></el-option>
      </el-select> -->
        <el-form-item label="受票方">
          <el-input class="search mr5" size="small"></el-input>
        </el-form-item>
        <el-form-item label="发票号">
          <el-input class="search mr5" size="small"></el-input>
        </el-form-item>
        <el-form-item>
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
        </el-form-item>

        <el-form-item label="发票代码">
          <el-input class="search mr5" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" plain
            >查询</el-button
          ></el-form-item
        >
      </div>

      <div class="mb20">
        <el-button size="small" type="primary" @click="goAdd" plain
          >作废发票</el-button
        >
        <el-button size="small" type="warning" @click="goEdit" plain
          >编辑</el-button
        >
        <el-button size="small" type="danger" plain>删除</el-button>
        <el-button size="small" type="warning" plain>导出</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="date" label="序号"></el-table-column>
        <el-table-column prop="date" label="车牌号"></el-table-column>
        <el-table-column prop="date" label="审核状态"></el-table-column>
        <el-table-column prop="date" label="牌照类型"></el-table-column>
        <el-table-column prop="date" label="车辆分类"></el-table-column>
        <el-table-column
          prop="date"
          label="核定载质量(吨)"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="道路运输证字号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="经营许可证号"
          width="120"
        ></el-table-column>
        <el-table-column prop="date" label="行驶证状态"></el-table-column>
        <el-table-column
          prop="date"
          label="道路运输证状态"
          width="120"
        ></el-table-column>
        <el-table-column prop="date" label="行驶证"></el-table-column>
        <el-table-column prop="date" label="道路运输证"></el-table-column>
        <el-table-column prop="date" label="创建人"></el-table-column>
        <el-table-column prop="date" label="创建时间"></el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{ date: "1111" }],
      time: [],
      form: {
        name: [],
      },
    };
  },
  methods: {
    goAdd() {
      this.$router.push("/shippersettlement/addcollection");
    },
    goEdit() {
      this.$router.push("/filemanagement/editcar");
    },
  },
};
</script>

<style scoped>
</style>

