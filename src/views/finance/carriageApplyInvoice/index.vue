<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="运单号" prop="carriageId" label-width="100px;">
        <el-input
          v-model.trim="queryParams.carriageId"
          placeholder="请输入运单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开票申请单号" prop="applyCode" label-width="100px;">
        <el-input
          v-model.trim="queryParams.applyCode"
          placeholder="请输入申请单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="承运人" prop="shipperFullName" label-width="100px;">
        <el-input
          v-model.trim="queryParams.shipperFullName"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="司机" prop="chauffeurName" label-width="100px;">
        <el-input
          v-model.trim="queryParams.chauffeurName"
          placeholder="请输入名称"
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


      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">


      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-s-check"
          size="mini"
          :disabled="multiple"
          @click="handleInvoice"
          v-hasPermi="['finance:carriageApplyInvoice:findForInvoiceInfo']"
        >选择并开票
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="warning"-->
      <!--          plain-->
      <!--          icon="el-icon-download"-->
      <!--          size="mini"-->
      <!--          @click="handleExport"-->
      <!--          v-hasPermi="['finance:carriageApplyInvoice:export']"-->
      <!--        >导出-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="carriageApplyInvoiceList" @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="运单号" align="center" prop="carriageId"/>
      <el-table-column label="运单状态" align="center" prop="carriageState"/>
      <el-table-column label="支付状态" align="center" prop="payState"/>


      <el-table-column label="开票审核" align="center" prop="auditStatus">

        <el-tag slot-scope="scope"
                :type="scope.row.auditStatus === '还未申请' ? 'danger' : 'success'"
                disable-transitions>{{scope.row.auditStatus}}
        </el-tag>


      </el-table-column>
      <el-table-column label="是否开票" align="center" prop="invoiceStatus"/>

      <el-table-column label="货物名称" align="center" prop="goodsName"/>
      <el-table-column label="装货地" align="center" prop="deliverContactsProvince"/>
      <el-table-column label="装货地门牌号" align="center" prop="deliverContactsAddress"/>


      <el-table-column label="卸货地" align="center" prop="takeContactsProvince"/>
      <el-table-column label="卸货地门牌号" align="center" prop="takeContactsAddress"/>


      <el-table-column label="计价方式" align="center" prop="unitPriceUnit"/>

      <el-table-column label="计划提货时间" align="center" prop="planPickTime"/>
      <el-table-column label="计划到货时间" align="center" prop="planArrivalTime"/>

      <el-table-column label="卸货时间" align="center" prop="demountTime"/>

      <el-table-column label="卸货数量" align="center" prop="realityArriveNumber"/>

      <el-table-column label="承运人" align="center" prop="shipperFullName"/>
      <el-table-column label="司机" align="center" prop="chauffeurName"/>
      <el-table-column label="车辆" align="center" prop="vehicleNumber"/>


      <el-table-column label="签收人" align="center" prop="signUser"/>
      <el-table-column label="签收时间" align="center" prop="signForTime"/>

      <el-table-column label="签收说明" align="center" prop="signRemark"/>

      <!--      <el-table-column label="服务费" align="center" prop="carriageId"/>-->
      <!--      <el-table-column label="司机运费" align="center" prop="carriageId"/>-->

      <!--      <el-table-column label="含税运费" align="center" prop="carriageId"/>-->
      <!--      <el-table-column label="已支付运费" align="center" prop="carriageId"/>-->


      <el-table-column label="操作" align="center" fixed="right" class-name="small-padding ">
        <template slot-scope="scope">
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-edit"-->
          <!--            @click="handleUpdate(scope.row)"-->
          <!--            v-hasPermi="['finance:carriageApplyInvoice:edit']"-->
          <!--          >修改-->
          <!--          </el-button>-->
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-s-check"-->
          <!--         -->
          <!--          >-->
          <!--          </el-button>-->

          <el-button size="mini" type="success" icon="el-icon-s-check" @click="handleInvoice(scope.row)"
                     v-hasPermi="['finance:carriageApplyInvoice:findForInvoiceInfo']"> 开票
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

    <!--    &lt;!&ndash; 添加或修改运单-运单开票申请对话框 &ndash;&gt;-->
    <!--    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>-->
    <!--      <el-form ref="form" :model="form" :rules="rules" label-width="80px">-->

    <!--        <el-form-item label="是否删除状态" prop="isDelete">-->
    <!--          <el-input v-model="form.isDelete" placeholder="请输入"/>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <div slot="footer" class="dialog-footer">-->
    <!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
    <!--        <el-button @click="cancel">取 消</el-button>-->
    <!--      </div>-->
    <!--    </el-dialog>-->
    <el-drawer
      v-loading.fullscreen.lock="openloading"
      element-loading-background="rgba(122, 109, 240, 0.8)"

      :title="title"
      :visible.sync="open"
      direction="ttb"
      :before-close="cancel"
      visible.sync="true"
      size="100%">

      <div class="app-container" style="height: 900px;overflow-y:auto; padding-bottom: 100px;">
        <div class="mb20">
          <h2>申请开票</h2>
        </div>
        <el-row :gutter="20" style="text-align: center">

          <h2>结算管理公司：{{form.companyName}}</h2>

        </el-row>
        <div class="mb20">
          <el-divider content-position="left">开票信息</el-divider>
          <!-- <el-divider direction="vertical" /> <span class="weight"> 开票信息</span> -->
        </div>
        <el-form ref="form" :model="form" label-width="150px">
          <el-row :gutter="20">
            <el-col :span="3"
            >
              <div class="grid-content bg-purple">共选择了<span style="color: #443577"><u>&nbsp;{{form.rowCount}}&nbsp;</u></span>个运单
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3"
            >
              <div class="grid-content bg-purple">运费总金额：</div>
            </el-col
            >
            <el-col :span="3"
            >
              <div class="grid-content bg-purple">{{form.totalMoney}}元</div>
            </el-col
            >
            <el-col :span="6"
            >
              <div class="grid-content bg-purple">
                （运费：{{form.addFreightSum}}元 | 服务费：{{form.addServiceCharge}}元 | 服务费：{{form.addInsuranceMoney}}元）
              </div>
            </el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3"
            >
              <div class="grid-content bg-purple">税点：</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">9%</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3"
            >
              <div class="grid-content bg-purple">含税开票总金额：</div>
            </el-col
            >
            <el-col :span="3"
            >
              <div class="grid-content bg-purple" style="color:red">{{form.totalMoney}}元</div>
            </el-col
            >
          </el-row>

          <div class="app-container">
            <div class="mb20">
              <el-divider content-position="left">发票信息</el-divider>
            </div>

            <el-row :gutter="20">
              <el-col :span="16">
                <div class="grid-content bg-purple" style="color:red">
                  请仔细核对开票信息，有问题请点击<span @click="invoiceOpen" class="operate">修改</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3"
              >
                <div class="grid-content bg-purple">发票抬头：</div>
              </el-col
              >

              <div class="grid-content bg-purple">
                <el-input class="input-border"
                          placeholder="请输入发票抬头"
                          v-model="form.invoiceTitle" :disabled="invoiceInput"
                          clearable>
                </el-input>
              </div>


            </el-row>
            <el-row :gutter="20">
              <el-col :span="3"
              >
                <div class="grid-content bg-purple">纳税人识别号：</div>
              </el-col>

              <div class="grid-content bg-purple">
                <el-input class="input-border"
                          placeholder="请输入纳税人识别号"
                          v-model="form.nashuiIdNumber" :disabled="invoiceInput"
                          clearable>
                </el-input>
              </div>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3">
                <div class="grid-content bg-purple">开票单位地址：</div>
              </el-col>
              <div class="grid-content bg-purple">
                <el-input class="input-border"
                          placeholder="请输入开票单位地址"
                          v-model="form.registerAddress" :disabled="invoiceInput"
                          clearable>
                </el-input>
              </div>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3">
                <div class="grid-content bg-purple">开户银行：</div>
              </el-col>
              <div class="grid-content bg-purple">
                <el-input class="input-border"
                          placeholder="请输入开户银行"
                          v-model="form.kaihuBank" :disabled="invoiceInput"
                          clearable>
                </el-input>

              </div>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3">
                <div class="grid-content bg-purple">银行账号：</div>
              </el-col>
              <div class="grid-content bg-purple">
                <el-input class="input-border"
                          placeholder="请输入银行账号"
                          v-model="form.accountBank" :disabled="invoiceInput"
                          clearable>
                </el-input>
              </div>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="3"
              >
                <div class="grid-content bg-purple">备注：</div>
              </el-col
              >
              <el-input type="textarea" v-model="form.remake" maxlength="250"
                        show-word-limit></el-input>
            </el-row>

            <div class="mb20">
              <!-- <el-divider direction="vertical" />
              <span class="weight">
    邮寄地址</span> -->
              <el-divider content-position="left">邮寄地址</el-divider>
            </div>

            <el-row :gutter="20">
              <el-col :span="16">
                <div class="grid-content bg-purple" style="color:red">
                  请仔细核对开票信息，有问题请点击<span class="operate" @click="siteOpen">修改</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3"
              >
                <div class="grid-content bg-purple">邮寄地址：</div>
              </el-col
              >

              <div class="grid-content bg-purple">
                <el-input class="input-border"
                          placeholder="请输入邮寄地址"
                          v-model="form.invoiceCollectAddress" :disabled="siteInput"
                          clearable>
                </el-input>
              </div>


            </el-row>
            <el-row :gutter="20">
              <el-col :span="3"
              >
                <div class="grid-content bg-purple">收件人：</div>
              </el-col>

              <div class="grid-content bg-purple">
                <el-input class="input-border"
                          placeholder="请输入收件人"
                          v-model="form.invoiceCollectName" :disabled="siteInput"
                          clearable>
                </el-input>
              </div>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3"
              >
                <div class="grid-content bg-purple">联系电话：</div>
              </el-col
              >

              <div class="grid-content bg-purple">
                <el-input class="input-border"
                          placeholder="请输入联系电话"
                          v-model="form.invoiceCollectPhone" :disabled="siteInput"
                          clearable>
                </el-input>
              </div>

            </el-row>

            <el-row :gutter="20" style="padding-right: 20%">


            </el-row>


            <el-form-item
              style="text-align: right; position:fixed;bottom:0px;  width: 90%; background-color: white; padding-right: 10%">
              <div class="grid-content bg-purple" style="text-align: right">
                <el-checkbox v-model="goodChecked" style="color:red">我已确认开票信息准确无误</el-checkbox>
              </div>
              <el-button type="primary" @click="submitForm"
                         v-hasPermi="['finance:carriageApplyInvoice:createCarriageForInvoice']"
                         plain
              >确定开票
              </el-button
              >
              <el-button @click="cancel" plain
              >取消
              </el-button
              >
            </el-form-item>
          </div>
        </el-form>


      </div>


    </el-drawer>


  </div>
