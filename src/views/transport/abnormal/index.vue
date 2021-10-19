<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch">
      <el-row>
        <div class="mb20 flex justify-end">
          <el-col :span="9">
            <el-form-item label="创建时间：">
              <el-date-picker
                clearable
                type="datetime"
                placeholder="开始日期"
                :picker-options="pickerOptionsStart"
                v-model="queryParams.startTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                class="box-date-picker"
              ></el-date-picker>
              -
              <el-date-picker
                clearable
                type="datetime"
                placeholder="结束日期"
                :picker-options="pickerOptionsEnd"
                v-model="queryParams.endTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                class="box-date-picker"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="车牌号">
              <el-input
                clearable
                size="small mr10"
                v-model="queryParams.vehicleNumber"
                value=""
                placeholder="车牌号"
                @keyup.enter.native="handleQuery"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="司机姓名">
              <el-input
                clearable
                size="small mr10"
                v-model="queryParams.payeeName"
                value=""
                @keyup.enter.native="handleQuery"
                placeholder="司机姓名"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="运单号">
              <el-input
                clearable
                size="small mr10"
                v-model="queryParams.carriageId"
                @keyup.enter.native="handleQuery"
                value=""
                placeholder="运单号"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </div
        >
      </el-row>
      <el-row>
        <div class="mb20 flex justify-end">
          <el-col :span="5">
            <el-form-item label="审核状态">
              <el-select
                clearable
                v-model="queryParams.errorStatus"
                size="small"
              >
                <el-option
                  v-for="item in yunoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item>
              <el-button
                size="small"
                type="primary"
                @click="handleQuery()"
                plain
              >查询
              </el-button
              >
              <el-button size="small" type="primary" plain @click="resetQuery">清空</el-button>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
    </el-form>


    <div class="mb20">

      <el-badge :value="daichuli" class="item">
        <el-button size="small" @click="getSum1(2)">待处理</el-button>
      </el-badge>
      <el-badge :value="shenhezhong" class="item">
        <el-button size="small" @click="getSum1(4)">审核中</el-button>
      </el-badge>
      <el-badge :value="nontshenhe" class="item">
        <el-button size="small" @click="getSum1(5)">审核不通过</el-button>
      </el-badge>

      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="carriageId" label="运单号"></el-table-column>
      <el-table-column prop="errorRemark" label="运单描述"></el-table-column>
      <el-table-column prop="vehicleNumber" label="车船号"></el-table-column>
      <el-table-column prop="payeeName" width="200" label="司机"></el-table-column>
      <el-table-column
        prop="arriveTimeUnit"
        label="装货时间"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="demountTime"
        label="卸货时间"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="errorImage"
        label="单据照片"
        width="120"
      >
        <template slot-scope="scope">
          <!--          <span-->
          <!--            class="operate mr10"-->
          <!--            style="cursor: pointer"-->
          <!--            v-hasPermi="['waybill:carriagePath:selectOftenPathById']"> 查看 </span-->
          <!--          >-->

          <el-image
            :lazy="true"
            style="width: 100px; height: 100px"
            :src="(scope.row.errorImage || '').split(',')[0]"
            :preview-src-list="(scope.row.errorImage || '').split(',')">
          </el-image>


        </template>
      </el-table-column>
      <el-table-column
        prop="freightSum"
        label="结算运费"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="chauffeur"
        label="运费收款人"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="sjPaymentAmount"
        label="司机收款金额"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="drPaymentAmount"
        label="第二收款人收款金额"
        width="200"
      ></el-table-column>
      <el-table-column prop="errorStatus" label="审核状态" width="120"></el-table-column>
      <el-table-column prop="auditStatus" label="异常类型"></el-table-column>
      <el-table-column prop="errorRemark" label="异常描述"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
      <el-table-column prop="disposeExplain" label="处理说明"></el-table-column>
      <el-table-column prop="disposeBy" label="处理人"></el-table-column>
      <el-table-column prop="disposeTime" label="处理时间" width="120"></el-table-column>
      <!-- <el-table-column prop="date" label="发货人电话"></el-table-column> -->
      <el-table-column prop="date" label="操作" fixed="right" width="200px">
        <template slot-scope="scope">
          <span class="operate mr10" @click="divererror(scope.row)">处理</span>
        </template>
      </el-table-column>
    </el-table>


    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!--  异常处理在途异常报备处理-->
    <el-dialog
      title="在途异常报备处理"
      :visible.sync="dialogVisible2"
      width="60%"
      center
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-card class="box-card mb20">
          <div slot="header" class="clearfix">
            <h2>{{form.billingTime}} {{form.vehicleNumber}}</h2>
            <!-- <span>张三    沪A12345</span> -->
            <!--          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div class="flex justify-around align-center">
            <div class="text-center">
              <h2>{{form.deliverContactsProvince}}</h2>
              <p>装货点</p>
            </div>
            <div class="text-center">
              <!-- <el-image></el-image> -->
              <svg t="1622079118311" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="3756" width="400" height="50">
                <path
                  d="M837.9904 570.0608H124.5696a29.0304 29.0304 0 0 1-29.0304-29.0304V482.9696a29.0304 29.0304 0 0 1 29.0304-29.0304h713.4208z"
                  fill="#2C2C2C" p-id="3757"></path>
                <path
                  d="M561.3056 808.96l-40.96-40.96a28.928 28.928 0 0 1 0-40.96l215.04-215.04-215.04-215.04a28.9792 28.9792 0 0 1 0-40.96l40.96-40.96a28.9792 28.9792 0 0 1 40.96 0l296.96 296.96-296.96 296.96a28.9792 28.9792 0 0 1-40.96 0z"
                  fill="#2C2C2C" p-id="3758"></path>
              </svg>
              <p>{{form.unitPrice}}{{form.unitPriceUnit}}</p>
            </div>
            <div class="text-center">
              <h2>{{form.takeContactsProvince}}</h2>
              <p>卸货点</p>
            </div>
          </div>
        </el-card>
        <el-row>
          <el-col :span="12">
            <el-form-item label="运单号：" prop="carriageId">
              {{form.carriageId}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="异常提交时间" prop="createTime">
              {{form.createTime}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="异常描述" prop="errorRemark">
              {{form.errorRemark}}
            </el-form-item>
          </el-col>


<!--            <el-form-item label="异常图片" prop="errorImage">-->
<!--              <ImageUpload v-model="form.errorImage"></ImageUpload>-->
<!--            </el-form-item>-->


            <el-form-item label="异常图片" label-width="300px" prop="errorImage">
              <div class="block" v-for="fit in (form.errorImage || '').split(',')" :key="fit">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="fit"
                  :preview-src-list="(form.errorImage || '').split(',')"
                  :z-index="90000"
                  :fit="fit"></el-image>
              </div>
<!--              <el-image-->
<!--                style="width: 100px; height: 100px"-->
<!--                :src="(form.errorImage || '').split(',')[0]"-->
<!--                :preview-src-list="(form.errorImage || '').split(',')"-->
<!--                :z-index="90000">-->
<!--              </el-image>-->


<!--              <el-upload-->
<!--                ref="errupload"-->

<!--                :action="uploadImgUrl"-->
<!--                list-type="picture-card"-->
<!--                :on-preview="errhandlePictureCardPreview"-->
<!--                :on-remove="errhandleRemove"-->
<!--                :headers="headers"-->
<!--                :file-list="errfileList"-->
<!--                :auto-upload="false"-->
<!--                :on-change="errhandleBeforeUpload"-->
<!--                :on-success="errhandleUploadSuccess">-->
<!--                <i class="el-icon-plus"></i>-->
<!--              </el-upload>-->
<!--              <el-dialog :visible.sync="errdialogVisible">-->
<!--                <img width="100%" :src="errdialogImageUrl" alt="">-->
<!--              </el-dialog>-->
            </el-form-item>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="处理说明" prop="disposeExplain">
              <el-input placeholder="限制输入200字" v-model="form.disposeExplain" maxlength="200" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" v-hasPermi="['waybill:carriageContract:chauffeurReportSolve']"
                   @click="submitForm">确认</el-button>
      </span>
    </el-dialog>


    <!--  处理平台审核异常-->
    <el-dialog
      title="处理平台审核异常"
      :visible.sync="pintaidialogVisible"
      width="70%"
      center>

      <div class="app-container" style="height: 900px;overflow-y:auto; padding-bottom:200px;">

        <el-form ref="pintaiform" :model="pintaiform" label-width="150px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="装货时间：" prop="arriveTime">
                <el-date-picker
                  v-model="pintaiform.arriveTimeUnit"
                  type="datetime"
                  placeholder="选择卸货时间"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="卸货时间" prop="demountTime">
                <el-date-picker
                  v-model="pintaiform.demountTime "
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择卸货时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-col :span="7">
                <el-form-item label="装货数量" prop="realityInstallNumber">
                  <el-input
                    size="mini"
                    v-model.number="pintaiform.realityInstallNumber"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item>
                  <el-select
                    style="width: 74px !important; min-width: 74px !important"
                    v-model="pintaiform.realityInstallNumberUnit"
                    placeholder="单位"
                    size="mini"
                  >
                    <el-option
                      v-for="item in zhuanghuoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="7">
                <el-form-item label="卸货数量" prop="realityArriveNumber">
                  <el-input
                    size="mini"
                    v-model.number="pintaiform.realityArriveNumber "
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item>
                  <el-select
                    style="width: 74px !important; min-width: 74px !important"
                    v-model="pintaiform.realityInstallNumberUnit"
                    placeholder="单位"
                    size="mini"
                  >
                    <el-option
                      v-for="item in zhuanghuoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>

          <el-row>
            <!--            <el-col :span="12">-->
            <!--              <el-form-item label="装货单" prop="goodsDocuments">-->
            <!--                <ImageUpload v-model="pintaiform.goodsDocuments"></ImageUpload>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->

            <!--            <el-col :span="12">-->
            <!--              <el-form-item label="卸货单" prop="unloadDocuments">-->
            <!--                <ImageUpload v-model="pintaiform.unloadDocuments"></ImageUpload>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->

            <el-form-item label="装货单（最多上传三张图片）" label-width="300px" prop="goodsDocuments">

              <el-upload
                ref="zhupload"

                :action="uploadImgUrl"
                list-type="picture-card"
                :on-preview="zhhandlePictureCardPreview"
                :on-remove="zhhandleRemove"
                :headers="headers"
                :file-list="zhfileList"
                :auto-upload="false"
                :on-change="zhhandleBeforeUpload"
                :on-success="zhhandleUploadSuccess">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="zhdialogVisible">
                <img width="100%" :src="zhdialogImageUrl"  alt="">
              </el-dialog>
            </el-form-item>


            <el-form-item label="卸货单（最多上传三张图片）" label-width="300px" prop="unloadDocuments">

              <el-upload
                ref="xhupload"

                :action="uploadImgUrl"
                list-type="picture-card"
                :on-preview="xhhandlePictureCardPreview"
                :on-remove="xhhandleRemove"
                :headers="headers"
                :file-list="xhfileList"
                :auto-upload="false"
                :on-change="xhhandleBeforeUpload"
                :on-success="xhhandleUploadSuccess">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="xhdialogVisible">
                <img width="100%" :src="xhdialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>


          </el-row>


          <el-row>

            <el-form-item label="其它单据（最多上传三张图片）" label-width="300px" prop="otherDocuments">

              <el-upload
                ref="upload"

                :action="uploadImgUrl"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :headers="headers"
                :file-list="fileList"
                :auto-upload="false"
                :on-change="handleBeforeUpload"
                :on-success="handleUploadSuccess">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>

          </el-row>


          <el-row>
            <el-col :span="12">
              <el-form-item label="司机姓名" prop="payeeName">
                <el-input
                  size="mini"
                  disabled
                  v-model="pintaiform.payeeName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!--              <el-form-item label="第二收款人" prop="kaihuName">-->

              <!--                <el-input-->
              <!--                  size="mini"-->
              <!--                  placeholder="请输入"-->
              <!--                  v-model.trim="pintaiform.kaihuName"></el-input>-->

              <!--              </el-form-item>-->


              <el-form-item label="第二收款人" prop="kaihuName">

                <el-select v-model="valueDrPayment" filterable placeholder="请选择">
                  <el-option
                    v-for="item in optionsDrPayment"
                    :key="item.payeeId"
                    :label="item.kaihuName+'-'+item.payeePhone"
                    :value="item.payeeId">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-col>
          </el-row>


          <el-row>
            <el-col :span="12">
              <el-form-item label="司机收款(元)" prop="sjPaymentAmount">
                <el-input
                  v-model="pintaiform.sjPaymentAmount"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">

              <el-form-item label="第二收款人收款(元)" prop="drPaymentAmount">
                <el-input
                  v-model="pintaiform.drPaymentAmount"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="12">
              <el-form-item label="结算运费" prop="freightSum">
                <el-input
                  size="mini"
                  v-model="pintaiform.freightSum"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人" prop="disposeBy">
                <el-input
                  v-model="pintaiform.disposeBy"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="disposePhone">
                <el-input
                  v-model="pintaiform.disposePhone "
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="12">
              <el-form-item label="申诉说明" prop="disposeExplain">
                <el-input v-model="pintaiform.disposeExplain" type="textarea"></el-input>
              </el-form-item>

            </el-col>
          </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="pintaidialogVisible = false">取 消</el-button>
        <el-button type="primary" v-hasPermi="['waybill:carriageContract:platformCheckSolve']"
                   @click="pintaisubmitForm">确认</el-button>
      </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ImageUpload from '@/components/ImageUpload/index'
  import {getToken} from "@/utils/auth";

  import {
    adddivererror,
    addpintaierror,
    errorlist,
    querySecondPayment,
    selecterrorinfo,
    selectlist
  } from "@/api/waybill/errorlist";

  export default {
    data() {
      return {
        // 显示搜索条件
        showSearch: true,
        yunoptions: [
          {
            value: 1,
            label: "已处理",
          },
          {
            value: 2,
            label: "待处理",
          },
          {
            value: 3,
            label: "审核通过",
          },
          {
            value: 4,
            label: "审核中",
          },
          {
            value: 5,
            label: "审核不通过",
          }
        ], //异常管理审核状态
        pickerOptionsStart: {
          disabledDate: (time) => {
            let endDateVal = this.queryParams.endTime;
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime();
            }
          },
        },
        pickerOptionsEnd: {
          disabledDate: (time) => {
            let beginDateVal = this.queryParams.startTime;
            if (beginDateVal) {
              return (
                time.getTime() <
                new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000 + 1
              );
            }
          },
        },
        zhuanghuoptions: [
          {
            value: 1,
            label: "吨",
          },
          {
            value: 2,
            label: "方",
          },
          {
            value: 3,
            label: "件",
          },
        ], //装货单位
        form: {}, //司机异常报备审核
        pintaiform: {
          arriveTime: new Date(),
        },//平台审核异常报备
        dialogVisible2: false, //异常管理弹框显示和隐藏
        pintaidialogVisible: false,//异常管理平台显示和隐藏
        tableData: [],
        radio: 1,
        isShow: false,
        time: [],
        rules: {
          disposeExplain: [{required: true, message: '请输入处理说明', trigger: 'blur'}],
        },
        total: 0, //总条数
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          startTime: undefined,
          endTime: undefined,
          errorStatus: undefined, //审核状态
          carriageId: undefined, //运单号
          payeeName: undefined, //司机姓名
          vehicleNumber: undefined,//车牌号
        },
        daichuli: undefined, //待处理
        shenhezhong: undefined, //审核中
        nontshenhe: undefined,//审核不通过,
        carriageErrorId: null,//在线处理司机异常的id
        optionsDrPayment: [],
        valueDrPayment: '',


        //装货
        zhdialogImageUrl: '',
        zhdialogVisible: false,
        zhfileList: [],
        // 卸货
        xhdialogImageUrl: '',
        xhdialogVisible: false,
        xhfileList: [],

        //其他单据
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],

        // 异常图片
        errdialogImageUrl: '',
        errdialogVisible: false,
        errfileList: [{
          name: '',
          url: '',
        }],



        uploadImgUrl: process.env.VUE_APP_BASE_API + "/file/file/uploadFile", // 上传的图片服务器地址
        headers: {
          Authorization: "Consign " + getToken(),
        },


      };
    },
    components: {
      ImageUpload
    },
    created() {
      this.getList();
      this.getSum(2);
      this.getSum(4);
      this.getSum(5);
    },
    methods: {
      /** 清空按钮操作 */
      resetQuery() {
        this.queryParams = {
          pageNum: 1,
          pageSize: 10,
          startTime: undefined, //开始时间
          endTime: undefined,  //结束时间
          errorStatus: undefined, //审核状态
          carriageId: undefined, //运单号
          payeeName: undefined, //司机姓名
          vehicleNumber: undefined,//车牌号
        },
          this.resetForm("queryForm");
        this.handleQuery();
      },
      /**搜索查询按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getqueryParamslist();
      },
      /** 获取运单异常列表 */
      getList() {
        this.loading = true;
        selectlist(this.addDateRange(this.queryParams)).then(
          response => {
            console.log(response)
            if (response.code == 200) {
              this.tableData = response.rows;
              this.total = response.total;
            }
          }
        );
      },
      //统计所有状态信息数据
      getSum(state) {
        this.queryParams.errorStatus = state;
        errorlist(this.addDateRange(this.queryParams)).then(
          response => {
            if (response.code == 200) {
              if (state == 2) {
                this.daichuli = response.total;
              } else if (state == 4) {
                this.shenhezhong = response.total;
              } else {
                this.nontshenhe = response.total;
              }
            }
          }
        );
      },
      //根据状态查询所有的列表信息
      getSum1(state) {
        this.queryParams.errorStatus = state;
        errorlist(this.addDateRange(this.queryParams)).then(
          response => {
            if (response.code == 200) {
              if (state == 2) {
                this.tableData = response.rows;
                this.daichuli = response.total;
                this.total = response.total;
              } else if (state == 4) {
                this.tableData = response.rows;
                this.shenhezhong = response.total;
                this.total = response.total;
              } else {
                this.tableData = response.rows;
                this.nontshenhe = response.total;
                this.total = response.total;
              }
            }
          }
        );
      },

      //条件查询异常列表
      getqueryParamslist() {
        this.loading = true;
        errorlist(this.addDateRange(this.queryParams)).then(
          response => {
            if (response.code == 200) {
              this.tableData = response.rows;
              this.total = response.total;
            }
          }
        );
      },
      goDispatch() {
        this.isShow = false;
        let radio = this.radio;
        if (radio == 1) {
          this.$router.push("/transport/dispatch/index");
        } else {
          this.$router.push("/transport/dispatch/index");
        }
      },
      goAdd() {
      },
      chuli() {

      },
      //司机报备异常或平台审核
      divererror(row) {
        // console.log(row)
        this.carriageErrorId = row.carriageErrorId;
        if (row.auditStatus == 1) {

          this.dialogVisible2 = true;

          selecterrorinfo(row.carriageId).then(
            response => {
              if (response.code == 200) {
                this.form = response.data;

                //异常图片
                const errorImage = this.form.errorImage;



                if (errorImage != undefined && errorImage != null && errorImage != "") {
                  this.errfileList = [];

                  const errorImageArr = errorImage.split(",");
                  for (var i = 0; i < errorImageArr.length; i++) {
                    const fileData = {
                      name: errorImageArr[i],
                      url: errorImageArr[i],
                    }
                    this.errfileList.push(fileData)
                  }
                }


              }else {
                this.msgError(response.msg);
              }
            }
          );
        } else if (row.auditStatus == 2) {
          // optionsDrPayment
          const data = {payeePhone: null};
          querySecondPayment(data).then(response => {

            if (response != null && response.code === 200) {
              this.optionsDrPayment = response.data;
            } else {
              this.msgError("第二收款人查询失败");

            }

          });

          selecterrorinfo(row.carriageId).then(
            response => {

              if (response.code == 200) {
                this.pintaidialogVisible = true;
                this.pintaiform = response.data;
                this.valueDrPayment = this.pintaiform.secondPayment;


                //装货图片
                const goodsDocuments = this.pintaiform.goodsDocuments;
                this.zhfileList = [];
                if (goodsDocuments != undefined && goodsDocuments != null && goodsDocuments != "") {
                  const goodsDocumentsArr = goodsDocuments.split(",");
                  for (var i = 0; i < goodsDocumentsArr.length; i++) {
                    const fileData = {
                      name: goodsDocumentsArr[i],
                      url: goodsDocumentsArr[i],
                    }
                    this.zhfileList.push(fileData)
                  }
                }

                //卸货图片
                const unloadDocuments = this.pintaiform.unloadDocuments;
                this.xhfileList = [];
                if (unloadDocuments != undefined && unloadDocuments != null && unloadDocuments != "") {
                  const unloadDocumentsArr = unloadDocuments.split(",");
                  for (var i = 0; i < unloadDocumentsArr.length; i++) {
                    const fileData = {
                      name: unloadDocumentsArr[i],
                      url: unloadDocumentsArr[i],
                    }
                    this.xhfileList.push(fileData)
                  }
                }


                //其他单据
                const otherDocuments = this.pintaiform.otherDocuments;
                this.fileList = [];
                if (otherDocuments != undefined && otherDocuments != null && otherDocuments != "") {
                  const otherDocumentsArr = otherDocuments.split(",");
                  for (var i = 0; i < otherDocumentsArr.length; i++) {
                    const fileData = {
                      name: otherDocumentsArr[i],
                      url: otherDocumentsArr[i],
                    }
                    this.fileList.push(fileData)
                  }
                }


                // "CPAP1240056047188848640"
              } else {
                this.msgError(response.msg);
              }
            });
        } else {
          this.$message('风控自动处理异常');
        }
      },
      /** 司机报备在线处理提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            //异常图片
            let errorImage = [];
            if (this.errfileList != null && this.errfileList.length > 0) {
              for (var i = 0; i < this.errfileList.length; i++) {
                errorImage.push(this.errfileList[i].url)
              }
            } else {
              this.msgInfo("请选择上传异常图片");
              return;
            }

            this.form.errorImage = errorImage.toString();

            adddivererror(this.carriageErrorId, this.form.disposeExplain).then(response => {
              console.log(response.code)
              if (response.code == 200) {
                this.$message.success(response.msg);
                this.dialogVisible2 = false;
                this.getList();

              } else {
                this.$message.error(response.msg);
                this.dialogVisible2 = false;
              }
            });
          }
        });
      },
      //平台报备审核处理提交按钮
      pintaisubmitForm: function () {


        //装货图片
        let goodsDocuments = [];
        if (this.zhfileList != null && this.zhfileList.length > 0) {
          for (var i = 0; i < this.zhfileList.length; i++) {
            goodsDocuments.push(this.zhfileList[i].url)
          }
        } else {
          this.msgInfo("请选择上传装货图片");
          return;
        }

        //卸货图片
        let unloadDocuments = [];
        if (this.xhfileList != null && this.xhfileList.length > 0) {
          for (var i = 0; i < this.xhfileList.length; i++) {
            unloadDocuments.push(this.xhfileList[i].url)
          }
        } else {
          this.msgInfo("请选择上传卸货图片");
          return;
        }

        //其他图片
        let otherDocuments = [];
        if (this.fileList != null && this.fileList.length > 0) {
          for (var i = 0; i < this.fileList.length; i++) {
            otherDocuments.push(this.fileList[i].url)
          }
        } else {
          this.msgInfo("请选择上传其它单据");
          return;
        }


        const valueDrPayment = this.valueDrPayment;
// alert(this.valueDrPayment)

        if (valueDrPayment == undefined || valueDrPayment == null || valueDrPayment == "") {
          this.msgInfo("请输入第二收款人");
          return;
        }


        this.pintaiform.goodsDocuments = goodsDocuments.toString();
        this.pintaiform.unloadDocuments = unloadDocuments.toString();
        this.pintaiform.otherDocuments = otherDocuments.toString();


        this.pintaiform.carriageErrorId = this.carriageErrorId;
        this.pintaiform.secondPayment = valueDrPayment;
        addpintaierror(this.pintaiform).then(response => {

          if (response.code == 200) {
            this.$message.success(response.msg);
            this.pintaidialogVisible = false;
            this.getList();

          } else {
            this.$message.error(response.msg);
            this.pintaidialogVisible = false;
          }
        });


      },


      // ------------------------------------------装货图片--------------------------------------------------------------------

      zhhandleBeforeUpload(file) {

        const files = file.raw;


        const typeArr = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
        const isJPG = typeArr.indexOf(files.type) !== -1;
        const isLt2M = files.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.msgError('上传图片只能是 png 、jpeg 、jpg  格式!');
          return;
        }
        if (!isLt2M) {
          this.msgError('上传图片大小不能超过 2MB!');
          return;
        }
        const length = this.zhfileList.length;

        if (length < 3) {
          this.$refs.zhupload.submit();

        } else if (length == 3) {
          const fileData = {
            name: files.uid,
            url: files.uid,
          }
          this.zhfileList.push(fileData);

          this.$delete(this.zhfileList, this.zhfileList.length - 1);

          return false;
        } else {
          this.msgInfo("最多上传三张图片");
          this.$delete(this.zhfileList, this.zhfileList.length - 1);
          return false;

        }


      },
      zhhandleRemove(file) {
        const url = file.url;
        let index = this.zhfileList.findIndex(item => item.url === url);
        this.$delete(this.zhfileList, index);
      },

      zhhandlePictureCardPreview(file) {
        this.zhdialogImageUrl = file.url;
        this.zhdialogVisible = true;
      },
      zhhandleUploadSuccess(res) {
        // console.log(res)
        const fileData = {
          name: res.data,
          url: res.data,
        }
        this.zhfileList.push(fileData);

      },


      // ------------------------------------------卸货图片--------------------------------------------------------------------

      xhhandleBeforeUpload(file) {

        const files = file.raw;


        const typeArr = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
        const isJPG = typeArr.indexOf(files.type) !== -1;
        const isLt2M = files.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.msgError('上传图片只能是 png 、jpeg 、jpg  格式!');
          return;
        }
        if (!isLt2M) {
          this.msgError('上传图片大小不能超过 2MB!');
          return;
        }
        const length = this.xhfileList.length;

        if (length < 3) {
          this.$refs.xhupload.submit();

        } else if (length == 3) {
          const fileData = {
            name: files.uid,
            url: files.uid,
          }
          this.xhfileList.push(fileData);

          this.$delete(this.xhfileList, this.xhfileList.length - 1);

          return false;
        } else {
          this.msgInfo("最多上传三张图片");
          this.$delete(this.xhfileList, this.xhfileList.length - 1);
          return false;

        }


      },
      xhhandleRemove(file) {
        const url = file.url;
        let index = this.xhfileList.findIndex(item => item.url === url);
        this.$delete(this.xhfileList, index);
      },

      xhhandlePictureCardPreview(file) {
        this.xhdialogImageUrl = file.url;
        this.xhdialogVisible = true;
      },
      xhhandleUploadSuccess(res) {
        // console.log(res)
        const fileData = {
          name: res.data,
          url: res.data,
        }
        this.xhfileList.push(fileData);

      },

      // ------------------------------------------其他单据--------------------------------------------------------------------

      handleBeforeUpload(file) {

        const files = file.raw;
        const typeArr = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
        const isJPG = typeArr.indexOf(files.type) !== -1;
        const isLt2M = files.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.msgError('上传图片只能是 png 、jpeg 、jpg  格式!');
          return;
        }
        if (!isLt2M) {
          this.msgError('上传图片大小不能超过 2MB!');
          return;
        }
        const length = this.fileList.length;

        if (length < 3) {
          this.$refs.upload.submit();

        } else if (length == 3) {
          const fileData = {
            name: files.uid,
            url: files.uid,
          }
          this.fileList.push(fileData);

          this.$delete(this.fileList, this.fileList.length - 1);

          return false;
        } else {
          this.msgInfo("最多上传三张图片");
          this.$delete(this.fileList, this.fileList.length - 1);
          return false;

        }


      },
      handleRemove(file) {
        const url = file.url;
        let index = this.fileList.findIndex(item => item.url === url);
        // console.log(index);
        this.$delete(this.fileList, index);
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleUploadSuccess(res) {
        // console.log(res)
        const fileData = {
          name: res.data,
          url: res.data,
        }
        this.fileList.push(fileData);

      },


      // ------------------------------------------异常图片--------------------------------------------------------------------

      errhandleBeforeUpload(file) {

        const files = file.raw;


        const typeArr = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
        const isJPG = typeArr.indexOf(files.type) !== -1;
        const isLt2M = files.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.msgError('上传图片只能是 png 、jpeg 、jpg  格式!');
          return;
        }
        if (!isLt2M) {
          this.msgError('上传图片大小不能超过 2MB!');
          return;
        }
        const length = this.errfileList.length;

        if (length < 3) {
          this.$refs.errupload.submit();

        } else if (length == 3) {
          const fileData = {
            name: files.uid,
            url: files.uid,
          }
          this.errfileList.push(fileData);

          this.$delete(this.errfileList, this.errfileList.length - 1);

          return false;
        } else {
          this.msgInfo("最多上传三张图片");
          this.$delete(this.errfileList, this.errfileList.length - 1);
          return false;

        }


      },
      errhandleRemove(file) {
        const url = file.url;
        let index = this.errfileList.findIndex(item => item.url === url);
        this.$delete(this.errfileList, index);
      },

      errhandlePictureCardPreview(file) {
        this.errdialogImageUrl = file.url;
        this.errdialogVisible = true;
      },
      errhandleUploadSuccess(res) {
        // console.log(res)
        const fileData = {
          name: res.data,
          url: res.data,
        }
        this.errfileList.push(fileData);

      },




    },
  };
</script>

<style scoped>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }

</style>

