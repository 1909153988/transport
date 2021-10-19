<template>
  <div class="app-container">


    <el-row :gutter="30" v-for="(item, index) in rebateAccountList" :key="index"
            style="padding-bottom:10px;border-bottom: #1890ff 1px solid; margin-bottom: 20px; margin-top: 20px;">


      <el-col :span="4">
        <el-card shadow="always"
                 style="text-align: center; height: 120px; border: none; line-height: 30px; background-color: rgba(122,109,240,0.44)">
          <span style="width: 100%; float: left; color:white"><b>可用余额：</b></span>

          <el-popover
            placement="right"
            width="200"
            trigger="hover">

            <p style="color: blue">返利可用余额：{{item.money}}元</p>

            <el-button style="border: none; box-shadow:none" slot="reference" type="text" round>
              <b>{{item.money}}元</b>
            </el-button>
          </el-popover>


        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"
                 style="text-align: center; height: 120px; border: none; line-height: 30px; background-color: rgba(0,175,255,0.35)">
          <span style="width: 100%; float: left">累计使用金额：</span>
          <span style="width: 100%; float: left"><b>{{item.sumDeductionMoney}}元 ({{item.countDeduction}}笔)</b></span>
        </el-card>
      </el-col>

      <el-col :span="4">
        <el-card shadow="always"
                 style="text-align: center; height: 120px; border: none; line-height: 30px; background-color: rgba(57,255,85,0.23)">
          <span style="width: 100%; float: left">返利黑名单：</span>


          <el-popover
            placement="right"
            width="200"
            trigger="hover">

            <p style="color: gray">黑名单内暂不能接受返利</p>
            <el-button style="border: none; box-shadow:none" slot="reference" type="text" round>
              <b v-if="item.sceneBlacklist==1" style="color: red">是</b> <b style="color: green"
                                                                           v-else-if="item.sceneBlacklist==0">否</b>
            </el-button>
          </el-popover>
        </el-card>
      </el-col>

      <el-col :span="4">
        <el-card shadow="always"
                 style="text-align: center; height: 120px; border: none; line-height: 30px; background-color: rgba(255,255,216,0.67)">
          <span style="width: 100%; float: left; color: #888a8e">企业名称：</span>
          <span style="width: 100%; float: left; color: blue"><b>{{item.shipperFullName}}</b></span>
        </el-card>
      </el-col>


      <el-col :span="5" style="margin-top: 40px; text-align: right">


        <el-button type="info" round @click="selectAccountDetails(item.userId)">查看发放明细</el-button>

      </el-col>
    </el-row>


    <!-- 添加或修改返利发放记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>

      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">


        <el-form-item label="返利类型" prop="type">
          <el-select v-model="queryParams.type" placeholder="返利类型" clearable size="small">
            <el-option label="满减券" value="0"/>
            <el-option label="抵扣券" value="1"/>
            <el-option label="抵扣券" value="2"/>
          </el-select>
        </el-form-item>


        <el-form-item label="使用场景" prop="scene">
          <el-select v-model="queryParams.scene" placeholder="使用场景" clearable size="small">
            <el-option label="服务费返利" value="0"/>
            <el-option label="抵扣服务费" value="1"/>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="状态" clearable size="small">
            <el-option label="已领用" value="0"/>
            <el-option label="已使用" value="1"/>
          </el-select>
        </el-form-item>

        <el-form-item label="发放时间" prop="startEndTime">

        <el-date-picker
          v-model.trim="startEndTime"
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
            v-hasPermi="['consign:clientRebateRecord:export']"
          >导出
          </el-button>
        </el-col>
        <!--        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
      </el-row>

      <el-table v-loading="loading" :data="rebateRecordList" style="height: 500px;">
        <el-table-column label="返利编号" align="center" prop="number"/>
        <!--        <el-table-column label="托运人ID" align="center" prop="userId"/>-->
        <el-table-column label="券金额" align="center" prop="deductionMoney"/>
        <el-table-column label="返利类型" align="center" prop="type"/>
        <el-table-column label="使用场景" align="center" prop="scene"/>
        <el-table-column label="开始时间" align="center" prop="startTime" width="180"/>
        <el-table-column label="过期时间" align="center" prop="endTime" width="180"/>
        <el-table-column label="发放时间" align="center" prop="createTime" width="180"/>

        <el-table-column label="状态" align="center" prop="status"/>
        <el-table-column label="说明" align="center" prop="remark"/>
        <!--        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
        <!--          <template slot-scope="scope">-->
        <!--            -->
        <!--            <el-button-->
        <!--              size="mini"-->
        <!--              type="text"-->
        <!--              icon="el-icon-delete"-->
        <!--              @click="handleDelete(scope.row)"-->
        <!--              v-hasPermi="['consign:rebateRecord:remove']"-->
        <!--            >删除-->
        <!--            </el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="selectAccountDetails(null)"
      />


      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {exportRebateRecord, listRebateRecord, rebateAccountList} from "@/api/client/rebateRecord";

  export default {
    name: "RebateRecord",
    components: {},
    data() {
      return {
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
        startEndTime: '',


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
        // 返利发放记录表格数据
        rebateRecordList: [],

        //返利账户
        rebateAccountList: [],

        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          userId: null,
          type: null,
          scene: null,
          beginTimeChar: '',
          endTimeChar: ''

        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {}
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询返利发放记录列表 */
      getList() {
        this.loading = true;
        rebateAccountList().then(response => {
          if (response != null && response.code === 200) {
            this.rebateAccountList = response.data;
          }
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
          number: null,
          userId: null,
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        const startEndTime = this.startEndTime + '';

        if (startEndTime != null && startEndTime != 'null' && startEndTime != '' && startEndTime.length > 0) {
          const startEndTimeChar = startEndTime.split(',')[0];
          const endTimeChar = startEndTime.split(',')[1];

          this.queryParams.beginTimeChar = startEndTimeChar;
          this.queryParams.endTimeChar = endTimeChar;
        } else {
          this.queryParams.beginTimeChar = '';
          this.queryParams.endTimeChar = '';
        }

        this.selectAccountDetails(this.queryParams.userId);
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },


      /** 查询账户明细 */
      selectAccountDetails(userId) {
        this.reset();

        if (userId == undefined || userId == null || userId == '') {
          userId = this.queryParams.userId;
        }


        this.open = true;
        this.title = "返利发放明细";

        this.queryParams.userId = userId;

        this.loading = true;

        listRebateRecord(this.queryParams).then(response => {

          this.rebateRecordList = [];
          this.loading = false;
          if (response.code === 200) {
            this.rebateRecordList = response.rows;
            this.total = response.total;

          }
        });

      },


      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;

        this.download('/client/clientRebateRecord/export', {
          ...this.queryParams
        }, `details_${new Date().getTime()}.xlsx`)

      }
    }
  };
</script>
