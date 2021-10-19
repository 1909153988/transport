<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="公司名称" prop="shipperFullName">
        <el-input
          v-model="queryParams.shipperFullName"
          placeholder="请输入公司名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="管理公司名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="管理公司名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="法定代表人" prop="legalPersonName">
        <el-input
          v-model="queryParams.legalPersonName"
          placeholder="请输入法定代表人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="公司联系人" prop="contactName">
        <el-input
          v-model="queryParams.contactName"
          placeholder="请输入公司联系人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="联系人手机号" prop="contactPhone">
        <el-input
          v-model="queryParams.contactPhone"
          placeholder="请输入联系人手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">

      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="primary"-->
      <!--          plain-->
      <!--          icon="el-icon-plus"-->
      <!--          size="mini"-->
      <!--          @click="handleAdd"-->
      <!--          v-hasPermi="['client:company:add']"-->
      <!--        >新增</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          plain-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--          v-hasPermi="['client:company:edit']"-->
      <!--        >修改</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          plain-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--          v-hasPermi="['client:company:remove']"-->
      <!--        >删除</el-button>-->
      <!--      </el-col>-->

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>


    <el-table v-loading="loading" :data="clientList">
      <!--      <el-table-column type="selection" width="55" align="center" />-->
      <el-table-column label="企业全称" align="center" prop="shipperFullName"/>
      <el-table-column label="企业简称" align="center" prop="shipperShortName"/>
      <el-table-column label="法定人" align="center" prop="legalPersonName"/>

      <el-table-column label="业务管理公司" align="center" prop="companyName"/>
      <el-table-column label="企业联系人" align="center" prop="contactName"/>
      <el-table-column label="企业联系人电话" align="center" prop="contactPhone"/>
      <el-table-column label="企业注册地址" align="center" prop="registerAddress"/>

      <el-table-column label="账户状态" align="center" prop="isValid"/>
      <el-table-column label="日限额" align="center" prop="dayQuota"/>
      <el-table-column label="月限额" align="center" prop="monthQuota"/>
      <el-table-column label="次数限制" align="center" prop="numberQuota"/>


      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-edit"-->
          <!--            @click="handleUpdate(scope.row)"-->
          <!--            v-hasPermi="['consign:company:edit']"-->
          <!--          >修改</el-button>-->
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-delete"-->
          <!--            @click="handleDelete(scope.row)"-->
          <!--            v-hasPermi="['consign:company:remove']"-->
          <!--          >删除</el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-select"
            @click="selectCompanyList(scope.row)"
            v-hasPermi="['consign:clientCompany:companyList']"
          >查看分支机构
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

    <!-- 查询分支机构列表-->
    <el-dialog :title="titleCompany" :visible.sync="openCompanyList" width="70%" append-to-body>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['consign:clientCompany:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['consign:clientCompany:export']"
        >导出</el-button>
      </el-col>
      <el-table v-loading="loading" :data="companyList" @selection-change="handleSelectionChange">
<!--        <el-table-column type="selection" width="55" align="center"/>-->
        <!--        <el-table-column label="托运人下公司信息表ID" align="center" prop="companyId"/>-->
        <!--        <el-table-column label="企业托运人用户ID" align="center" prop="userId"/>-->

        <el-table-column label="所属企业" align="center" prop="clientName"/>

        <el-table-column label="公司名称" align="center" prop="companyName"/>
        <el-table-column label="付款账户" align="center" prop="payAccount"/>
        <el-table-column label="企业联系人名称" align="center" prop="companyLinkmanName"/>
        <el-table-column label="企业联系人电话" align="center" prop="companyLinkmanPhone"/>
        <el-table-column label="企业联系地址" align="center" prop="companyAddress"/>
        <el-table-column label="备注" align="center" prop="companyRemark"/>
        <el-table-column label="日限额" align="center" prop="dayLimit"/>
        <el-table-column label="月限额" align="center" prop="monthLimit"/>
        <el-table-column label="次数限制" align="center" prop="countLimit"/>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['consign:clientCompany:edit']"
            >修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['consign:clientCompany:remove']"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="companyTotal>0"
        :total="companyTotal"
        :page.sync="companyParams.pageNum"
        :limit.sync="companyParams.pageSize"
        @pagination="getList"
      />

      <div slot="footer" class="dialog-footer">
        <!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
        <el-button @click="openCompanyList=false">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog :title="title" :visible.sync="open" width="65%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="所属企业" prop="userId">
          <el-input readonly disabled v-model="form.clientName" placeholder="所属企业"/>
        </el-form-item>


        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名称"/>
        </el-form-item>


        <el-form-item label="付款账户" prop="payAccount">
          <div>
            <el-radio v-model="form.payAccount" label="0" border>总公司</el-radio>
            <el-radio v-model="form.payAccount" label="1" border>本机构</el-radio>
          </div>
        </el-form-item>


        <el-form-item label="企业联系人名称" prop="companyLinkmanName">
          <el-input v-model="form.companyLinkmanName" placeholder="请输入企业联系人名称"/>
        </el-form-item>
        <el-form-item label="企业联系人电话" prop="companyLinkmanPhone">
          <el-input v-model="form.companyLinkmanPhone" placeholder="请输入企业联系人电话"/>
        </el-form-item>
        <el-form-item label="企业联系地址" prop="companyAddress">
          <el-input v-model="form.companyAddress" placeholder="请输入企业联系地址"/>
        </el-form-item>
        <el-form-item label="备注" prop="companyRemark">
          <el-input v-model="form.companyRemark" placeholder="请输入备注"/>
        </el-form-item>
        <el-form-item label="日限额" prop="dayLimit">
          <el-input v-model="form.dayLimit" placeholder="请输入日限额"/>
        </el-form-item>
        <el-form-item label="月限额" prop="monthLimit">
          <el-input v-model="form.monthLimit" placeholder="请输入月限额"/>
        </el-form-item>
        <el-form-item label="次数限制" prop="countLimit">
          <el-input v-model="form.countLimit" placeholder="请输入次数限制"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {
    addCompany,
    delCompany,
    exportCompany,
    getCompany,
    listClient,
    listCompany,
    updateCompany
  } from "@/api/client/company";

  export default {
    name: "Company",
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
        companyTotal: 0,
        // 企业托运人的分支机构 -公司信息表格数据
        companyList: [],


        clientList: [],

        // 弹出层标题
        title: "",
        titleCompany: "",
        // 是否显示弹出层
        open: false,
        openCompanyList: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          userId: null,
          shipperFullName: null,
          companyName: null,
          legalPersonName: null,
          contactName: null,
          contactPhone: null
        },
        companyParams: {
          userId: 0,
          pageSize: 10,
          pageNum: 1
        },
        // 表单参数
        form: {},
        formGet: {
          companyId: null,
          userId: null,
          clientName: null
        },
        // 表单校验
        rules: {
          userId: [
            {required: true, message: "企业托运人用户ID不能为空", trigger: "blur"}
          ],
          companyName: [
            {required: true, message: "公司名称不能为空", trigger: "blur"}
          ],
          payAccount: [
            {required: true, message: "付款账户", trigger: "blur"}
          ],
          companyLinkmanName: [
            {required: true, message: "企业联系人名称不能为空", trigger: "blur"}
          ],
          companyLinkmanPhone: [
            {required: true, message: "企业联系人电话不能为空", trigger: "blur"}
          ],
          companyAddress: [
            {required: true, message: "企业联系地址不能为空", trigger: "blur"}
          ],
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询企业托运人的分支机构 -公司信息列表 */
      getList() {

        listClient(this.queryParams).then(response => {
          this.clientList = response.rows;
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
          companyId: null,
          userId: null,
          clientName: null,

          companyName: null,
          payAccount: '0',
          companyLinkmanName: null,
          companyLinkmanPhone: null,
          companyAddress: null,
          companyRemark: null,
          dayLimit: null,
          monthLimit: null,
          countLimit: null

        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.companyId)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      //
      // forGet: {
      //   companyId: null,
      //   userId: null,
      //   clientName: null
      // }

      /** 查看企业分支机构 */
      selectCompanyList(row) {


        this.reset();

        this.formGet.clientName = row.shipperFullName;
        this.formGet.userId = row.userId;

        this.openCompanyList = true;
        this.titleCompany = "分支机构查询";
        this.loading = true;
        this.companyParams.userId = row.userId;

        this.getCompanyList();
      },

      getCompanyList(){
        listCompany(this.companyParams).then(response => {

          this.companyList = response.rows;
          this.companyTotal = response.total;
          this.loading = false;
        });
      },

      /** 新增按钮操作 */
      handleAdd() {

        this.reset();

        this.form.clientName = this.formGet.clientName;
        this.form.userId = this.formGet.userId;

        this.open = true;
        this.title = "添加企业托运人的分支机构 -公司信息";
      },


      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const companyId = row.companyId || this.ids;
        getCompany(companyId).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改企业托运人的分支机构 -公司信息";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {

            if (this.form.companyId != null) {
              updateCompany(this.form).then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getCompanyList();
              });
            } else {
              addCompany(this.form).then(response => {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getCompanyList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const companyIds = row.companyId || this.ids;
        this.$confirm('是否确认删除公司："' + row.companyName + '"?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delCompany(companyIds);
        }).then(() => {
          this.getCompanyList();
          this.msgSuccess("删除成功");
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.companyParams;

        this.download('/client/clientCompany/export', {
          ...this.companyParams
        }, `company_${new Date().getTime()}.xlsx`)


        //
        // this.$confirm('是否确认导出所有企业托运人的分支机构 -公司信息数据项?', "警告", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // }).then(function () {
        //   return exportCompany(queryParams);
        // }).then(response => {
        //   this.download(response.msg);
        // })
      }
    }
  };
</script>
