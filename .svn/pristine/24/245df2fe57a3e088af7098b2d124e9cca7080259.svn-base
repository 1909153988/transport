<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" inline>
      <div class="mb20">
        <!-- <el-divider direction="vertical"/> <span class="weight">基础信息</span> -->
        <el-divider content-position="left">基础信息</el-divider>
      </div>
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="公司简称" prop="companyShortName">
        <el-input v-model="form.companyShortName"></el-input>
      </el-form-item>
      <el-form-item label="公司法定代表人" prop="legalPersonName">
        <el-input v-model="form.legalPersonName"></el-input>
      </el-form-item>
      <el-form-item label="成立时间" prop="setUpTime">
        <el-date-picker
          v-model="form.setUpTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="注册资本" prop="registerMoney">
        <el-input v-model="form.registerMoney"></el-input>
      </el-form-item>
      <el-form-item label="主营业务" prop="mainBusiness">
        <el-input v-model="form.mainBusiness"></el-input>
      </el-form-item>
      <el-form-item label="客户联系人" prop="clientContacts">
        <el-input v-model="form.clientContacts"></el-input>
      </el-form-item>
      <el-form-item label="客户联系电话" prop="clientContactsPhone">
        <el-input v-model="form.clientContactsPhone"></el-input>
      </el-form-item>
      <el-form-item label="联系地址" prop="contactAddress">

        <el-input v-model="form.contactAddress"></el-input>
      </el-form-item>
      <el-form-item label="客户开发人" prop="clientDeveloper">
        <el-input v-model="form.clientDeveloper"></el-input>
      </el-form-item>


      <div class="mb20">
        <!-- <el-divider direction="vertical"/> <span class="weight">合同信息</span> -->
         <el-divider content-position="left">合同信息</el-divider>
      </div>
      <el-form-item label="合同编号" prop="contractNumber">
        <el-input v-model="form.contractNumber"></el-input>
      </el-form-item>
      <el-form-item label="合同类型" prop="contractType">
        <el-input v-model="form.contractType"></el-input>
      </el-form-item>
      <el-form-item label="结算方式" prop="closeType">
        <el-input v-model="form.closeType"></el-input>

      </el-form-item>
      <el-form-item label="开票时间节点" prop="makeOutTimeNodes">
        <el-input v-model="form.makeOutTimeNodes"></el-input>
      </el-form-item>
      <el-form-item label="保证金（元）" prop="earnestMoney">
        <el-input v-model="form.earnestMoney"></el-input>
      </el-form-item>
      <el-form-item label="归档时间" prop="pigeonholeTime">
        <el-date-picker
          v-model="form.pigeonholeTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="账期（天）" prop="billDate">
        <el-input v-model="form.billDate"></el-input>
      </el-form-item>
      <el-form-item label="合同开始时间" prop="contractStartTime">
        <el-date-picker
          v-model="form.contractStartTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同结束时间" prop="contractEndTime">
        <el-date-picker
          v-model="form.contractEndTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <div class="mb20">
        <!-- <el-divider direction="vertical"/> <span class="weight">开票信息</span> -->
        <el-divider content-position="left">开票信息</el-divider>
      </div>
      <el-form-item label="开户银行" prop="kaihuBank">
        <el-input v-model="form.kaihuBank"></el-input>
      </el-form-item>
      <el-form-item label="银行账户" prop="accountBank">
        <el-input v-model="form.accountBank"></el-input>
      </el-form-item>
      <el-form-item label="开票单位地址" prop="makeOutUnitAddress">
        <el-input v-model="form.makeOutUnitAddress"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="cods">
        <el-input v-model="form.cods"></el-input>
      </el-form-item>
      <el-form-item label="邮寄地址" prop="mailAddress">
        <el-input v-model="form.mailAddress"></el-input>
      </el-form-item>
      <el-form-item label="收件人" prop="recipients">
        <el-input v-model="form.recipients"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="recipientsPhone">
        <el-input v-model="form.recipientsPhone"></el-input>
      </el-form-item>

      <div class="mb20">
        <!-- <el-divider direction="vertical"/> <span class="weight">其它信息</span> -->
         <el-divider content-position="left">其它信息</el-divider>
      </div>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <div>
        <el-form-item label=" ">
          <el-button plain type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { saveShipperClient,updateShipperClient,getShipperClientById } from "../../../../api/capacity/client"

export default {
  data(){
    let checkCompany = (rule , value , callback) => {
      if(!value) {
        return callback(new Error('不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          console.log(value)
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      },1000)

    }
    return {
      form:{},
      id:'',
      rules:{
        companyName:[
          {required:true , message:'不能为空'},
        ],
        companyShortName :[
          {required:true , message:'不能为空'},
        ],
        legalPersonName :[
          {required:true , message:'不能为空'},
        ],
        setUpTime :[
          {required:true , message:'不能为空'},
        ],
        registerMoney :[
          {required:true , message:'不能为空'},
        ],
        mainBusiness :[
          {required:true , message:'不能为空'},
        ],
        clientContacts :[
          {required:true , message:'不能为空'},
        ],
        clientContactsPhone :[
          {required:true , message:'不能为空'},
        ],
        contactAddress :[
          {required:true , message:'不能为空'},
        ],
        clientDeveloper :[
          {required:true , message:'不能为空'},
        ],
        contractNumber :[
          {required:true , message:'不能为空'},
        ],
        contractType :[
          {required:true , message:'不能为空'},
        ],
        createBy :[
          {required:true , message:'不能为空'},
        ],
        earnestMoney :[
          {required:true , message:'不能为空'},
        ],
        closeType :[
          {required:true , message:'不能为空'},
        ],
        makeOutTimeNodes :[
          {required:true , message:'不能为空'},
        ],
        pigeonholeTime :[
          {required:true , message:'不能为空'},
        ],
        billDate :[
          {required:true , message:'不能为空'},
        ],
        contractStartTime :[
          {required:true , message:'不能为空'},
        ],
        contractEndTime :[
          {required:true , message:'不能为空'},
        ],
        kaihuBank :[
          {required:true , message:'不能为空'},
        ],
        accountBank :[
          {required:true , message:'不能为空'},
        ],
        makeOutUnitAddress :[
          {required:true , message:'不能为空'},
        ],
        cods :[
          {required:true , message:'不能为空'},
        ],
        mailAddress :[
          {required:true , message:'不能为空'},
        ],
        recipients :[
          {required:true , message:'不能为空'},
        ],
        recipientsPhone :[
          {required:true , message:'不能为空'},
        ],
        remark :[
          {required:true , message:'不能为空'},
        ]
      }
    }
  },
  created() {
    this.id = this.$route.query.id;
    if(this.id) {
      this.getInfo(this.id)
    }
  },
  methods:{
    getInfo(id){
      getShipperClientById({shipperClientId:id}).then(res => {
        if(res.code == 200) {
          this.msgSuccess("查询成功！")
          this.form = res.data;
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.id){
            this.edit()
          } else {
            this.add()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    add(){
      saveShipperClient(this.form).then(res => {
        console.log(res)
        if(res.code == 200) {
          this.msgSuccess("添加成功！")
          this.$router.push("/filemanagement/client");
        }
      })
    },
    edit(){
      updateShipperClient(this.form).then(res => {

        if(res.code == 200) {
          this.msgSuccess("修改成功！")
          this.$router.push("/filemanagement/client");
        }
      })
    }
  }
}
</script>

<style scoped>
.el-divider--vertical {
  width: 5px;
  height: 1.5em;
  background-color: #1890ff;
}
</style>
