<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">

       <el-select size="small mr5" value="" placeholder="">
        <el-option value="" label="创建时间"></el-option>
      </el-select>

      <el-date-picker
        class="mr10"
        size="small"
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>

       <el-select size="small mr10" value="" placeholder="">
        <el-option value="" label="司机姓名"></el-option>
        <el-option value="1" label="签署中"></el-option>
        <el-option value="1" label="签署成功"></el-option>
        <el-option value="1" label="签署失败"></el-option>
        <el-option value="1" label="待承运人确认"></el-option>
      </el-select>
      
      <el-select size="small mr10" value="" placeholder="">
        <el-option value="" label="车牌号"></el-option>
        <el-option value="1" label="签署中"></el-option>
        <el-option value="1" label="签署成功"></el-option>
        <el-option value="1" label="签署失败"></el-option>
        <el-option value="1" label="待承运人确认"></el-option>
      </el-select>

       <el-select size="small mr10" value="" placeholder="">
        <el-option value="" label="运单号"></el-option>
        <el-option value="1" label="签署中"></el-option>
        <el-option value="1" label="签署成功"></el-option>
        <el-option value="1" label="签署失败"></el-option>
        <el-option value="1" label="待承运人确认"></el-option>
      </el-select>

       <el-select size="small mr10" value="" placeholder="">
        <el-option value="" label="审核状态"></el-option>
        <el-option value="1" label="签署中"></el-option>
        <el-option value="1" label="签署成功"></el-option>
        <el-option value="1" label="签署失败"></el-option>
        <el-option value="1" label="待承运人确认"></el-option>
      </el-select>

    

     
      <el-button size="small" type="primary" plain>查询</el-button>
      <el-button size="small" type="primary" plain>清空</el-button>
    </div>

    <div class="mb20">
     
       <el-badge :value="12"   class="item">
        <el-button size="small">待处理</el-button>
      </el-badge>
        <el-badge :value="12"   class="item">
        <el-button size="small">审核中</el-button>
      </el-badge>
        <el-badge :value="12"   class="item">
        <el-button size="small">审核不通过</el-button>
      </el-badge>
      
       
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="carriageId" label="运单号"></el-table-column>
      <el-table-column prop="carriageRremake" label="运单描述"></el-table-column>
      <el-table-column prop="vehicleNumber" label="车船号"></el-table-column>
      <el-table-column prop="errorImage" label="司机"></el-table-column>
      <el-table-column
        prop="arriveTimeUnit"
        label="装货时间"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="demountTime"
        label="卸货时间"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="errorImage"
        label="单据照片"
        width="120"
      ></el-table-column>
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
        width="120"
      ></el-table-column>
      <el-table-column
        prop="drPaymentAmount"
        label="第二收款人收款金额"
        width="200"
      ></el-table-column>
      <el-table-column prop="errorType" label="审核状态" width="120"></el-table-column>
      <el-table-column prop="auditStatus" label="异常类型"></el-table-column>
       <el-table-column prop="errorRemark" label="异常描述"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
      <el-table-column prop="disposeExplain" label="处理说明"></el-table-column>
       <el-table-column prop="disposeExplain" label="处理人"></el-table-column>
      <el-table-column prop="disposeTime" label="处理时间" width="120"></el-table-column>
      <!-- <el-table-column prop="date" label="发货人电话"></el-table-column> -->
      <el-table-column prop="date" label="操作" fixed="right" width="200px">
        <template slot-scope="data">
          <span class="operate mr10"  @click="dialogVisible2 =true">处理</span>
        </template>
      </el-table-column>
    </el-table>

   <!--  异常处理-->
    <el-dialog
      title="在途异常报备处理"
      :visible.sync="dialogVisible2"
      width="60%"
      center
    >
      <el-card class="box-card mb20">
        <div slot="header" class="clearfix">
           <h2>张三    沪A12345</h2>
          <!-- <span>张三    沪A12345</span> -->
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
          <el-col :span="12">
            <el-form-item label="运单号：" prop="companyName">
              K12345789
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="异常提交时间" prop="companyName">
              2020-12-08 14:23:45
            </el-form-item>
          </el-col>
        </el-row>

         <el-row>
          <el-col :span="12">
            <el-form-item label="异常描述" prop="companyName">
             爆胎，高速等待救援
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="异常图片" prop="companyName">
              <ImageUpload></ImageUpload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="处理说明" prop="companyName">
              <el-input v-model="form.companyName" type="textarea"></el-input>
            </el-form-item>

          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import ImageUpload from '../../../components/ImageUpload/index'
import { errorlist} from "@/api/waybill/errorlist";
export default {
  data() {
    return {
      form:{},
      dialogVisible2:false,
      tableData: [],
      radio: 1,
      isShow: false,
      time: [],
      rules:{},
       total: 0, //总条数
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
         startTime: undefined, //开始时间
        endTime: undefined, //结束时间
        contractId: undefined, //合同编号
        carriageState: undefined, //运单状态
        contractState: undefined, //合同状态
      },
    };
  },
  components:{
    ImageUpload
  },
  created() {
    this.getList();
  },
  methods: {
     /** 获取运单异常列表 */
    getList() {
      this.loading = true;
      errorlist().then(
        response => {
            if(response.code==200){
                this.tableData=response.rows;
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
    goAdd() {},
    chuli(){

    }
  },
};
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}

</style>

