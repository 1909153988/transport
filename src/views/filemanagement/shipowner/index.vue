<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
      <el-select size="small mr5" value="">
        <el-option value="" label="船舶姓名"></el-option>
        <el-option value="1" label="已停用"></el-option>
        <el-option value="1" label="待审核"></el-option>
      </el-select>

      <el-select size="small mr5" value="">
        <el-option value="" label="注册手机号"></el-option>
        <el-option value="1" label="已停用"></el-option>
        <el-option value="1" label="待审核"></el-option>
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

      <el-select size="small mr5" value="">
        <el-option value="" label="审核状态"></el-option>
        <el-option value="1" label="已停用"></el-option>
        <el-option value="1" label="待审核"></el-option>
      </el-select>

      <el-button size="small" type="primary" @click="goAdd" plain
        >查询</el-button
      >
      <el-button size="small" type="primary" @click="goAdd" plain
        >清空</el-button
      >
    </div>
    <div class="mb20 flex" style="margin-top: 20px">
      <el-button size="small" type="primary" plain @click="goAdd"
        >添加船东</el-button
      >
      <el-button size="small" type="warning" plain @click="goEdit"
        >编辑</el-button
      >
      <el-button size="small" type="danger" class="mr10" plain>删除</el-button>
<!--      <el-button size="small" type="info" plain>导入船东</el-button>-->

      <FileUpload :url = "importShipownerUrl" :text="text" :isShowTip="false"></FileUpload>
      <el-button size="small" type="warning" plain>导入船东证照</el-button>
      <el-button size="small" type="primary" @click="exportSkipper" plain
        >导出</el-button
      >
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="skipperId" label="序号"></el-table-column>
      <el-table-column prop="name" label="船东姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="idCardNumber" label="身份证号"></el-table-column>
      <el-table-column prop="auditStatus" label="审核状态"></el-table-column>
      <el-table-column prop="date" label="身份证状态"></el-table-column>
      <el-table-column prop="idCardPerson" label="身份证正面"></el-table-column>
      <el-table-column prop="idCardBadge" label="身份证反面"></el-table-column>
      <el-table-column prop="createBy" label="创建人"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="createTime" label="操作" fixed="right" width="200">
        <template slot-scope="data">
          <span class="operate mr10" @click="remove(data.row.skipperId)">编辑</span>
          <span class="operate mr10" @click="remove(data.row.skipperId)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total"></Pagination>

    <!-- 添加船东对话框 -->
    <el-dialog
      title="添加船东"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <!-- <div class="mb20">
          <el-divider direction="vertical" />
          <span class="weight">添加船东</span>
        </div> -->
        <el-form-item label="身份证头像面" required prop="">
          <ImageUpload></ImageUpload>
        </el-form-item>
        <el-form-item label="身份证国徽面" required prop="">
          <ImageUpload></ImageUpload>
        </el-form-item>
        <el-form-item label="船东姓名" prop="companyName">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="注册手机号" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <div>
          <el-form-item label=" ">
            <!-- <el-button type="primary" @click="submitForm('form')">提交</el-button> -->
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="add" >确 定</el-button
            >
          </el-form-item>
        </div>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import ImageUpload  from '../../../components/ImageUpload/index'

import {
  querySkippers,
  importSkipper,
  exportSkipper,
  deleteSkipper,
  saveSkipper
} from "../../../api/capacity/shipowner"
import Pagination from "../../../components/Pagination/index"
import FileUpload from "../../../components/FileUpload/index"
export default {
  data() {
    return {
       form:{},
      dialogVisible: false,
      tableData: [],
      importShipownerUrl: '/transport/skipperManage/importSkipper',
      text:'导入船东',
      time: [],
      total:0,
       rules:{

      }
    };
  },
  created() {
    this.getMapList()
  },
  components:{
    ImageUpload,
    Pagination,
    FileUpload
  },
  methods: {
    //查询
    getMapList(){
      querySkippers().then(res => {
        console.log(res)
        if(res.code == 200){
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

        deleteSkipper({skipperId:id}).then(res => {
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
    importSkipper(){
      importSkipper().then(res => {

      })
    },
    //导出
    exportSkipper(){
      let params = {};
      // exportDriver().then(res => {
      //   console.log(res)
      // })
      this.download('/transport/skipperManage/exportSkipper', {
        ...this.queryParams
      }, `shipowner_${new Date().getTime()}.xlsx`)
    },

    goAdd() {
      this.dialogVisible = true;
      // this.$router.push("/filemanagement/addshipowner");
    },
    goEdit() {
      this.$router.push("/filemanagement/editshipowner");
    },
    add(){
      saveSkipper(this.form).then(res => {
        if(res.code == 200) {
          this.msgSuccess(res.msg)
          this.dialogVisible = false;
          this.getMapList()
        }
      })
    },
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
  },
};
</script>

<style scoped>
</style>

