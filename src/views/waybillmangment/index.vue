<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch">
      <el-row>
        <div class="mb20 flex justify-end">
          <el-col :span="12">
            <el-form-item label="创建时间">
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
          <el-col :span="6">
            <el-form-item label="运单状态">
              <el-select
                clearable
                v-model="queryParams.carriageState"
                placeholder="运单状态"
                size="small"
              >
                <el-option
                  v-for="item in yundanoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="装货地点">
              <el-input
                clearable
                size="small mr10"
                v-model="queryParams.deliverContactsProvince"
                @keyup.enter.native="handleQuery"
                value=""
                placeholder="装货地点"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button size="small" type="primary" @click="handleQuery()" plain>查询</el-button>
            <el-button size="small" type="primary" @click="resetQuery" plain>清空</el-button>
          </el-col
          >
        </div>
      </el-row>

      <el-row>
        <div class="mb20 flex justify-end">
          <el-col :span="6">
            <el-form-item label="发货联系人">
              <el-input
                clearable
                size="small mr10"
                v-model="queryParams.deliverContacts"
                @keyup.enter.native="handleQuery"
                value=""
                placeholder="发货联系人"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
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


          <el-col :span="8">
            <el-form-item label="卸货地点">
              <el-input
                clearable
                size="small mr10"
                v-model="queryParams.takeContactsProvince"
                @keyup.enter.native="handleQuery"
                value=""
                placeholder="卸货地点"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </div
        >
      </el-row>

      <el-row>
        <div class="mb20 flex justify-end">

          <el-col :span="6">
            <el-form-item label="客户单号/订单号">
              <el-input
                clearable
                size="small mr10"
                v-model="queryParams.relevanceCode"
                @keyup.enter.native="handleQuery"
                value=""
                placeholder="客户单号/订单号"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车船号">
              <el-input
                clearable
                size="small mr10"
                v-model="queryParams.vehicleNumber"
                @keyup.enter.native="handleQuery"
                value=""
                placeholder="车船号"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="selelctisShow == true">
            <el-link type="primary" @click="tabselelctisShow"
            >更多查询
            </el-link
            >
          </el-col
          >
          <el-col :span="8" v-else></el-col>
        </div
        >
      </el-row>


      <el-row v-if="selelctisShow == false">
        <div class="mb20 flex justify-end">
          <!--  <el-col :span="6">
              <el-form-item label="订单号">
                  <el-input
                  clearable
                    size="small mr10"
                    v-model="queryParams.deliverContactsProvince"
                    @keyup.enter.native="handleQuery"
                    value=""
                    placeholder="订单号"
                  >
                  </el-input>
                      </el-form-item></el-col> -->
          <el-col :span="6"
          >
            <el-form-item label="审核状态">
              <el-select
                clearable
                v-model="queryParams.checkState"
                placeholder="审核状态"
                size="small"
              >
                <el-option
                  v-for="item in  checkoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付状态">
              <el-select
                clearable
                v-model="queryParams.payState"
                placeholder="支付状态"
                size="small"
              >
                <el-option
                  v-for="item in payoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </div
        >
      </el-row>

      <el-row v-if="selelctisShow == false">
        <div class="mb20 flex justify-end">
          <el-col :span="5">
            <el-form-item label="开票状态">
              <el-select
                clearable
                v-model="queryParams.ifInvoice"
                placeholder="开票状态"
                size="small"
              >
                <el-option
                  v-for="item in ifoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="司机姓名">
              <el-input
                clearable
                size="small mr10"
                v-model="queryParams.payeeName"
                @keyup.enter.native="handleQuery"
                value=""
                placeholder="司机姓名"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="5">
             <el-form-item label="船舶类型">
                 <el-select
                     clearable
                       v-model="queryParams.oftenPathState"
                       placeholder="船舶类型"
                       size="small"
                     >
                       <el-option
                         v-for="item in zhuangtaioptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"
                       >
                       </el-option>
                     </el-select>
                     </el-form-item>
           </el-col>-->
          <el-col :span="3"
          >
            <el-link type="primary" @click="tabselelctisShow"
            >更多查询
            </el-link
            >
          </el-col
          >
        </div
        >
      </el-row>
    </el-form>


    <div class="mb20">
      <el-button size="small" type="primary" @click="goAdd" plain
      >新建运单
      </el-button
      >

      <!--<el-button size="small" type="danger" @click="deleteById()" plain>作废</el-button> -->
      <el-button size="small" type="warning" plain @click="fukuan1()"
                 :disabled="multiple"

                 v-hasPermi="['finance:carriage:getPaymentBillInfo']">申请付款
      </el-button
      >

      <FileUpload style="display: inline-block;margin-left: 10px;" :url="importDriverUrl" :text="text"
                  :isShowTip="false"></FileUpload>

      <!--<el-button size="small" type="warning" plain>批量操作</el-button> -->
      <!--<el-button size="small" type="primary" plain   @click="handleImport"  v-hasPermi="['waybill:carriagePath:importOftenPath']">导入</el-button>-->
      <el-button size="small" type="primary" @click="handleExport"
                 v-hasPermi="['waybill:CarriageInfo:exportCarriageInfo']" plain>导出
      </el-button>
    </div>

    <div style="color: red; margin-bottom: 10px">可用余额:{{usermonkey}}元</div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#409EFF', color: '#ffffff' }"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="carriageId" label="运单号" width="300px">
        <template slot-scope="scope">
            <span class="operate mr10" @click="godetails(scope.row.carriageId)"
            >{{scope.row.carriageId}}</span
            ></template>
      </el-table-column>

      <el-table-column prop="ifInvoice" :formatter="yunstateFormat" label="是否开票">

      </el-table-column>
      <el-table-column prop="transportType" :formatter="yunstateFormat2" label="运输方式"></el-table-column>
      <!-- <el-table-column prop="date" label="调车方式"></el-table-column> -->
      <el-table-column prop="carriageState" :formatter="yunstateFormat5" label="运单状态"></el-table-column>
      <el-table-column
        :formatter="yunstateFormat3"
        prop="checkState"
        label="审核状态"
        width="120"
      ></el-table-column>
      <el-table-column prop="paymentState" :formatter="yunstateFormat4" label="付款申请状态" width="140px"></el-table-column>
      <el-table-column prop="shipperUserId" label="托运人"></el-table-column>
      <!-- <el-table-column prop="date" label="订单号"></el-table-column> -->
      <el-table-column prop="relevanceCode" label="关联单号"></el-table-column>
      <el-table-column
        prop="goodsName"
        label="货物名称"
        width="120"
      ></el-table-column>
      <el-table-column prop="deliverContactsProvince" width="400px" label="装货地点"></el-table-column>
      <el-table-column prop="takeContactsProvince" width="400px" label="卸货地点"></el-table-column>
      <!-- <el-table-column prop="date" label="承运人"></el-table-column> -->
      <el-table-column prop="payeeName" label="司机"></el-table-column>
      <el-table-column prop="vehicleNumber" label="车船号" width="120"></el-table-column>
      <el-table-column prop="trucksType" label="船舶类型"></el-table-column>
      <el-table-column prop="planPickTime" label="计划装货时间" width="400px"></el-table-column>
      <el-table-column prop="demountTime" label="实际提货时间" width="400px"></el-table-column>
      <el-table-column prop="planArrivalTime" label="实际到货时间" width="400px"></el-table-column>
      <el-table-column prop="unitPriceUnit" label="计价单位"></el-table-column>
      <el-table-column prop="stowageAmount" label="计划装货量" width="120px"></el-table-column>
      <el-table-column prop="realityInstallNumber" label="实发装货量" width="120px"></el-table-column>
      <el-table-column prop="realityArriveNumber" label="实收量"></el-table-column>
      <el-table-column prop="unitPrice" label="单价"></el-table-column>
      <el-table-column prop="sjPaymentAmount" label="司机运费"></el-table-column>
      <!-- <el-table-column prop="date" label="含税运费"></el-table-column> -->
      <el-table-column prop="alreadyPaidYf" label="已支付运费" width="120px"></el-table-column>
      <el-table-column prop="payState" label="支付状态"></el-table-column>
      <!-- <el-table-column prop="date" label="开票状态"></el-table-column> -->
      <el-table-column prop="answerStatus" label="回单状态"></el-table-column>
      <el-table-column prop="remake" label="备注说明"></el-table-column>
      <el-table-column prop="createBy" label="创建人"></el-table-column>
      <el-table-column prop="createTime" width="200px" label="创建时间"></el-table-column>
      <el-table-column prop="date" label="操作" fixed="right" width="200px">
        <template slot-scope="scope">
          <span class="operate mr10" ref="code" v-hasPermi="['waybill:CarriageInfo:deleteCarriageInfo']"
                @click="deleteById(scope.row.carriageId)">作废</span>
