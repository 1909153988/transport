<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <div class="borderdiv">
        <el-row :gutter="20">
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="开单时间" prop="monitorTime">
                <el-date-picker
                  style="height: 20px"
                  v-model.trim="detailDataForm.monitorTime"
                  :picker-options="pickerOptions"
                  type="datetime"
                  placeholder="请选择"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="mini"
                />
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="计划提货时间" prop="monitorTime">
                <el-date-picker
                  size="mini"
                  v-model.trim="detailDataForm.monitorTime"
                  :picker-options="pickerOptions"
                  type="datetime"
                  placeholder="请选择"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="计划到货时间" prop="monitorTime">
                <el-date-picker
                  size="mini"
                  v-model.trim="detailDataForm.monitorTime"
                  :picker-options="pickerOptions"
                  type="datetime"
                  placeholder="请选择"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item></div
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="客户名称" prop="monitorTime">
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
          <el-col :span="12" style="border: none"
            ><div class="grid-content bg-purple">
              <el-form-item label="选择常发线路" prop="monitorTime">
                <div class="dinweidiv">
                  <img src="@/assets/svgicons/dinwei.png" alt="" />
                </div>

                <el-link href="https://element.eleme.io" target="_blank"
                  >上海-广州</el-link
                >
                <div class="dinweidiv">
                  <img src="@/assets/svgicons/dinwei.png" alt="" />
                </div>
                <el-link href="https://element.eleme.io" target="_blank"
                  >上海-北京</el-link
                >
                <div class="dinweidiv">
                  <img src="@/assets/svgicons/dinwei.png" alt="" />
                </div>
                <el-link href="https://element.eleme.io" target="_blank"
                  >淮安-深圳</el-link
                >
                <div class="dinweidiv">
                  <img src="@/assets/svgicons/dinwei.png" alt="" />
                </div>
                <el-link href="https://element.eleme.io" target="_blank"
                  >徐州-成都</el-link
                >

                <el-link href="https://element.eleme.io" target="_blank"
                  >更多...</el-link
                >
              </el-form-item>
            </div></el-col
          >
        </el-row>
      </div>

      <div class="borderdiv">
        <el-row :gutter="20" style="margin-left: 0px">
          <el-col :span="12" style="margin-right: 1.4%"
            >
              <div class="divheader">发货方</div>
            <div class="grid-content bg-purple">
              <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="12" style="border: none"
                  ><div style="border: none" class="grid-content bg-purple">
                    <el-form-item label="发货联系人" prop="monitorTime">
                      <el-input
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
                     <el-cascader  
                     style="width:100%;"
              v-model="value"
              :options="shenoptions"
              @change="handleChange"></el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
               <el-row :gutter="20" style="margin-left: 0px">
                <el-col :span="24" style="margin-right: 1.4%">
                  <el-form-item label="街道-门牌号" prop="monitorTime">
                     <el-input
                        v-model="input"
                        placeholder="请输入街道门牌号"
                      ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              </div
          ></el-col>
          <el-col :span="1"></el-col>
          <el-col :span="12" style="padding-left: 10px"
            ><div class="grid-content bg-purple">
              <el-form-item label="活动名称">
                <el-input size="mini" v-model="form.name"></el-input>
              </el-form-item></div
          ></el-col>
            </el-row>
          </div>

      <div class="borderdiv">
        <el-row :gutter="20">
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
      </div>

      <div class="borderdiv">
        <el-row :gutter="20">
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
      </div>

      <div class="borderdiv">
        <el-row :gutter="20">
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
      </div>
      <el-input
        size="mini"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input2"
      >
      </el-input>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "RuoyiUiIndex",
  data() {
    return {
    value: [],
        shenoptions: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }],
        }],
      form: {
        name: "",
      },
      checked: true,
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
    };
  },
  mounted() {},
  methods: {
      handleChange(value) {
        console.log(value);
      }
  },
};
</script>

<style lang="scss" scoped>
// .divheader{
//  border-bottom: 2px solid gray;
//  width: 100%;
// }
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
  border-right: 1px solid #dcdee2;
}
.borderdiv {
  border: 1px solid #dcdee2;
  margin: 45px 10%;
}
.el-link {
  margin-right: 10px;
}
.el-link:last-child {
  margin-left: 10px;
}
.el-form-item {
  margin: 22px 22px;
}
.el-col-12 {
  border: 1px solid #dcdee2;
  width: 49%;
}
input {
  height: 26px;
  line-height: 26px;
  width: 170px;
  font-size: 8px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
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