<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">


      <el-form-item label="开票申请单号" prop="applyCode" label-width="130px;">
        <el-input
          v-model.trim="queryParams.applyCode"
          placeholder="请输入申请单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="托运人" prop="shipperName">
        <el-input
          v-model="queryParams.shipperName"
          placeholder="请输入托运人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="快递单号" prop="courierNumber">
        <el-input
          v-model="queryParams.courierNumber"
          placeholder="请输入快递单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="开票审核状态" prop="auditStatus" label-width="120px">
        <el-select v-model="queryParams.auditStatus" placeholder="状态" clearable size="small">
          <el-option label="审核中" value="1"/>
          <el-option label="审核通过" value="2"/>
          <el-option label="审核不通过" value="3"/>

        </el-select>
      </el-form-item>
      <el-form-item label="是否开票" prop="invoiceStatus" label-width="120px">
        <el-select v-model="queryParams.invoiceStatus" placeholder="状态" clearable size="small">
          <el-option label="未开" value="0"/>

          <el-option label="已开" value="1"/>

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
                @click="handleInvoiceBillExport"
                v-hasPermi="['finance:invoiceBill:exportInvoiceList']"
              >导出</el-button>
            </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="invoiceBillList" @selection-change="handleSelectionChange">
      <!--      <el-table-column type="selection" width="55" align="center"/>-->
      <el-table-column label="托运人" align="center" prop="shipperName"/>

      <el-table-column label="开票申请单号" align="center" prop="applyCode"/>


      <el-table-column label="快递单号" align="center" prop="courierNumber"/>

      <el-table-column label="开票状态" align="center" prop="invoiceStatus"/>
      <el-table-column label="开票审核" align="center" prop="auditStatus"/>


      <el-table-column label="含税开票总金额" align="center" prop="invoiceTotalMoney"/>
      <el-table-column label="申请时间" align="center" prop="createTime"/>