<!--          <span class="operate mr10" ref="code" @click="copywaill(scope.row.carriageId,$event)">复制运单</span>-->
          <span class="operate mr10" @click="getfacheinfo(scope.row.carriageId,1)">发车</span>
          <span class="operate" @click="gonglu(scope.row.carriageId,2)">签收</span>
          <!-- <el-popconfirm
           title="选择付款方式"
           confirm-button-text="公路运输"
           cancel-button-text="水路运输"
           @cancel="shuilu"
           @confirm="gonglu"
         >
           <span class="operate" slot="reference">签收</span>
         </el-popconfirm>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :page-sizes="[10, 20, 30, 50, 100]"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />


    <!--  发车-->
    <el-dialog
      title="发车上报"
      :visible.sync="dialogVisible"
      width="50%"
      center>
      <el-form ref="facheform" :model="facheform" :rules="rules" label-width="150px">
        <p>非司机操作，系统将启动对运单的审核流程，请确认后谨慎操作</p>
        <el-card class="box-card mb20">
          <div slot="header" class="clearfix">
            <h2>{{facheform.payeeName}} {{facheform.vehicleTypeCode}}</h2>
            <!--          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div class="flex justify-around align-center">
            <div class="text-center">
              <h2>{{facheform.deliverContactsProvince}}</h2>
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
              <p>{{facheform.unitPrice}}/{{facheform.unitPriceUnit}}</p>
            </div>
            <div class="text-center">
              <h2>{{facheform.takeContactsProvince}}</h2>
              <p>卸货点</p>
            </div>
          </div>
        </el-card>
        <el-form-item label="装货数量" prop="companyName">
          <el-input v-model="facheform.realityInstallNumber"></el-input>

          <el-select
            clearable
            v-model="facheform.realityInstallNumberUnit"
            placeholder="单位"
            size="small"
          >
            <el-option
              v-for="item in facheoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运费" prop="settleAccounts">
          <el-input v-model="facheform.settleAccounts"></el-input>
          元

          <!--          <el-select class="mr10" value="元" placeholder="" clearable>-->
          <!--            <el-option value="1" label="元"></el-option>-->
          <!--          </el-select>-->
        </el-form-item>

        <el-form-item label="装货时间" prop="arriveTime">
          <!--          <el-input v-model="facheform.arriveTime"></el-input>-->
          <el-date-picker
            clearable
            type="datetime"
            placeholder="装货时间"
            :picker-options="pickerOptionsStart"
            v-model="facheform.arriveTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="box-date-picker"
          ></el-date-picker>


        </el-form-item>

        <div>
          <!--          <el-form-item label="装货单" prop="goodsDocuments">-->
          <!--            <ImageUpload v-model="facheform.goodsDocuments"></ImageUpload>-->
          <!--          </el-form-item>-->
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
              <img width="100%" :src="zhdialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>


        </div>

        <div>
          <!--          <el-form-item label="其它单据" prop="otherDocuments">-->
          <!--            <ImageUpload v-model="facheform.otherDocuments"></ImageUpload>-->

          <!--          </el-form-item>-->
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
            <el-dialog :visible.sync="otdialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>

        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendCarReported"   v-hasPermi="['waybill:CarriageInfo:depart']"
        >确 定</el-button
        >
      </span>
    </el-dialog>

    <!--  签收 公路-->
    <el-dialog
      title="签收确认"
      :visible.sync="dialogVisible1"
      width="60%"
      center
    >
      <el-form ref="qianshouform" :model="qianshouform" :rules="rules" label-width="150px">
        <p>非司机操作，系统将启动对运单的审核流程，请确认后谨慎操作</p>
        <el-card class="box-card mb20">
          <div slot="header" class="clearfix">
            <h2>{{qianshouform.payeeName}} {{qianshouform.vehicleTypeCode}}</h2>
            <!--          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div class="flex justify-around align-center">
            <div class="text-center">
              <h2>{{qianshouform.deliverContactsProvince}}</h2>
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
              <p>{{qianshouform.unitPrice}}/{{qianshouform.unitPriceUnit}}</p>
            </div>
            <div class="text-center">
              <h2>{{qianshouform.takeContactsProvince}}</h2>
              <p>卸货点</p>
            </div>
          </div>
        </el-card>
        <el-row>

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
              <img width="100%" :src="zhdialogImageUrl" alt="">
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
            <el-dialog :visible.sync="otdialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>

        </el-row>


        <el-row>

          <el-col :sapn="12">
            <el-form-item label="实装数量" prop="realityInstallNumber">
              <el-input v-model="qianshouform.realityInstallNumber"></el-input>

              <el-select
                clearable
                v-model="qianshouform.realityInstallNumberUnit"
                placeholder="单位"
                size="small"
              >
                <el-option
                  v-for="item in facheoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
