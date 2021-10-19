<template>
  <div class="app-container">
    <div class="mb20">
      <!-- <el-button type="primary" class="mr10" plain>上传附件</el-button>
      <el-button type="primary" class="mr10" @click="getCar" plain>发车</el-button>
      <el-popconfirm
        title="公路运输或水路运输 ？"
        confirm-button-text="公路运输"
        cancel-button-text="水路运输"
        @cancel="shuilu"
        @confirm="gonglu"
      >
        <el-button slot="reference">签收</el-button>
      </el-popconfirm> -->
      <div>订单号<span style="color: blue">：D202012020001</span></div>
      <div>计划配载量：<span style="color: red">100</span></div>
      <div>已配载量总计：<span style="color: red">70</span></div>
      <div>剩余配载量：<span style="color: red">30</span></div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="date" label="序号"></el-table-column>
      <el-table-column prop="date" label="运单号"></el-table-column>
      <el-table-column prop="date" label="收款人"></el-table-column>
      <el-table-column prop="date" label="司机"></el-table-column>
      <el-table-column prop="date" label="车辆"></el-table-column>
      <el-table-column prop="date" label="状态"></el-table-column>
      <el-table-column prop="date" label="调车方式"></el-table-column>
      <el-table-column prop="date" label="配载量"></el-table-column>
      <el-table-column prop="date" label="报价"></el-table-column>
      <el-table-column prop="date" label="备注"></el-table-column>
      <el-table-column prop="date" label="操作">
        <template slot-scope="data">
          <span class="operate mr10" @click="getCar">委托</span>
        </template>
      </el-table-column>
    </el-table>

    <!--  委托信息-->
    <el-dialog
      title="确认委托信息"
      :visible.sync="dialogVisible"
      width="50%"
      center
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="承运司机" prop="companyName">
              <el-input v-model="form.companyName"></el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="车队长">
              <el-select v-model="value" placeholder="请选择" size="mini">
                <el-option value="11"> </el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
         <el-row>
          <el-col :span="12">
            <el-form-item label="承运车辆" prop="companyName">
              <el-input v-model="form.companyName"></el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="报价（元）">
               <el-input v-model="form.companyName"></el-input> </el-form-item
          ></el-col>
        </el-row>
        <div>
           <el-row>
                <el-col :span="12">
          <el-form-item label="运费收款人" prop="companyName">
             <el-input type="textarea" v-model="form.companyName"></el-input>
          </el-form-item></el-col>
           <el-col :span="12">
            <el-form-item label="" prop="companyName">
            <el-button type="primary" class="mr10" @click="getCar" plain>添加收款人</el-button>
          </el-form-item></el-col></el-row>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
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
      <p>非司机操作，系统将启动对运单的审核流程，请确认后谨慎操作</p>
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
         <svg t="1622079118311" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3756" width="400" height="50"><path d="M837.9904 570.0608H124.5696a29.0304 29.0304 0 0 1-29.0304-29.0304V482.9696a29.0304 29.0304 0 0 1 29.0304-29.0304h713.4208z" fill="#2C2C2C" p-id="3757"></path><path d="M561.3056 808.96l-40.96-40.96a28.928 28.928 0 0 1 0-40.96l215.04-215.04-215.04-215.04a28.9792 28.9792 0 0 1 0-40.96l40.96-40.96a28.9792 28.9792 0 0 1 40.96 0l296.96 296.96-296.96 296.96a28.9792 28.9792 0 0 1-40.96 0z" fill="#2C2C2C" p-id="3758"></path></svg>
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
        <el-form-item label="单价" prop="companyName">
          <el-input v-model="form.companyName"></el-input>

          <el-select class="mr10" value="" placeholder="" clearable>
            <el-option value="1" label="元/车"></el-option>
            <el-option value="1" label="元/吨"></el-option>
            <el-option value="1" label="元/方"></el-option>
            <el-option value="1" label="元/件"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="结算重量" prop="companyName">
          <el-select
            size="small mr10"
            value=""
            placeholder="销项发票状态"
            clearable
          >
            <el-option value="1" label="按实际发货量最小结算"></el-option>
            <el-option value="1" label="按实际发货量最大结算"></el-option>
            <el-option value="1" label="按实际发货量结算"></el-option>
            <el-option value="1" label="按实际收货量结算"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="合理亏吨" prop="companyName">
          <el-input v-model="form.companyName"></el-input>

          <el-select class="mr10" value="" placeholder="" clearable>
            <el-option value="1" label="%/车"></el-option>
            <el-option value="1" label="吨/车"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="亏吨单价" prop="companyName">
          <el-input v-model="form.companyName"></el-input>

          <el-select class="mr10" value="" placeholder="" clearable>
            <el-option value="1" label="%/车"></el-option>
            <el-option value="1" label="吨/车"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算运费" prop="companyName">
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
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false"
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
            <svg t="1622079118311" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3756" width="400" height="50"><path d="M837.9904 570.0608H124.5696a29.0304 29.0304 0 0 1-29.0304-29.0304V482.9696a29.0304 29.0304 0 0 1 29.0304-29.0304h713.4208z" fill="#2C2C2C" p-id="3757"></path><path d="M561.3056 808.96l-40.96-40.96a28.928 28.928 0 0 1 0-40.96l215.04-215.04-215.04-215.04a28.9792 28.9792 0 0 1 0-40.96l40.96-40.96a28.9792 28.9792 0 0 1 40.96 0l296.96 296.96-296.96 296.96a28.9792 28.9792 0 0 1-40.96 0z" fill="#2C2C2C" p-id="3758"></path></svg>
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
        <el-form-item label="单价" prop="companyName"> 48元/吨 </el-form-item>

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
  </div>
</template>

<script>
import ImageUpload from "../../../../../components/ImageUpload/index";

export default {
  data() {
    return {
      form: {},
      value: "1",
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      tableData: [{ date: "11" }],
      rules: {},
    };
  },
  components: {
    ImageUpload,
  },
  methods: {
    getCar() {
      // console.log(this)
      this.dialogVisible = true;
    },
    gonglu() {
      this.dialogVisible1 = true;
    },
    shuilu() {
      this.dialogVisible2 = true;
    },
  },
};
</script>

<style scoped>
.el-divider--vertical {
  width: 5px;
  height: 1.5em;
  background-color: #1890ff;
}
</style>
