<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

<!--      <el-form-item label="用户id" prop="shipUserId">-->
<!--        <el-input-->
<!--          v-model="queryParams.shipUserId"-->
<!--          placeholder="请输入用户id"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->

      <el-form-item label="回单状态" prop="answerStatus" label-width="120px">
        <el-select v-model="queryParams.answerStatus" placeholder="状态" clearable size="small">
          <el-option label="未回收" value="1"/>
          <el-option label="已回收" value="2"/>
          <el-option label="已发放" value="3"/>
        </el-select>
      </el-form-item>


      <el-form-item label="运单号" prop="carriageId">
        <el-input
          v-model="queryParams.carriageId"
          placeholder="请输入运单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="托运日期" prop="startEndTime" label-width="120px">
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

      </el-col>



      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="transportShipList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="carriageShipId" />
      <el-table-column label="回单状态" align="center" prop="answerStatus" />

      <el-table-column label="快递单号" align="center" prop="courierNumber" />
      <el-table-column label="运单号" align="center" prop="carriageId" />
      <el-table-column label="托运日期" align="center" prop="shipDate" width="180">
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.shipDate, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="货物名" align="center" prop="goodsName" />
      <el-table-column label="始发地" align="center" prop="deliverContactsAddress" />
      <el-table-column label="目的地" align="center" prop="takeContactsAddress" />
      <el-table-column label="客户名称" align="center" prop="clientName" />
      <el-table-column label="发货联系人" align="center" prop="deliverContacts" />
      <el-table-column label="发货联系人电话" align="center" prop="deliverContactsPhone" />
      <el-table-column label="承运司机" align="center" prop="chauffeur" />
      <el-table-column label="司机电话" align="center" prop="chauffeurPhone" />
      <el-table-column label="收货联系人" align="center" prop="takeContacts" />
      <el-table-column label="收货联系人电话" align="center" prop="takeContactsName" />
      <el-table-column label="附件" align="center" prop="accessory" />

      <el-table-column label="备注信息" align="center" prop="remake" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['waybill:carriageShip:getCourierNumber']"
          >修改</el-button>

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

    <!-- 添加或修改运单中心_回单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" label-width="80px">


        <el-form-item label="快递单号" prop="courierNumber">
          <el-input v-model="form.courierNumber" placeholder="快递单号" />
        </el-form-item>

        <el-form-item label="附件" prop="accessory">
          <ImageUpload v-model="form.accessory"></ImageUpload>
        </el-form-item>


        <el-form-item label="备注" prop="remake">
          <el-input v-model="form.remake" placeholder="备注" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm"             v-hasPermi="['waybill:carriageShip:courierNumber']">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ImageUpload from '@/components/ImageUpload/index'
  import { listTransportShip, getTransportShip, delTransportShip, addTransportShip, updateTransportShip, exportTransportShip } from "@/api/waybill/transportShip";

  export default {
    name: "TransportShip",
    components: {
    },
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
        // 运单中心_回单表格数据
        transportShipList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          answerStatus: null,
          carriageId: null,

          startTime: '',
          endTime: ''
        },

        startEndTime: '',

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
        form: {carriageId:null},
        // 表单校验
      };
    },
    components: {
      ImageUpload
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询运单中心_回单列表 */
      getList() {
        this.loading = true;
        listTransportShip(this.queryParams).then(response => {
          this.transportShipList = response.rows;
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
          carriageShipId: null,
          carriageId:null,
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

          this.queryParams.startTime = startEndTimeChar;
          this.queryParams.endTime = endTimeChar;
        } else {
          this.queryParams.startTime = '';
          this.queryParams.endTime = '';
        }


        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.carriageShipId)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },

      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const carriageId = row.carriageId;

        getTransportShip(carriageId).then(response => {
          if(response!=null){
            this.form = response;
            this.form.carriageId=carriageId;
            this.open = true;
            this.title = "修改运单中心_回单";
          }else {
            this.msgError("查询失败");

          }

        }).catch(response => {
          this.msgError(response);


        });
      },
      /** 提交按钮 */
      submitForm() {


        updateTransportShip(this.form).then(response => {
          this.msgSuccess("修改成功");
          this.open = false;
          this.getList();
        });


      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;

      }
    }
  };
</script>
