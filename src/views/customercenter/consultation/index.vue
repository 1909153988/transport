<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
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

      <el-select size="small mr5" value="">
        <el-option value="" label="类别"></el-option>
        <el-option value="1" label="回复状态"></el-option>
      </el-select>
      <el-select size="small mr5" value="">
        <el-option value="" label="回复状态"></el-option>
        <el-option value="1" label="合同编号"></el-option>
      </el-select>

      <el-input class="search mr5" size="small" placeholder="姓名/手机号"></el-input>
      <el-button size="small" type="primary" plain style="margin-left:10px">查询</el-button>
        <el-button size="small" type="primary" plain @click="goAdd()">新建</el-button>
    </div>
    <div class="mb20">
    
      <!-- <el-button size="small" type="danger">删除</el-button>
      <el-button size="small" type="warning">导出</el-button> -->
    </div>
    <el-table :data="tableData" style="width: 100%;margin-top:40px">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="date" label="序号"></el-table-column>
      <el-table-column prop="date" label="操作"></el-table-column>
      <el-table-column prop="date" label="类别"></el-table-column>
      <el-table-column prop="date" label="消息状态"></el-table-column>
      <el-table-column prop="date" label="处理结果"></el-table-column>
      <el-table-column prop="date" label="发布人"></el-table-column>
      <el-table-column prop="date" label="用户角色"></el-table-column>
      <el-table-column prop="date" label="对方"></el-table-column>
      <el-table-column prop="date" label="账期"></el-table-column>
      <el-table-column prop="date" label="消息内容"></el-table-column>
      <el-table-column prop="date" label="发布时间"></el-table-column>
      <el-table-column prop="date" label="回复内容"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    goAdd() {
      this.$router.push("/customercenter/addconsultation");
    },
  },
};
</script>

<style scoped>
</style>