<!--            <el-form-item label="装货时间" prop="arriveTime">-->
<!--              {{qianshouform.arriveTime}}-->
              <el-form-item label="装货时间" prop="arriveTime">

                <el-date-picker
                  clearable
                  type="datetime"
                  placeholder="装货时间"
                  :picker-options="pickerOptionsStart"
                  v-model="qianshouform.arriveTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  class="box-date-picker"
                ></el-date-picker>
              </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :sapn="12"><!--不确定-->
            <!--            <el-form-item label="卸货信息" prop="companyName">-->
            <!--              <ImageUpload></ImageUpload>-->
            <!--            </el-form-item>-->
          </el-col>
          <el-col :sapn="12"><!--不确定-->
            <el-form-item label="实收数量" prop="realityArriveNumber">
              <el-input v-model="qianshouform.realityArriveNumber"></el-input>

              <el-select class="mr10"  v-model="qianshouform.realityArriveNumberUnit"  clearable>
                <el-option value="0" label="吨"></el-option>
                <el-option value="1" label="方"></el-option>
                <el-option value="2" label="件"></el-option>
                <el-option value="3" label="整车"></el-option>
              </el-select><!--不确定-->
            </el-form-item>



            <el-form-item label="卸货时间" prop="demountTime">

              <el-date-picker
                clearable
                type="datetime"
                placeholder="卸货时间"
                :picker-options="pickerOptionsStart"
                v-model="facheform.demountTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                class="box-date-picker"
              ></el-date-picker>
            </el-form-item>





          </el-col>
        </el-row>


        <p>结算信息</p>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="qianshouform.unitPrice"></el-input>

          <el-select
            clearable
            v-model="qianshouform.unitPriceUnit"
            placeholder="单位"
            size="small"
          >
            <el-option
              v-for="item in facheoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="结算方式" prop="settleWeight"> <!--不确定-->
          <el-select
            v-model="qianshouform.settleWeight"
            size="small mr10"
            placeholder="结算方式"
            clearable
          >
            <el-option value="1" label="按实际发货量最小结算"></el-option>
            <el-option value="2" label="按实际发货量最大结算"></el-option>
            <el-option value="3" label="按实际发货量结算"></el-option>
            <el-option value="4" label="按实际收货量结算"></el-option>
          </el-select>
        </el-form-item><!--不确定-->

        <el-form-item label="合理亏吨" prop="rationalLossWeight">
          <el-input v-model="qianshouform.rationalLossWeight"></el-input>

          <el-select class="mr10" v-model="qianshouform.rationalLossWeightUnit" placeholder="" clearable>
            <el-option value="1" label="%/车"></el-option>
            <el-option value="1" label="吨/车"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="亏吨单价" prop="lossWeightNumber">
          <el-input v-model="qianshouform.lossWeightNumber"></el-input>

          <el-select class="mr10" v-model="qianshouform.lossWeightNumberUnit" >
            <el-option value="1" label="%/车"></el-option>
            <el-option value="2" label="吨/车"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算运费" prop="settleAccounts">
          <el-input v-model="qianshouform.settleAccounts"></el-input> 元
        </el-form-item>

        <el-row> <!--不确定-->
          <el-col :span="8">
            <el-form-item label="签收人" prop="signUser">
              <el-input v-model="qianshouform.signUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"> <!--不确定-->
            <el-form-item label="签收说明" prop="signRemark">
              <el-input v-model="qianshouform.signRemark" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="signWaybillInfo"    v-hasPermi="['waybill:CarriageInfo:unload']"
        >确认签收</el-button
        >
      </span>
    </el-dialog>

    <!--  签收 水路-->
    <el-dialog
      title="签收确认"
      :visible.sync="dialogVisible2"
      width="60%"
      center
    >
      <p>非船主操作，系统将启动对运单的审核流程，请确认后谨慎操作</p>
      <el-card class="box-card mb20">
        <div slot="header" class="clearfix">
          <h2>张三 沪A12345</h2>
          <!--          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
        </div>
        <div class="flex justify-around align-center">
          <div class="text-center">
            <h2>江西省南昌市毛线区</h2>
            <p>装货点</p>
          </div>
          <div class="text-center">
            <!-- <el-image></el-image> -->
            <svg t="1622079118311" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="3756" width="400" height="50">
              <path
                d="M837.9904 570.0608H124.5696a29.0304 29.0304 0 0 1-29.0304-29.0304V482.9696a29.0304 29.0304 0 0 1 29.0304-29.0304h713.4208z"
                fill="#2C2C2C" p-id="3757"></path>
              <path
                d="M561.3056 808.96l-40.96-40.96a28.928 28.928 0 0 1 0-40.96l215.04-215.04-215.04-215.04a28.9792 28.9792 0 0 1 0-40.96l40.96-40.96a28.9792 28.9792 0 0 1 40.96 0l296.96 296.96-296.96 296.96a28.9792 28.9792 0 0 1-40.96 0z"
                fill="#2C2C2C" p-id="3758"></path>
            </svg>
            <p>480.00/吨</p>
          </div>
          <div class="text-center">
            <h2>广东省广州市白云区</h2>
            <p>卸货点</p>
          </div>
        </div>
      </el-card>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-row>
          <el-col :sapn="12">
            <el-form-item label="装货信息" prop="companyName">
              <ImageUpload></ImageUpload>
            </el-form-item>
          </el-col>
          <el-col :sapn="12">
            <el-form-item label="实装数量" prop="companyName">
              <el-input v-model="form.companyName"></el-input>

              <el-select class="mr10" value="" placeholder="" clearable>
                <el-option value="" label="吨"></el-option>
                <el-option value="1" label="方"></el-option>
                <el-option value="1" label="件"></el-option>
                <el-option value="1" label="整车"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="装货时间" prop="companyName">
              2021
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :sapn="12">
            <el-form-item label="卸货信息" prop="companyName">
              <ImageUpload></ImageUpload>
            </el-form-item>
          </el-col>
          <el-col :sapn="12">
            <el-form-item label="实收数量" prop="companyName">
              <el-input v-model="form.companyName"></el-input>

              <el-select class="mr10" value="" placeholder="" clearable>
                <el-option value="" label="吨"></el-option>
                <el-option value="1" label="方"></el-option>
                <el-option value="1" label="件"></el-option>
                <el-option value="1" label="整车"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="卸货时间" prop="companyName">
              2021
            </el-form-item>
          </el-col>
        </el-row>

        <div>
          <el-form-item label="其它单据" prop="companyName">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </div>

        <p>结算信息</p>
        <el-form-item label="单价" prop="companyName"> 48元/吨</el-form-item>

        <el-form-item label="滞期费规则(元/吨/天)" prop="companyName">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>

        <el-form-item label="其他费用" prop="companyName">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>

        <el-form-item label="滞期费(元)" prop="companyName">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="实际运费" prop="companyName">
          <el-input v-model="form.companyName"></el-input>

          <el-select class="mr10" value="" placeholder="" clearable>
            <el-option value="1" label="元"></el-option>
          </el-select>
        </el-form-item>

        <el-row>
          <el-col :span="8">
            <el-form-item label="签收人" prop="companyName">
              用户名
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签收说明" prop="companyName">
              <el-input v-model="form.companyName" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false"
        >确认签收</el-button
        >
      </span>
    </el-dialog>


    <!--  运单申请付款(单票)第二收款人 2-->
    <el-dialog
      v-if="shengqingform.billType=1"
      :title="'申请付款--'+(shengqingform.billType==1?'单司机收款':(shengqingform.billType==2?'司机、第二人收款':'批量收款'))"
      :visible.sync="TwoVisible"
      width="60%"
      center
      @close="TwoVisible = false"
    >
      <el-form ref="shengqingform" :model="shengqingform" :rules="rules" label-width="150px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="承运司机：" prop="companyName">
              {{shengqingform.chauffeur}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款人：" prop="companyName">
              {{shengqingform.secondPayment}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="结算运费：" prop="companyName">
              {{shengqingform.freightSum}}元
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item label="" prop="companyName">
              （第二收款人收款：{{shengqingform.drPaymentAmount}}元；司机收款：{{shengqingform.sjPaymentAmount}}元
              ；未付总服务费：{{shengqingform.serviceChargeNot}}元）
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="未付款金额：" prop="companyName">
              {{(shengqingform.notAnotherPayeeMoney+shengqingform.notChauffeurMoney)}}元
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="" prop="companyName">
              （第二收款人收款：{{shengqingform.notAnotherPayeeMoney}}元；司机收款：{{shengqingform.notChauffeurMoney}}元）
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :sapn="12">
            <el-form-item label="付款类型" prop="payType" label-width="120px">

              <el-radio-group v-model="shengqingform.payType">

                <el-radio :label="0" border>预付款</el-radio>
                <el-radio :label="1" border>到付款</el-radio>
                <el-radio :label="2" border>回单尾数</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>

          <el-col :span="4">
            <el-form-item
              label="本次申请支付金额（元):"
              prop="companyName"
              label-width="180px">
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="司机" prop="companyName">


              <el-input v-model.trim="shengqingform.chauffeurMoney" @focus="selectBillServiceCharge"
                        @blur="selectBillServiceCharge" @input="selectBillServiceCharge"
                        @change="selectBillServiceCharge" :disabled="isBatch"
                        type="number" class="search mr5" size="small"></el-input>


            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" prop="companyName">
              <el-button type="primary" class="mr10" @click="allPayChauffeurMoney" :disabled="isBatch" plain>全额支付
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="shengqingform.billType==2">
          <el-col :span="4">
            <el-form-item></el-form-item>
          </el-col>
          <el-col :span="6">

            <el-form-item label="第二收款人" prop="companyName">


              <el-input v-model.trim="shengqingform.anotherPayeeMoney" :disabled="isBatch"
                        @focus="selectBillServiceCharge" @blur="selectBillServiceCharge"
                        @input="selectBillServiceCharge" @change="selectBillServiceCharge"

                        type="number" class="search mr5" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" prop="companyName">
              <el-button type="primary" class="mr10" @click="allPayAnotherPayeeMoney" :disabled="isBatch" plain>全额支付
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12" style="vertical-align: middle; ">
            <el-form-item
              label="平台服务费（元）："
              prop="companyName"
              label-width="180px">
              {{shengqingform.serviceCharge}}元
              <span style="color: red;">{{errServiceCharge}}</span>

            </el-form-item>


          </el-col>
          <!-- <el-col :span="6">
          </el-col> -->
          <!-- <el-col :span="8"><el-form-item>支付运费时将扣除对应的服务费 </el-form-item></el-col> -->
        </el-row>


        <el-row>
          <el-col :span="6" style="vertical-align: middle">
            <el-form-item
              label="保险费（元）："
              prop="companyName"
              label-width="180px">
              {{shengqingform.insuranceMoney}}元
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6" style="vertical-align: middle">
            <el-form-item
              label="返利抵扣:"
              prop="companyName"
              label-width="180px"
            >
              <el-switch
                v-model="shengqingform.isRebate"
                @change="isRebateClick"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用" v-if="this.shengqingform.isRebate">
              <el-input style="min-width:60px;height:32px;margin-right:20px" v-model="shengqingform.rebateMoney"
                        size="mini"></el-input>
              元返利抵扣服务费
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item style="color:red">可自主设置是否使用返利，返利抵扣金额不支持开票</el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input
                v-model.trim="shengqingform.remake"
                type="textarea"
                :rows="5"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label=""><h3>总共支付：{{shengqingform.totalPaymentSum}}元</h3></el-form-item>
          </el-col>
        </el-row>


      </el-form>
      <span slot="footer" class="dialog-footer">
              <el-button @click="TwoVisible= false">取 消</el-button>

              <el-button type="primary" v-hasPermi="['finance:carriage:submitCarriagePaymentBillInfo']"
                         @click="subfukuanForm('shengqingform')"
                         plain>提交</el-button
              >
            </span>
    </el-dialog>


  </div>
</template>

<script>
  import {
    delyundan,
    getfukuan,
    getSelectBillServiceCharge,
    getshangbao,
    subfukuan,
    toSendCarReported,
    tounload,
    userbalance,
    waybilllist
  } from "@/api/waybill/waybilllist";
  import copyText from "@/utils/clipboard.js";
  import FileUpload from "@/components/FileUpload/index"
  import ImageUpload from "@/components/ImageUpload/index";
  import {getToken} from "@/utils/auth";

  export default {
    data() {
      return {
        siwtchStete: false,//是否使用返利
        importDriverUrl: '/waybill/publicUploadFile/uploadFile',
        text: '导入',
        waterform: {}, //运单申请付款 水路运输
        batchform: {},//运单申请付款(批量)
        sumcount: 0,//选择申请付款单的数量
        fukuanarr: [],//获取表格申请付款id
        // 选中数组
        ids: [],
        single: true,
        // 非多个禁用
        multiple: true,
        cunarr: [],//保存表格申请付款id拼接
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
        input: '',
        TwoVisible: false,//第二收款人单票弹框
        shengqingform: {
          chauffeurMoney: 0,
          anotherPayeeMoney: 0,
          rebateMoney: 0,
          isRebate: false
        },//运单申请付款(单票)第二收款人
        facheform: {}, //发车上报表单
        qianshouform: {},//签收表单
        value: true,
        form: {},
        tableData: [],
        rules: {},
        radio: 0,
        isShow: false,
        selelctisShow: true,
        time: [],
        selectdialogVisible: false,
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        fukuandialogVisible1: false,
        fukuandialogVisible2: false,
        fukuandialogVisible3: false,
        fukuandialogVisible4: false,
        usermonkey: 0,
        errServiceCharge: "", //计费错误信息
        isBatch: false, //是否批量
        // 显示搜索条件
        showSearch: true,
        total: 0,//总条数
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          startTime: undefined, //开始时间
          endTime: undefined, //结束时间
          carriageState: undefined,//运单状态
          oftenPathName: undefined, //创建线路名称
          goodsName: undefined, //货物名称
          deliverContactsProvince: undefined, //装货地点
          takeContactsProvince: undefined, //卸货地点
          deliverContacts: undefined, //发货联系人
          carriageId: undefined, //运单号
          relevanceCode: undefined, //客户单号/订单号
          vehicleNumber: undefined,//车船号
          checkState: undefined,//审核状态
          payState: undefined,//支付状态
          ifInvoice: undefined,//开票状态
          payeeName: undefined,//司机姓名
        },
        yundanoptions: [
          {
            value: 0,
            label: "草稿",
          },
          {
            value: 1,
            label: "已提交",
          },
          {
            value: 2,
            label: "已分配承运人",
          },
          {
            value: 3,
            label: "已接单",
          },
          {
            value: 4,
            label: "提货中",
          },
          {
            value: 5,
            label: "发车中",
          },
          {
            value: 6,
            label: "已到达",
          },
          {
            value: 7,
            label: "卸货中",
          },
          {
            value: 8,
            label: "已签收",
          },
          {
            value: 9,
            label: "已作废",
          }
        ], //运单状态运单状态:
        checkoptions: [
          {
            value: 0,
            label: "草稿",
          },
          {
            value: 1,
            label: "已提交",
          },
          {
            value: 2,
            label: "已分配承运人",
          },
          {
            value: 3,
            label: "已接单",
          },
          {
            value: 4,
            label: "提货中",
          },
          {
            value: 5,
            label: "发车中",
          },
          {
            value: 6,
            label: "已到达",
          },
          {
            value: 7,
            label: "卸货中",
          },
          {
            value: 8,
            label: "已签收",
          },
          {
            value: 9,
            label: "已作废",
          }
        ], //运单审核状态
        payoptions: [
          {
            value: 0,
            label: "未付款",
          },
          {
            value: 1,
            label: "部分付款",
          },
          {
            value: 2,
            label: "已结清",
          }
        ], //运单支付状态
        ifoptions: [
          {
            value: 0,
            label: "不开",
          },
          {
            value: 1,
            label: "开",
          }
        ], //开票状态
        facheoptions: [
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
          {
            value: 4,
            label: "整车",
          },
        ], //装货数量单位


        uploadImgUrl: process.env.VUE_APP_BASE_API + "/file/file/uploadFile", // 上传的图片服务器地址
        headers: {
          Authorization: "Consign " + getToken(),
        },

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
        otdialogVisible: false,
        fileList: [],
      };

    },

    components: {
      FileUpload,
      ImageUpload

    },
    created() {
      this.getList();
      this.getuserbalance();
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      //全额付款司机
      allPayChauffeurMoney() {
        this.selectBillServiceCharge();
        this.shengqingform.chauffeurMoney = this.shengqingform.notChauffeurMoney;
      },
      //全额付款第二
      allPayAnotherPayeeMoney() {
        this.selectBillServiceCharge();
        this.shengqingform.anotherPayeeMoney = this.shengqingform.notAnotherPayeeMoney;
      },
      //对否使用返利
      isRebateClick() {
        if (!this.shengqingform.isRebate) {
          this.shengqingform.rebateMoney = 0;
        }
      },


      //计算运费的服务费
      selectBillServiceCharge() {
        let chauffeurMoney = this.shengqingform.chauffeurMoney;
        let anotherPayeeMoney = this.shengqingform.anotherPayeeMoney;

        if (chauffeurMoney != undefined && chauffeurMoney != null && chauffeurMoney.length > 0) {

        } else {
          chauffeurMoney = 0;
        }

        if (anotherPayeeMoney != undefined && anotherPayeeMoney != null && anotherPayeeMoney.length > 0) {

        } else {
          anotherPayeeMoney = 0;
        }
        const ids = this.ids;
        const notFreightSum = chauffeurMoney + anotherPayeeMoney;

        var formData = new FormData();
        formData.append("carriageId", ids);
        formData.append("notFreightSum", notFreightSum);

        this.errServiceCharge = "",
          this.shengqingform.serviceCharge = 0,
          getSelectBillServiceCharge(formData).then(response => {

            if (response.code === 200) {
              this.errServiceCharge = "计费成功";
              this.shengqingform.serviceCharge = response.msg;

            } else {

              // this.errServiceCharge = response.msg;
            }
          }).catch(err => {
            this.errServiceCharge = err;

          });
      },

      //提交申请付款
      subfukuanForm() {

        const ids = this.ids;

        if (ids == undefined || ids == null || ids.length == 0) {
          this.msgError("请选择运单");
          return;
        }

        const remake = this.shengqingform.remake;
        if (remake == undefined || remake == null || remake.length == 0) {
          this.msgError("请输入备注运单");
          return;
        }


        let isRebates = "1";
        if (this.shengqingform.isRebate) {
          isRebates = "0";
        } else {
          this.shengqingform.rebateMoney = 0;
        }

        const data = {
          carriageIds: ids.toString(),
          chauffeurMoney: this.shengqingform.chauffeurMoney,
          anotherPayeeMoney: this.shengqingform.anotherPayeeMoney,
          isRebate: isRebates,
          rebateMoney: this.shengqingform.rebateMoney,
          remake: this.shengqingform.remake
        }


        subfukuan(data).then(response => {

          if (response.code === 200) {

            this.msgSuccess(response.msg);

          } else {
            // this.msgError(response.msg);
          }
        }).catch(err => {
          this.msgError(err);
        });

      },
      //显示表格是否开票
      yunstateFormat(row) {
        if (row.ifInvoice == 0) {
          return "不开";
        } else if (row.ifInvoice == 1) {
          return "开";
        }
      },
      //显示运输类型
      yunstateFormat2(row) {
        if (row.transportType == 0) {
          return "公路运输";
        } else if (row.transportType == 1) {
          return "水路运输";
        }
      },
      //显示审核状态
      yunstateFormat3(row) {
        if (row.checkState == 0) {
          return "待审核";
        } else if (row.checkState == 1) {
          return "审核中";
        } else if (row.checkState == 2) {
          return "审核通过";
        } else if (row.checkState == 3) {
          return "审核不通过";
        }
      },
      //付款申请状态 0.未结清 1.已结清
      yunstateFormat4(row) {
        if (row.paymentState == 0) {
          return "未结清";
        } else if (row.paymentState == 1) {
          return "已结清";
        }
      },
      //运单状态: 0草稿,1.已提交 2.已分配承运人 3.已接单 4.提货中 5.发车中 6.已到达 7.卸货中 8.已签收 9.已作废
      yunstateFormat5(row) {
        if (row.carriageState == 0) {
          return "草稿";
        } else if (row.carriageState == 1) {
          return "已提交";
        } else if (row.carriageState == 2) {
          return "已分配承运人";
        } else if (row.carriageState == 3) {
          return "已接单";
        } else if (row.carriageState == 4) {
          return "提货中";
        } else if (row.carriageState == 5) {
          return "发车中";
        } else if (row.carriageState == 6) {
          return "已到达";
        } else if (row.carriageState == 7) {
          return "卸货中";
        } else if (row.carriageState == 8) {
          return "已签收";
        } else if (row.carriageState == 9) {
          return "已作废";
        }
      },
      // 提交上传文件
      submitFileForm() {
        this.$refs.upload.submit();
      },
      //根据运单id查询签收，发车上报的信息
      getbus(carriageId, id) {
        getshangbao(carriageId).then(response => {
            console.log(response);


            if (response.code == 200) {
              if (id == 1) {
                this.facheform = response.data;


                //装货图片
                const goodsDocuments = this.facheform.goodsDocuments;
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
                //其他单据
                const otherDocuments = this.facheform.otherDocuments;
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


              } else {
                // alert(1);
                this.qianshouform = response.data;


                //签收111



                //装货图片
                const goodsDocuments = this.qianshouform.goodsDocuments;
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
                const unloadDocuments = this.qianshouform.unloadDocuments;
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
                const otherDocuments = this.qianshouform.otherDocuments;
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



              }
            }
            // console.log(response.data,this.usermonkey)
          }
        );
      },
      //获取发车上报信息
      getfacheinfo(carriageId, id) {
        this.dialogVisible = true;
        this.loading = true;
        this.getbus(carriageId, id);
      },
      //获取用户的余额
      getuserbalance() {
        this.loading = true;
        userbalance().then(
          response => {
            // console.log(response)
            if (response.code == 200) {
              this.usermonkey = response.data;
            }
          }
        );
      },
      /** 获取运单数据列表 +分页+条件查询*/
      getList() {
        this.loading = true;
        waybilllist(this.addDateRange(this.queryParams)).then(
          response => {
            if (response.code == 200) {
              this.tableData = response.rows;
              this.total = response.total;
              this.loading = false;
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
      godetails(carriageId) {
        this.$router.push({
          path: "/transport/editwaybill",
          query: {carriageId: carriageId},
        });
      },
      goAdd() {
        this.$router.push("/transport/addwaybill");
      },
      //更多查询
      tabselelctisShow() {
        this.selelctisShow = !this.selelctisShow;
      },
      getCar() {
        // console.log(this)
        this.dialogVisible = true;
      },
      gonglu(carriageId, id) {
        this.dialogVisible1 = true;
        this.getbus(carriageId, id);
      },
      shuilu() {
        this.dialogVisible2 = true;
      },
      selectfukuan() {
        this.selectdialogVisible = true;
      },
      // //获取表格中多选框的值
      handleSelectionChange(val) {

        // console.log(val);
        // this.fukuanarr = val;
        this.ids = val.map(item => item.carriageId)
        this.single = val.length !== 1
        this.multiple = !val.length
      },
      //申请付款按钮
      fukuan1() {
        const ids = this.ids;

        if (ids == undefined || ids == null || ids.length == 0) {
          this.msgError("请选择运单");
          return;
        }

        getfukuan(ids).then(response => {
          console.log(response)

          if (response.code === 200) {

            this.TwoVisible = true;

            this.shengqingform = response.data;
            this.shengqingform.serviceCharge = 0;

            this.shengqingform.isRebate = false;
            if (this.shengqingform.billType === 3) {
              this.isBatch = true;
            }
            // alert(this.shengqingform.billType)
            // this.shengqingform.billType
            // 1：单票司机收款
            // 2：单票司机、第二人 收款
            // 3：批量收款


          } else {
            // this.msgError(response.msg);
          }
        }).catch(err => {
          this.msgError(err.msg);

        });
      },
      fukuan2() {
        this.fukuandialogVisible2 = true;
      },
      /**搜索查询按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 清空按钮操作 */
      resetQuery() {
        this.queryParams = {
          pageNum: 1,
          pageSize: 10,
          startTime: undefined, //开始时间
          endTime: undefined, //结束时间
          carriageState: undefined,//运单状态
          oftenPathName: undefined, //创建线路名称
          goodsName: undefined, //货物名称
          deliverContactsProvince: undefined, //装货地点
          takeContactsProvince: undefined, //卸货地点
          deliverContacts: undefined, //发货联系人
          carriageId: undefined, //运单号
          relevanceCode: undefined, //客户单号/订单号
          vehicleNumber: undefined,//车船号
          checkState: undefined,//审核状态
          payState: undefined,//支付状态
          ifInvoice: undefined,//开票状态
          payeeName: undefined,//司机姓名
        },
          this.resetForm("queryForm");
        this.handleQuery();
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('/waybill/CarriageInfo/exportCarriageInfo', {
          ...this.queryParams
        }, `waybill_${new Date().getTime()}.xlsx`)
      },
      checkedyemian() {
        // console.log(this.radio);
        // if (this.radio == 1) {
        //   this.fukuandialogVisible1 = true;
        //   this.selectdialogVisible = false;
        // } else if (this.radio == 2) {
        //   this.fukuandialogVisible2 = true;
        //   this.selectdialogVisible = false;
        // } else if (this.radio == 3) {
        //   this.fukuandialogVisible3 = true;
        //   this.selectdialogVisible = false;
        // } else {
        //   this.fukuandialogVisible4 = true;
        //   this.selectdialogVisible = false;
        // }
      },
      //复制运单号
      copywaill(text, event) {
        copyText(text, event)
      },
      //根据id删除运单
      deleteById(carriageId) {
        delyundan(carriageId).then(
          response => {
            if (response.code == 200) {
              this.msgSuccess("删除成功");
              this.getList();
            } else {
              this.msgError("删除失败");
            }
          }
        );
      },

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

      /**
       * 发车上报
       */
      sendCarReported() {
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


        const data = {
          carriageId: this.facheform.carriageId,
          realityInstallNumber: this.facheform.realityInstallNumber,
          realityInstallNumberUnit: this.facheform.realityInstallNumberUnit,
          settleAccounts: this.facheform.settleAccounts,
          arriveTime: this.facheform.arriveTime,
          goodsDocuments: goodsDocuments.toString(),
          otherDocuments: otherDocuments.toString(),
        };
        //发车上报
        toSendCarReported(data).then(
          response => {
            console.log("发车上报提交");
            console.log(response);

            if (response.code == 200) {
              this.msgSuccess("更新成功");
            } else {
              this.msgError('更新失败');
            }
          });
      },


      /**
       * signWaybillInfo
       * 签收
       */

      signWaybillInfo() {
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


        const data = {
          carriageId: this.qianshouform.carriageId,
          realityInstallNumber: this.qianshouform.realityInstallNumber,
          realityInstallNumberUnit: this.qianshouform.realityInstallNumberUnit,
          demountTime: this.qianshouform.demountTime,
          unitPrice: this.qianshouform.unitPrice,

          unitPriceUnit: this.qianshouform.unitPriceUnit,
          settleWeight: this.qianshouform.settleWeight,
          rationalLossWeight: this.qianshouform.rationalLossWeight,
          rationalLossWeightUnit: this.qianshouform.rationalLossWeightUnit,
          lossWeightNumber: this.qianshouform.lossWeightNumber,
          settleAccounts: this.qianshouform.settleAccounts,
          signUser: this.qianshouform.signUser,
          signRemark: this.qianshouform.signRemark,

          unloadDocuments: unloadDocuments.toString(),
          goodsDocuments: goodsDocuments.toString(),
          otherDocuments: otherDocuments.toString(),
        };




        //签收
        tounload(data).then(
          response => {
            console.log("签收提交");
            console.log(response);
            if (response.code == 200) {
              this.msgSuccess("更新成功");
            } else {
              this.msgError('更新失败');
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
        this.otdialogVisible = true;
      },
      handleUploadSuccess(res) {
        // console.log(res)
        const fileData = {
          name: res.data,
          url: res.data,
        }
        this.fileList.push(fileData);

      },


    },
  };
</script>
<style scoped>
</style>>




