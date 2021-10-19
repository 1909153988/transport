<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">


      <el-form-item label="付款申请单编号" prop="payApplyCode" label-width="120px">
        <el-input
          v-model.trim="queryParams.payApplyCode"
          placeholder="请输入单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="运单编号" prop="carriageCodeChar" label-width="120px">
        <el-input
          v-model.trim="queryParams.carriageCodeChar"
          placeholder="请输入单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="托运人" prop="shipperFullName" label-width="120px">
        <el-input
          v-model.trim="queryParams.shipperFullName"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="收款司机" prop="chauffeurName" label-width="120px">
        <el-input
          v-model="queryParams.chauffeurName"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="支付状态" prop="auditStatus" label-width="120px">
        <el-select v-model="queryParams.auditStatus" placeholder="状态" clearable size="small">
          <el-option label="内部审核中" value="0"/>
          <el-option label="平台审核中" value="1"/>
          <el-option label="打款中" value="2"/>
          <el-option label="内部审核未通过" value="3"/>
          <el-option label="平台审核未通过" value="4"/>
          <el-option label="交易失败" value="5"/>
          <el-option label="交易成功" value="6"/>
        </el-select>
      </el-form-item>


      <el-form-item label="申请时间" prop="startEndTime" label-width="120px">
        <el-date-picker
          v-model.trim="startEndTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['finance:carriage:exportCarriagePaymentBill']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="carriagePaymentBillList" @selection-change="handleSelectionChange">
      <!--      <el-table-column type="selection" width="55" align="center"/>-->

      <el-table-column prop="shipperFullName" label="托运公司"></el-table-column>

      <el-table-column prop="payApplyCode" label="付款申请单编号"></el-table-column>
      <el-table-column prop="carriageCode" label="运单号"></el-table-column>
      <el-table-column prop="auditStatus" label="申请状态"></el-table-column>
      <el-table-column prop="presentUserName" label="当前内部审核人"></el-table-column>
      <el-table-column prop="payType" label="付款类型"></el-table-column>
      <el-table-column prop="allFreightSum " label="申请付款金额" width="120"></el-table-column>
      <el-table-column prop="anotherPayeeMoney" label="应付第二收款人金额" width="120"></el-table-column>
      <el-table-column prop="chauffeurMoney" label="应付司机运费" width="120"></el-table-column>
      <el-table-column prop="serviceCharge" label="应付服务费" width="120"></el-table-column>

      <el-table-column prop="deductionMoney" label="抵扣金额" width="120"></el-table-column>

      <el-table-column prop="allPayment" label="总应付" width="120"></el-table-column>
      <el-table-column prop="okAllPayment" label="已支付金额"></el-table-column>
      <el-table-column prop="chauffeurName" label="司机"></el-table-column>
      <el-table-column prop="vehicleNumber" label="车牌号"></el-table-column>
      <el-table-column prop="planPickTime" label="计划提货时间"></el-table-column>
      <el-table-column prop="createBy" label="申请人"></el-table-column>
      <el-table-column prop="createTime" label="申请日期"></el-table-column>
      <el-table-column prop="auditBy" label="最终审核人"></el-table-column>
      <el-table-column prop="auditTime" label="审核通过日期"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['finance:carriage:getCarriagePaymentBillById']"
          >查看/审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />


    <el-drawer
      v-loading.fullscreen.lock="openloading"
      element-loading-background="rgba(122, 109, 240, 0.8)"

      :title="title"
      :visible.sync="open"
      direction="ttb"
      :before-close="cancel"
      visible.sync="true"
      size="100%">
      <el-form ref="form" :model="form" label-width="80px" style="height: 900px;overflow-y:auto">
        <div class="mb20">
          <el-divider content-position="left">付款信息</el-divider>
        </div>
        <el-row :gutter="20">
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">托运人: {{form.shipperFullName}}</div>
          </el-col>
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">付款申请编号：{{form.payApplyCode}}</div>
          </el-col
          >
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">运单号:{{form.carriageCode}}</div>
          </el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">结算运费：{{form.allFreightSum}} 元</div>
          </el-col
          >
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">已付金额：{{form.okAllPayment}} 元</div>
          </el-col
          >
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">本次申请支付运费:{{form.allFreightSum}} 元
              <div style="color:gray;font-size:14px">(第二收款人收款：{{form.anotherPayeeMoney }}元
                司机收款：{{form.chauffeurMoney}}元)
              </div>
            </div>
            <!-- <div class="grid-content bg-purple">第二收款人收款：800.00元</div>
             <div class="grid-content bg-purple">司机收款：200.00元</div> -->
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">付款类型：{{form.payType}}</div>
          </el-col
          >
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">
              司机收款人：{{ form.chauffeurName }}
            </div>
          </el-col
          >
          <!-- <el-col :span="8"
           ><div class="grid-content bg-purple">
           司机收款：200.00元
           </div></el-col
         > -->
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">
              承运车辆：{{form.vehicleNumber}}
            </div>
          </el-col
          >
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">第二收款人：{{form.anotherPayeeName}}</div>
          </el-col
          >
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">服务费（元）：{{form.serviceCharge}}元</div>
          </el-col
          >
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">申请人:{{form.createBy}}</div>
          </el-col
          >
          <el-col :span="8"
          >
            <div class="grid-content bg-purple">申请时间：{{form.createTime}}</div>
          </el-col
          >
          <el-col :span="8"
          >
            <div class="grid-content bg-purple" style="color:red;font-weight:bold">总共支付：{{
              form.allPayment+form.serviceCharge}}元
            </div>
          </el-col
          >
        </el-row>


        <div class="app-container">
          <el-row :gutter="20">
            <el-col :span="3"
            >
              <div class="grid-content bg-purple">审核结果：</div>
            </el-col
            >
            <el-col :span="6">
              <el-form-item label="审核状态" prop="auditResult">
                <div>
                  <el-radio v-model="form.auditResult" label="0" border>通过</el-radio>
                  <el-radio v-model="form.auditResult" label="1" border>不通过</el-radio>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="form.auditResult == 1">
            <el-col :span="3">
              <div class="grid-content bg-purple">不通过原因:</div>
            </el-col>
            <el-col :span="8">
              <el-input type="textarea" v-model.trim="form.failCause" maxlength="250"
                        show-word-limit></el-input>
            </el-col>
          </el-row>

          <div class="mb20">
            <el-divider content-position="left">付款申请记录</el-divider>
          </div>


          <template>
            <el-table
              :data="form.recordList"
              height="400"
              border
              style="width: 100%">

              <el-table-column prop="payApplyCode" label="付款申请单号"></el-table-column>
              <el-table-column prop="allFreightSum" label="申请付款金额"></el-table-column>
              <el-table-column prop="payType" label="付款类型"></el-table-column>
              <el-table-column prop="chauffeurName" label="承运司机"></el-table-column>
              <el-table-column prop="createTime" label="申请时间" width="120"></el-table-column>
              <el-table-column prop="createBy" label="申请人" width="120"></el-table-column>
              <el-table-column prop="auditStatus" label="状态" width="120"></el-table-column>
            </el-table>
          </template>


        </div>

      </el-form>
      <div class="dialog-footer"
           style="text-align: right; position:fixed;bottom:0px;  width: 90%; background-color: white; padding-right: 10%">
        <el-button type="primary" @click="submitForm">确定审核</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-drawer>


    <!--    &lt;!&ndash;  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
    <!--    &lt;!&ndash; 付款申请单详情&#45;&#45;运单对话框 &ndash;&gt;-->
    <!--    <el-dialog :title="title" :visible.sync="open" width="90%" append-to-body>-->
    <!--      -->
    <!--    </el-dialog>-->
  </div>
