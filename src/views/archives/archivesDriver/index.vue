<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入注册手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="审核状态" prop="auditStatus" label-width="120px">
        <el-select v-model="queryParams.auditStatus" placeholder="状态" clearable size="small">
          <el-option label="待审核" value="0"/>
          <el-option label="审核中" value="1"/>
          <el-option label="审核通过" value="2"/>
          <el-option label="审核不通过" value="3"/>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证状态" prop="idCardState" label-width="120px">
        <el-select v-model="queryParams.idCardState" placeholder="状态" clearable size="small">
          <el-option label="即将过期" value="1"/>
          <el-option label="已过期" value="2"/>
          <el-option label="审核失败" value="3"/>
        </el-select>
      </el-form-item>

      <el-form-item label="驾驶证状态" prop="drivingState" label-width="120px">
        <el-select v-model="queryParams.drivingState" placeholder="状态" clearable size="small">
          <el-option label="正常" value="0"/>
          <el-option label="即将过期" value="1"/>
          <el-option label="已过期" value="2"/>
          <el-option label="审核失败" value="3"/>
        </el-select>
      </el-form-item>
      <el-form-item label="从业资格证状态" prop="certificateState" label-width="120px">
        <el-select v-model="queryParams.certificateState" placeholder="状态" clearable size="small">
          <el-option label="正常" value="0"/>
          <el-option label="即将过期" value="1"/>
          <el-option label="已过期" value="2"/>
          <el-option label="审核失败" value="3"/>
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间" prop="startEndTime" label-width="120px">
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['archives:archivesDriver:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['archives:archivesDriver:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['archives:archivesDriver:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['archives:archivesDriver:export']"
        >导出
        </el-button>
      </el-col>

      <el-col :span="1.5">

        <FileUpload :url="importDriverUrl" text="导入司机" :isShowTip="false"></FileUpload>
      </el-col>


      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="archivesDriverList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="司机的id" align="center" prop="chauffeurId"/>
      <!--      <el-table-column label="所属用户" align="center" prop="userId" />-->
      <el-table-column label="姓名" align="center" prop="name"/>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{scope.row.sex==='0'?'女':'男'}}
        </template>
      </el-table-column>
      <el-table-column label="注册手机号" align="center" prop="phone"/>
      <el-table-column label="身份证号码" align="center" prop="idCardNumber"/>
      <el-table-column label="身份证地址" align="center" prop="idCardAddress"/>

      <el-table-column label="身份证状态" align="center" prop="idCardLongEff">
        <template slot-scope="scope">
          <span v-if="scope.row.idCardLongEff==='0'">是</span>
          <span v-else-if="scope.row.idCardLongEff==='1'">否</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证头像页" align="center" prop="idCardPerson"/>
      <el-table-column label="身份证国徽面" align="center" prop="idCardBadge"/>
      <el-table-column label="身份证状态" align="center" prop="idCardState">
        <template slot-scope="scope">
          <span v-if="scope.row.idCardState==='1'">即将过期</span>
          <span v-else-if="scope.row.idCardState==='2'">已过期</span>
          <span v-else-if="scope.row.idCardState==='3'">审核失败</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column label="驾驶证号" align="center" prop="drivingNumber"/>

      <el-table-column label="驾驶证副页" align="center" prop="drivingBadge"/>
      <el-table-column label="驾驶证正页" align="center" prop="drivingPerson"/>
      <el-table-column label="驾驶员从业资格证" align="center" prop="cyCertificate"/>
      <el-table-column label="驾驶证状态" align="center" prop="drivingState">
        <template slot-scope="scope">
          <span v-if="scope.row.drivingState==='0'">正常</span>
          <span v-if="scope.row.drivingState==='1'">即将过期</span>
          <span v-else-if="scope.row.drivingState==='2'">已过期</span>
          <span v-else-if="scope.row.drivingState==='3'">审核失败</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <!--      0正常 1即将过期 2已过期 3审核失败-->
      <el-table-column label="从业资格证号" align="center" prop="qualifiedNumber"/>

      <el-table-column label="从业资格证状态" align="center" prop="certificateState">
        <template slot-scope="scope">
          <span v-if="scope.row.certificateState==='0'">正常</span>
          <span v-if="scope.row.certificateState==='1'">即将过期</span>
          <span v-else-if="scope.row.certificateState==='2'">已过期</span>
          <span v-else-if="scope.row.certificateState==='3'">审核失败</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>

      <el-table-column label="关联车辆" align="center" prop="vehicleNumber"/>
      <el-table-column label="关联收款人" align="center" prop="driverId"/>
      <el-table-column label="审核状态" align="center" prop="auditStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.auditStatus==='0'">待审核</span>
          <span v-if="scope.row.auditStatus==='1'">审核中</span>
          <span v-else-if="scope.row.auditStatus==='2'">审核通过</span>
          <span v-else-if="scope.row.auditStatus==='3'">审核不通过</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>

      <el-table-column label="审核方式" align="center" prop="auditType"/>
      <el-table-column label="不通过理由" align="center" prop="notGoCause"/>
      <el-table-column label="创建人" align="center" prop="createBy"/>
      <el-table-column label="创建日期" align="center" prop="createTime"/>


      <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['archives:archivesDriver:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['archives:archivesDriver:remove']"
          >删除
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

    <!-- 添加档案-车辆对话框 -->
    <el-dialog :title="title" :visible.sync="openAdd" width="500px" append-to-body>

      <el-form label-width="120px">

        <el-form-item label="司机手机号" prop="se_phone">
          <el-input v-model="se_phone" placeholder="请输入司机手机号"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="se_submitForm">搜索</el-button>
        <el-button @click="openAdd=false">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 修改运力中心-司机对话框 -->
    <!--    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>-->

    <el-drawer
      v-loading.fullscreen.lock="openloading"
      element-loading-background="rgba(122, 109, 240, 0.8)"

      :title="title"
      :visible.sync="open"
      direction="ttb"
      :before-close="cancel"
      visible.sync="true"
      size="100%">
      <div class="app-container" style="height: 900px;overflow-y:auto; padding-bottom:200px;">


        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="所属用户" prop="userId">
            <el-input v-model="form.userId" placeholder="请输入所属用户"/>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"/>
          </el-form-item>
          <el-form-item label="性别 0女 1男" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别 0女 1男">
              <el-option label="0" value="女"/>
              <el-option label="1" value="男"/>
            </el-select>
          </el-form-item>
          <el-form-item label="注册手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入注册手机号"/>
          </el-form-item>
          <el-form-item label="身份证号码" prop="idCardNumber">
            <el-input v-model="form.idCardNumber" placeholder="请输入身份证号码"/>
          </el-form-item>
          <el-form-item label="身份证地址" prop="idCardAddress">
            <el-input v-model="form.idCardAddress" placeholder="请输入身份证地址"/>
          </el-form-item>
          <el-form-item label="身份证签发机关" prop="idCardOffice">
            <el-input v-model="form.idCardOffice" placeholder="请输入身份证签发机关"/>
          </el-form-item>
          <el-form-item label="身份证有效期开始时间" prop="idCardPeriodStartTime">
            <el-date-picker clearable size="small"
                            v-model="form.idCardPeriodStartTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择身份证有效期开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="身份证有效期截止日期" prop="idCardPeriodEndTime">
            <el-date-picker clearable size="small"
                            v-model="form.idCardPeriodEndTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择身份证有效期截止日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="身份证是否长期有效 0长期有效 1非长期有效" prop="idCardLongEff">
            <el-input v-model="form.idCardLongEff" placeholder="请输入身份证是否长期有效 0长期有效 1非长期有效"/>
          </el-form-item>
          <el-form-item label="身份证头像页" prop="idCardPerson">
            <el-input v-model="form.idCardPerson" placeholder="请输入身份证头像页"/>
          </el-form-item>
          <el-form-item label="身份证国徽面" prop="idCardBadge">
            <el-input v-model="form.idCardBadge" placeholder="请输入身份证国徽面"/>
          </el-form-item>
          <el-form-item label="身份证状态  0正常 1即将过期 2已过期 3审核失败" prop="idCardState">
            <el-input v-model="form.idCardState" placeholder="请输入身份证状态  0正常 1即将过期 2已过期 3审核失败"/>
          </el-form-item>
          <el-form-item label="驾驶证号" prop="drivingNumber">
            <el-input v-model="form.drivingNumber" placeholder="请输入驾驶证号"/>
          </el-form-item>
          <el-form-item label="档案号(副页)" prop="fnNumber">
            <el-input v-model="form.fnNumber" placeholder="请输入档案号(副页)"/>
          </el-form-item>
          <el-form-item label="准驾车型" prop="vehicleType">
            <el-select v-model="form.vehicleType" placeholder="请选择准驾车型">
              <el-option label="请选择字典生成" value=""/>
            </el-select>
          </el-form-item>
          <el-form-item label="驾驶证有效期开始日期" prop="drivingStartTime">
            <el-date-picker clearable size="small"
                            v-model="form.drivingStartTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择驾驶证有效期开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="驾驶证有效期截止日期" prop="drivingEndTime">
            <el-date-picker clearable size="small"
                            v-model="form.drivingEndTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择驾驶证有效期截止日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="驾驶证副页" prop="drivingBadge">
            <el-input v-model="form.drivingBadge" placeholder="请输入驾驶证副页"/>
          </el-form-item>
          <el-form-item label="驾驶证正页" prop="drivingPerson">
            <el-input v-model="form.drivingPerson" placeholder="请输入驾驶证正页"/>
          </el-form-item>
          <el-form-item label="驾驶员从业资格证" prop="cyCertificate">
            <el-input v-model="form.cyCertificate" placeholder="请输入驾驶员从业资格证"/>
          </el-form-item>
          <el-form-item label="驾驶证状态 0正常 1即将过期 2已过期 3审核失败" prop="drivingState">
            <el-input v-model="form.drivingState" placeholder="请输入驾驶证状态 0正常 1即将过期 2已过期 3审核失败"/>
          </el-form-item>
          <el-form-item label="从业资格证号" prop="qualifiedNumber">
            <el-input v-model="form.qualifiedNumber" placeholder="请输入从业资格证号"/>
          </el-form-item>
          <el-form-item label="从业资格证有效期开始日期" prop="qualifiedPeriodStartTime">
            <el-date-picker clearable size="small"
                            v-model="form.qualifiedPeriodStartTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择从业资格证有效期开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="从业资格证有效期截止日期" prop="qualifiedPeriodEndTime">
            <el-date-picker clearable size="small"
                            v-model="form.qualifiedPeriodEndTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择从业资格证有效期截止日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="省行政区划代码" prop="provinceCode">
            <el-input v-model="form.provinceCode" placeholder="请输入省行政区划代码"/>
          </el-form-item>
          <el-form-item label="从业资格证状态  0正常 1即将过期 2已过期 3审核失败" prop="certificateState">
            <el-input v-model="form.certificateState" placeholder="请输入从业资格证状态  0正常 1即将过期 2已过期 3审核失败"/>
          </el-form-item>
          <el-form-item label="关联车辆" prop="vehicleNumber">
            <el-input v-model="form.vehicleNumber" placeholder="请输入关联车辆"/>
          </el-form-item>
          <el-form-item label="关联收款人" prop="driverId">
            <el-input v-model="form.driverId" placeholder="请输入关联收款人"/>
          </el-form-item>
          <el-form-item label="审核状态 0:待审核 1:审核中 2:审核通过 3:审核不通过">
            <el-radio-group v-model="form.auditStatus">
              <el-radio label="1">请选择字典生成</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核方式" prop="auditType">
            <el-select v-model="form.auditType" placeholder="请选择审核方式">
              <el-option label="请选择字典生成" value=""/>
            </el-select>
          </el-form-item>
          <el-form-item label="不通过理由" prop="notGoCause">
            <el-input v-model="form.notGoCause" placeholder="请输入不通过理由"/>
          </el-form-item>
          <el-form-item label="删除人" prop="deleteBy">
            <el-input v-model="form.deleteBy" placeholder="请输入删除人"/>
          </el-form-item>
          <el-form-item label="删除时间" prop="deleteTime">
            <el-date-picker clearable size="small"
                            v-model="form.deleteTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择删除时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否删除 0未删除 1删除" prop="isDelete">
            <el-input v-model="form.isDelete" placeholder="请输入是否删除 0未删除 1删除"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </div>


    </el-drawer>
  </div>
</template>

<script>
  import {
    addArchivesDriver,
    delArchivesDriver,
    getArchivesDriver,
    listArchivesDriver,
    updateArchivesDriver
  } from "@/api/archives/archivesDriver";
  import FileUpload from "@/components/FileUpload/index";

  export default {
    name: "ArchivesDriver",
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
        // 运力中心-司机表格数据
        archivesDriverList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层 添加
        openAdd: false,
        // 是否显示弹出层 编辑
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          userId: null,
          name: null,
          sex: null,
          phone: null,
          beginTime: '',
          endTime: ''

        },
        importDriverUrl: '/transport/driverManage/importDriver',

        se_phone: '',
        // 表单参数
        form: {


        },
        // 表单校验
        rules: {
          phone: [
            {required: true, message: "注册手机号不能为空", trigger: "blur"}
          ],
          auditStatus: [
            {required: true, message: "审核状态 0:待审核 1:审核中 2:审核通过 3:审核不通过不能为空", trigger: "blur"}
          ],
        },
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



      };
    },
    created() {
      this.getList();
    },
    components: {
      FileUpload
    },
    methods: {
      /** 查询运力中心-司机列表 */
      getList() {
        this.loading = true;
        listArchivesDriver(this.queryParams).then(response => {
          this.archivesDriverList = response.rows;
          console.log(this.archivesDriverList)
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
          chauffeurId: null,
          userId: null,
          name: null,
          sex: null,
          phone: null,
          idCardNumber: null,
          idCardAddress: null,
          idCardOffice: null,
          idCardPeriodStartTime: null,
          idCardPeriodEndTime: null,
          idCardLongEff: null,
          idCardPerson: null,
          idCardBadge: null,
          idCardState: null,
          drivingNumber: null,
          fnNumber: null,
          vehicleType: null,
          drivingStartTime: null,
          drivingEndTime: null,
          drivingBadge: null,
          drivingPerson: null,
          cyCertificate: null,
          drivingState: null,
          qualifiedNumber: null,
          qualifiedPeriodStartTime: null,
          qualifiedPeriodEndTime: null,
          provinceCode: null,
          certificateState: null,
          vehicleNumber: null,
          driverId: null,
          auditStatus: 0,
          auditType: null,
          notGoCause: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          deleteBy: null,
          deleteTime: null,
          isDelete: null
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

          this.queryParams.beginTime = startEndTimeChar;
          this.queryParams.endTime = endTimeChar;
        } else {
          this.queryParams.beginTime = '';
          this.queryParams.endTime = '';
        }

        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.startEndTime='';

        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.chauffeurId)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        // this.reset();
        this.se_phone = '';

        this.openAdd = true;
        this.title = "添加运力中心-司机";
      },


      se_submitForm() {
        //搜索司机 添加
        alert(1)
        const phone = this.se_phone;
        // selectArchivesVehicleNo(vehicleNumber).then(response => {
        //   console.log(response);
        //   alert(1);
        // });
      },


      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const chauffeurId = row.chauffeurId || this.ids
        alert(chauffeurId)
        getArchivesDriver(chauffeurId).then(response => {
          console.log(response)
          this.form = response.data;
          this.open = true;
          this.title = "修改运力中心-司机";
        });
      },


      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.chauffeurId != null) {
              updateArchivesDriver(this.form).then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addArchivesDriver(this.form).then(response => {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const chauffeurIds = row.chauffeurId || this.ids;
        this.$confirm('是否确认删除运力中心-司机编号为"' + chauffeurIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delArchivesDriver(chauffeurIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.download('/transport/driverManage/exportDriver', {
          ...this.queryParams
        }, `exportDriver_${new Date().getTime()}.xlsx`)

      }
    }
  };
</script>
