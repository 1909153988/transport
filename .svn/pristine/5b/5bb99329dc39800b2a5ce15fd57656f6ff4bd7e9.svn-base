<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first"></el-tab-pane>
      <el-tab-pane label="已处理" name="second"></el-tab-pane>
      <el-tab-pane label="未处理" name="third"></el-tab-pane>
    </el-tabs>
    <div style="margin-left:40px;margin-bottom:20px">
      <el-checkbox v-model="checked" style="margin-right:20px">全选</el-checkbox>
       <el-button size="small" type="primary" style="margin-right:20px" plain>批量删除</el-button>
      <el-date-picker
        class="mr10"
        size="small"
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button size="small" type="primary" plain>搜索</el-button>
    </div>

    <el-row v-if="activeName == 'first'">
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px">
            <el-checkbox v-model="checked">会员信息审核</el-checkbox>
            <div class="bottom clearfix">
              <div class="time">
                会员信息审核不通过，审核意见如下:暂未和平台签订合同
              </div>
            </div>
            <div class="bottom clearfix">
              <time class="time">2020-12-14 14:07:05</time>
              <el-button type="text" class="button">详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row v-else-if="activeName == 'second'">
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px">
            <el-checkbox v-model="checked">会员信息已处理审核</el-checkbox>
            <div class="bottom clearfix">
              <div class="time">
                会员信息审核不通过，审核意见如下:暂未和平台签订合同
              </div>
            </div>
            <div class="bottom clearfix">
              <time class="time">2020-12-14 14:07:05</time>
              <el-button type="text" class="button">详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row v-else>
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px">
            <el-checkbox v-model="checked">会员信息未处理审核</el-checkbox>
            <div class="bottom clearfix">
              <div class="time">
                会员信息审核不通过，审核意见如下:暂未和平台签订合同
              </div>
            </div>
            <div class="bottom clearfix">
              <time class="time">2020-12-14 14:07:05</time>
              <el-button type="text" class="button">详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "RuoyiUiIndex",
  data() {
    return {
      activeName: "first",
      currentDate: new Date(),
      checked: false,
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tabs {
  margin-left: 40px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-row {
  margin-left: 40px;
  margin-right: 40px;
}
</style>