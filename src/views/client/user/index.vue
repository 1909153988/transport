<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入用户昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="手机号码" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入手机号码"
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
          v-hasPermi="['consign:clientAccountUser:add']"
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
          v-hasPermi="['consign:clientAccountUser:edit']"
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
          v-hasPermi="['consign:clientAccountUser:remove']"
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
          v-hasPermi="['consign:clientAccountUser:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>

    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="用户ID" align="center" prop="userId"/>

      <el-table-column label="所属机构" align="center" prop="companyName"/>
      <el-table-column label="用户账号" align="center" prop="userName"/>
      <el-table-column label="用户昵称" align="center" prop="nickName"/>
      <el-table-column label="用户邮箱" align="center" prop="email"/>
      <el-table-column label="手机号码" align="center" prop="phonenumber"/>
      <el-table-column label="用户性别" align="center" prop="sex"/>
      <!--      <el-table-column label="头像地址" align="center" prop="avatar" />-->
      <el-table-column label="帐号状态" align="center" prop="status"/>

      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['consign:clientAccountUser:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['consign:clientAccountUser:remove']"
          >删除
          </el-button>


          <el-button type="text" plain icon="el-icon-edit" size="mini" @click="Assign(scope.row)"
                     v-hasPermi="['consign:clientAccountUser:roleList']">分配角色
          </el-button>
          <el-button type="text" plain icon="el-icon-edit" size="mini" @click="Jurisdiction(scope.row)"
                     v-hasPermi="['consign:clientAccountUser:menuList']">分配权限
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

    <!-- 添加或修改用户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!--        <el-form-item label="父账号ID" prop="parentId">-->
        <!--          <el-input v-model="form.parentId" placeholder="请输入父账号ID" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="公司ID" prop="companyId">-->
        <!--          <el-input v-model="form.companyId" placeholder="请输入公司ID" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="自定义角色ID" prop="roleId">-->
        <!--          <el-input v-model="form.roleId" placeholder="请输入自定义角色ID" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="部门ID 暂时无用" prop="deptId">-->
        <!--          <el-input v-model="form.deptId" placeholder="请输入部门ID 暂时无用" />-->
        <!--        </el-form-item>-->

        <template>
          <el-form-item label="所属公司机构" prop="companyValue">

            <el-select v-model.trim="companyValue" placeholder="请选择所属机构" style="width: 200px;">
              <el-option style="width: 200px"
                         v-for="item in companys"
                         :key="item.companyId"
                         :label="item.companyName"
                         :value="item.companyId">
                <span style="float: left">{{ item.companyName  }}</span>
                <!--              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.companyName}}</span>-->
              </el-option>
            </el-select>
          </el-form-item>
        </template>


        <el-form-item label="用户账号(用于登录)" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户账号"/>
        </el-form-item>

        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入用户姓名"/>
        </el-form-item>

        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入用户邮箱"/>
        </el-form-item>
        <el-form-item label="手机号码(用于登录)" prop="phonenumber">
          <el-input v-model="form.phonenumber" placeholder="请输入手机号码"/>
        </el-form-item>

        <el-form-item label="用户性别" prop="sex">
          <div>
            <el-radio v-model="form.sex" label="0" border>男</el-radio>
            <el-radio v-model="form.sex" label="1" border>女</el-radio>
          </div>
        </el-form-item>


        <el-form-item label="账号状态"   prop="status">
          <div>
            <el-radio style="color: blue" v-model="form.status" label="0" border>正常</el-radio>
            <el-radio style="color: red" v-model="form.status" label="1" border>停用</el-radio>
          </div>
        </el-form-item>


        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"/>
        </el-form-item>

        <el-form-item label="确认密码" prop="conPassword">
          <el-input v-model="form.conPassword" placeholder="请输入密码"/>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 分配角色对话框 -->
    <el-dialog :title="roleTitle" :visible.sync="roleOpen" label-width="600px" height="500px" append-to-body>
      <el-form ref="roleFormData" :model="roleFormData" :rules="rules" size="medium" label-width="100px">
        <el-col :span="15">
          <el-form-item label="选择角色" prop="field">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="roleHandleCheckAllChange">全选
            </el-checkbox>

            <el-checkbox-group v-model="roleFormData.field" size="medium" @change="roleHandleCheckedCitiesChange">
              <el-checkbox v-for="(item, index) in roleFieldOptions" :key="index" :label="item.roleId"
                           :disabled="item.disabled">{{item.roleName}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-hasPermi="['consign:clientAccountUser:roleList']" @click="submitUserRoleForm">确 定
        </el-button>
        <el-button @click="roleOpen = false">取 消</el-button>
      </div>
    </el-dialog>




    <!-- 分配权限菜单 -->

    <el-dialog :title="menuTitle" :visible.sync="menuOpen" width="90%" style="height:100%; " append-to-body :close-on-press-escape="false" :close-on-click-modal="false">
      <el-form ref="menuForm" :model="menuForm" :rules="rules" label-width="100px"    >
        <el-form-item label="菜单权限">
          <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox>
          <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">全选/全不选</el-checkbox>
          <el-checkbox v-model="menuForm.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">父子联动
          </el-checkbox>
          <el-tree
            :data="menuOptions"
            show-checkbox
            default-expand-all
            ref="menu"
            node-key="id"
            :check-strictly="!menuForm.menuCheckStrictly"
            empty-text="加载中，请稍后"
            :props="defaultProps"
            :expand-on-click-node="false"
            :highlight-current="true"
            :render-content="renderContent"
          ></el-tree>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" style="position:fixed;bottom:0px;  width: 80%">
        <el-button type="primary"   v-hasPermi="['consign:clientAccountUser:menuList']"  @click="submitUserMenuIdsForm">确 定</el-button>
        <el-button @click="menuOpen = false">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {
    addUser,
    clientCompanyList,
    delUser,
    exportUser,
    getAssign,
    getUser,
    listUser,
    updateUser,
    updateUserRoleID,
    roleMenuTreeselect,
    updateUserMenuID
  } from "@/api/client/user";

  export default {
    name: "User",
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
        // 用户信息表格数据
        userList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          parentId: null,
          companyId: null,
          userName: null,
          nickName: null,
          userType: null,
          email: null,
          phonenumber: null,
          sex: null,
          status: null,

        },
        // 表单参数
        form: {sex: '0',status:'0'},
        // 表单校验
        rules: {

          userName: [
            {required: true, message: "用户账号不能为空", trigger: "blur"}
          ],
          nickName: [
            {required: true, message: "用户姓名不能为空", trigger: "blur"}
          ],

          phonenumber: [
            {required: true, message: "手机号码不能为空", trigger: "blur"}
          ],
        },
        companyValue: null,
        companys: [],


        roleOpen: false, //分配角色弹出层
        roleTitle: "", //分配角色弹出层标题
        ////角色
        checkAll: false,
        isIndeterminate: false,
        //已勾选角色数据
        roleFormData: {
          field: []
        },
        //角色数据源
        roleFieldOptions: [],

        menuTitle:"",
        menuOpen:false,

        //分配权限的
        menuExpand: true,
        menuNodeAll: false,
        // 菜单列表
        menuOptions: [],
        menuForm: {
          menuIds: [],
          menuCheckStrictly: true

        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },

      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询用户信息列表 */
      getList() {
        this.loading = true;
        listUser(this.queryParams).then(response => {
          this.userList = response.rows;
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
          userId: null,
          parentId: null,
          companyId: null,
          roleId: null,
          deptId: null,
          userName: null,
          nickName: null,
          userType: null,
          email: null,
          phonenumber: null,
          sex: '0',
          avatar: null,
          password: "",
          conPassword: "",
          status: "0",
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
        this.ids = selection.map(item => item.userId)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },


      //查询机构
      getClientCompanyInfoList() {
        this.loading = true;
        clientCompanyList().then(response => {
          if (response != null) {

            if (response.code != null && response.code != undefined && response.code == 200) {
              if (response.data != null && response.data != undefined) {
                const dataList = response.data;
                this.companys = dataList;
              }

            }
          }
        });
        this.loading = false;
      },


      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.companyValue = null;
        this.getClientCompanyInfoList();
        this.open = true;
        this.title = "添加用户信息";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const userId = row.userId || this.ids
        getUser(userId).then(response => {
          this.form = response.data;
          this.getClientCompanyInfoList();
// alert( response.data.companyIdChar)
          this.companyValue = this.form.companyIdChar;
          this.open = true;
          this.title = "修改用户信息";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.form.companyId = this.companyValue;
            if (this.form.userId != null) {
              updateUser(this.form).then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addUser(this.form).then(response => {
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
        const userIds = row.userId || this.ids;
        this.$confirm('是否确认删除用户信息编号为"' + userIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delUser(userIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('/client/clientAccountUser/export', {
          ...this.companyParams
        }, `user_${new Date().getTime()}.xlsx`)

      },

      // -----------------------------------------------------------------分配角色  分配权限---------------------------------------------------------------------------------------------


      //分配角色
      Assign(row) {
        this.roleTitle = '分配角色'
        this.roleOpen = true;

        this.checkAll = false;
        this.isIndeterminate = false;
        this.roleFieldOptions = [];
        this.roleFormData.field = [];

        const userId = row.userId || this.ids;
        getAssign(userId).then(response => {
          if (response.code == 200) {
            this.roleFieldOptions = response.roles;
            this.roleFormData.field = response.roleIds;
            this.roleTitle = '分配角色';
            this.roleOpen = true;
            this.form.userId = userId;
            if (this.roleFieldOptions.length == this.roleFormData.field.length) {
              this.checkAll = true;
              this.isIndeterminate = false;

            } else if (this.roleFormData.field.length > 0) {

              this.checkAll = false;
              this.isIndeterminate = true;
            } else {

              this.checkAll = false;
              this.isIndeterminate = false;
            }
          } else {
            this.msgError("查询角色信息失败");

          }
        })

      },
      ////角色提交
      submitUserRoleForm() {
        this.$refs['roleFormData'].validate(valid => {
          if (valid) {
            if (this.form.userId != undefined) {
              let roleData = {
                userId: this.form.userId,
                roleIds: this.roleFormData.field
              }

              updateUserRoleID(roleData).then(response => {
                this.msgSuccess('更新成功')
                this.roleOpen = false
                this.getList()
              })

            } else {
              this.msgError('用户信息异常！')
            }
          } else {
            this.msgError('请完成必填项！')
          }
        })

      },
      // 角色权限全选
      roleHandleCheckAllChange(val) {
        this.roleFormData.field = []
        this.roleFieldOptions.forEach(item => {
          this.roleFormData.field.push(item.roleId)
        })
        this.roleFormData.field = val ? this.roleFormData.field : []
        this.isIndeterminate = false
      },
      ///角色单选事件
      roleHandleCheckedCitiesChange(value) {
        let checkedCount = value.length   //选中值的长度
        this.checkAll = checkedCount === this.roleFieldOptions.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleFieldOptions.length

      },


      // ------------------------------------------------------------------------------分配权限---------------------------------------------------------------
      //分配权限
      Jurisdiction(row) {
        this.menuTitle = '分配权限菜单'
        this.menuOpen = true
        const userId = row.userId || this.ids
        const roleId = row.roleId || this.ids
        const roleMenu = this.getRoleMenuTreeselect(row.userId)

        this.form.userId = userId
        this.form.roleId = roleId

        this.$nextTick(() => {
          roleMenu.then(res => {
            let checkedKeys = res.checkedKeys

            this.changeCss()///横向展开

            checkedKeys.forEach((v) => {
              this.$nextTick(() => {
                this.$refs.menu.setChecked(v, true, false)
              })
            })
          })
        })

      },

      /** 根据角色ID查询菜单树结构 */
      getRoleMenuTreeselect(roleId) {
        return roleMenuTreeselect(roleId).then(response => {
          this.menuOptions = response.menus
          return response
        })
      },


      // 树权限（展开/折叠）
      handleCheckedTreeExpand(value, type) {
        if (type == 'menu') {
          let treeList = this.menuOptions
          for (let i = 0; i < treeList.length; i++) {
            this.$refs.menu.store.nodesMap[treeList[i].id].expanded = value
          }
        }
      },
      // 树权限（全选/全不选）
      handleCheckedTreeNodeAll(value, type) {
        if (type == 'menu') {
          this.$refs.menu.setCheckedNodes(value ? this.menuOptions : [])
        }
      },
      // 树权限（父子联动）
      handleCheckedTreeConnect(value, type) {
        if (type == 'menu') {
          this.form.menuCheckStrictly = value ? true : false
        }
      },
      // 所有菜单节点数据
      getMenuAllCheckedKeys() {
        // 目前被选中的菜单节点
        let checkedKeys = this.$refs.menu.getCheckedKeys()
        // 半选中的菜单节点
        let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys()
        checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
        return checkedKeys
      },

      ////角色提交
      submitUserMenuIdsForm() {
        this.$refs['menuForm'].validate(valid => {
          if (valid) {
            if (this.form.userId != undefined) {
              this.menuForm.menuIds = this.getMenuAllCheckedKeys();///获取选择菜单ID

              let  menuData={
                roleId:this.form.roleId,
                menuIds:this.menuForm.menuIds
              };
              updateUserMenuID(menuData).then(response => {
                this.msgSuccess('更新成功')
                this.menuOpen = false;
                this.getList()
              })

            } else {
              this.msgError('用户信息异常！')
            }
          } else {
            this.msgError('请完成必填项！')
          }
        })

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
      }







    }
  };
</script>
