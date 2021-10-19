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

      <el-select size="small mr10" value="" placeholder="装货地点">
        <el-option value="" label="装货地点"></el-option>
        <el-option value="1" label="新建"></el-option>
        <el-option value="1" label="运输中"></el-option>
        <el-option value="1" label="已完成"></el-option>
        <el-option value="1" label="已删除"></el-option>
        <el-option value="1" label="待报价"></el-option>
      </el-select>
      <el-select size="small mr10" value="" placeholder="卸货地点">
        <el-option value="" label="卸货地点"></el-option>
        <el-option value="1" label="公路运输"></el-option>
        <el-option value="1" label="水路运输"></el-option>
      </el-select>

      <el-select size="small mr5" value="">
        <el-option value="" label="客户名称"></el-option>
        <el-option value="1" label="卸货地点"></el-option>
        <el-option value="" label="客户名称"></el-option>
        <el-option value="1" label="订单号"></el-option>
      </el-select>

      <el-select size="small mr5" value="订单号">
        <el-option value="" label="订单号"></el-option>
        <el-option value="1" label="卸货地点"></el-option>
        <el-option value="" label="客户名称"></el-option>
        <el-option value="1" label="订单号"></el-option>
      </el-select>

      <el-select size="small mr5" value="订单状态">
        <el-option value="" label="订单状态"></el-option>
        <el-option value="1" label="卸货地点"></el-option>
        <el-option value="" label="客户名称"></el-option>
        <el-option value="1" label="订单号"></el-option>
      </el-select>

      <el-select size="small mr5" value="运输类型">
        <el-option value="" label="运输类型"></el-option>
        <el-option value="1" label="卸货地点"></el-option>
        <el-option value="" label="客户名称"></el-option>
        <el-option value="1" label="订单号"></el-option>
      </el-select>

      <el-button size="small" type="primary" plain>查询</el-button>
      <el-button size="small" type="primary" plain>清空</el-button>
    </div>

    <div class="mb20">
      <el-button size="small" type="primary" @click="goAdd" plain
        >新建订单</el-button
      >
      <el-button size="small" type="warning" plain>导入</el-button>
      <el-button size="small" type="primary" plain>导出</el-button>
      <!-- <el-button size="small" type="primary" @click="goAdd" plain
        >完成订单</el-button
      >
       <el-button size="small" type="primary" @click="goAdd" plain
        >新建</el-button
      > -->
      <!-- <el-button size="small" type="warning" plain>导出</el-button> -->
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="date" label="序号"></el-table-column>
      <el-table-column prop="date" label="订单号"> <span class="operate mr10" @click="goorderdetail()">D202012020001</span></el-table-column>
      <el-table-column prop="date" label="订单状态"></el-table-column>
      <el-table-column prop="date" label="客户名称"></el-table-column>
      <el-table-column prop="date" label="托运人"></el-table-column>
      <el-table-column
        prop="date"
        label="运输类型"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="调车方式"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="计划提货时间"
      ></el-table-column>
      <el-table-column prop="date" label="货物名称"></el-table-column>
      <el-table-column
        prop="date"
        label="装货地点"
      ></el-table-column>
      <el-table-column prop="date" label="卸货地点"></el-table-column>
      <el-table-column prop="date" label="发货联系人"></el-table-column>
      <el-table-column  prop="date" width="180px" label="发货联系人电话"></el-table-column>
      <el-table-column prop="date" label="卸货联系人"></el-table-column>
      <el-table-column
        prop="date"
        label="卸货联系人电话"
      ></el-table-column>
      <el-table-column prop="date" label="付款方式"></el-table-column>
      <el-table-column prop="date" label="总运费（元）"></el-table-column>
      <el-table-column prop="date" label="计价方式"></el-table-column>
      <el-table-column prop="date" label="计划配载量"></el-table-column>
      <el-table-column
        prop="date"
        label="剩余配载量"
      ></el-table-column>
      <el-table-column prop="date" label="是否长期货源"></el-table-column>
      <el-table-column prop="date" label="创建人"></el-table-column>
      <el-table-column prop="date" label="创建时间"></el-table-column>
      <!-- <el-table-column prop="date" label="订单号" width="140px">
        <span class="operate mr10" @click="goorderdetail()">D202012020001</span></el-table-column
      > -->
      <el-table-column prop="date" label="操作" fixed="right" width="300px">
        <template slot-scope="data">
          <!--          <el-button class="mr5" size="mini">编辑</el-button>-->
          <!--          <el-button class="mr5" size="mini" plain type="danger">删除</el-button>-->
          <span class="operate mr10">完成订单</span>
          <span class="operate mr10">删除</span>
          <!--          <el-popconfirm-->
          <!--            confirm-button-text='公路运输'-->
          <!--            cancel-button-text='水路运输'-->
          <!--            icon="el-icon-info"-->
          <!--            icon-color="red"-->
          <!--            title="请选择运输方式"-->
          <!--          >-->
          <!--            <span  slot="reference" class="operate">调度派车</span>-->
          <!--          </el-popconfirm>-->
          <span class="operate mr10" @click="isShow = true">调度发货</span>
            <span class="operate mr10">复制订单</span>
        </template>
      </el-table-column>
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
export default {
  data() {
    return {
      tableData: [{ date: "1111" }],
      radio: 1,
      isShow: false,
      time: [],
    };
  },
  methods: {
    goDispatch() {
      this.isShow = false;
      let radio = this.radio;
      if (radio == 1) {
        this.$router.push("/order/dispatch");
      } else {
        this.$router.push("/order/water");
      }
    },
    goAdd() {
      this.$router.push("/order/addorder");
    },
    goorderdetail(){
      this.$router.push("/order/orderdetails");
    }
  },
};
</script>

<style scoped lang="scss">
.el-table-column{
	 width: 260px !important;
 }
</style>

