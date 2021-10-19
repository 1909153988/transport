<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch">
      <el-row>
        <div class="mb20 flex justify-end">
          <el-col :span="5">
            <el-form-item label="运单编号">
              <el-input
                clearable
                size="small mr10"
                v-model="queryParams.carriageId"
                value=""
                placeholder="运单编号"
                @keyup.enter.native="handleQuery"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="9">
            <el-form-item label="创建时间：">
              <el-date-picker
                clearable
                type="datetime"
                placeholder="开始日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptionsStart"
                v-model="queryParams.startTime"
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
            <el-form-item label="合同号">
              <el-input
                clearable
                size="small mr10"
                v-model="queryParams.contractId"
                value=""
                placeholder="合同号"
                @keyup.enter.native="handleQuery"
              ></el-input>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
      <el-row>
        <div class="mb20 flex justify-end">
          <el-col :span="5">
            <el-form-item label="运单状态">
              <el-select
                clearable
                v-model="queryParams.carriageState"
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
            <el-form-item label="合同状态">
              <el-select
                clearable
                v-model="queryParams.contractState"
                placeholder="请选择"
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


          <el-col :span="4">
            <el-form-item>
              <el-button
                size="small"
                type="primary"
                @click="handleQuery()"
                plain
              >查询
              </el-button
              >
              <el-button size="small" type="primary" plain @click="resetQuery">清空</el-button>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
    </el-form>

    <el-row>
      <div>
        <right-toolbar
          :showSearch.sync="showSearch"
          @queryTable="getList"
        ></right-toolbar>
      </div>
    </el-row>

    <el-table :data="tableData" style="width: 100%;margin-top: 20px;">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="contractId" label="合同编号"></el-table-column>
      <el-table-column prop="carriageId" label="运单编号"></el-table-column>
      <el-table-column prop="carriageState" label="运单状态"></el-table-column>
      <el-table-column
        prop="contractState"
        label="合同状态"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="contractTime"
        label="签订时间"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="contractCreateTime"
        label="创建时间"
        width="200"
      ></el-table-column>
      <el-table-column prop="contractPartyA" label="甲方"></el-table-column>
      <el-table-column prop="contractPartyB" label="乙方" width="120"></el-table-column>
      <el-table-column prop="remake" label="备注"></el-table-column>
      <el-table-column prop="date" label="操作" fixed="right" width="200px">
        <template slot-scope="scope">
          <span class="operate mr10" v-hasPermi="['waybill:carriageContract:getContractUrl']"
                @click="gohetong(scope.row)">查看合同</span>
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


    <el-dialog title="请选择运输方式" :visible.sync="isShow" width="30%" center>
      <div class="flex justify-around">
        <!--        <el-button type="primary" plain>公路运输</el-button>-->
        <!--        <el-button type="primary" plain>水路运输</el-button>-->
        <!--        <el-button type="primary" plain disabled>集装箱运输（暂未开放）</el-button>-->
        <el-radio-group v-model="radio">
          <el-radio :label="1">公路运输</el-radio>
          <el-radio :label="2">水路运输</el-radio>
          <el-radio :label="3" disabled>集装箱运输（暂未开放）</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="goDispatch">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {contractlist, getcarriage} from "@/api/waybill/waybilllist";

  export default {
    data() {
      return {
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
        // 显示搜索条件
        showSearch: true,
        form: {},
        yunoptions: [
          {
            value: 0,
            label: "已创建",
          },
          {
            value: 1,
            label: "已接单",
          },
          {
            value: 2,
            label: "发车中",
          },
          {
            value: 3,
            label: "已到达",
          }, {
            value: 4,
            label: "已签收",
          },
          {
            value: 5,
            label: "已关闭",
          },
          {
            value: 6,
            label: "已删除",
          },
        ], //运单状态
        zhuangtaioptions: [
          {
            value: 0,
            label: "未签署",
          },
          {
            value: 1,
            label: "签署成功",
          },
          {
            value: 2,
            label: "签署失败",
          },
        ], //合同状态
        tableData: [],
        radio: 1,
        isShow: false,
        time: [],
        total: 0, //总条数
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          carriageId: undefined, //运单编号
          startTime: undefined, //开始时间
          endTime: undefined, //结束时间
          contractId: undefined, //合同编号
          carriageState: undefined, //运单状态
          contractState: undefined, //合同状态
        },
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 获取运单合同列表 */
      getList() {
        // console.log(this.queryParams);
        contractlist(this.addDateRange(this.queryParams)).then((response) => {
          this.tableData = response.rows;
          this.total = response.total;
        });
      },
      /** 清空按钮操作 */
      resetQuery() {
        this.queryParams = {
          pageNum: 1,
          pageSize: 10,
          startTime: undefined, //开始时间
          endTime: undefined, //结束时间
          carriageId: undefined, //运单编号
          startTime: undefined, //开始时间
          endTime: undefined, //结束时间
          contractId: undefined, //合同编号
          carriageState: undefined, //运单状态
          contractState: undefined, //合同状态
        },
          this.resetForm("queryForm");
        this.handleQuery();
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
      },
      gohetong(row) {
        // carriageId
        //  window.open('https://8t0n5r.axshare.com/#g=1&p=%E5%90%88%E5%90%8C%E8%AF%A6%E6%83%85');
        getcarriage(row.carriageId).then((response) => {
          //  console.log(response);
          if (response.code == 200) {
            if (response.msg == null) {
              this.$message.info("暂无合同信息");
            } else {
              this.$message.success(response.msg);
            }
          } else {
            this.$message.error(response.msg);
          }
        });
      }
    },
  };
</script>

<style scoped>
</style>

