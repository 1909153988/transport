<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="140px">
      <!--        <el-form-item label="审核流程是否开启">-->
      <!--          <el-switch-->
      <!--            v-model="value"-->
      <!--            active-color="#13ce66"-->
      <!--            inactive-color="#ccc">-->
      <!--          </el-switch>-->
      <!--        </el-form-item>-->
      <div>
        <el-form-item label="审核流程配置">
          <el-tag
            v-bind:key="item.setId"
            class="mr10"
            v-for="(item,index) in approves"
            closable
            :disable-transitions="false"
            @close="handleClose(index)">
            {{item.auditName}}
          </el-tag>
          <el-button @click="getApprove" size="mini">+添加审批人</el-button>
        </el-form-item>
        <div class="" style="margin-top: 60px">
          <el-steps align-center>
            <el-step v-for="(item,index) in approves" v-bind:key="item.setId" :title="'第'+(index+1)+'步审批人'"
                     :description="item.auditName"></el-step>
          </el-steps>
        </div>
      </div>
    </el-form>

    <el-dialog
      title="选择审批人"
      :visible.sync="dialogVisible"
      width="30%"
    >

      <el-form ref="form" :model="form" >
<!--        <el-form-item label="选择处理人">-->
<!--          <el-input v-model="approve"></el-input>-->
<!--        </el-form-item>-->
        <template>
          <el-select v-model.trim="citiesValue" placeholder="请选择审批人"   style="width: 400px;">
            <el-option style="width: 300px"
              v-for="item in cities"
              :key="item.auditUserId"
              :label="item.auditName"
              :value="item.auditUserId">
              <span style="float: left">{{ item.auditName  }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.companyName}}</span>
            </el-option>
          </el-select>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitApprove()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getUserPayFlowSetList, getUserPayFlowSetUseUserList, payFlowSetRemove,payFlowSetAdd} from "@/api/paymentprocess/index";

  export default {

    data() {
      return {
        form: {},
        value: false,
        approves: [],
        dialogVisible: false,
        cities: [],
        citiesValue: ''
      };
    },
    mounted() {

      this.getList();
    },
    methods: {

      /**
       * 获取审批配置信息
       * */
      getList() {
        this.loading = true;

        this.approves = [{}];
        getUserPayFlowSetList(null).then(response => {

          if (response != null) {

            if (response.code != null && response.code != undefined && response.code == 200) {
              if (response.data != null && response.data != undefined) {
                const dataList = response.data;
                this.approves = dataList;
              }

            }

          }
          this.loading = false;
        });
      },


      /**
       * 点击添加审批人
       */
      getApprove() {
        this.dialogVisible = true;
        this.loading = true;

        getUserPayFlowSetUseUserList(null).then(response => {

          if (response != null) {

            if (response.code != null && response.code != undefined && response.code == 200) {
              if (response.data != null && response.data != undefined) {
                const dataList = response.data;
                this.cities=dataList;
                // alert(dataList.length)
              }

            }

          }
          this.loading = false;
        });


      },

      /**
       * 提交添加审批人
       *
        */
      submitApprove() {
       // alert(this.citiesValue)
        let auditUserId = this.citiesValue

        if(auditUserId==null || auditUserId=='' || auditUserId.length==0){
          this.msgError("请选择一个审批人");

        }else {
        payFlowSetAdd(auditUserId).then(response => {

          if (response.code != null && response.code != undefined && response.code == 200) {
            this.msgSuccess(response.msg);
            this.getList();
          } else {
            this.msgError("操作失败");
          }
            this.dialogVisible = false
          this.citiesValue='';
        });
        }
        // if (approve) {
        //   this.approves.push(approve)
        //   this.approve = '';
        // }
      },
      //del
      handleClose(i) {
        console.log(i);

        const auditName = this.approves[i].auditName;
        const setId = this.approves[i].setId;
        this.$confirm('是否确认取消审批人："' + auditName + '"?', "警告", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.msgSuccess(setId);

          payFlowSetRemove(setId).then(response => {

            if (response.code != null && response.code != undefined && response.code == 200) {
              this.msgSuccess(response.msg);
              this.approves.splice(i, 1)

            } else {
              this.msgError("操作失败");
            }
          });

        }).catch(() => {


        });
      }
    },
  };
</script>
