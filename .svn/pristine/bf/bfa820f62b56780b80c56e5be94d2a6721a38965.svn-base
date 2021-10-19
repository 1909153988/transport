<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="20"
        ><div class="header"><h2>xxx物流公司-发货会员对账单</h2></div>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          <el-button size="small" type="primary" @click="goAdd" plain
            >下载</el-button
          >
          <el-button size="small" type="primary" @click="goAdd" plain
            >打印</el-button
          >
        </div></el-col
      >
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">会员名称：S472012080002</div>
      </el-col>
      <!-- <el-col :span="4"
        ><div class="grid-content bg-purple"></div>
      </el-col> -->

      <el-col :span="8"
        ><div class="grid-content bg-purple">对账单号: xxx物流有限公司</div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple">运费总金额：150000.00元</div></el-col
      >
      <!-- <el-col :span="4"
        ><div class="grid-content bg-purple"></div></el-col
      > -->
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">收款账号名称：xxx物流公司</div></el-col
      >
      <!-- <el-col :span="4"
        ><div class="grid-content bg-purple"></div></el-col
      > -->
      <el-col :span="6"
        ><div class="grid-content bg-purple">收款账号：*********</div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content bg-purple"></div></el-col
      >
    </el-row>

    <div class="app-container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="date" label="线路名称"></el-table-column>
        <el-table-column prop="date" label="运单数"></el-table-column>
        <el-table-column prop="date" label="运费合计"></el-table-column>
      </el-table>

      <el-row :gutter="20" class="boderclass">
        <el-col :span="4"
          ><div class="grid-content bg-purple">发货会员汇款账号:</div>
        </el-col>
        <el-col :span="5"
          ><div class="grid-content bg-purple">
            <div class="left_border"></div>
          </div>
        </el-col>

        <el-col :span="6"
          ><div class="grid-content bg-purple">
            会员确认无误, 请在此处签字(盖章):
          </div></el-col
        >
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4"
          ><div class="grid-content bg-purple">发货会员汇款单位全称:</div>
        </el-col>
        <el-col :span="5"
          ><div class="grid-content bg-purple">
            <div class="left_border"></div>
          </div>
        </el-col>

        <el-col :span="3"
          ><div class="grid-content bg-purple">日期:</div></el-col
        >
        <!-- <el-col :span="4"
          ><div class="grid-content bg-purple">年<div class="right_border"></div>月<div class="right_border"></div>日</div></el-col
        > -->
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-row>
              <el-col>
                <div class="yearborderdiv">
                  <div class="yearborder"></div>
                  年
                   <div class="yearborder"></div>
                  月
                    <div class="yearborder"></div>
                  日
                </div>
              </el-col>
            </el-row>
          </div></el-col
        >
      </el-row>

      <div class="mb20">
        <el-divider /> <span class="weight">费用明细:</span>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="序号"></el-table-column>
        <el-table-column prop="date" label="订单号"></el-table-column>
        <el-table-column prop="date" label="单据类型"></el-table-column>
        <el-table-column prop="date" label="线路"></el-table-column>
        <el-table-column prop="date" label="货物名称"></el-table-column>
        <el-table-column
          prop="date"
          label="应收金额"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="应收-不含税金额"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="应收-税金"
          width="120"
        ></el-table-column>
        <el-table-column prop="date" label="已收金额"></el-table-column>
        <el-table-column
          prop="date"
          label="未收金额"
          width="120"
        ></el-table-column>
        <el-table-column prop="date" label="下单时间"></el-table-column>
      </el-table>

      <el-row :gutter="20">
        <el-col :span="24"
          ><div class="sunfoot">金额总计： 22000.00 10000.00 12000.00</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      this.$router.push("/shippersettlement/reconciliationdetails");
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
  },
};
</script>

<style  lang="scss" scoped >
.yearborderdiv {
  display: inline-block;
  display: flex;
}
.yearborder {
  width: 70px;
  border-bottom: 1px solid #ccc;
}
.boderclass {
  margin-top: 50px !important;
}
.sunfoot {
  margin-top: 40px;
  text-align: center;
}
.header {
  text-align: center;
}
.left_border {
  width: 50%;
  border-bottom: 1px solid #ccc;
}
.right_border {
  width: 50%;
  border-bottom: 1px solid #ccc;
}
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
