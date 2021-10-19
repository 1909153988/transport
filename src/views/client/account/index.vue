<template>
  <div class="app-container">

    <!--            <el-table :data="gridData"  height="250"-->
    <!--                      border-->
    <!--                      style="width: 100%">-->
    <!--              <el-table-column width="150" property="date" label="日限额"></el-table-column>-->
    <!--              <el-table-column width="100" property="name" label="月限额"></el-table-column>-->
    <!--              <el-table-column width="300" property="address" label="限额次数"></el-table-column>-->
    <!--            </el-table>-->


    <el-row :gutter="30" v-for="(item, index) in accountList" :key="index"
            style="padding-bottom:10px;border-bottom: #1890ff 1px solid; margin-bottom: 20px; margin-top: 20px;">

      <el-col :span="5">
        <el-card shadow="always"
                 style="background-color: #1890ff; height: 120px; color: white; font-size: 12px;  border-radius: 10px">
          <span style="float: left; ">{{item.bankNo}}</span>
          <span style="float: right; margin-top: 20%;">{{item.accBankName}}</span>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always" style="text-align: center; height: 120px; border: none; line-height: 30px;">
          <span style="width: 100%; float: left; color:orange"><b>可用余额：</b></span>

          <el-popover
            placement="right"
            width="300"
            trigger="hover">
            <p style="color: #bfbfbf">日限额/可使用: <b style="color: orange">{{item.dayQuota}}/{{item.dayQuotaUse}}</b></p>
            <p style="color: #bfbfbf">月限额/可使用: <b style="color: orange">{{item.monthQuota}}/{{item.monthQuotaUse}}</b>
            </p>
            <p style="color: #bfbfbf">次数限额/可使用: <b
              style="color: orange">{{item.numberQuota}}/{{item.numberQuotaUse}}</b></p>

            <el-button style="border: none; box-shadow:none" slot="reference" type="text" round>
              <b>{{item.usableMoney}}元</b>
            </el-button>
          </el-popover>

          <span style="width: 100%; float: left; color: #a1a4ad; font-size: 12px;">可用余额 = 总金额 - 冻结金额</span>


        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always" style="text-align: center; height: 120px; border: none; line-height: 30px;">
          <span style="width: 100%; float: left">总金额：</span>
          <span style="width: 100%; float: left"><b>{{item.totalMoney}}元</b></span>
        </el-card>
      </el-col>

      <el-col :span="4">
        <el-card shadow="always" style="text-align: center; height: 120px; border: none; line-height: 30px;">
          <span style="width: 100%; float: left">冻结金额：</span>
          <span style="width: 100%; float: left"><b>{{item.freezeMoney}}元</b></span>
        </el-card>
      </el-col>


      <el-col :span="8" style="margin-top: 10px; text-align: right">
        <el-popover
          placement="bottom"
          width="400"
          trigger="hover">
          <p style="color: #bfbfbf">收款人: <b style="color: green">{{item.companyName}}</b></p>
          <p style="color: #bfbfbf">银行账号: <b style="color: green">{{item.bankNo}}</b></p>
          <p style="color: #bfbfbf">开户银行: <b style="color: green">{{item.accBankName}}</b></p>
          <el-button type="primary" slot="reference" round>充值</el-button>
        </el-popover>


        <el-button type="info" round @click="selectAccountDetails(item.userId)">查看明细</el-button>

      </el-col>
    </el-row>


    <!-- 添加或修改财务中心-托运方资金账户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>


      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="交易对象" prop="accNo">
          <el-input
            v-model="queryParams.chauffeurName"
            placeholder="请输入交易对象"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-select v-model="queryParams.transType" clearable placeholder="请选择交易类型">
          <el-option
            v-for="item in transTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>


        <el-select v-model="queryParams.transStatus" clearable placeholder="请选择交易状态">
          <el-option
            v-for="item in transStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

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
            v-hasPermi="['consign:clientAccount:accountDetailsListExport']"
          >导出
          </el-button>
        </el-col>
        <!--        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
      </el-row>

      <el-table v-loading="loading" :data="accountDetailsList" style="height: 500px;">
        <!--        <el-table-column label="主键" align="center" prop="id"/>-->
        <el-table-column label="编号" align="center" prop="transCode"/>
        <el-table-column label="交易金额" align="center" prop="transMoney"/>
        <el-table-column label="交易类型" align="center" prop="transTypeChar"/>
        <el-table-column label="交易后余额" align="center" prop="transAfterMoney"/>
        <el-table-column label="交易状态" align="center" prop="transStatusChar"/>
        <el-table-column label="交易时间" align="center" prop="transTime"/>
        <el-table-column label="交易对象名称" align="center" prop="chauffeurName"/>
        <!--        <el-table-column label="明细类型" align="center" prop="detailTypeChar"/>-->
        <el-table-column label="绑定单号" align="center" prop="payApplyCode"/>
        <!--        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
        <!--          <template slot-scope="scope">-->
        <!--            -->
        <!--            <el-button-->
        <!--              size="mini"-->
        <!--              type="text"-->
        <!--              icon="el-icon-delete"-->
        <!--              @click="handleDelete(scope.row)"-->
        <!--              v-hasPermi="['client:account:remove']"-->
        <!--            >删除-->
        <!--            </el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="selectAccountDetails(null)"
      />

      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="color: red" v-if="isStatistics">
            当前筛选条件合计：{{topPay}}金额{{topPaytransMoney}}元({{topPaycountRow}}笔)，
            {{pay}}金额{{paytransMoney}}元({{paycountRow}}笔)
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listAccount, listAccountDetailsList} from "@/api/client/account";

  export default {
    name: "Account",
    components: {},
    data() {
      return {

        //交易类型
        transTypeOptions: [{
          value: '0',
          label: '充值'
        }, {
          value: '1',
          label: '支付'
        }],


        //交易状态
        transStatusOptions: [{
          value: '1',
          label: '处理中'
        }, {
          value: '2',
          label: '处理成功'
        }, {
          value: '3',
          label: '处理失败'
        }],

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

        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        // 遮罩层
        loading: true,
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
        // 财务中心-托运方资金账户表格数据
        accountList: [],
        accountDetailsList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          accNo: null,
          accLogNo: null,
          userId: null,
          id: null,
          chauffeurName: null,
          transType: '',
          transStatus: '',

          beginTime: '',
          endTime: ''
        },
        startEndTime: '',
        isStatistics: false,

        // 表单参数
        form: {},

        topPay: "",
        topPaytransMoney: 0,
        topPaycountRow: 0,

        pay: "",
        paytransMoney: 0,
        paycountRow: 0,
      };
    },

    created() {
      this.getList();
    },
    methods: {
      /** 查询财务中心-托运方资金账户列表 */
      getList() {

        this.loading = true;
        listAccount(null).then(response => {
          if (response != null && response.code === 200) {
            this.accountList = response.data;
          }
          this.loading = false;
        });

      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          accNo: null,
          accLogNo: null,
          userId: null

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

        this.selectAccountDetails(this.queryParams.userId);
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },

      /** 查询账户明细 */
      selectAccountDetails(userId) {
        this.reset();

        this.open = true;
        this.title = "资金明细";

        if (userId == undefined || userId == null || userId == '') {
          userId = this.queryParams.userId;
        }


        this.queryParams.userId = userId;

        this.loading = true;
        this.isStatistics = false;

        this.topPay = '';
        this.topPaytransMoney = 0;
        this.topPaycountRow = 0;

        this.pay = '';
        this.paytransMoney = 0;
        this.paycountRow = 0;

        listAccountDetailsList(this.queryParams).then(response => {

          this.accountDetailsList = [];
          this.loading = false;

          if (response.code === 200) {
            this.accountDetailsList = response.list.rows;
            this.total = response.list.total;

            if (response.detailsMoney != null && this.total > 0) {
              this.isStatistics = true;
              // alert(JSON.stringify(response.detailsMoney))
              this.topPay = response.detailsMoney[0].transType;
              this.topPaytransMoney = response.detailsMoney[0].transMoney;
              this.topPaycountRow = response.detailsMoney[0].countRow;

              this.pay = response.detailsMoney[1].transType;
              this.paytransMoney = response.detailsMoney[1].transMoney;
              this.paycountRow = response.detailsMoney[1].countRow;
            }
          }
        });
      },

      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;

        this.download('/client/clientAccount/accountDetailsListExport', {
          ...this.queryParams
        }, `details_${new Date().getTime()}.xlsx`)

      }
    }
  };
</script>
