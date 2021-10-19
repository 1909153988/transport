<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="收款人姓名" prop="kaihuName" label-width="120px">
        <el-input
          v-model="queryParams.kaihuName"
          placeholder="请输入收款人姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行卡卡号" prop="accountBank" label-width="120px">
        <el-input
          v-model="queryParams.accountBank"
          placeholder="请输入银行卡卡号"
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['transport:clientPayeeManage:add']"
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
          v-hasPermi="['transport:clientPayeeManage:edit']"
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
          v-hasPermi="['transport:clientPayeeManage:remove']"
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
          v-hasPermi="['transport:clientPayeeManage:export']"
        >导出
        </el-button>
      </el-col>

      <el-col :span="1.5">

        <FileUpload :url="importPayeeUrl" text="导入" :isShowTip="false"></FileUpload>
      </el-col>


      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="archivesPayeeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="主键id" align="center" prop="id"/>
      <el-table-column label="收款人审核状态" align="center" prop="payeeState"/>
      <!--      0审核通过 1审核中 2审核通过-->

      <el-table-column label="不通过理由" align="center" prop="notGoCause"/>
      <!--      <el-table-column label="收款人id" align="center" prop="payeeId" />-->
      <el-table-column label="所属用户" align="center" prop="userId"/>
      <el-table-column label="开户人姓名" align="center" prop="kaihuName"/>
      <el-table-column label="银行卡号" align="center" prop="accountBank"/>
      <el-table-column label="银行卡状态" align="center" prop="accountBankState"/>
      <!--      0正常 1即将过期 2已过期 3审核失败-->
      <el-table-column label="身份证号" align="center" prop="idCardNumber"/>
      <el-table-column label="身份证状态" align="center" prop="idCardState"/>
      <!--      0正常 1即将过期 2已过期 3审核失败-->


      <el-table-column label="开户银行" align="center" prop="kaihuBank"/>
      <el-table-column label="行号" align="center" prop="bankNo"/>
      <el-table-column label="他行标志" align="center" prop="othBankFlag"/>
      <!--      0-农行 1-他行-->

      <el-table-column label="收款人电话" align="center" prop="payeePhone"/>

      <el-table-column label="操作" align="center"  fixed="right" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['transport:clientPayeeManage:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['transport:clientPayeeManage:remove']"
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

    <!-- 添加或修改收款人档案对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">


        <el-form-item label="开户人姓名" prop="kaihuName">
          <el-input v-model="form.kaihuName" placeholder="请输入开户人姓名"/>
        </el-form-item>
        <el-form-item label="银行卡号" prop="accountBank">
          <el-input v-model="form.accountBank" placeholder="请输入银行卡号"/>
        </el-form-item>

        <el-form-item label="身份证号" prop="idCardNumber">
          <el-input v-model="form.idCardNumber" placeholder="请输入身份证号"/>
        </el-form-item>

        <el-form-item label="开户银行" prop="kaihuBank">
          <el-input v-model="form.kaihuBank" placeholder="请输入开户银行"/>
        </el-form-item>
        <el-form-item label="行号" prop="bankNo">
          <el-input v-model="form.bankNo" placeholder="请输入行号"/>
        </el-form-item>

        <el-form-item label="他行标志" prop="othBankFlag">
          <div>


            <el-radio-group v-model="form.othBankFlag" >
              <el-radio label="0" border>农行</el-radio>
              <el-radio label="1" border>他行</el-radio>
            </el-radio-group>
          </div>




        </el-form-item>


        <el-form-item label="收款人电话" prop="payeePhone">
          <el-input v-model="form.payeePhone" placeholder="请输入收款人电话"/>
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
    addArchivesPayee,
    delArchivesPayee,
    getArchivesPayee,
    listArchivesPayee,
    updateArchivesPayee
  } from "@/api/archives/archivesPayee";
  import FileUpload from "@/components/FileUpload/index";

  export default {
    name: "ArchivesPayee",
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
        // 收款人档案表格数据
        archivesPayeeList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          kaihuName: null,
          accountBank: null,

        },
        // 表单参数
        form: {othBankFlag:"1"},
        // 表单校验
        rules: {
          userId: [
            {required: true, message: "所属用户不能为空", trigger: "blur"}
          ],
          kaihuName: [
            {required: true, message: "开户人姓名不能为空", trigger: "blur"}
          ],
          accountBank: [
            {required: true, message: "银行卡号不能为空", trigger: "blur"}
          ],
          idCardNumber: [
            {required: true, message: "身份证号不能为空", trigger: "blur"}
          ],
          kaihuBank: [
            {required: true, message: "开户银行不能为空", trigger: "blur"}
          ],
        },

        importPayeeUrl: '/transport/clientPayeeManage/importClientPayee',

      };
    },
    created() {
      this.getList();
    },
    components: {
      FileUpload
    },
    methods: {
      /** 查询收款人档案列表 */
      getList() {
        this.loading = true;
        listArchivesPayee(this.queryParams).then(response => {
          this.archivesPayeeList = response.rows;
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
          id: null,
          payeeState: null,
          notGoCause: null,
          payeeId: null,
          userId: null,
          kaihuName: null,
          accountBank: null,
          accountBankState: null,
          idCardNumber: null,
          idCardState: null,
          kaihuBank: null,
          bankNo: null,
          othBankFlag: "1",
          payeePhone: null,
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
        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();

        this.open = true;
        this.title = "添加收款人档案";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getArchivesPayee(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改收款人档案";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateArchivesPayee(this.form).then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addArchivesPayee(this.form).then(response => {
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
        const ids = row.id || this.ids;
        this.$confirm('是否确认删除收款人档案编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delArchivesPayee(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;

        this.download('/transport/clientPayeeManage/exportClientPayee', {
          ...this.queryParams
        }, `exportClientPayee_${new Date().getTime()}.xlsx`)


      }

    }
  };
</script>
