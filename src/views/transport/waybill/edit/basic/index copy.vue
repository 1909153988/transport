<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
     <div class="borderdiv">
      <el-row>
        <el-col :span="8">
      <el-form-item label="运单编号" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item></el-col>
      <el-col :span="8"> <el-form-item label="运单状态">
        <el-input v-model="form.name"></el-input>
      </el-form-item></el-col>
      <el-col :span="8"> <el-form-item label="签收时间">
        <el-input v-model="form.name"></el-input>
      </el-form-item></el-col></el-row>

        <el-row>
     <el-col :span="8"> <el-form-item label="是否开票">
        <el-input v-model="form.name"></el-input>
      </el-form-item></el-col>
      <el-col :span="8"> <el-form-item label="关联单号">
        <el-input v-model="form.name"></el-input>
      </el-form-item></el-col></el-row>
     <el-row>  
    <el-col :span="8"> <el-form-item label="开单时间" prop="monitorTime">
                <el-date-picker
                  style="height: 20px"
                  v-model.trim="detailDataForm.monitorTime"
                  :picker-options="pickerOptions"
                  type="datetime"
                  placeholder="请选择"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="mini"
                />
              </el-form-item></el-col>
    <el-col :span="8">  <el-form-item label="计划提货时间">
        <el-date-picker
                  style="height: 20px"
                  v-model.trim="detailDataForm.monitorTime"
                  :picker-options="pickerOptions"
                  type="datetime"
                  placeholder="请选择"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="mini"
                />
      </el-form-item></el-col>
     <el-col :span="8"> <el-form-item label="计划到货时间">
        <el-date-picker
                  style="height: 20px"
                  v-model.trim="detailDataForm.monitorTime"
                  :picker-options="pickerOptions"
                  type="datetime"
                  placeholder="请选择"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="mini"
                />
      </el-form-item></el-col>
 </el-row>
  <el-row>
      <el-col :span="8">  <el-form-item label="托运人">
        <el-select v-model="value" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
      </el-form-item></el-col>
     <el-col :span="8">   <el-form-item label="运输类型">
        <el-select v-model="value" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
      </el-form-item></el-col>
     <el-col :span="8">   <el-form-item label="选择常发线路">
        <el-input v-model="form.name"></el-input>
      </el-form-item></el-col>
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
                  ><div class="grid-content bg-purple">
                    <el-form-item label="发货联系人" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="input"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item></div
                ></el-col>

                <el-col :span="12"
                  ><div class="grid-content bg-purple">
                    <el-form-item label="电话" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="input"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
              </el-row>

              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="省/市/区(县)" prop="monitorTime">
                    <el-input
                      size="mini"
                      v-model="input"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="街道-门牌号" prop="monitorTime">
                    <el-input
                      v-model="input"
                      placeholder="请输入街道-门牌号"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              </div
          ></el-col>
          <el-col :span="1"></el-col>
          <el-col :span="12" class="div-right">
            <div class="grid-content bg-purple">
              <div class="mb20">
                <el-divider content-position="left">收货方</el-divider>
              </div>
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="12" style="border: none"
                  ><div style="border: none" class="grid-content bg-purple">
                    <el-form-item label="收货联系人" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="input"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item></div
                ></el-col>

                <el-col :span="12" style="border: none"
                  ><div class="grid-content bg-purple">
                    <el-form-item label="电话" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="input"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
              </el-row>

              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="省/市/区(县)" prop="monitorTime">
                    <el-input
                      size="mini"
                      v-model="input"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="街道-门牌号" prop="monitorTime">
                    <el-input
                      v-model="input"
                      placeholder="请输入街道-门牌号"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row></div
          ></el-col>
        </el-row>

        <div class="info">
          <div class="mb20">
            <!-- <el-divider content-position="left" />
            <span class="weight">货物信息</span> -->

            <el-divider content-position="left">货物信息</el-divider>
          </div>
          <el-row :gutter="20">
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <el-form-item label="货物名称" prop="monitorTime">
                  <el-input
                    size="mini"
                    v-model="input"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <el-form-item label="货物类型" prop="monitorTime">
                  <el-select v-model="value" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <el-row>
                 <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="计划装货量" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="input"
                        placeholder="请输入内容"
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
                        v-model="value"
                        placeholder="元/车"
                        size="mini"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row></div
            ></el-col>
                </el-row></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <el-form-item label="货值(元)" prop="monitorTime">
                  <el-input
                    size="mini"
                    v-model="input"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item></div
            ></el-col>
          </el-row>
            <el-row :gutter="20">
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <el-row>
                 <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="合理亏吨" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="input"
                        placeholder="请输入内容"
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
                        v-model="value"
                        placeholder="元/车"
                        size="mini"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row></div
            ></el-col>
                </el-row></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <el-form-item label="结算重量" prop="monitorTime">
                  <el-select
                    v-model="value"
                    placeholder="按实际收发量最小结算"
                    size="mini"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
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
              ><div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="单价" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="input"
                        placeholder="请输入内容"
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
                        v-model="value"
                        placeholder="元/车"
                        size="mini"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row></div
            ></el-col>

     <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="1">
                    <el-form-item label="付款方式">
                      <el-select
                        style="
                          width: 74px !important;
                          min-width: 74px !important;
                        "
                        v-model="value"
                        placeholder="现付"
                        size="mini"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row></div
            ></el-col>
            
                 <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="亏吨单价" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="input"
                        placeholder="请输入内容"
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
                        v-model="value"
                        placeholder="元/车"
                        size="mini"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row></div
            ></el-col>
          </el-row>

          
         <el-row :gutter="20">
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="实装数量" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="input"
                        placeholder="请输入内容"
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
                        v-model="value"
                        placeholder="吨"
                        size="mini"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="实收数量" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="input"
                        placeholder="请输入内容"
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
                        v-model="value"
                        placeholder="吨"
                        size="mini"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row></div
            ></el-col>
                 <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="结算运费" prop="monitorTime">
                      <el-input
                        size="mini"
                        v-model="input"
                        placeholder="请输入内容"
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
                        v-model="value"
                        placeholder="吨"
                        size="mini"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row></div
            ></el-col>
          </el-row>
        <el-row>
              <el-col :span="8">  <el-form-item label-width="160px" label="是否为长期货源">
                <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
              </el-form-item></el-col>
    <el-col :span="12">  <el-form-item label-width="160px" label="总运费：">
                10100.00元（服务费：100元；保险费：xxx元）
              </el-form-item></el-col>
        </el-row>
        <el-row>
        <el-col :span="8">
          <el-form-item label="货运险方案">
            <el-radio-group v-model="radio">
              <el-radio :label="3">不投保</el-radio>
              <el-radio :label="6">综合险</el-radio>
              <el-radio :label="9">基本险</el-radio>
            </el-radio-group>
          </el-form-item></el-col>
         <el-col :span="12"><el-form-item
            >具体以保险对接方案为准（要有保险方案说明以及保险金额显示）</el-form-item
          ></el-col>
        </el-row>
      </div>


      <div v-if>
      <el-row>
        <el-col :span="8"> <el-form-item label="承运司机">
          <el-select size="" value="">
            <el-option value="1" label="货车"></el-option>
            <el-option value="1" label="大货车"></el-option>
          </el-select>
        </el-form-item></el-col>
        <el-col :span="8"><el-form-item label="承运车辆">
          <el-select size="" value="">
            <el-option value="1" label="货车"></el-option>
            <el-option value="1" label="大货车"></el-option>
          </el-select>
        </el-form-item></el-col>
        <el-col :span="8"><el-form-item label="计划配载量">
          <el-input v-model="form.name"></el-input>
        </el-form-item></el-col>
