<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
      <el-select size="small mr5" value="">
        <el-option value="" label="车牌号"></el-option>
        <el-option value="1" label="已停用"></el-option>
        <el-option value="1" label="待审核"></el-option>
      </el-select>
        <el-select size="small mr5" value="">
        <el-option value="" label="承运人手机号"></el-option>
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
        <el-option value="" label="行驶证状态"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>

      <el-select size="small mr5" value="">
        <el-option value="" label="道路运输证状态"></el-option>
        <el-option value="1" label="手机号"></el-option>
      </el-select>

      <el-button size="small" type="primary" plain>查询</el-button>
       <el-button size="small" type="primary" plain>清空</el-button>
    </div>

    <div class="mb20 flex">
      <el-button size="small" type="primary" @click="goAdd" plain>添加车辆</el-button>
      <el-button size="small" type="danger" @click="remove" class="mr10" plain>删除</el-button>
      <FileUpload :url = "importVehicleUrl" :text="text" :isShowTip="false"></FileUpload>
      <el-button size="small" type="warning" plain>导入车辆证照</el-button>
       <el-button size="small" type="primary" @click="exportVehicle" plain>导出</el-button>
    </div>

    <el-table
      :data="tableData"
      ref="table"
      style="width: 100%">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="vehicleId" label="序号" ></el-table-column>
      <el-table-column prop="vehicleNumber  " label="车牌号" ><el-button
          size="mini"
          type="text"
          @click="goEdit()"
          v-hasPermi="['system:notice:edit']"
          >沪A12345</el-button
        ></el-table-column>
      <el-table-column prop="auditStatus" label="审核状态" ></el-table-column>
      <el-table-column prop="vehicleNumberType" label="牌照类型" ></el-table-column>
      <el-table-column prop="vehicleType" label="车辆分类" ></el-table-column>
      <el-table-column prop="date" label="核定载质量(吨)" width="120"></el-table-column>
      <el-table-column prop="dlysNumber" label="道路运输证字号" width="120"></el-table-column>
      <el-table-column prop="businessCertificate" label="经营许可证号" width="120"></el-table-column>
      <el-table-column prop="licenseState" label="行驶证状态" ></el-table-column>
      <el-table-column prop="dlysState" label="道路运输证状态" width="120"></el-table-column>
      <el-table-column prop="drivingFront" label="行驶证" > <el-button
          size="mini"
          type="text"
          v-hasPermi="['system:notice:edit']"
          >查看</el-button
        ></el-table-column>
      <el-table-column prop="dlysFront" label="道路运输证" ><el-button
          size="mini"
          type="text"
          v-hasPermi="['system:notice:edit']"
          >查看</el-button
        ></el-table-column>
      <el-table-column prop="createBy" label="创建人" ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" ></el-table-column>
      <el-table-column prop="createTime" label="操作" fixed="right" width="200">
        <template slot-scope="data">
          <span class="operate mr10" @click="goEdit(data.row.vehicleId)">编辑</span>
          <span class="operate mr10" @click="remove(data.row.vehicleId)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total"></Pagination>
  </div>
</template>

<script>
import Pagination from "../../../components/Pagination/index"
import FileUpload from "../../../components/FileUpload/index"
import {
  queryVehicles,
  queryVehicleInfo,
  queryVehicleById,
  saveVehicle,
  deleteVehicle,
  updateVehicle,
  importYunliVehicle,
  exportYunliVehicle
} from '../../../api/capacity/car'
import log from "../../monitor/job/log";
export default {
  data(){
    return {
      tableData:[
        {date:'1111'}
      ],
      time:[],
      total:0,
      importVehicleUrl: '/transport/clientVehicleManage/importYunliVehicle',
      text:'导入车辆',
      queryParams:{

      }
    }
  },
  created() {
    this.getMapList();
  },
  components:{
    Pagination,
    FileUpload
  },
  methods: {
    getMapList(){
      //条件查询
      let map = {

      }
      queryVehicles().then(res => {
        console.log(res)
        if(res.code == 200) {
          this.msgSuccess("查询成功!")
          this.tableData = res.rows;
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

        deleteVehicle({chauffeurId:id}).then(res => {
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
    importYunliVehicle(){
      importYunliVehicle().then(res => {

      })
    },
    //导出
    exportVehicle(){
      let params = {};
      // exportDriver().then(res => {
      //   console.log(res)
      // })
      this.download('/transport/clientVehicleManage/exportYunliVehicle', {
        ...this.queryParams
      }, `vehicle_${new Date().getTime()}.xlsx`)
      this.msgSuccess("导出成功！")
    },

    goAdd(){
      this.$router.push("/filemanagement/addcar")
    },
    goEdit(){
      this.$router.push("/filemanagement/editcar")
    }
  }
}
</script>

<style scoped>

</style>

