<template>
  <div class="home flex ">

    <div class="left">
      <div class="left-top">
        <div class="left-top-title">当前运力</div>
        <div>1,241,654,897</div>
      </div>
      <div class="left-center">
        <div class="left-center-title">当前客户付款情况</div>
        <div id="chart1"></div>
      </div>
      <div class="left-bottom">
        <div class="left-bottom-title">今日运力审核情况</div>
        <div id="chart2"></div>
      </div>
    </div>
    <div class="center">
      <div class="center-top">
        <div class="center-top-title">网络物流运营平台</div>
      </div>
      <div class="center-center flex justify-around">
        <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=ya&skin=pitaya&color=ffffff" frameborder="0" width="320" height="200" allowtransparency="true"></iframe>
<!--        <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=ty&skin=pitaya&color=ffffff" frameborder="0" width="300" height="75" allowtransparency="true"></iframe>-->
        <NowDate style="padding-top: 15px" class="flex-shrink"></NowDate>
      </div>
      <div class="center-bottom">
        <div id="chart4"></div>
      </div>
    </div>
    <div class="right">
      <div class="right-top">
        <div class="right-top-title">今日运力审核情况</div>
        <div id="chart3"></div>
      </div>
      <div class="right-center">
        <div class="right-center-title">今日运单数</div>
        <div class="right-center-content">45,687,654</div>
      </div>
      <div class="right-bottom">
        <div class="right-bottom-title">今日审批数</div>
        <div class="right-bottom-content">656,541</div>
      </div>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import NowDate from '../components/NowDate/NowDate'
export default {
  name: "index",
  data() {
    return {
      // 版本号
      version: "2.5.0",
    };
  },
  components:{
    NowDate
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
    handler({ BMap, map }){
      let mapStyle={style:'grayscale'}
      map.setMapStyle(mapStyle);
      // console.log(BMap, map);

    },
    initEcharts(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('chart1'));
      let myChart2 = echarts.init(document.getElementById('chart2'));
      let myChart3 = echarts.init(document.getElementById('chart3'));
      let myChart4 = echarts.init(document.getElementById('chart4'));

      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '30%',
          right: '5%',
          orient:'vertical',
          textStyle:{
            color:'#fff'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            right:'30%',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 1048, name: '搜索引擎'},
              {value: 735, name: '直接访问'},
              {value: 580, name: '邮件营销'},
              {value: 484, name: '联盟广告'},
              {value: 300, name: '视频广告'}
            ]
          }
        ]
      };

      let option2 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        textStyle:{
          color:'#fff'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
          textStyle:{
            color:'#fff'
          }
        },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 300, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 310]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 300, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1300, 1320]
          }
        ]
      }

      let xAxisData = [];
      let data1 = [];
      let data2 = [];
      for (let i = 0; i < 100; i++) {
        xAxisData.push('类目' + i);
        data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
      }

      let option3 = {
        legend: {
          data: ['bar', 'bar2'],
          textStyle:{
            color:'#fff'
          }
        },
        textStyle:{
          color:'#fff'
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ['stack', 'tiled']
            }
          }
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {
        },
        series: [{
          name: 'bar',
          type: 'bar',
          data: data1,
          emphasis: {
            focus: 'series'
          },
          animationDelay: function (idx) {
            return idx * 10;
          }
        }, {
          name: 'bar2',
          type: 'bar',
          data: data2,
          emphasis: {
            focus: 'series'
          },
          animationDelay: function (idx) {
            return idx * 10 + 100;
          }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
      }


      let option4 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['利润', '支出', '收入'],
          textStyle:{
            color:'#fff'
          }
        },
        textStyle:{
          color:'#fff'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        series: [
          {
            name: '利润',
            type: 'bar',
            label: {
              show: true,
              position: 'inside'
            },
            emphasis: {
              focus: 'series'
            },
            data: [200, 170, 240, 244, 200, 220, 210]
          },
          {
            name: '收入',
            type: 'bar',
            stack: '总量',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 341, 374, 390, 450, 420]
          },
          {
            name: '支出',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'left'
            },
            emphasis: {
              focus: 'series'
            },
            data: [-120, -132, -101, -134, -190, -230, -210]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      myChart2.setOption(option2);
      myChart3.setOption(option3);
      myChart4.setOption(option4);
    }
  },
};
</script>

