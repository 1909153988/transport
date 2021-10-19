<template>
  <div>
    <!--    <iframe  src="http://wang_xin411.gitee.io/echarts/" id="mobsf" scrolling="no" frameborder="0" style="position:absolute;"></iframe>-->

    <div class="app-container" style="height: auto; font-weight: bold;  overflow: auto; background-color: rgba(23,106,208,0.54)">

      <el-card   class="bg-initial"  style="width: 480px;float: left;">
        <div slot="header"  >
          <span>单量排名</span>
<!--          <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>-->
        </div>
        <el-form label-width="100px">

          <el-form-item label="北京">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
          </el-form-item>
          <el-form-item label="上海">

            <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
          </el-form-item>
          <el-form-item label="广州">

            <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
          </el-form-item>
          <el-form-item label="深圳">
            <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
          </el-form-item>

        </el-form>
      </el-card>



      <el-card  class="bg-initial" style="width: 280px; float: left">
        <div slot="header" >
          <span>本月运单数</span>
        </div>
        <div class="text item number-text">
          1111
        </div>
      </el-card>
      <el-card  class="bg-initial"  style="width: 280px; float: left">
        <div slot="header"  >
          <span>本月运单数</span>
        </div>
        <div class="text item number-text">
          2223
        </div>
      </el-card>
      <el-card   class="bg-initial"  style="width: 280px; float: left">
        <div slot="header"  >
          <span>本月运单数</span>
        </div>
        <div class="text item number-text" >
          3355
        </div>
      </el-card>


















    </div>


  </div>
</template>

<style type="text/css">
  .bg-initial{background-color: initial; color: white;}
  .number-text{text-align: center; height: 60px; line-height: 60px; font-size: 20px; color: #e6ea2e
  }

</style>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      /**
       * iframe-宽高自适应显示
       */
      function changeMobsfIframe() {
        const mobsf = document.getElementById('mobsf');
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        mobsf.style.width = (Number(deviceWidth) - 120) + 'px'; //数字是页面布局宽度差值
        mobsf.style.height = (Number(deviceHeight) - 80) + 'px'; //数字是页面布局高度差
      }

      changeMobsfIframe()

      window.onresize = function () {
        changeMobsfIframe()
      }
    },
  }
</script>