</el-row>
<el-row>
  <el-col :span="8"> <el-form-item label="运费收款人">
          <el-select size="" value="">
            <el-option value="1" label="货车"></el-option>
            <el-option value="1" label="大货车"></el-option>
          </el-select>
        </el-form-item></el-col>
</el-row>

          <div class="info">
            <div class="mb20">
              <!-- <el-divider content-position="left" />
              <span class="weight">其它</span> -->

              <el-divider content-position="left">其它</el-divider>
            </div>
            <el-row :gutter="20">
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-form-item label="车型要求" prop="monitorTime">
                    <el-select v-model="value" placeholder="不限" size="mini">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item></div
              ></el-col>
             <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-form-item label="车长要求" prop="monitorTime">
                    <el-select v-model="value" placeholder="不限" size="mini">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item></div
              ></el-col>

              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-form-item label="货源码" prop="monitorTime">
                    <div
                      style="background: red; width: 40px; text-align: center"
                    >
                      7
                    </div>
                  </el-form-item>
                </div></el-col
              >
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24"
                ><div class="grid-content bg-purple">
                  <el-form-item label="备注信息">
                    <el-input
                      v-model="form.name"
                      type="textarea"
                      :rows="5"
                    ></el-input>
                  </el-form-item></div
              ></el-col>
            </el-row>
            <el-form-item label=" ">
              <el-button type="info" @click="submitForm('form')" plain
                >保存草稿</el-button
              >
                <el-button type="primary" @click="submitForm('form')" plain
                >提交</el-button
              >
                <el-button type="primary" @click="submitForm('form')" plain
                >取消</el-button
              >
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "RuoyiUiIndex",
  data() {
    return {
      checked: false,
      value: [],
      radio: 1,
      shenoptions: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
      ],
      form: {
        name: "",
      },
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
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      // checked: true,
    };
  },
  mounted() {},
  methods: {
    handleChange(value) {
      console.log(value);
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
    gopaiche() {
      this.$router.push("/order/dispatch");
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