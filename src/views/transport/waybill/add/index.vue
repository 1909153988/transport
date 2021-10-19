<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <div class="borderdiv">
        <el-row>
          <el-col :span="8">

            <el-form-item label="是否开票" prop="ifInvoice">
              <div>
                <el-radio v-model="form.ifInvoice" label="0" border>不开</el-radio>
                <el-radio v-model="form.ifInvoice" label="1" border>开</el-radio>
              </div>
            </el-form-item>


          </el-col>
          <el-col :span="4">
            <el-form-item label="关联单号">
              <el-input v-model="form.relevanceCode"></el-input>
            </el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item style="margin-left: 30px">
              <div style="display: flex; flex-direction: row; align-items: center">
                <i class="el-icon-warning"></i>
                <span style="color: gray">可根据您公司定义的唯一编号录入,便于管理</span>
              </div>
            </el-form-item>
          </el-col
          >
        </el-row>
        <!-- v-model.trim="detailDataForm. " -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="开单时间" prop="billingTime">
              <el-date-picker
                v-model="form.billingTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="12:00:00">
              </el-date-picker>
            </el-form-item>


          </el-col>
          <el-col :span="8">
            <el-form-item label="计划提货时间" prop="planPickTime">
              <el-date-picker
                v-model="form.planPickTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="12:00:00">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划到货时间" prop="planArrivalTime">
              <el-date-picker
                v-model="form.planArrivalTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="12:00:00">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="托运人" prop="shipperUserId">

              <el-select v-model="form.shipperUserId" filterable placeholder="请选择">
                <el-option
                  v-for="item in optionsClientUserCompany"
                  :key="item.userId"
                  :label="item.shipperFullName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>



          </el-col>
          <el-col :span="8">
            <el-form-item label="运输类型">
              <el-select v-model="form.transportType" placeholder="请选择" size="mini">
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
          <el-col :span="8">
            <el-form-item label="选择常发线路">
              <!--<el-input v-model="name"></el-input> -->
              <el-select v-model="form.saveOftenPathId" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in lineoptions"
                  :key="item.oftenPathId"
                  :label="item.oftenPathName"
                  :value="item.oftenPathId"
                >
                </el-option>
              </el-select>
            </el-form-item
            >
          </el-col>
        </el-row>
      </div>

      <div class="borderdiv">
        <el-row :gutter="20" style="margin-left: 0px">
          <el-col :span="10" class="div-left">
            <div class="grid-content bg-purple">
              <div class="mb20">

                <el-divider content-position="left">发货方</el-divider>
              </div>
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="12"
                >
                  <div class="grid-content bg-purple">
                    <el-form-item label="发货联系人" prop="deliverContacts">
                      <el-input
                        size="mini"
                        v-model="form.deliverContacts"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </div
                  >
                </el-col>


                <el-col :span="10"
                >
                  <div class="grid-content bg-purple">
                    <el-form-item label="电话">
                      <el-input
                        size="mini"
                        v-model="form.deliverContactsPhone"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </div
                  >
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="省/市/区(县)" prop="deliverContactsProvinceArr">

                    <div class="block">
                      <el-cascader
                        v-model.trim="form.deliverContactsProvinceArr"
                        ref="deliverContactsProvinceArr"
                        placeholder="请选择或输入"
                        :options="address"
                        filterable></el-cascader>
                    </div>

                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="街道-门牌号" prop="deliverContactsAddress">
                    <el-input
                      v-model="form.deliverContactsAddress"
                      placeholder="请输入街道-门牌号"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="">
                    <el-checkbox v-model="form.saveOftenPath" true-label='1' false-label='0'
                    >保存为常发线路
                    </el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>

          <el-col :span="10" class="div-right">
            <div class="grid-content bg-purple">
              <div class="mb20">
                <el-divider content-position="left">收货方</el-divider>
              </div>
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="12" style="border: none"
                >
                  <div style="border: none" class="grid-content bg-purple">
                    <el-form-item label="收货联系人" prop="takeContacts">
                      <el-input
                        size="mini"
                        v-model="form.takeContacts"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </div
                  >
                </el-col>

                <el-col :span="10" style="border: none"
                >
                  <div class="grid-content bg-purple">
                    <el-form-item label="电话">
                      <el-input
                        size="mini"
                        v-model="form.takeContactsPhone"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </div
                  >
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="省/市/区(县)" prop="takeContactsProvinceArr">

                    <div class="block">
                      <el-cascader
                        v-model="form.takeContactsProvinceArr"
                        ref="takeContactsProvinceArr"
                        placeholder="请选择或输入"
                        :options="address"
                        filterable></el-cascader>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="街道-门牌号" prop="takeContactsAddress">
                    <el-input
                      v-model="form.takeContactsAddress"
                      placeholder="请输入街道-门牌号"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div
            >
          </el-col>
        </el-row>

        <div class="info">
          <div class="mb20">
            <!-- <el-divider content-position="left" />
            <span class="weight">货物信息</span> -->

            <el-divider content-position="left">货物信息</el-divider>
          </div>
          <el-row :gutter="20">
            <el-col :span="12"
            >
              <div class="grid-content bg-purple">
                <el-form-item label="货物名称" prop="goodsName">
                  <el-input
                    size="mini"
                    v-model="form.goodsName"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </div
              >
            </el-col>
            <el-col :span="12"
            >
              <div class="grid-content bg-purple">
                <el-form-item label="货物类型" prop="goodsType">
                  <el-select v-model="form.goodsType" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.dict_value"
                      :label="item.dict_label"
                      :value="item.dict_value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div
              >
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12"
            >
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="计划装货量" prop="planWeight">
                      <el-input
                        size="mini"
                        v-model="form.planWeight"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">
                    <el-form-item prop="planWeightUnit">
                      <el-select
                        style="
                          width: 74px !important;
                          min-width: 74px !important;
                        "
                        v-model="form.planWeightUnit"
                        placeholder="单位"
                        size="mini"
                      >
                        <el-option
                          v-for="item in planptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div
              >
            </el-col>
            <el-col :span="12"
            >
              <div class="grid-content bg-purple">
                <el-form-item label="货值(元)">
                  <el-input
                    size="mini"
                    v-model="form.goodsValue"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </div
              >
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12"
            >
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="12"
                  >
                    <div class="grid-content bg-purple">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="合理亏吨">
                            <el-input
                              size="mini"
                              v-model="form.rationalLossWeight"
                              placeholder="请输入"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="1">
                          <el-form-item>
                            <el-select
                              style="
                          width: 74px !important;
                          min-width: 74px !important;
                        "
                              v-model="form.rationalLossWeightUnit"
                              placeholder="单位"
                              size="mini"
                            >
                              <el-option
                                v-for="item in rationptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              >
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div
                    >
                  </el-col>
                </el-row>
              </div
              >
            </el-col>
            <el-col :span="12"
            >
              <div class="grid-content bg-purple">
                <el-form-item label="结算重量" prop="settleWeight">
                  <el-select
                    v-model="form.settleWeight"
                    placeholder="请选择"
                    size="mini"
                  >
                    <el-option
                      v-for="item in settleoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div
              >
            </el-col>
          </el-row>
        </div>
        <div class="info">
          <div class="mb20">
            <!-- <el-divider content-position="left" />
            <span class="weight">运费信息</span> -->
            <el-divider content-position="left">交易信息</el-divider>
          </div>

          <el-row :gutter="20">
            <el-col :span="8"
            >
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="单价" prop="unitPrice">
                      <el-input
                        size="mini"
                        v-model="form.unitPrice"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">
                    <el-form-item prop="unitPriceUnit">
                      <el-select
                        style="
                          width: 74px !important;
                          min-width: 74px !important;
                        "
                        v-model="form.unitPriceUnit"
                        placeholder="元/车"
                        size="mini"
                      >
                        <el-option
                          v-for="item in unitoptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div
              >
            </el-col>
            <el-col :span="8"
            >
              <div class="grid-content bg-purple">
                <el-form-item label="付款方式">
                  <el-select
                    style="width: 74px !important; min-width: 74px !important"
                    v-model="form.payMethod"
                    placeholder="现付"
                    size="mini"
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
              </div
              >
            </el-col>
            <el-col :span="8"
            >
              <div class="grid-content bg-purple">
                <el-row>
                  <!--  <el-col :span="8">
                      <el-form-item label="亏吨单价" prop=" ">
                        <el-input
                          size="mini"
                          v-model="form.lossWeightNumber"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-form-item>
                    </el-col> -->
                  <!--   <el-col :span="1">
                     <el-form-item>
                       <el-select
                         style="
                           width: 74px !important;
                           min-width: 74px !important;
                         "
                         v-model="form.lossWeightNumberUnit"
                         placeholder="元/车"
                         size="mini"
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
                   </el-col>-->
                </el-row>
              </div
              >
            </el-col>
            <el-col :span="10">

              <el-form-item label="是否为长期货源" prop="ifLongTerm">
                <div>
                  <el-radio v-model="form.ifLongTerm" label="0" border>不是</el-radio>
                  <el-radio v-model="form.ifLongTerm" label="1" border>是</el-radio>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <!--   <el-row>

               <el-col :span="12">
                 <el-form-item label-width="160px" label="总运费：">
                   10100.00元（服务费：100元；保险费：xxx元）
                 </el-form-item></el-col
               >
             </el-row> -->
          <el-row>
            <el-col :span="10">
              <el-form-item label="货运险方案" prop="insuranceType">
                <div>
                  <el-radio v-model="form.insuranceType" label="1" border>不投保</el-radio>
                  <el-radio v-model="form.insuranceType" label="2" border>综合险</el-radio>
                  <el-radio v-model="form.insuranceType" label="3" border>基本险</el-radio>
                </div>
              </el-form-item>


            </el-col>
            <el-col :span="12">
              <el-form-item
              >具体以保险对接方案为准（要有保险方案说明以及保险金额显示）
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-row>
          <el-col :span="12">
            <el-form-item label-width="160px" label="预估总运费：">
              10100.00元（结算运费:xxxx元:服务费：100元；保险费：xxx元）
            </el-form-item>
          </el-col
          >
        </el-row>


        <div v-if>
          <el-row>
            <el-col :span="20">
              <el-form-item label="承运司机(输入手机号搜索)">
