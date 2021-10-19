<template>
  <div class="app-container">
    <div class="mb20 flex justify-end">
    <el-row :gutter="20">
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          <el-select size="small mr5" value="">
            <el-option value="" label="船舶名称"></el-option>
            <el-option value="1" label="已停用"></el-option>
            <el-option value="1" label="待审核"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          <el-select size="small mr5" value="">
            <el-option value="" label="审核状态"></el-option>
            <el-option value="1" label="已停用"></el-option>
            <el-option value="1" label="待审核"></el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :span="8">
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
      </el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          <el-select size="small mr5" value="">
            <el-option value="" label="船东手机号"></el-option>
            <el-option value="1" label="已停用"></el-option>
            <el-option value="1" label="待审核"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          <el-select size="small mr5" value="">
            <el-option value="" label="船东名称"></el-option>
            <el-option value="1" label="已停用"></el-option>
            <el-option value="1" label="待审核"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row></div>
    <el-row :gutter="20" style="margin-top: 20px">
       <el-col :span="4"
        ><div class="grid-content bg-purple" style="color:#ffffff">
          11
        </div>
      </el-col>
       <el-col :span="6"
        ><div class="grid-content bg-purple" style="color:#ffffff">
          11
        </div>
      </el-col>
       <el-col :span="4"
        ><div class="grid-content bg-purple" style="color:#ffffff">
          11
        </div>
      </el-col>
       <el-col :span="4"
        ><div class="grid-content bg-purple">
        </div>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          <el-select size="small mr5" value="">
            <el-option value="" label="船东名称"></el-option>
            <el-option value="1" label="已停用"></el-option>
            <el-option value="1" label="待审核"></el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :span="4">
        <el-button size="small" type="primary" @click="goAdd" plain
          >查询</el-button
        >
        <el-button size="small" type="primary" @click="goAdd" plain
          >清空</el-button
        >
      </el-col>
    </el-row>
    <div class="mb20 flex" style="margin-top: 20px">
      <el-button size="small" plain type="primary" @click="goAdd">添加船舶</el-button>
      <el-button size="small" class="mr10" plain type="danger">删除</el-button>
      <FileUpload :url = "importShipUrl" :text="text" :isShowTip="false"></FileUpload>
      <el-button size="small" type="primary" @click="exportShip" plain
          >导出</el-button
        >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="shipId" label="序号"></el-table-column>
      <el-table-column prop="ship" label="船舶"></el-table-column>
      <el-table-column prop="master" label="船东姓名"></el-table-column>
      <el-table-column prop="auditStatus" label="审核状态"></el-table-column>
      <el-table-column prop="mmsi" label="MMSI(9位码)"></el-table-column>
      <el-table-column prop="tonnage" label="载货(吨)"></el-table-column>
      <el-table-column prop="createBy" label="创建人"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="createTime" label="操作" fixed="right" width="200">
        <template slot-scope="data">
          <span class="operate mr10" @click="remove(data.row.shipId)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total"></Pagination>
  </div>
</template>

<script>
import {
  queryShips,
  importShip,
  exportShip,
  deleteShip,
} from "../../../api/capacity/shipper"
import Pagination from "../../../components/Pagination/index"
import FileUpload from "../../../components/FileUpload/index"

export default {
  data() {
    return {
      tableData: [],
      time: [],
      importShipUrl: '/transport/shipManage/importShip',
      text:'导入船舶',
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
    //条件查询
    getMapList(){
      queryShips().then(res => {
        console.log(res)
        if(res.code == 200) {
          this.msgSuccess("查询成功！");
          this.tableData = res.rows
          this.total = res.total;
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

        deleteShip({shipId:id}).then(res => {
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
    importShip(){
      importShip().then(res => {

      })
    },
    //导出
    exportShip(){
      let params = {};
      // exportDriver().then(res => {
      //   console.log(res)
      // })
      this.download('/transport/shipManage/exportShip', {
        ...this.queryParams
      }, `shiper_${new Date().getTime()}.xlsx`)
      this.msgSuccess("导出成功！")
    },
    goAdd() {
      this.$router.push("/filemanagement/addshipper");
    },
  },
};
</script>

<style scoped>
</style>

