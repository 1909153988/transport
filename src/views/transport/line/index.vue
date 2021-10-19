<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch">
      <el-row>
        <div class="mb20 flex justify-end">
          <el-col :span="9">
            <el-form-item label="创建时间：">
              <el-date-picker
              clearable
                 type="datetime"
                placeholder="开始日期"
                :picker-options="pickerOptionsStart"
                v-model="queryParams.startTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                class="box-date-picker"
              ></el-date-picker>
              -
              <el-date-picker
              clearable
                type="datetime"
                placeholder="结束日期"
                :picker-options="pickerOptionsEnd"
                v-model="queryParams.endTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                class="box-date-picker"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="线路名称">
              <el-input
              clearable
                size="small mr10"
                v-model="queryParams.oftenPathName"
                value=""
                placeholder="线路名称"
                @keyup.enter.native="handleQuery"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="货物名称">
              <el-input
              clearable
                size="small mr10"
                v-model="queryParams.goodsName"
                value=""
                 @keyup.enter.native="handleQuery"
                placeholder="货物名称"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="装货地">
              <el-input
              clearable
                size="small mr10"
                v-model="queryParams.deliverContactsProvince"
                 @keyup.enter.native="handleQuery"
                value=""
                placeholder="装货地"
              >
              </el-input>
            </el-form-item>
          </el-col></div
      ></el-row>
      <el-row>
        <div class="mb20 flex justify-end">
          <el-col :span="5">
            <el-form-item label="卸货地">
              <el-input
              clearable
                size="small mr10"
                v-model="queryParams.takeContactsProvince"
                value=""
                 @keyup.enter.native="handleQuery"
                placeholder="卸货地"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="状态">
              <el-select
              clearable
                v-model="queryParams.oftenPathState"
                placeholder="状态"
                size="small"
              >
                <el-option
                  v-for="item in zhuangtaioptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="运输类型">
              <!-- <el-input
              clearable
                size="small mr10"
                v-model="queryParams.transportType"
                value=""
                placeholder="运输类型"
              >
              </el-input> -->
               <el-select
              clearable
                v-model="queryParams.transportType"
                size="small"
              >
                <el-option
                  v-for="item in yunoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item>
              <el-button
                size="small"
                type="primary"
                @click="handleQuery()"
                plain
                >查询</el-button
              >
              <el-button size="small" type="primary" plain @click="resetQuery">清空</el-button>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
    </el-form>

    <div class="mb20">
      <el-button size="small" type="primary" @click="goAdd" plain
        >新增</el-button
      >

      <!-- <el-button size="small" type="primary" plain>导出</el-button> -->
      <el-button
         type="primary"
          plain
        size="small"
          @click="handleExport"
          v-hasPermi="['waybill:carriagePath:exportOftenPath']"
        >导出</el-button>

      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column
        prop="oftenPathName"
        class="operate mr10"
        label="线路名称"
      >
        <template slot-scope="scope">
          <span
            class="operate mr10"
            style="cursor: pointer"
            v-hasPermi="['waybill:carriagePath:selectOftenPathById']"
            @click="goEdit(scope.row)"
            >{{ scope.row.oftenPathName }}</span
          >
        </template>
        <!-- <span class="operate mr10" @click="goEdit">上海-广州</span> -->
      </el-table-column>
      <el-table-column prop="oftenPathState" label="状态">
        <template slot-scope="scope">
          <span
            class="operate mr10"
            v-if="scope.row.oftenPathState == 1"
            style="cursor: pointer"
            >启用</span
          >
          <span class="operate mr10" v-else style="cursor: pointer"
            >未启用</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="transportType"
        label="运输类型"
        :formatter="yunstateFormat"
      ></el-table-column>
      <el-table-column prop="goodsName" label="货物名称"></el-table-column>
      <el-table-column
        prop="deliverContactsProvince"
        label="发货地"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="deliverContacts"
        label="装货联系人"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="deliverContactsPhone"
        label="装货联系电话"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="takeContactsProvince"
        label="收货地"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="takeContacts"
        label="卸货联系人"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="takeContactsPhone"
        label="卸货联系人电话"
        width="120"
      ></el-table-column>
      <el-table-column prop="remake" label="线路备注"></el-table-column>
      <el-table-column prop="date" label="操作" fixed="right" width="200px">
        <template slot-scope="scope">
          <span class="operate mr10" @click="goDel(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :page-sizes="[10, 20, 30, 50, 100]"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { linelist, delline} from "@/api/waybill/waybilllist";
