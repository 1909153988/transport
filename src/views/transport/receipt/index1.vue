<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
      <el-select size="small mr10" value="" placeholder="">
        <el-option value="" label="回单状态"></el-option>
        <el-option value="1" label="签署中"></el-option>
        <el-option value="1" label="签署成功"></el-option>
        <el-option value="1" label="签署失败"></el-option>
        <el-option value="1" label="待承运人确认"></el-option>
      </el-select>

      <el-input
        style="width: 100px; height: 32px"
        class="search mr5"
        size="medium"
        placeholder="运单号"
      ></el-input>

      <el-select size="small mr5" value="" placeholder="">
        <el-option value="" label="托运日期"></el-option>
      </el-select>

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
      <el-button size="small" type="primary" plain>查询</el-button>
      <el-button size="small" type="primary" plain>清空</el-button>
    </div>

    <div class="mb20">
      <el-badge  class="item" :is-dot="false">
        <el-button size="small">全部</el-button>
      </el-badge>
       <el-badge :value="12"   class="item">
        <el-button size="small">待回收</el-button>
      </el-badge>
       <el-badge  :is-dot="false" class="item">
        <el-button size="small">已发放</el-button>
      </el-badge>
       <el-badge   class="item" :is-dot="false">
        <el-button size="small">已回收</el-button>
      </el-badge>
       <el-badge   class="item" :is-dot="false">
         <el-button size="small" type="primary" @click="goAdd" plain
        >导出</el-button
      >
      </el-badge>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="answerStatus" label="回单状态"></el-table-column>
      <el-table-column prop="date" label="回单详情"></el-table-column>
      <el-table-column prop="courierNumber" label="快递单号"></el-table-column>
      <el-table-column prop="shipDate" label="托运日期"></el-table-column>
      <el-table-column
        prop="goodsName"
        label="货物名"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="deliverContactsAddress"
        label="始发地"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="takeContactsAddress"
        label="目的地"
        width="120"
      ></el-table-column>
      <el-table-column prop="clientName" label="客户名称"></el-table-column>
      <el-table-column prop="deliverContacts" label="发货人" width="120"></el-table-column>
      <el-table-column prop="deliverContactsPhone" label="发货人电话"></el-table-column>
       <el-table-column prop="chauffeur" label="司机姓名"></el-table-column>
      <el-table-column prop="chauffeurPhone" label="司机手机号" width="120"></el-table-column>
       <el-table-column prop="takeContacts" label="收货人"></el-table-column>
      <el-table-column prop="takeContactsName" label="收货电话" width="120"></el-table-column>
      <!-- <el-table-column prop="date" label="发货人电话"></el-table-column> -->
      <!-- <el-table-column prop="date" label="操作" fixed="right" width="200px">
        <template slot-scope="data">
          <span class="operate mr10">查看合同</span>
        </template>
      </el-table-column> -->
    </el-table>

    <el-dialog title="请选择运输方式" :visible.sync="isShow" width="30%" center>
      <div class="flex justify-around">
        <!--        <el-button type="primary" plain>公路运输</el-button>-->
        <!--        <el-button type="primary" plain>水路运输</el-button>-->
        <!--        <el-button type="primary" plain disabled>集装箱运输（暂未开放）</el-button>-->
        <el-radio-group v-model="radio">
          <el-radio :label="1">公路运输</el-radio>
          <el-radio :label="2">水路运输</el-radio>
          <el-radio :label="3" disabled>集装箱运输（暂未开放）</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="goDispatch">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getAllShips, selectShips} from "../../../api/waybill/receipt";

export default {
  data() {
    return {
       // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,

      },
      tableData: [ ],
      radio: 1,
      isShow: false,
      time: [],
    };
  },
  created() {
    this.getAllShips()
  },
  methods: {
    goDispatch() {
      this.isShow = false;
      let radio = this.radio;
      if (radio == 1) {
        this.$router.push("/transport/dispatch/index");
      } else {
        this.$router.push("/transport/dispatch/index");
      }
    },
    //列表
    getAllShips(){
      selectShips().then(res => {
        console.log(res)
      })
    },
    goAdd() {},
  },
};
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}

</style>

