<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="月">
        <div class="flex">
          <div>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
          <div style="margin-left: 20px">
            <!-- <el-input class="search mr5" size="small" placeholder="客户名称"></el-input> -->
            <el-button size="small" type="primary" plain>统计</el-button>
          </div>
        </div>
        <h2>货量统计</h2>
        <div id="myChart" :style="{ width: '30vw', height: '500px' }"></div>
      </el-tab-pane>
      <el-tab-pane label="日">
       <div class="flex">
          <div>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
          <div style="margin-left: 20px">
            <!-- <el-input class="search mr5" size="small" placeholder="客户名称"></el-input> -->
            <el-button size="small" type="primary" plain>统计</el-button>
               <el-button size="small" type="primary" plain>导出当前统计</el-button>
          </div>
        </div>
        <h2>货量统计</h2>
        <div id="myChart" :style="{ width: '30vw', height: '500px' }"></div>
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
      value1:"",
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
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            color: "#5C7BD9",
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
