<template>
  <div v-loading="loading">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <div class="borderdiv">
        <el-row>
          <el-col :span="8">
            <el-form-item label="线路名称" size="mini" prop="oftenPathName">
              <el-input v-model="form.oftenPathName"></el-input>
            </el-form-item
            >
          </el-col>
          <el-col :span="8">
            <!--            <el-form-item label="托运人">-->
            <!--              <el-input v-model="form.clientUserCompany"></el-input>-->

            <!--            </el-form-item>-->
            <el-form-item label="托运人" prop="clientUserCompany">

              <el-select v-model="valueClientUserCompany" filterable placeholder="请选择">
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
              <el-select
                v-model="form.transportType"
                placeholder="请选择"
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
          </el-col
          >
        </el-row>
      </div>

      <div class="borderdiv">
        <el-row :gutter="20" style="margin-left: 0px">
          <el-col :span="12" class="div-left">
            <div class="grid-content bg-purple">
              <div class="mb20">
                <!-- <el-divider content-position="left" />
                <span class="weight">发货方</span> -->
                <el-divider content-position="left">发货方</el-divider>
              </div>
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="12"
                >
                  <div class="grid-content bg-purple">
                    <el-form-item label="发货联系人" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="form.deliverContacts"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </div
                  >
                </el-col>

                <el-col :span="12"
                >
                  <div class="grid-content bg-purple">
                    <el-form-item label="电话" prop="deliverContactsPhone">
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
                  <!-- <el-form-item label="发货地" prop="monitorTime">

                  </el-form-item> -->
                  <el-form-item label="发货地" prop="monitorTime">

                    <area-cascader type="all" v-model="form.deliverContactsProvince" :data="$pcaa"
                                   :level="1"></area-cascader>
                    <span style="color: #0E94EA">原选择：{{old_deliverContactsProvince}}</span>
                  </el-form-item>
                  <el-form-item label="区域代码" prop="monitorTime" v-if="takeAreaCodeViable=false">
                    <area-cascader type="all" v-model="form.deliverAreaCode"></area-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="详细地址" v-if="form.transportType != 1" prop="monitorTime">
                    <el-input
                      v-model="form.deliverContactsAddress"
                      placeholder="请输入详细地址"


                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="发货港口"
                    v-if="form.transportType == 1"
                    prop="monitorTime"
                  >
                    <el-input
                      v-model="form.deliverStartingPort"
                      placeholder="请输入发货港口"
                    ></el-input>
                  </el-form-item>


                </el-col>
              </el-row>
              <!-- <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="" prop="monitorTime">
                   <el-checkbox v-model="checked">保存为常发线路</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row> -->
            </div>
          </el-col
          >
          <el-col :span="1"></el-col>
          <el-col :span="12" class="div-right">
            <div class="grid-content bg-purple">
              <div class="mb20">
                <el-divider content-position="left">收货方</el-divider>
              </div>
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="12" style="border: none"
                >
                  <div style="border: none" class="grid-content bg-purple">
                    <el-form-item label="收货联系人" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="form.takeContacts"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </div
                  >
                </el-col>

                <el-col :span="12" style="border: none"
                >
                  <div class="grid-content bg-purple">
                    <el-form-item label="电话" prop="monitorTime">
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
                  <!-- <el-form-item label="收货地" prop="monitorTime">
                    <el-input
                      size="mini"
                      v-model="form.takeContactsProvince"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item> -->
                  <el-form-item label="收货地" prop="monitorTime">
                    <!-- <el-input
                      size="mini"
                      v-model="form.takeContactsProvince"
                      placeholder="请输入内容"
                    ></el-input> -->
                    <area-cascader type="all" v-model="form.takeContactsProvince" :data="$pcaa"
                                   :level="1"></area-cascader>
                    <span style="color: #0E94EA">原选择：{{old_takeContactsProvince}}</span>
                  </el-form-item>
                  <el-form-item label="区域代码" prop="monitorTime" v-if="takeAreaCodeViable=false">
                    <area-cascader type="all" v-model="form.takeAreaCode"></area-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="详细地址" v-if="form.transportType != 1" prop="monitorTime">
                    <el-input
                      v-model="form.takeContactsAddress"
                      placeholder="请输入详细地址"


                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="收货港口"
                    v-if="form.transportType == 1"
                    prop="monitorTime">
                    <el-input
                      v-model="form.takePurposePort"
                      placeholder="请输入收货港口"
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
            <el-col :span="8"
            >
              <div class="grid-content bg-purple">
                <el-form-item label="货物名称" prop="monitorTime">
                  <el-input
                    size="mini"
                    v-model="form.goodsName"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </div
              >
            </el-col>
            <el-col :span="6"
            >
              <div class="grid-content bg-purple">
                <el-form-item label="货物类型" prop="monitorTime">
                  <el-select
                    v-model="form.goodsType"
                    placeholder="请选择"
                    size="mini"
                  >
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
            <el-col :span="8">
              <el-col :span="7">
                <el-form-item label="装货量" prop="monitorTime">
                  <el-input
                    size="mini"
                    v-model.number="form.planWeight"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item>
                  <el-select
                    style="width: 74px !important; min-width: 74px !important"
                    v-model="form.planUnit"
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
        </div>

        <div v-if>
          <div class="info">
            <div class="mb20">
              <!-- <el-divider content-position="left" />
              <span class="weight">其它</span> -->

              <el-divider content-position="left">其它信息</el-divider>
            </div>
            <el-row :gutter="20">
              <el-col :span="5"
              >
                <div class="grid-content bg-purple">
                  <!-- <el-form-item label="线路备注信息">
                    <el-input
                      v-model="form.remake"
                      type="textarea"
                      :rows="5"
                    ></el-input>
                  </el-form-item> -->
                  <el-form-item label="线路备注信息" prop="content">
                    <el-input
                      maxlength="200"
                      type="textarea"
                      placeholder="请输入内容"
                      @input="descInput"
                      v-model="form.remake"
                      :rows="5"
                    >
                    </el-input>
                  </el-form-item>
                </div
                >
              </el-col>
              <el-col :span="4">
                <el-form-item style="margin-left: 180px">
                  <span
                    class="text"
                    style="
                      float: right;
                      color: #909399;
                      margin-right: 55px;
                      margin-top: 80px;
                    "
                  >200/{{ remnant }}</span
                  >
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24"
              >
                <div class="grid-content bg-purple">
                  <el-form-item label="启用" v-model="form.oftenPathState">
                    <el-switch
                      active-color="#13ce66"
                      inactive-color="#ccc"
                      v-model="siwtchStete"
                    >
                    </el-switch>
                  </el-form-item>
                </div
                >
              </el-col>
            </el-row>
            <el-form-item label=" ">
              <!-- <el-button type="info" @click="submitForm('form')" plain
                >保存草稿</el-button
              > -->
              <el-button type="primary" @click="submitForm('form')" plain
              >提交
              </el-button
              >
              <el-button @click="goyundanlist()" plain>取消</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {getline, getUserCompany, selectlinehuowu, updateline,} from "@/api/waybill/waybilllist";

  export default {
    name: "RuoyiUiIndex",
    data() {
      return {
        loading: true,//加载动效
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
        siwtchStete: false, //是否启用
        rules: {
          oftenPathName: [
            {required: true, message: "请输入线路名称", trigger: "blur"},
          ],
        },
        infoStatus: "",
        remnant: 0, //输入数
        checked: false,
        value: [],
        radio: 1,
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
        form: {},
        // checked: true,
        input: "",
        input2: "",
        detailDataForm: {
          monitorTime: "",
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          selectableRange: "00:00:00 - 23:59:59",
        },
        options: [],
        query: {
          oftenPathId: "",
        },
        value: "",
        arr: [], //发货地省市联动
        shouarr: [],//收货地省市联动


        optionsClientUserCompany: [],
        valueClientUserCompany: '',

        old_takeContactsProvince: '',
        old_deliverContactsProvince: ''
        // checked: true,
      };
    },
    created() {
      // alert(this.$route.query.oftenPathId)
      this.getList();
      this.gohuowuleixing();
    },
    mounted() {

    },
    methods: {
      //获取货物类型
      gohuowuleixing() {
        selectlinehuowu().then((response) => {
          if (response.code = 200) {
            this.options = response;
          }
        });
      },
      //计算输入数
      descInput() {
        var txtVal = this.form.remake.length;
        this.remnant = txtVal;
      },
      getList() {


        getUserCompany().then(response => {

          if (response != null) {
            console.log(response)
            this.optionsClientUserCompany = response;
          } else {
            this.msgError("托运人查询失败");

          }

        });


        //根据id获取常发路线列表
        getline(this.$route.query.oftenPathId).then((response) => {


          if ((response.data.code = 200)) {
            this.form = response.data;
            this.valueClientUserCompany = this.form.userId;

            this.old_takeContactsProvince = this.form.takeContactsProvince;
            this.old_deliverContactsProvince = this.form.deliverContactsProvince;
            //  console.log(this.form.transportType);
            // console.log(this.form.oftenPathState)
            if (this.form.oftenPathState == 1) {
              this.siwtchStete = true;
            } else {
              this.siwtchStete = false;
            }
            this.loading = false;
          }
        });
      },
      handleChange(value) {
        // console.log(value);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.siwtchStete) {
              this.form.oftenPathState = 1;
            } else {
              this.form.oftenPathState = 2;
            }


            //发货方选择的省市区联动代码截取
            // console.log(this.form.deliverContactsProvince);
            if ((this.form.deliverContactsProvince != undefined) && (this.form.deliverContactsProvince != null) && (this.form.deliverContactsProvince != "")) {
              //  console.log(this.form.deliverContactsProvince);
              for (let i = 0; i < this.form.deliverContactsProvince.length; i++) {
                let keys = Object.keys(this.form.deliverContactsProvince[i])
                var key = keys[0]
                let val = this.form.deliverContactsProvince[i][key];
                this.arr.push(val);
                var s1 = this.arr[0];
                var s2 = this.arr[1];
                var s3 = this.arr[2];
                var s4 = s1 + s2 + s3;
              }
            }

            //收货方选择的省市区联动代码截取
            if (this.form.takeContactsProvince != undefined && this.form.takeContactsProvince != null && this.form.takeContactsProvince != "") {
              for (let i = 0; i < this.form.takeContactsProvince.length; i++) {
                let shoukeys = Object.keys(this.form.takeContactsProvince[i])
                var shoukey = shoukeys[0]
                let shouval = this.form.takeContactsProvince[i][shoukey];
                this.shouarr.push(shouval);
                var shou1 = this.shouarr[0];
                var shou2 = this.shouarr[1];
                var shou3 = this.shouarr[2];
                var shou4 = shou1 + shou2 + shou3;
              }
            }
            this.form.deliverContactsProvince = s4;
            this.form.deliverAreaCode = key;
            this.form.takeContactsProvince = shou4;
            this.form.takeAreaCode = shoukey;
            // console.log(this.form.takeContactsProvince,this.form.takeAreaCode);


            //根据id修改常发路线
            updateline(this.form).then((response) => {
              console.log(this.form.transportType);
              if (response.code == 200) {
                this.msgSuccess("修改成功");
                this.goyundanlist();
              } else {
                this.$message.error("修改失败");
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
      goyundanlist() {
        this.$router.push("/transport/line");
      },
    },
  };
</script>

<style lang="scss" scoped>
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
    margin: 20px 5%;
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