export default {
  data() {
    return {
      takeAreaCodeViable:false, //区域代码隐藏
      pickerOptionsStart: {
        disabledDate: (time) => {
          let endDateVal = this.queryParams.endTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          let beginDateVal = this.queryParams.startTime;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000 + 1
            );
          }
        },
      },
      yunoptions: [
        {
          value: 0,
          label: "公路运输",
        },
        {
          value: 1,
          label: "水路运输",
        },
      ], //运输类型
      zhuangtaioptions: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: 2,
          label: "未启用",
        },
      ], //状态是否启动
      // 显示搜索条件
      showSearch: true,
      total: 0, //总条数
      tableData: [],
      radio: 1,
      isShow: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        startTime: undefined, //开始时间
        endTime: undefined, //结束时间
        oftenPathName: undefined, //创建线路名称
        goodsName: undefined, //货物名称
        deliverContactsProvince: undefined, //装货地
        takeContactsProvince: undefined, //卸货地
        oftenPathState: undefined, //状态是否启用 1启用 2未启用
        transportType: undefined, //运输类型
      },
      time: [],
      currentPage4: 4,
    };
  },
  created() {
    this.getList();
  },
  methods: {
     // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.form = {
       oftenPathName: undefined,
        oftenPathState: undefined,
        transportType: undefined,
        remake: undefined,
        goodsName:undefined,
       deliverContacts: undefined,
        deliverContactsPhone:undefined,
        deliverContactsProvince: undefined,
        menuCheckStrictly: true,
        deptCheckStrictly: true,
        takeContacts: undefined,
        takeContactsPhone: undefined,
      };
      this.resetForm("form");
    },
     /** 清空按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        startTime: undefined, //开始时间
        endTime: undefined, //结束时间
        oftenPathName: undefined, //创建线路名称
        goodsName: undefined, //货物名称
        deliverContactsProvince: undefined, //装货地
        takeContactsProvince: undefined, //卸货地
        oftenPathState: undefined, //状态是否启用 1启用 2未启用
        transportType: undefined, //运输类型
      },
      this.resetForm("queryForm");
      this.handleQuery();
    },
    yunstateFormat(row) {
      if (row.transportType == 0) {
        return "公路运输";
      } else if (row.transportType == 1) {
        return "水路运输";
      }
    },
    /** 获取常发路线数据列表 */
    getList() {
      this.loading = true;
      linelist(this.addDateRange(this.queryParams)).then((response) => {
        // console.log(this.queryParams);
       if(response.code==200){
          this.tableData = response.rows;
          this.total = response.total;
          this.loading = false;
       }
      });
    },
    /**搜索查询按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
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
    goAdd() {
      this.$router.push("/transport/addline");
    },
    goEdit(row) {
      // console.log('row的数据')
      // console.log(row)
      this.$router.push({
        path: "/transport/editline",
        query: { oftenPathId: row.oftenPathId },
      });
    },
    //删除常发路线
    goDel(row) {
      delline(row.oftenPathId).then((response) => {
        // console.log(response);
        if ((response.code = 200)) {
          this.msgSuccess("删除成功");
          this.getList();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
     /** 导出按钮操作 */
    handleExport() {
      this.download('/waybill/carriagePath/exportOftenPath', {
        ...this.queryParams
      }, `line_${new Date().getTime()}.xlsx`)
    }
  },
};
</script>

<style scoped>
</style>

