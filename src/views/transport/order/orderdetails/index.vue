<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <Basic></Basic>
      </el-tab-pane>
      <!-- <el-tab-pane label="运单跟踪">
        <Track></Track>
      </el-tab-pane> -->
      <el-tab-pane label="承运信息">
        <Settlement></Settlement>
      </el-tab-pane>
      <!-- <el-tab-pane label="结算信息">
        <Annex></Annex>
      </el-tab-pane> -->
      <!-- <el-tab-pane label="加油记录">
        <GasUp></GasUp>
      </el-tab-pane> -->
      <el-tab-pane label="操作日志">
        <Operating></Operating>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
import Basic from './basic/index'
import Track from './track/index'
import Settlement from './settlement/index'
// import Annex from './orderdetails/edit/annex/index'
import GasUp from './gasUp/index'
import Operating from './operating/index'
export default {
  data(){

    return {
      form:{},
    }
  },
  components:{
    Basic,
    Track,
    Settlement,
    // Annex,
    GasUp,
    Operating
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
