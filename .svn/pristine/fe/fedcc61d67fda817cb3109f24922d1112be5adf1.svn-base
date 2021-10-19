<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名称"
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
          v-hasPermi="['client:clientUserRoleInfo:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['client:clientUserRoleInfo:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['client:clientUserRoleInfo:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['client:clientUserRoleInfo:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="clientUserRoleInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="角色ID" align="center" prop="roleId" />-->
      <el-table-column label="所属用户ID" align="center" prop="userId" />
      <el-table-column label="角色名称" align="center" prop="roleName" />
<!--      <el-table-column label="角色权限字符串" align="center" prop="roleKey" />-->
      <el-table-column label="显示顺序" align="center" prop="roleSort" />

      <el-table-column label="角色状态" align="center" prop="status" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['client:clientUserRoleInfo:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['client:clientUserRoleInfo:remove']"
          >删除</el-button>
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

    <!-- 添加或修改角色信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="90%" style="height:95%;"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" :close-on-press-escape="false" :close-on-click-modal="false">

        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
<!--        <el-form-item label="角色权限字符串" prop="roleKey">-->
<!--          <el-input v-model="form.roleKey" placeholder="请输入角色权限字符串" />-->
<!--        </el-form-item>-->
        <el-form-item label="显示顺序" prop="roleSort">
          <el-input v-model="form.roleSort" placeholder="请输入显示顺序" />
        </el-form-item>

        <el-form-item label="菜单权限">
          <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox>
          <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">全选/全不选</el-checkbox>
          <el-checkbox v-model="menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">父子联动</el-checkbox>
          <el-tree
            class="tree-border"
            :data="menuOptions"
            show-checkbox
            ref="menu"
            node-key="id"
            :check-strictly="!menuCheckStrictly"
            empty-text="加载中，请稍后"
            :props="defaultProps"
            :expand-on-click-node="false"
            :highlight-current="true"
            :render-content="renderContent"
            default-expand-all
          ></el-tree>

        </el-form-item>


        <el-form-item label="角色状态" prop="status">
          <!--          <el-input v-model="form.payAccount" placeholder="请输入付款账户 0总公司，1本公司"/>-->
          <div>
            <el-radio v-model="form.status" label="0" border>正常</el-radio>
            <el-radio v-model="form.status" label="1" border>停用</el-radio>
          </div>
        </el-form-item>
<!--       -->
<!--        <el-form-item label="菜单树选择项是否关联显示" prop="menuCheckStrictly">-->
<!--          <el-input v-model="form.menuCheckStrictly" placeholder="请输入菜单树选择项是否关联显示" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="部门树选择项是否关联显示" prop="deptCheckStrictly">-->
<!--          <el-input v-model="form.deptCheckStrictly" placeholder="请输入部门树选择项是否关联显示" />-->
<!--        </el-form-item>-->

        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listClientUserRoleInfo, getClientUserRoleInfo, delClientUserRoleInfo,
  addClientUserRoleInfo, updateClientUserRoleInfo, exportClientUserRoleInfo ,
  treeselect as menuTreeselect} from "@/api/client/clientUserRoleInfo";