<style scoped lang="scss">
.home {
  background: url('../assets/images/bg.png');
  color: rgba(255, 255, 255, 1);
  height: 100vh;
  .left {
    width:28%;
    height: 100%;
    background: url("../assets/images/line_img.png") no-repeat right;
    .left-top {
      height: 20.4%;
      width: 100%;
      text-align: center;
      line-height: 4.8rem;
      font-size: 3rem;
      padding: 20px;
      background: url("../assets/images/border_bg01.png") no-repeat;
      .left-top-title {
        color:#0e94ea;
        font-size: 1.6rem;
        background: url("../assets/images/title_bg01.png") no-repeat center;
      }
    }
    .left-center {
      height: 37%;
      width: 100%;
      position: relative;
      .left-center-title{
        background: url("../assets/images/box_title.png") no-repeat center;
        padding-left: 3rem;
        font-size: 1.5rem;
        line-height: 3rem;
        background-position-x: 3px;
      }
      #chart1 {
        width: 90%;
        height: 100%;
        position: absolute;
        top:1rem;
        left:0;
        right:0;
        bottom: 0;
        margin:auto;
      }
    }
    .left-bottom {
      height: 42.6%;
      width: 100%;
      position: relative;
      .left-bottom-title{
        background: url("../assets/images/box_title.png") no-repeat center;
        padding-left: 3rem;
        font-size: 1.5rem;
        line-height: 3rem;
        background-position-x: 3px;
      }
      #chart2 {
        width: 90%;
        height: 85%;
        position: absolute;
        top:2rem;
        left:0;
        right:0;
        bottom: 0;
        margin:auto;
      }
    }
  }
  .center {
    width:44%;
    height: 100%;
    .center-top {
      margin-top: 1rem;
      height: 8.8%;
      color: #cdddf7;
      background: url("../assets/images/title_border.png") no-repeat center;
      .center-top-title {
        font-size: 2.5rem;
        font-weight: bold;
        text-align: center;
      }
    }
    .center-center {
      height: 15%;
      width: 100%;
    }
    .center-bottom {
      height: 75%;
      width: 100%;
      position: relative;
      #chart4 {
        width: 90%;
        height: 90%;
        position: absolute;
        top:1rem;
        left:0;
        right:0;
        bottom: 0;
        margin:auto;
      }
    }
  }
  .right {
    width:28%;
    height: 100%;
    padding-left: 20px;
    background: url("../assets/images/line_img.png") no-repeat left;
    .right-top {
      height: 41%;
      width: 100%;
      position: relative;
      .right-top-title {
        font-size: 1.6rem;
        line-height: 3rem;
        padding-left: 3rem;
        background: url("../assets/images/box_title.png") no-repeat left;
      }

      #chart3 {
        width: 90%;
        height: 85%;
        position: absolute;
        top:3rem;
        left:0;
        right:0;
        bottom: 0;
        margin:auto;
      }
    }
    .right-center {
      width: 100%;
      height: 29%;
      .right-center-title {
          font-size: 1.6rem;
          line-height: 3rem;
          padding-left: 3rem;
          background: url("../assets/images/box_title.png") no-repeat left;
      }
      .right-center-content {
        font-size: 3rem;
        text-align: center;
        margin:20px 0;
        line-height: 12rem;
        background: url("../assets/images/bg_img04.png") no-repeat;
      }
    }
    .right-bottom {
      width: 100%;
      height: 30%;
      position: relative;
      .right-bottom-title {
        font-size: 1.6rem;
        line-height: 3rem;
        padding-left: 3rem;
        background: url("../assets/images/box_title.png") no-repeat left;
      }
      .right-bottom-content {
        margin:20px 0;
        height: 70%;
        width: 85%;
        background-color: rgba(14, 148, 234, 0.2);
        border:1px solid #0E94EA;
        text-align: center;
        font-size: 3rem;
        line-height: 12rem;
        position: absolute;
        top:2.5rem;
        left:0;
        right:0;
        bottom: 0;
        margin:auto;
      }
    }
  }
}
</style>

