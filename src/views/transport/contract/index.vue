<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">


      <el-form-item label="运单编号"  prop="carriageId" >
        <el-input
          clearable
          size="small mr10"
          v-model="queryParams.carriageId"
          placeholder="运单编号"
          @keyup.enter.native="handleQuery"
        ></el-input>
      </el-form-item>
        <el-form-item label="合同号"  prop="contractId">
          <el-input
            clearable
            size="small mr10"
            v-model="queryParams.contractId"
            value=""
            placeholder="合同号"
            @keyup.enter.native="handleQuery"
          ></el-input>
        </el-form-item>

      <el-form-item label="运单状态"  prop="carriageState">
        <el-select
          clearable
          v-model="queryParams.carriageState"
          size="small">

          <el-option
            v-for="item in yunoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合同状态"  prop="contractState">
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


<!--      Charles。:-->
<!--      contractTimeStartTime  contractTimeEndTime合同签署时间-->

<!--      Charles。:-->
<!--      contractCreateTimeStartTime contractCreateTimeEndTime合同创建时间-->

      <el-form-item label="合同签署时间" prop="contractStartEndTime" label-width="120px">
        <el-date-picker
          v-model.trim="contractStartEndTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同创建时间" prop="contractCreateTime" label-width="120px">
        <el-date-picker
          v-model.trim="contractCreateTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>




      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">

      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['waybill:waybillContract:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="waybillContractList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="contractId" label="合同编号" align="center"></el-table-column>
      <el-table-column prop="carriageId" label="运单编号" align="center"></el-table-column>
      <el-table-column prop="carriageState" label="运单状态" align="center"></el-table-column>
      <el-table-column prop="contractState"
        label="合同状态"
        width="120"
        align="center"></el-table-column>
      <el-table-column
        prop="contractTime"
        label="签订时间"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="contractCreateTime"
        label="创建时间"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column prop="contractPartyA" label="甲方"  align="center" ></el-table-column>
      <el-table-column prop="contractPartyB" label="乙方"  align="center"  width="120"></el-table-column>
      <el-table-column prop="remake" label="备注"  align="center" ></el-table-column>


      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['waybill:carriageContract:getContractUrl']"          >查看合同
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
  import {

    getContractUrl,
    listWaybillContract
  } from "@/api/waybill/waybillContract";

  export default {
    name: "WaybillContract",
    components: {},
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 运单中心-运输合同表格数据
        waybillContractList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          carriageId: null,
          contractId: null,
          carriageState:null,
          contractState:null,

      contractTimeStartTime: '',
        contractTimeEndTime: '',
        contractCreateTimeStartTime: '',
        contractCreateTimeEndTime: '',
        },

        contractStartEndTime: '',
        contractCreateTime: '',

        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        // 表单参数
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
        ],
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询运单中心-运输合同列表 */
      getList() {
        this.loading = true;
        listWaybillContract(this.queryParams).then(response => {
          this.waybillContractList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {

        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;

        const contractStartEndTime = this.contractStartEndTime + '';
        const contractCreateTime = this.contractCreateTime + '';


        if (contractStartEndTime != null && contractStartEndTime != 'null' && contractStartEndTime != '' && contractStartEndTime.length > 0) {
          const startEndTimeChar = contractStartEndTime.split(',')[0];
          const endTimeChar = contractStartEndTime.split(',')[1];

          this.queryParams.contractTimeStartTime = startEndTimeChar;
          this.queryParams.contractTimeEndTime = endTimeChar;
        } else {
          this.queryParams.contractTimeStartTime = '';
          this.queryParams.contractTimeEndTime = '';
        }

        if (contractCreateTime != null && contractCreateTime != 'null' && contractCreateTime != '' && contractCreateTime.length > 0) {
          const startEndTimeChar = contractCreateTime.split(',')[0];
          const endTimeChar = contractCreateTime.split(',')[1];

          this.queryParams.contractCreateTimeStartTime = startEndTimeChar;
          this.queryParams.contractCreateTimeEndTime = endTimeChar;
        } else {
          this.queryParams.contractCreateTimeStartTime = '';
          this.queryParams.contractCreateTimeEndTime = '';
        }

        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.contractStartEndTime=null;
        this.contractCreateTime=null;

        this.resetForm("queryForm");

        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.contractId)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },

      /** 查看合同 */
      handleUpdate(row) {
        getContractUrl(row.carriageId).then((response) => {
          //  console.log(response);
          if(response.code==200){
            if(response.msg==null){
               // window.open('https://8t0n5r.axshare.com/#g=1&p=%E5%90%88%E5%90%8C%E8%AF%A6%E6%83%85');

              this.$message.info("暂无合同信息");
            }else{
              this.$message.success(response.msg);
            }
          }else{
            this.$message.error(response.msg);
          }
        });
      },
      handleExport() {
        const queryParams = this.queryParams;

      }
    }
  };
</script>
