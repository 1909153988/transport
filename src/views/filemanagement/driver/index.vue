<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
      <el-select size="small mr5" value="">
        <el-option value="" label="司机姓名"></el-option>
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
        end-placeholder="结束日期">
      </el-date-picker>

      <el-select size="small mr5" value="">
        <el-option value="" label="审核状态"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>
      <el-select size="small mr5" value="">
        <el-option value="" label="身份证状态"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>
      <el-select size="small mr5" value="">
        <el-option value="" label="驾驶证状态"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>
       <el-select size="small mr5" value="">
        <el-option value="" label="道路运输从业资"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>
      <el-button size="small" type="primary" plain>查询</el-button>
        <el-button size="small" type="primary" plain>清空</el-button>
    </div>

    <div class="mb20 flex ">
      <el-button size="small" type="primary" @click="goAdd" plain>添加司机</el-button>
<!--      <el-button size="small" type="warning" plain @click="goEdit">编辑</el-button>-->
      <el-button size="small" type="danger" class="mr10" plain>删除</el-button>


      <FileUpload :url = "importDriverUrl" :text="text" :isShowTip="false"></FileUpload>


      <el-button size="small" type="warning"  plain>导入司机证照</el-button>
      <el-button size="small" type="primary" @click="exportDriver" plain>导出</el-button>
    </div>


    <el-table
      :data="tableData"
      ref="table"
      style="width: 100%">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="chauffeurId" label="序号" ></el-table-column>
      <el-table-column prop="name" label="司机姓名" ></el-table-column>
      <el-table-column prop="phone" label="手机号" ></el-table-column>
      <el-table-column prop="idCardNumber" label="身份证号" ></el-table-column>
      <el-table-column prop="auditStatus" label="审核状态" ></el-table-column>
      <el-table-column prop="idCardState" label="身份证状态" ></el-table-column>
      <el-table-column prop="drivingState" label="驾驶证状态" ></el-table-column>
      <el-table-column prop="certificateState" label="道路运输从业资格证状态" ></el-table-column>
      <el-table-column prop="date" label="身份证正面" ></el-table-column>
      <el-table-column prop="date" label="身份证反面" ></el-table-column>
      <el-table-column prop="date" label="驾驶证" ></el-table-column>
      <el-table-column prop="date" label="道路运输从业资格证" ></el-table-column>
      <el-table-column prop="date" label="代收协议" ></el-table-column>
      <el-table-column prop="vehicleNumber" label="关联车辆" ></el-table-column>
      <el-table-column prop="driverId" label="关联收款人" ></el-table-column>
        <el-table-column prop="createBy" label="创建人" ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" ></el-table-column>
      <el-table-column prop="createTime" label="操作" fixed="right" width="200">
        <template slot-scope="data">
          <span class="operate mr10" @click="goEdit(data.row.chauffeurId)">编辑</span>
          <span class="operate mr10" @click="remove(data.row.chauffeurId)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total"></Pagination>
  </div>
</template>

<script>
import { queryDriverInfo,importDriver,queryDrivers,exportDriver,deleteDriver } from "../../../api/capacity/driver"
import Pagination from "../../../components/Pagination/index"
import FileUpload from "../../../components/FileUpload/index"


export default {
  data(){
    return {
      tableData:[],
      time:[],
      total:0,
      importDriverUrl: '/transport/driverManage/importDriver',
      text:'导入司机',
      queryParams:{},
      fileList:[]
    }
  },
  created() {
    this.getMapList()
  },
  components:{
    Pagination,
    FileUpload
  },
  methods: {
    goAdd(){
      console.log(this.$router)
      this.$router.push("/filemanagement/adddriver")
    },
    goEdit(id){
      this.$router.push({path:"/filemanagement/editdriver",query:{id:id}})
    },
    // 条件查询司机列表
    getMapList(){
      queryDrivers().then(res => {
        console.log(res)
        if(res.code == 200) {
          this.msgSuccess("查询成功！")
          this.tableData = res.rows;
          this.total = res.total;
        }
      })
    },

    //导入司机
    importDrivers(file){

    },
    //导出司机
    exportDriver(){
      let params = {};
      // exportDriver().then(res => {
      //   console.log(res)
      // })
      this.download('/transport/driverManage/exportDriver', {
        ...this.queryParams
      }, `driver_${new Date().getTime()}.xlsx`)
      this.msgSuccess("导出成功！")
    },
    //删除司机
    remove(id) {
      this.$confirm('是否删除 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        deleteDriver({chauffeurId:id}).then(res => {
          // console.log(res)
          if(res.code == 200) {

            this.$message({
              type: 'success',
              message: '删除成功!'
            });

            this.getMapList()
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }

  }
}
</script>

<style scoped>

</style>

