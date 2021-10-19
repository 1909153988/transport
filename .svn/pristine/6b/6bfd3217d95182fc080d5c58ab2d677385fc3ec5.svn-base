<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="图表">
        <div class="flex">
          <div>
            <el-date-picker
              class="mr10"
              size="small"
              v-model="time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div>
            <el-input class="search mr5" size="small" placeholder="客户名称"></el-input>
            <el-button size="small" type="primary" plain>查询</el-button>
          </div>
        </div>
        <h2>公司毛利报表</h2>
        <div id="myChart" :style="{ width: '30vw', height: '500px' }"></div>
      </el-tab-pane>
      <el-tab-pane label="数据">
        <div class="flex mb20">
           
          <div>
            <el-date-picker
              class="mr10"
              size="small"
              v-model="time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div>
            <el-input class="search mr5" size="small" placeholder="客户名称"></el-input>
            <el-input class="search mr5" size="small" placeholder="始发地"></el-input>
            <el-input class="search mr5" size="small" placeholder="目的地"></el-input>
              <el-input class="search mr5" size="small" placeholder="运单号"></el-input>
             <el-button size="small" type="primary" plain>查询</el-button>
            <el-button size="small" type="primary" plain>导出表格</el-button>
          </div>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="date" label="序号" ></el-table-column>
          <el-table-column prop="date" label="订单号" ></el-table-column>
          <el-table-column prop="date" label="始发地" ></el-table-column>
          <el-table-column prop="date" label="目的地" ></el-table-column>
          <el-table-column prop="date" label="订单开单时间" ></el-table-column>
          <el-table-column prop="date" label="客户名称" ></el-table-column>
          <el-table-column prop="date" label="联系人" ></el-table-column>
          <el-table-column prop="date" label="客户开发人" ></el-table-column>
          <el-table-column prop="date" label="订单总运费" ></el-table-column>
          <el-table-column prop="date" label="运单号" ></el-table-column>
          <el-table-column prop="date" label="运单开单时间" ></el-table-column>
          <el-table-column prop="date" label="运单签收时间" ></el-table-column>
          <el-table-column prop="date" label="运单总运费" ></el-table-column>
          <el-table-column prop="date" label="单票毛利" ></el-table-column>
          <el-table-column prop="date" label="单票毛利率" ></el-table-column>
<!--          <el-table-column prop="date" label="操作" fixed="right" width="200px">-->
<!--            <template slot-scope="data">-->
<!--              <span class="operate mr10">删除</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
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
