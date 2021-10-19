<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4"
        ><div class="grid-content bg-purple">对账单号：S472012080002</div>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple"></div>
      </el-col>

      <el-col :span="4"
        ><div class="grid-content bg-purple">结算对象：xxx物流有限公司</div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content bg-purple"></div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4"
        ><div class="grid-content bg-purple">应收货款：1000元</div></el-col
      >
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col
      ><el-col :span="4"
        ><div class="grid-content bg-purple">已收货款：800元</div></el-col
      >
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple">未收货款：200元</div></el-col
      >
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="4"
        ><div class="grid-content bg-purple">结算状态：未结算</div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content bg-purple"></div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple">对账单生成日期：2020-12-17 17:50:32</div></el-col
      >
      <!-- <el-col :span="4"
        ><div class="grid-content bg-purple"></div></el-col
      > -->
    </el-row>

    <div class="app-container">
      <div class="mb20">
        <el-button size="small" type="primary" @click="goAdd" plain
          >退回</el-button
        >
        <el-button size="small" type="danger" @click="goAdd" plain
          >收款核销</el-button
        >
        <el-button size="small" type="warning" @click="goPrint" plain
          >打印</el-button
        >
        <el-button size="small" type="primary" @click="goBind" plain
          >绑定发票</el-button
        >
      </div>

      <!-- <div class="mb20">
      <el-button size="small" type="primary" @click="goAdd" plain>生成对账单</el-button>
      <el-button size="small" type="warning" @click="goEdit" plain>编辑</el-button>
      <el-button size="small" type="danger" plain>删除</el-button>
      <el-button size="small" type="warning" plain>导出</el-button>
    </div> -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="对账明细" name="first">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="date" label="序号"></el-table-column>
            <el-table-column prop="date" label="订单号">
              <span class="operate mr10" @click="goorder">D12341516</span></el-table-column
            >
            <el-table-column prop="date" label="客户名称"></el-table-column>
            <el-table-column prop="date" label="应结算金额"></el-table-column>
            <el-table-column prop="date" label="始发地"></el-table-column>
            <el-table-column
              prop="date"
              label="目的地"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="货物名称"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="总运费"
              width="120"
            ></el-table-column>
            <el-table-column prop="date" label="开单时间"></el-table-column>
            <el-table-column
              prop="date"
              label="备注"
              width="120"
            ></el-table-column> </el-table
        ></el-tab-pane>
        <el-tab-pane label="支付信息" name="second">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="date" label="序号"></el-table-column>
            <el-table-column prop="date" label="操作人"></el-table-column>
            <el-table-column prop="date" label="操作时间"></el-table-column>
            <el-table-column prop="date" label="结算类型"></el-table-column>
            <el-table-column
              prop="date"
              label="结算金额(元)"
            ></el-table-column> </el-table
        ></el-tab-pane>
        <el-tab-pane label="发票信息" name="third">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="date" label="序号"></el-table-column>
            <el-table-column prop="date" label="发票代码"></el-table-column>
            <el-table-column prop="date" label="发票号码"></el-table-column>
            <el-table-column
              prop="date"
              label="收票方(发票抬头)"
            ></el-table-column>
            <el-table-column prop="date" label="出票方"></el-table-column>
            <el-table-column
              prop="date"
              label="发票金额"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="开票时间"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="操作"
              fixed="right"
              width="200px"
            >
              <template slot-scope="data">
                <!--          <el-button class="mr5" size="mini">编辑</el-button>-->
                <!--          <el-button class="mr5" size="mini" plain type="danger">删除</el-button>-->
                <span class="operate mr10">取消绑定</span>
              </template>
            </el-table-column>
          </el-table></el-tab-pane
        >
        <el-tab-pane label="操作记录" name="fourth">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="date" label="序号"></el-table-column>
            <el-table-column prop="date" label="操作人"></el-table-column>
            <el-table-column prop="date" label="操作时间"></el-table-column>
            <el-table-column
              prop="date"
              label="操作内容"
            ></el-table-column> </el-table
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      form: {
        name: "",
        phone: "18278712121",
      },
      input: "",
      tableData: [{ date: "1111" }],
      time: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goAdd() {
      // this.$router.push("/shippersettlement/reconciliationdetails");
      this.$router.push("/shippersettlement/addcollectionverification");
    },
    goBind() {
      this.$router.push("/shippersettlement/bindinvoice");
    },
    goPrint() {
      this.$router.push("/shippersettlement/printtemplate");
    },
    goEdit() {
      this.$router.push("/filemanagement/editcar");
    },
    goorder(){
      this.$router.push("/order/orderdetails");
    }
  },
};
</script>

<style  lang="scss" scoped >
.el-divider--vertical {
  width: 5px;
  height: 1.5em;
  background-color: #1890ff;
}
.el-row {
  padding-left: 46px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