</template>

<style lang="scss" scoped>

  .input-border {
    border: rgba(122, 109, 240, 0.41) 1px solid
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
    createCarriageForInvoice,
    getFindForInvoiceInfo,
    listCarriageApplyInvoice
  } from "@/api/finance/carriageApplyInvoice";

  export default {
    name: "CarriageApplyInvoice",
    components: {},
    data() {
      return {
        // 遮罩层
        loading: true,
        openloading: true,
        goodChecked: false,

        invoiceInput: true, //发票输入框
        siteInput: true, //邮寄地址输入框

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
        // 运单-运单开票申请表格数据
        carriageApplyInvoiceList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          userId: null,
          carriageId: null,
          applyCode: null,
          shipperFullName: null,
          chauffeurName: null,
          auditStatus: null,
          invoiceStatus: null,
        },
        // 表单参数
        form: {carriageIds: null},
        // 表单校验
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询运单-运单开票申请列表 */
      getList() {
        this.loading = true;
        listCarriageApplyInvoice(this.queryParams).then(response => {
          this.carriageApplyInvoiceList = response.rows;
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
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.carriageId)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },


      //开启修改发票信息
      invoiceOpen() {
        this.invoiceInput = this.invoiceInput == false;
      },


      //开启邮寄地址
      siteOpen() {
        this.siteInput = this.siteInput == false;
      },

      /** 提交按钮 */
      submitForm() {

        if (this.goodChecked == false) {
          this.msgError("请先确认开票信息无误！");
          return;
        }

        const carriageIds = this.form.carriageIds;


        if (carriageIds == undefined || carriageIds == null || carriageIds == "") {
          this.msgError("操作失败");
          return;
        }
        const invoiceTitle = this.form.invoiceTitle;
        const nashuiIdNumber = this.form.nashuiIdNumber;
        const registerAddress = this.form.registerAddress;
        const kaihuBank = this.form.kaihuBank;
        const accountBank = this.form.accountBank;
        const remake = this.form.remake;
        const invoiceCollectAddress = this.form.invoiceCollectAddress;
        const invoiceCollectName = this.form.invoiceCollectName;
        const invoiceCollectPhone = this.form.invoiceCollectPhone;


        const invoiceData = {
          carriageIds: carriageIds,
          invoiceTitle: invoiceTitle,
          nashuiIdNumber: nashuiIdNumber,
          registerAddress: registerAddress,
          kaihuBank: kaihuBank,
          accountBank: accountBank,
          remake: remake,
          invoiceCollectAddress: invoiceCollectAddress,
          invoiceCollectName: invoiceCollectName,
          invoiceCollectPhone: invoiceCollectPhone,
        };

        createCarriageForInvoice(invoiceData).then(response => {

          if (response != null && response.code != undefined && response.code === 200) {
            this.msgSuccess(response.msg);
            this.cancel();
          } else {
            this.msgError(response.msg);
          }

        }).catch(ss => {
          this.msgError(1);

        });


      },
      /**
       *
       * 选择开票
       *  */
      handleInvoice(row) {
        this.goodChecked = false;


        let carriageIds = row.carriageId || this.ids;
        this.reset();
        this.title = "运单选择-运单开票申请";

        if (this.ids != "" && this.ids.length != 0) {
          carriageIds = carriageIds.toString();
        }


        this.reset();
        this.openloading = true;

        if (carriageIds == undefined || carriageIds == null || carriageIds == "") {
          this.msgError("操作失败");
          return;
        }


        getFindForInvoiceInfo(carriageIds).then(response => {
          this.open = true;

          this.openloading = false;

          if (response != null && response.code != undefined && response.code === 200) {
            this.open = true;

            this.form = response.data;
            this.form.carriageIds = carriageIds;

            this.title = "运单选择-申请开票";

          } else {
            this.msgError(response.msg);

          }


        });


      },


      // /** 导出按钮操作 */
      // handleExport() {
      //   const queryParams = this.queryParams;
      //   this.$confirm('是否确认导出所有运单-运单开票申请数据项?', "警告", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   }).then(function () {
      //     return exportCarriageApplyInvoice(queryParams);
      //   }).then(response => {
      //     this.download(response.msg);
      //   })
      // }
    }
  };
</script>