export default {
  name: "ClientUserRoleInfo",
  components: {
  },
  data() {
    return {
      //菜单选择
      menuExpand: false,
      menuNodeAll: false,
      menuCheckStrictly: true,
      // 菜单列表
      menuOptions: [],

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
      // 角色信息表格数据
      clientUserRoleInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: null
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        // roleKey: [
        //   { required: true, message: "角色权限字符串不能为空", trigger: "blur" }
        // ],
        roleSort: [
          { required: true, message: "显示顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询角色信息列表 */
    getList() {
      this.loading = true;
      listClientUserRoleInfo(this.queryParams).then(response => {
        this.clientUserRoleInfoList = response.rows;
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
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.menuExpand = false,
      this.menuNodeAll = false,
      this.form = {
        roleId: null,
        userId: null,
        roleName: null,
        roleKey: null,
        roleSort: null,
        menuIds: [],
        status: "0",
        delFlag: null,
        remark: null
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
      this.ids = selection.map(item => item.roleId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.getMenuTreeselect();

      this.open = true;
      this.title = "添加角色信息";
    },



    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },



    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getMenuTreeselect();

      const roleId = row.roleId || this.ids
      getClientUserRoleInfo(roleId).then(response => {
        this.form = response.data;
        const roleMenu=response;

         this.$nextTick(() => {
              let checkedKeys = roleMenu.checkedKeys;
              this.changeCss()///横向展开
              checkedKeys.forEach((v) => {
                this.$nextTick(()=>{
                  this.$refs.menu.setChecked(v, true ,false);
                })
              })
           });

         this.menuExpand=true;
        this.open = true;
        this.title = "修改角色信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.roleId != undefined && this.form.roleId != null  ) {

            this.form.menuIds = this.getMenuAllCheckedKeys();

            updateClientUserRoleInfo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.form.menuIds = this.getMenuAllCheckedKeys();

            addClientUserRoleInfo(this.form).then(response => {
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
      const roleIds = row.roleId || this.ids;
      this.$confirm('是否确认删除角色信息编号为"' + roleIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delClientUserRoleInfo(roleIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.download('/client/clientUserRoleInfo/export', {
        ...this.queryParams
      }, `user_role_${new Date().getTime()}.xlsx`)

      //
      // this.$confirm('是否确认导出所有角色信息数据项?', "警告", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   }).then(function() {
      //     return exportClientUserRoleInfo(queryParams);
      //   }).then(response => {
      //     this.download(response.msg);
      //   })
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 查询菜单树结构 */
    getMenuTreeselect() {
      menuTreeselect().then(response => {
        this.menuOptions = response.data;

      });
    },




    // 树权限（展开/折叠）
    handleCheckedTreeExpand(value, type) {
      if (type == 'menu') {
        let treeList = this.menuOptions;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.menu.store.nodesMap[treeList[i].id].expanded = value;
        }
      }
    },
    // 树权限（全选/全不选）
    handleCheckedTreeNodeAll(value, type) {
      if (type == 'menu') {
        this.$refs.menu.setCheckedNodes(value ? this.menuOptions: []);
      }
    },
    // 树权限（父子联动）
    handleCheckedTreeConnect(value, type) {
      if (type == 'menu') {
        this.menuCheckStrictly = value ? true: false;
      }
    },
    //tree树形菜单权限
    renderContent(h, { node, data, store }) {
      let classname = ''
      // 由于项目中有三级菜单也有四级级菜单，就要在此做出判断
      if (node.level === 1) {
        classname = 'custom-tree-one'
      } else if (node.level === 2) {
        classname = 'custom-tree-two'
      } else if (node.level === 3) {
        classname = 'custom-tree-three'
      } else if (node.level === 4 && node.childNodes.length === 0) {
        classname = 'custom-tree-four'
      }

      return h(
        'p',
        {
          class: classname
        },
        node.label
      )
    },
    ////菜单展开样式
    changeCss() {
      var levelName_one = document.getElementsByClassName('custom-tree-one') // levelname是上面的最底层节点的名字
      for (var i = 0; i < levelName_one.length; i++) {
        // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
        // levelName_one[i].parentNode.style.cssFloat = "left"; // 最底层的节点，包括多选框和名字都让他左浮动
        levelName_one[i].parentNode.style.styleFloat = 'left'
        levelName_one[i].parentNode.style.styleFloat = 'left'
        levelName_one[i].parentNode.style.color = '#000000'
        levelName_one[i].parentNode.style.fontSize = '18px'
        // levelName_one[i].parentNode.style.backgroundColor = '#999999'

      }
      var levelName_two = document.getElementsByClassName('custom-tree-two') // levelname是上面的最底层节点的名字
      for (var i = 0; i < levelName_two.length; i++) {
        // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
        // levelName_two[i].parentNode.style.cssFloat = "left"; // 最底层的节点，包括多选框和名字都让他左浮动
        levelName_two[i].parentNode.style.styleFloat = 'left'
        levelName_two[i].parentNode.style.styleFloat = 'left'
        levelName_two[i].parentNode.style.color = 'blue'
        levelName_two[i].parentNode.style.fontSize = '16px'
        levelName_two[i].parentNode.style.marginTop = '10px'
        // levelName_two[i].parentNode.style.borderTop = 'solid 1px red'

      }

      var levelName_three = document.getElementsByClassName('custom-tree-three') // levelname是上面的最底层节点的名字
      for (var i = 0; i < levelName_three.length; i++) {
        // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
        levelName_three[i].parentNode.style.cssFloat = 'left' // 最底层的节点，包括多选框和名字都让他左浮动
        levelName_three[i].parentNode.style.styleFloat = 'left'
        levelName_three[i].parentNode.style.styleFloat = 'left'
        levelName_three[i].parentNode.style.color = '#1e6620'
        levelName_three[i].parentNode.style.fontSize = '16px'

      }

      var levelName_four = document.getElementsByClassName('custom-tree-four') // levelname是上面的最底层节点的名字
      for (var i = 0; i < levelName_four.length; i++) {
        // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
        // levelName_four[i].parentNode.style.cssFloat = "left"; // 最底层的节点，包括多选框和名字都让他左浮动
        levelName_four[i].parentNode.style.styleFloat = 'left'
        levelName_four[i].parentNode.style.styleFloat = 'left'
        levelName_four[i].parentNode.style.color = '#1e6620'
        levelName_four[i].parentNode.style.fontSize = '16px'

      }

    },
  }
};
</script>