</template>

<style lang="scss" scoped>
  .el-divider--vertical {
    width: 5px;
    height: 1.5em;
    background-color: #1890ff;
  }

  .el-row {
    padding-left: 86px;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    font-size: 15px;
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

<script>
  import {
    getCarriagePaymentBill,
    listCarriagePaymentBill,
    submitCarriagePaymentBillInfoResult
  } from "@/api/finance/carriagePaymentBill";

  export default {
    name: "CarriagePaymentBill",
    components: {},
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },

        // 遮罩层
        loading: true,
        openloading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 运单中心-运单表格数据
        carriagePaymentBillList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          userId: null,
          payApplyCode: null, //申请单号
          carriageCodeChar: null, //运单号
          shipperFullName: null, //托运公司
          chauffeurName: null, //收款司机
          auditStatus: null, //状态
          beginTime: '',
          endTime: ''
        },
        // 表单参数
        form: {auditResult: 1},
        // 表单校验

        startEndTime: '',

      };
    },
    created() {
      this.getList();
    },
    methods: {

      /** 查询运单中心-运单列表 */
      getList() {
        this.loading = true;
        listCarriagePaymentBill(this.queryParams).then(response => {
          this.carriagePaymentBillList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
        this.getList();

      },
      // 表单重置
      reset() {
        this.form = {
          auditResult: 1
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        const startEndTime = this.startEndTime + '';

        if (startEndTime != null && startEndTime != 'null' && startEndTime != '' && startEndTime.length > 0) {
          const startEndTimeChar = startEndTime.split(',')[0];
          const endTimeChar = startEndTime.split(',')[1];

          this.queryParams.beginTime = startEndTimeChar;
          this.queryParams.endTime = endTimeChar;
        } else {
          this.queryParams.beginTime = '';
          this.queryParams.endTime = '';
        }


        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.startEndTime = null;
        this.resetForm("queryForm");
        this.handleQuery();
      },


      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.carriageId)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },

      /** 查看申请单按钮操作 */
      handleUpdate(row) {
        this.reset();
        this.openloading = true;

        const payApplyCode = row.payApplyCode;
        if (payApplyCode == undefined || payApplyCode == null) {
          this.msgError("操作失败");
          return;
        }

        getCarriagePaymentBill(payApplyCode).then(response => {

          if (response != null && response.code != undefined && response.code === 200) {
            this.open = true;

            this.form = response.data;

            this.title = "付款申请单详情-运单";
          } else {
            this.msgError(response.msg);

          }

          this.openloading = false;

        });


      },
      /** 审核提交按钮 */
      submitForm() {
        let payApplyCode = this.form.payApplyCode;
        let auditResult = this.form.auditResult;
        let failCause = this.form.failCause;

        if (payApplyCode == undefined || payApplyCode == null) {
          this.msgError("申请单信息错误");
          return;
        }
        if (auditResult == undefined || auditResult == null) {
          this.msgError("请选择审核状态");
          return;
        }
        if (auditResult == 1 && (failCause == null || failCause == "")) {
          this.msgError("请输入审核不通过原因");
          return;
        }


        const audit = {
          payApplyCode: payApplyCode,
          auditResult: auditResult,
          failCause: failCause
        };

        submitCarriagePaymentBillInfoResult(audit).then(response => {

          if (response != null && response.code != undefined && response.code === 200) {
            this.msgSuccess(response.msg);
            this.cancel();
          } else {
            this.msgError(response.msg);
          }

        });


      },

      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;

        this.download('/finance/carriagePaymentBillService/exportCarriagePaymentBillList', {
          ...this.queryParams
        }, `CarriagePaymentBill_${new Date().getTime()}.xlsx`)


      }
    }
  };
</script>