<!--      <el-table-column label="创建人" align="center" prop="createBy"/>-->
      <el-table-column label="发票及明细" align="center" prop="invoiceDetail"/>
      <el-table-column label="运单数" align="center" prop="waybillNumber"/>

      <el-table-column label="备注" align="center" prop="remark"/>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['finance:invoiceBill:financeInvoiceInfo']"
          >查看详情
          </el-button>
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['finance:invoiceBill:deleteCarriageForInvoice']"
          >撤销申请
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
      <div class="app-container" style="height: 900px;overflow-y:auto; padding-bottom:200px;">


        <el-form :model="form" label-width="150px">
          <el-row :gutter="20">
            <el-col :span="4"
            >
              <div class="grid-content bg-purple">开票申请单号：</div>
            </el-col>
            <el-col :span="4"
            >
              <div class="grid-content bg-purple">{{form.applyCode}}</div>
            </el-col>

            <el-col :span="3"
            >
              <div class="grid-content bg-purple">结算管理公司：</div>
            </el-col
            >
            <el-col :span="5"
            >
              <div class="grid-content bg-purple">
                {{form.settleCompany}}
              </div>
            </el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4"
            >
              <div class="grid-content bg-purple">申请人：</div>
            </el-col
            >
            <el-col :span="4"
            >
              <div class="grid-content bg-purple">{{form.shipperName}}</div>
            </el-col
            >
            <el-col :span="4"
            >
              <div class="grid-content bg-purple">申请时间：</div>
            </el-col
            >
            <el-col :span="4"
            >
              <div class="grid-content bg-purple">{{form.createTime}}</div>
            </el-col
            >
          </el-row>

          <el-row :gutter="20">
            <el-col :span="4"
            >
              <div class="grid-content bg-purple">总运费：</div>
            </el-col
            >
            <el-col :span="4"
            >
              <div class="grid-content bg-purple">{{form.totalFreight}}元</div>
            </el-col
            >
            <el-col :span="4"
            >
              <div class="grid-content bg-purple">服务费（元）：</div>
            </el-col
            >
            <el-col :span="4"
            >
              <div class="grid-content bg-purple">{{form.serviceCharge}}元</div>
            </el-col
            >
            <el-col :span="4"
            >
              <div class="grid-content bg-purple" style="color: red">
                含税开票总金额：
              </div>
            </el-col
            >
            <el-col :span="4"
            >
              <div class="grid-content bg-purple" style="color: red">
                {{form.invoiceTotalMoney}}元
              </div>
            </el-col
            >
          </el-row>
          <el-row :gutter="20">

            <el-col :span="4"
            >
              <div class="grid-content bg-purple">总计划装货量：</div>
            </el-col
            >
            <el-col :span="2"
            >
              <div class="grid-content bg-purple">{{form.sumPlanWeight}}</div>
            </el-col
            >
            <el-col :span="2"
            >
              <div class="grid-content bg-purple">总实发量</div>
            </el-col
            >
            <el-col :span="2"
            >
              <div class="grid-content bg-purple">{{form.sumTransmitNumber}}</div>
            </el-col
            >
            <el-col :span="2"
            >
              <div class="grid-content bg-purple">总结算量</div>
            </el-col
            >
            <el-col :span="2"
            >
              <div class="grid-content bg-purple">{{form.sumSettleNumber}}</div>
            </el-col
            >
          </el-row>

          <div class="app-container">
            <div class="mb20">
              <!-- <el-divider direction="vertical" />
              <span class="weight"> 发票抬头</span> -->
              <el-divider content-position="left">发票信息</el-divider>
            </div>
            <el-row :gutter="20">
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">发票抬头:</div>
              </el-col
              >
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">{{form.invoiceTitle}}</div>
              </el-col
              >
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">纳税人识别号：</div>
              </el-col
              >
              <el-col :span="2"
              >
                <div class="grid-content bg-purple">{{form.taxpayerCode}}</div>
              </el-col
              >
              <el-col :span="2"
              >
                <div class="grid-content bg-purple">开票单位地址：</div>
              </el-col
              >
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">
                  {{form.unitAddress}}
                </div>
              </el-col
              >
            </el-row>
            <el-row :gutter="20">
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">开户银行:</div>
              </el-col
              >
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">{{form.kaihuBank}}</div>
              </el-col
              >
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">银行账号:</div>
              </el-col
              >
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">{{form.accountBank}}</div>
              </el-col
              >
            </el-row>

            <el-row :gutter="20">
              <el-col :span="3"
              >
                <div class="grid-content bg-purple">备注:</div>
              </el-col
              >
              <el-col :span="4">
                <div class="grid-content bg-purple">{{form.remark}}</div>
              </el-col>
            </el-row>

            <div class="mb20">
              <!-- <el-divider direction="vertical" />
              <span class="weight"> 邮寄地址</span> -->
              <el-divider content-position="left">邮寄地址</el-divider>
            </div>

            <el-row :gutter="20">
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">邮寄地址：</div>
              </el-col
              >
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">
                  {{form.mailingAddress}}
                </div>
              </el-col
              >
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">收件人：</div>
              </el-col
              >
              <el-col :span="2"
              >
                <div class="grid-content bg-purple">{{form.takeContacts}}</div>
              </el-col
              >
              <el-col :span="2"
              >
                <div class="grid-content bg-purple">联系电话：</div>
              </el-col
              >
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">{{form.takeContactsPhone}}</div>
              </el-col
              >
            </el-row>

            <el-row :gutter="20" style="margin-top:20px">
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">审核结果：</div>
              </el-col
              >
              <el-col :span="3"
              >
                <div class="grid-content bg-purple" style="color: red">
                  {{form.auditStatus}}
                </div>
              </el-col
              >
            </el-row>

            <el-row :gutter="20">
              <el-col :span="4"
              >
                <div class="grid-content bg-purple">审核意见：</div>
              </el-col
              >
              <el-col :span="6"
              >
                <div class="grid-content bg-purple">
                  {{form.auditRemark}}
                </div>
              </el-col
              >
            </el-row>

            <div class="mb20">

              <el-divider content-position="left">运单明细</el-divider>
            </div>
            <el-col :span="1.5">
              <el-button
                type="warning"
                plain
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
                v-hasPermi="['finance:invoiceBill:exportInvoiceCarriageList']"
              >导出
              </el-button>
            </el-col>

            <el-table
              :data="invoiceCarriageListData"
              style="width: 100%">


              <el-table-column prop="carriageId" label="运单号" width="180"></el-table-column>
              <el-table-column prop="carriageState" label="运单状态" width="180"></el-table-column>
              <el-table-column prop="payState" label="支付状态" width="180"></el-table-column>
              <el-table-column prop="shipperFullName" label="托运人" width="180"></el-table-column>
              <el-table-column prop="goodsName" label="货物名称" width="180"></el-table-column>
              <el-table-column prop="deliverContactsProvince" label="装货地" width="180"></el-table-column>
              <el-table-column prop="takeContactsProvince" label="卸货地" width="180"></el-table-column>
              <el-table-column prop="chauffeurName" label="司机" width="180"></el-table-column>
              <el-table-column prop="vehicleNumber" label="车辆" width="180"></el-table-column>
              <el-table-column prop="sjPaymentAmount" label="司机运费" width="180"></el-table-column>
              <el-table-column prop="serviceCharge" label="服务费" width="180"></el-table-column>
              <el-table-column prop="freightSum" label="含税运费" width="180"></el-table-column>
              <!--              <el-table-column prop="date" label="已支付运费" width="180"></el-table-column>-->

            </el-table>


          </div>
          <el-form-item
            style="text-align: right; position:fixed;bottom:0px;  width: 90%; background-color: white; padding-right: 10%">

            <el-button @click="cancel" plain>关闭</el-button>
          </el-form-item>
        </el-form>
      </div>


    </el-drawer>

  </div>
