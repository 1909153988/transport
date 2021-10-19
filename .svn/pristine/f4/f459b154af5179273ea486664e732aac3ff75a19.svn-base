<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
      <el-select size="small mr5" value="">
        <el-option value="" label="客户名称"></el-option>
        <el-option value="1" label="合同编号"></el-option>
      </el-select>
      <el-select size="small mr5" value="">
        <el-option value="" label="合同编号"></el-option>
        <el-option value="1" label="合同编号"></el-option>
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
      <el-button size="small" type="primary" plain>查询</el-button>
      <el-button size="small" type="primary" plain>清空</el-button>
    </div>
    <div class="mb20 flex">
      <el-button size="small" type="primary" plain @click="goAdd()"
        >新建</el-button
      >
      <el-button size="small" type="danger" class="mr10" plain>删除</el-button>
<!--       <el-button size="small" type="warning" plain>导入</el-button>-->
      <FileUpload :url = "importDriverUrl" :text="text" :isShowTip="false"></FileUpload>
      <el-button size="small" type="primary" @click="exportClient" plain>导出</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="shipperClientId" label="序号"></el-table-column>
      <el-table-column prop="companyName" label="客户名称"
        ><el-button
          size="mini"
          type="text"
          @click="goAdd()"
          v-hasPermi="['system:notice:edit']"
          >上海明乾物流有限公司</el-button
        ></el-table-column
      >
      <el-table-column prop="companyShortName" label="客户简称"></el-table-column>
      <el-table-column prop="clientContacts" label="客户联系人"></el-table-column>
      <el-table-column prop="clientContactsPhone" label="联系电话"></el-table-column>
      <el-table-column prop="contactAddress" label="联系地址"></el-table-column>
      <el-table-column prop="clientDeveloper" label="客户开发人"></el-table-column>
      <el-table-column prop="closeType" label="结算方式"></el-table-column>
      <el-table-column prop="billDate" label="账期"></el-table-column>
      <el-table-column prop="contractStartTime" label="合同起始日期"></el-table-column>
      <el-table-column prop="contractEndTime" label="合同结束日期"></el-table-column>
      <el-table-column prop="createTime" label="操作" fixed="right" width="200">
        <template slot-scope="data">
          <span class="operate mr10" @click="goEdit(data.row.shipperClientId)">编辑</span>
          <span class="operate mr10" @click="remove(data.row.shipperClientId)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total"></Pagination>
  </div>
</template>

<script>
import {
  importClientSide,
  getShipperClient,
  exportClientSide,
  deleteShipperClient
} from "../../../api/capacity/client"
import Pagination from "../../../components/Pagination/index"
import FileUpload from "../../../components/FileUpload/index"
import {deleteSkipper, exportSkipper, importSkipper} from "../../../api/capacity/shipowner";
export default {
  data() {
    return {
      time: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      importClientUrl: '/transport/shipperClientManage/importClientSide',
      text:'导入客户',
      total:0,
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
      getShipperClient().then(res => {
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

        deleteShipperClient({shipperClientId:id}).then(res => {
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
    importClientSide(){
      importClientSide().then(res => {

      })
    },
    //导出
    exportClient(){
      let params = {};
      this.download('/transport/shipperClientManage/exportClientSide', {
        ...this.queryParams
      }, `client_${new Date().getTime()}.xlsx`)

      this.msgSuccess("导出成功！")
    },
    goAdd() {
      this.$router.push("/filemanagement/editclient");
    },
    goEdit(id){
      this.$router.push({path:'/filemanagement/editclient',query:{id:id}});
    }
  },
};
</script>

<style scoped>
</style>
