<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="图表">

        <h2>客户应收款金额</h2>
        <div id="myChart" :style="{ width: '30vw', height: '500px' }"></div>
      </el-tab-pane>
      <el-tab-pane label="数据">
        <div class="flex mb20">
          <div>
            <el-select size="small mr5" value="">
              <el-option value="2" label="客户名称"></el-option>
              <el-option value="1" label="开发人"></el-option>
            </el-select>
            <el-input class="search mr5" size="small" placeholder=""></el-input>
            <el-button size="small" type="primary" plain>查询</el-button>
            <el-button size="small" type="warning" plain>导出</el-button>
          </div>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="date" label="客户名称" ></el-table-column>
          <el-table-column prop="date" label="客户开发人" ></el-table-column>
          <el-table-column prop="date" label="应收款金额(元)" ></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!--       <el-button type="primary" plain>图表</el-button>-->
    <!--         <el-button type="info" plain>数据</el-button>-->

  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          color:'#5C7BD9',
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