</template>

<script>
  import {
    getDeleteCarriageForInvoice,
    getInvoiceBill,
    getInvoiceCarriageList,
    listInvoiceBill
  } from "@/api/finance/invoiceBill";

  export default {
    name: "InvoiceBill",
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
        openloading: true,
        invoiceCarriageListData: [],
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
        // 承运方-开票申请单表格数据
        invoiceBillList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          applyCode: null,
          shipperName: null,
          courierNumber: null,
          invoiceStatus: null,
          auditStatus: null,
          beginTime: '',
          endTime: ''
        },
        startEndTime: '',
        // 表单参数
        form: {},

      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询承运方-开票申请单列表 */
      getList() {
        this.loading = true;
        listInvoiceBill(this.queryParams).then(response => {
          this.invoiceBillList = response.rows;
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
        this.form = {};
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
        this.ids = selection.map(item => item.applyCode)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },


      /** 查看申请单详情  按钮操作 */
      handleUpdate(row) {
        this.reset();
        const applyCode = row.applyCode;

        if (applyCode == undefined || applyCode == null || applyCode == "") {
          this.msgError("操作失败");
          return;
        }
        var formData = new FormData();
        formData.append("applyCode", applyCode);

        getInvoiceBill(formData).then(response => {

          if (response != null && response.code != undefined && response.code === 200) {
            this.form = response.data;
            this.open = true;
            this.title = "运单-开票申请单详细信息";
          } else {
            this.msgError(response.msg);
          }
        });

        getInvoiceCarriageList(formData).then(response => {

          if (response != null && response.code != undefined && response.code === 200) {
            this.invoiceCarriageListData = response.data;
          } else {
            this.msgError(response.msg);
          }
        });


      },
      // /** 提交按钮 */
      // submitForm() {
      //   this.$refs["form"].validate(valid => {
      //     if (valid) {
      //       if (this.form.applyCode != null) {
      //         updateInvoiceBill(this.form).then(response => {
      //           this.msgSuccess("修改成功");
      //           this.open = false;
      //           this.getList();
      //         });
      //       } else {
      //         addInvoiceBill(this.form).then(response => {
      //           this.msgSuccess("新增成功");
      //           this.open = false;
      //           this.getList();
      //         });
      //       }
      //     }
      //   });
      // },
      /** 撤销申请按钮操作 */
      handleDelete(row) {
        const applyCode = row.applyCode;

        if (applyCode == undefined || applyCode == null || applyCode == "") {
          this.msgError("操作失败");
          return;
        }

        this.$confirm('此操作将撤销申请：' + applyCode + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var formData = new FormData();
          formData.append("applyCode", applyCode);

          getDeleteCarriageForInvoice(formData).then(response => {

            if (response != null && response.code != undefined && response.code === 200) {
              this.msgSuccess(response.msg);

            } else {
              this.msgError(response.msg);
            }

            this.getList();

          });

        }).catch((e) => {

          this.msgError("操作异常" + e);

        });


      },
      /** 导出按钮操作 */
      handleInvoiceBillExport() {
        const queryParams = this.queryParams;

        this.download('/finance/carriageInvoiceBillService/exportFinanceInvoiceList', {
          ...this.queryParams
        }, `InvoiceListPaymentBill_${new Date().getTime()}.xlsx`)


      },



      /** 导出开票申请单 运单明细 按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        const applyCode = this.form.applyCode;

        if (applyCode == undefined || applyCode == null || applyCode == "") {
          this.msgError("操作失败");
          return;
        }


        var formData = new FormData();
        formData.append("applyCode", applyCode);

        this.download('/finance/carriageInvoiceBillService/exportFinanceInvoiceCarriageList', {
          ...this.form
        }, `CarriagePaymentBill_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>

<style lang="scss" scoped>
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
