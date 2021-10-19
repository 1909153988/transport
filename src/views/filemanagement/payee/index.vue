<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="船东姓名"> <el-input></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-input
        class="search mr5"
        size="small"
        placeholder="请输入收款人姓名"
      ></el-input>
      <el-input
        class="search mr5"
        size="small"
        placeholder="请输入银行卡卡号"
      ></el-input>
      <el-button size="small" type="primary" plain>查询</el-button>
      <el-button size="small" type="primary" plain>清空</el-button>
    </div>

    <div class="mb20 flex">
      <el-button size="small" type="primary" plain @click="goAdd()"
        >添加收款人</el-button
      >
      <el-button size="small" type="warning" plain @click="goEdit"
        >编辑</el-button
      >
      <el-button size="small" type="danger" class="mr10" plain>删除</el-button>
<!--      <el-button size="small" type="warning" plain>导入收款人</el-button>-->
      <FileUpload :url = "importDriverUrl" :text="text" :isShowTip="false"></FileUpload>
      <el-button size="small" type="primary" @click="exportClientPayee" plain>导出</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="payeeId" label="序号"></el-table-column>
      <el-table-column prop="kaihuName" label="收款人姓名"></el-table-column>
      <el-table-column prop="idCardNumber" label="身份证号"></el-table-column>
      <el-table-column prop="payeePhone" label="收款人电话"></el-table-column>
      <el-table-column prop="accountBank" label="银行卡号"></el-table-column>
      <el-table-column prop="kaihuBank" label="开户银行"></el-table-column>
      <el-table-column prop="createBy" label="创建人"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column prop="createTime" label="操作" fixed="right" width="200">
        <template slot-scope="data">
          <span class="operate mr10" @click="remove(data.row.payeeId)">编辑</span>
          <span class="operate mr10" @click="remove(data.row.payeeId)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total"></Pagination>

    <!-- 添加编辑收款人 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <!-- <div class="mb20">
        <el-divider direction="vertical"/> <span class="weight">添加收款人（请勿输入信用卡卡号及对公账户）</span>
         <el-divider content-position="left">添加收款人（请勿输入信用卡卡号及对公账户）</el-divider>
      </div> -->
      <el-form-item label="开户人姓名" prop="companyName">
        <el-input v-model="form.kaihuName"></el-input>
      </el-form-item>
      <el-form-item label="银行卡号" required>
        <el-input v-model="form.accountBank"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" required>
        <el-input v-model="form.idCardNumber"></el-input>
      </el-form-item>
      <el-form-item label="开户银行" required>
        <el-input v-model="form.kaihuBank"></el-input>
      </el-form-item>
      <el-form-item label="收款人电话" >
        <el-input v-model="form.payeePhone"></el-input>
      </el-form-item>
      <div>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </div>
    </el-form>
    </el-dialog>

  </div>
</template>

<script>

import {
  queryPayees,
  importClientPayee,
  exportClientPayee,
  deletePayee,
  saveClientPayee,
  updatePayee,
  queryPayeeById
} from "../../../api/capacity/payee"
import Pagination from "../../../components/Pagination/index"
import FileUpload from "../../../components/FileUpload/index"

export default {
  data() {
    return {
     // 弹出层标题
      title: "",
      //是否显示弹出框
      dialogVisible: false,
      tableData: [],
      total:0,
      importPayeeUrl: '/transport/clientPayeeManage/importClientPayee',
      text:'导入收款人',
      time: [],
      form: {},
      id:''
    };
  },
  created() {
    this.getMapList()
  },
  components:{
    Pagination,
    FileUpload
  },
  methods: {
    //查询
    getMapList(){
      queryPayees().then(res => {
        console.log(res)
        if(res.code == 200) {
          this.msgSuccess("查询成功！")
          this.tableData = res.rows;
          this.total = res.total
        }
      })
    },
    //删除
    remove(id) {
      this.$confirm('是否删除 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        deletePayee({payeeId:id}).then(res => {
          // console.log(res)
          if(res.code == 200) {

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //导入
    importClientPayee(){
      importClientPayee().then(res => {

      })
    },
    //导出
    exportClientPayee(){
      let params = {};
      // exportDriver().then(res => {
      //   console.log(res)
      // })
      this.download('/transport/clientPayeeManage/exportClientPayee', {
        ...this.queryParams
      }, `payee_${new Date().getTime()}.xlsx`)

      this.msgSuccess("导出成功！")
    },


    goAdd() {
      // this.$router.push("/filemanagement/addpayee");
      this.title = "添加收款人（请勿输入信用卡卡号及对公账户）";
      this.dialogVisible = true;
    },
    goEdit() {
       this.title = "编辑收款人（请勿输入信用卡卡号及对公账户）";
      this.dialogVisible = true;
      // this.$router.push("/filemanagement/editpayee");
    },
    getInfo(id){
      queryPayeeById({payeeId:id}).then(res => {
        if(res.code == 200) {
          this.msgSuccess(res.msg);
          this.form = res.data
        }
      })
    },
    add(){
      saveClientPayee(this.form).then(res => {
        if(res.code == 200){
          this.msgSuccess(res.msg)
          this.dialogVisible = false;
        }
      })
    },
    edit(){
      updatePayee(this.form).then(res => {
        if(res.code == 200){
          this.msgSuccess(res.msg)
          this.dialogVisible = false;
        }
      })
    },
    submitForm(formName){

      if(this.id) {
        this.edit(this.form)
      } else {
        this.add(this.form)
      }

      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    }
  },

};
</script>

<style scoped>
</style>