<!--                <input type="text" placeholder="请输入" class="el-input__inner" v-model="form.chauffeur">-->
                <input type="text" placeholder="请输入" class="el-input__inner"

                       @focus="findChauffeurPhone"
                       @blur="findChauffeurPhone" @input="findChauffeurPhone"
                       @change="findChauffeurPhone"
                       v-model.trim="selectChauffeurPhone"> <span style="color: #7a6df0">查询结果：{{selectChauffeur}}</span>

              </el-form-item>
            </el-col>
            <el-col :span="8"
            >
              <el-form-item label="承运车辆">
                <el-input v-model="form.vehicleNumber"></el-input>
              </el-form-item
              >
            </el-col>
            <el-col :span="8"
            >
              <el-form-item label="计划配载量">
                <el-input v-model="form.stowageAmount"></el-input>
              </el-form-item
              >
            </el-col>
          </el-row>
          <el-row>

            <el-col :span="10">


              <el-form-item label="运费收款人" prop="is_freightGathering">
                <div>
                  <el-radio v-model="is_freightGathering" label="0" border>只是司机本人</el-radio>
                  <el-radio v-model="is_freightGathering" label="1" border>司机和第二收款人</el-radio>
                </div>
              </el-form-item>

            </el-col>
          </el-row>


          <el-row v-if="is_freightGathering==1">

            <el-col :span="8">
              <el-form-item label="司机收款金额(元)">
                <el-input
                  size="mini"
                  v-model="form.sjPaymentAmount"
                  placeholder="0"
                ></el-input>
              </el-form-item>
            </el-col>


            <el-col :span="15">
              <el-form-item label="第二收款人" prop="kaihuName">

                <el-select v-model="form.secondPayment" filterable placeholder="请选择">
                  <el-option
                    v-for="item in optionsDrPayment"
                    :key="item.payeeId"
                    :label="item.kaihuName+'-'+item.payeePhone"
                    :value="item.payeeId">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="第二收款人收款金额(元)">
                <el-input
                  size="mini"
                  v-model="form.drPaymentAmount"
                  placeholder="0"
                ></el-input>
              </el-form-item>
            </el-col>


            <el-col :span="8">
              <!--              <el-form-item label="代收款协议" v-if="form.freightGathering==1">-->
              <!--                <el-upload-->
              <!--                  -->
              <!--                  class="upload-demo"-->
              <!--                  drag-->
              <!--                  action="https://jsonplaceholder.typicode.com/posts/"-->
              <!--                  multiple>-->
              <!--                  <i class="el-icon-upload"></i>-->
              <!--                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
              <!--                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
              <!--                </el-upload>-->
              <!--              </el-form-item>-->

              <el-form-item label="代收款协议">
                <ImageUpload v-model="form.agentMoneyAgreement"></ImageUpload>
              </el-form-item>
              <el-form-item
              >只能上传jpg/png文件
              </el-form-item>


            </el-col>
          </el-row>


          <div class="info">
            <div class="mb20">
              <!-- <el-divider content-position="left" />
              <span class="weight">其它</span> -->

              <el-divider content-position="left">其它</el-divider>
            </div>

            <el-row :gutter="20">
              <el-col :span="24"
              >
                <div class="grid-content bg-purple">
                  <el-form-item label="备注信息">
                    <el-input
                      v-model="form.remake"
                      type="textarea"
                      :rows="5"
                    ></el-input>
                  </el-form-item>
                </div
                >
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24"
              >
                <div class="grid-content bg-purple">
                  <el-form-item>
                    <div class="xieyidiv">
                      <el-checkbox
                        style="margin-right: 10px"
                        v-model="checked"
                      ></el-checkbox
                      >
                      我同意并遵守《托运人合同》,并授权系统生成我司电子公章
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item label=" ">
              <el-button type="info" :disabled="!checked" @click="caogao('form')" plain>保存草稿
              </el-button
              >
              <el-button type="primary" :disabled="!checked" @click="submitForm('form')" plain
              >提交
              </el-button
              >
              <el-button @click="goCanl()" plain>取消</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {addwaybill, getdirverinfo,getUserCompany, querySecondPayment, getUserOftenPath, savecaogao, selectlinehuowu} from "@/api/waybill/waybilllist";
  import address from "@/utils/address.js";
  import ImageUpload from "@/components/ImageUpload/index";

  export default {
    name: "RuoyiUiIndex",
    data() {
      return {
        address: address.total,
        phone: 123456,
        testinput: "",
        checked: false,
        name: "",
        value: [],
        radio: 1,
        is_freightGathering:'0',
        form: {
          ifInvoice: '0', //是否开票 0不开 1开
          relevanceCode: '', //关联单号

          billingTime: '',
          planPickTime: '',
          planArrivalTime: '',
          chauffeur: null,

          saveOftenPath: '0',
          ifLongTerm: '0',
          insuranceType: '1',
          deliverContactsProvinceArr: null,
          deliverContactsProvince: null,
          takeContactsProvinceArr: null,
          takeContactsProvince: null,
        },

        input: "",
        input2: "",
        // detailDataForm: {
        //    : "",
        // },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          selectableRange: "00:00:00 - 23:59:59",
        },
        options: [], //货物类型
        planptions: [
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
        ], //计划装货量单位
        rationptions: [
          {
            value: 1,
            label: "%",
          },
          {
            value: 2,
            label: "吨",
          },
          {
            value: 3,
            label: "方",
          },
          {
            value: 4,
            label: "件",
          },
          {
            value: 5,
            label: "整车",
          },
        ], //合理亏吨单位
        settleoptions: [
          {
            value: 1,
            label: "按实际收发量最小结算",
          },
          {
            value: 2,
            label: "按实际收发量最大结算",
          },
          {
            value: 3,
            label: "按实际发货量结算",
          },
          {
            value: 4,
            label: "按实际收货量结算",
          }
        ], //结算重量
        unitoptions: [
          {
            value: 0,
            label: "吨/元",
          },
          {
            value: 1,
            label: "方/元",
          },
          {
            value: 2,
            label: "件/元",
          }
        ], //单价单位
        payoptions: [
          {
            value: 0,
            label: "现付",
          },
          {
            value: 1,
            label: "到付",
          },
          {
            value: 2,
            label: "回单付",
          },
          {
            value: 3,
            label: "月结",
          },
          {
            value: 2,
            label: "多笔付",
          }
        ], //付款方式
        optionsClientUserCompany: [], //托运人选择
        optionsDrPayment: [], //第二收款人选择
        selectChauffeur: '', //司机搜索结果
        selectChauffeurPhone: '',

        yunoptions: [
          {
            value: 0,
            label: "公路运输",
          },
          {
            value: 1,
            label: "水路运输",
          },
        ], //运输类型
        value: "",
        // checked: true,
        faarr: [],//接收发货方省市区文本分割的字符的数组
        shouarr: [],//接收收货方省市区文本分割的字符的数组
        lineoptions: [],
        diveroptions: [{}],
        rules: {

          planPickTime: [
            {required: true, message: '请选择计划提货时间', trigger: 'blur'},
          ],
          deliverContacts: [
            {required: true, message: '请输入发货联系人', trigger: 'blur'},
          ], deliverContactsProvinceArr: [
            {required: true, message: '请选择或输入省市区', trigger: 'blur'},
          ], deliverContactsAddress: [
            {required: true, message: '请输入街道-门牌号', trigger: 'blur'},
          ], takeContacts: [
            {required: true, message: '请输入收货联系人', trigger: 'blur'},
          ], takeContactsProvinceArr: [
            {required: true, message: '请选择或输入省市区', trigger: 'blur'},
          ], takeContactsAddress: [
            {required: true, message: '请输入街道-门牌号', trigger: 'blur'},
          ], goodsName: [
            {required: true, message: '请选择货物名称', trigger: 'blur'},
          ], goodsType: [
            {required: true, message: '请选择货物类型', trigger: 'blur'},
          ], planWeight: [
            {required: true, message: '请输入计划装货量', trigger: 'blur'},
          ], planWeightUnit: [
            {required: true, message: '请选择计划装货量单位', trigger: 'blur'},
          ], settleWeight: [
            {required: true, message: '请选择结算重量', trigger: 'blur'},
          ], unitPrice: [
            {required: true, message: '请输入单价', trigger: 'blur'},
          ], unitPriceUnit: [
            {required: true, message: '请选择单价单位', trigger: 'blur'},
          ], insuranceType: [
            {required: true, message: '请选择货运险方案', trigger: 'blur'},
          ]
        }
      };
    },
    created() {
      this.togetUserCompany();

      this.gohuowuleixing();
      this.getline();
    },
    components: {
      ImageUpload,
    },
    mounted() {
    },
    methods: {

      togetUserCompany(){
        getUserCompany().then(response => {

          if (response != null) {
            console.log(response)
            this.optionsClientUserCompany = response;
          } else {
            this.msgError("托运人查询失败");
          }

        });


        //查询第二收款人
        const data = {payeePhone: null};
        querySecondPayment(data).then(response => {

          if (response != null && response.code === 200) {
            this.optionsDrPayment = response.data;
          } else {
            this.msgError("第二收款人查询失败");
          }
        });

      },
      findChauffeurPhone() {

        const chauffeur = this.selectChauffeurPhone;


        if (chauffeur != undefined && chauffeur != null && chauffeur.length == 11) {
          getdirverinfo(chauffeur).then(response => {

            if (response != null && response.code === 200) {
              this.form.chauffeur = response.data.chauffeurId;
                  this.form.vehicleNumber = response.data.vehicleNumber;//承运车辆

              this.selectChauffeur = response.data.name + response.data.phone;
            } else {
              this.form.chauffeur = null;
              this.selectChauffeur = response.msg;
            }
          }).catch(err => {
            this.form.chauffeur = null;
            this.selectChauffeur = err;
          });
        }

      },
      // godirverinfo() {
      //   getdirverinfo(this.phone).then((response) => {
      //     //  console.log(response);
      //     this.form.vehicleNumber = response.vehicleNumber;//承运车辆
      //   });
      // },
      //获取货物类型
      gohuowuleixing() {
        selectlinehuowu().then((response) => {
          this.options = response;
        });
      },
      //新建运单查询常发路线
      getline() {
        getUserOftenPath().then(
          response => {
            // console.log(response)
            this.lineoptions = response.data;
          }
        );
      },
      goCanl() {
        this.$router.push("/transport/waybill");
      },
      handleChange(value) {
        // console.log(value);
      },

      getRegion(arr) {

        const address = this.address;

        const provinceArr = address.find(function (x) {
          return x.value === arr[0];
        });

        const province = provinceArr.label; //获取省份


        const cityArr = provinceArr.children.find(function (x) {
          return x.value === arr[1];
        });
        const city = cityArr.label; //获取城市


        const areaArr = cityArr.children.find(function (x) {
          return x.value === arr[2];
        });
        const area = areaArr.label; //获取区县

        return province + city + area;

      },


      //提交新建运单
      submitForm(formName) {


        // const billingTime = this.form.billingTime;
        // const planPickTime = this.form.planPickTime;
        // const planArrivalTime = this.form.planArrivalTime;


        // var formData = new FormData();
        // formData.append("carriageInfo", this.form);
        // this.getshengshi();
        // console.log(formName);
        //新建运单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const shipperUserId=this.form.shipperUserId;

            if (shipperUserId == undefined || shipperUserId == null || shipperUserId == "") {
              this.msgInfo('请选择承运人');
              return;
            }


            var deliverContactsProvince = this.form.deliverContactsProvinceArr;
            var takeContactsProvince = this.form.takeContactsProvinceArr;

            if (deliverContactsProvince == undefined || deliverContactsProvince == null || deliverContactsProvince == "") {
              this.msgInfo('请选择发货地址');
              return;
            }


            if (takeContactsProvince == undefined || takeContactsProvince == null || takeContactsProvince == "") {
              this.msgInfo('请选择收货地址');
              return;
            }



            this.form.deliverContactsProvince = this.getRegion(deliverContactsProvince);
            this.form.takeContactsProvince = this.getRegion(takeContactsProvince);


            const chauffeur = this.form.chauffeur;
            if (chauffeur == undefined || chauffeur == null || chauffeur == "") {
              this.msgInfo('请选择承运司机');
              return;
            }


            if (this.is_freightGathering == '0') {
              this.form.secondPayment = null;
              this.form.drPaymentAmount = 0;
            }



            addwaybill(this.form).then(response => {
              if (response.code == 200) {
                this.msgSuccess("添加成功");
                // this.$router.push("/transport/waybill");
              } else {
                this.msgError('添加失败');
              }
            });
          } else {
            this.msgError('请输入必填项');
            return false;
          }
        });
      },
      //将运单保存为草稿
      caogao(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            //保存草稿运单
            savecaogao(this.form).then(
              response => {
                if (response.code == 200) {
                  this.msgSuccess("保存草稿成功");
                  // this.$router.push("/transport/waybill");
                } else {
                  this.$message.error('保存草稿失败');
                }
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      gopaiche() {
        this.$router.push("/order/dispatch");
      },
    },
  };
</script>

<style lang="scss" scoped>

  .el-form-item__content {
    margin-left: 20px;
  }

  .el-divider--vertical {
    width: 5px;
    height: 1.5em;
    background-color: #1890ff;
  }

  .divheader {
    font-size: 14px;
    color: #606266;
    padding-left: 15px;
    font-weight: 700;
    padding-top: 10px;
  }

  .info {
    // border: 1px solid #dcdee2;
    // border-bottom: 3px solid gray;
  }

  .div-left {
    margin-right: 1.4%;
    // border-right: 1px solid #dcdee2;
  }

  .div-right {
    padding-left: 10px;
    //  border-left: 1px solid #dcdee2;
  }

  .dinweidiv {
    width: 20px;
    display: inline-block;
    margin-right: 5px;
  }

  .dinweidiv img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }

  .borderrightdiv {
    // border-right: 1px solid #dcdee2;
  }

  .borderdiv {
    // border: 1px solid #dcdee2;
    margin: 20px 20px;
  }

  .el-link {
    margin-right: 10px;
  }

  .el-link:last-child {
    margin-left: 10px;
  }

  .el-form-item {
    margin: 10px 10px;
  }

  .el-col-12 {
    width: 49%;
  }

  .el-col-24 {
    padding: 0 0px;
  }

  input {
    height: 26px;
    line-height: 26px;
    width: 170px;
    font-size: 8px;
  }

  .el-row {
    // margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 0px;
  }

  // .bg-purple-dark {
  //   background: #99a9bf;
  // }
  .bg-purple {
    // background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 174px;
    height: 18px;
    line-height: 18px;
  }

  .el-input--medium .el-input__icon {
    line-height: 24px;
  }
</style>
