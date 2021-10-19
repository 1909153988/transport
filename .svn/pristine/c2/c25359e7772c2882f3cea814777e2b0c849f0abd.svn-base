<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="车牌号" prop="vehicleNumber">
        <el-input
          v-model="queryParams.vehicleNumber"
          placeholder="请输入车牌号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="承运人手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="审核状态" prop="auditStatus" label-width="120px">
        <el-select
          v-model="queryParams.auditStatus"
          placeholder="状态"
          clearable
          size="small"
        >
          <el-option label="待审核" value="0" />
          <el-option label="审核中" value="1" />
          <el-option label="审核通过" value="2" />
          <el-option label="审核不通过" value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="道路运输证状态" prop="dlysState" label-width="120px">
        <el-select
          v-model="queryParams.dlysState"
          placeholder="状态"
          clearable
          size="small"
        >
          <el-option label="正常" value="0" />
          <el-option label="即将过期" value="1" />
          <el-option label="已过期" value="2" />
          <el-option label="审核失败" value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="行驶证状态" prop="licenseState" label-width="120px">
        <el-select
          v-model="queryParams.licenseState"
          placeholder="状态"
          clearable
          size="small"
        >
          <el-option label="正常" value="0" />
          <el-option label="即将过期" value="1" />
          <el-option label="已过期" value="2" />
          <el-option label="审核失败" value="3" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
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
          v-hasPermi="['archives:archivesVehicle:add']"
          >添加车辆
        </el-button>
      </el-col>
      <!-- <el-col :span="1.5">
              <el-button
                type="success"
                plain
                icon="el-icon-edit"
                size="mini"
                :disabled="single"
                @click="handleUpdate"
                v-hasPermi="['archives:archivesVehicle:edit']"
              >修改</el-button>
            </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['archives:archivesVehicle:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <FileUpload
          :url="importVehicleUrl"
          text="导入车辆"
          :isShowTip="false"
        ></FileUpload>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['transport:clientVehicleManage:exportYunliVehicle']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="archivesVehicleList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="车辆id" align="center" prop="vehicleId" />
      <!--      <el-table-column label="所属用户" align="center" prop="userId"/>-->
      <el-table-column label="车牌号" align="center" prop="vehicleNumber" />
      <!--      <el-table-column label="车辆颜色" align="center" prop="vehicleColor"/>-->
      <!--      <el-table-column label="外廓尺寸" align="center" prop="vehicleSize"/>-->
      <el-table-column label="车辆总质量类型" align="center" prop="qualityType">
        <template slot-scope="scope">
          <span v-if="scope.row.qualityType === '0'">12吨及以上</span>
          <span v-else-if="scope.row.qualityType === '1'">12吨以下</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <!--      0:12吨及以上 1:12吨以下-->
      <el-table-column
        label="货车入网状态"
        align="center"
        prop="freightAccessState"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.freightAccessState === '0'">已入网</span>
          <span v-else-if="scope.row.freightAccessState === '1'">未入网 </span>
          <span v-else-if="scope.row.freightAccessState === '2'"
            >无需检测(12吨以下)
          </span>
          <span v-else>未知</span>
        </template>
      </el-table-column>

      <!--      0已入网 1未入网 2无需检测(12吨以下)-->

      <el-table-column label="整备质量(吨位)" align="center" prop="tonnage" />
      <el-table-column label="核定载质量" align="center" prop="hzdQuality" />
      <el-table-column label="车辆分类" align="center" prop="vehicleType" />
      <el-table-column
        label="牌照类型"
        align="center"
        prop="vehicleNumberType"
      />
      <!--      大型汽车号牌/小型汽车号牌/其他号牌-->

      <el-table-column label="车辆所有人" align="center" prop="master" />
      <!--      <el-table-column label="车辆识别代号" align="center" prop="vehicleCode"/>-->
      <!--      <el-table-column label="车轴数(含悬浮轴)" align="center" prop="axleAmount"/>-->
      <!--      <el-table-column label="使用性质" align="center" prop="nature"/>-->
      <!--      <el-table-column label="能源类型" align="center" prop="energyType"/>-->
      <el-table-column
        label="车辆行驶证档案编号"
        align="center"
        prop="licenseNumber"
      />
      <el-table-column
        label="行驶证发证机关"
        align="center"
        prop="licenseAward"
      />
      <el-table-column
        label="行驶证注册日期"
        align="center"
        prop="licenseLoginTime"
        width="180"
      />
      <el-table-column
        label="行驶证发证日期"
        align="center"
        prop="licenseAwardTime"
        width="180"
      />
      <el-table-column
        label="行驶证到期日期"
        align="center"
        prop="licenseExpirationTime"
        width="180"
      />
      <el-table-column label="行驶证状态" align="center" prop="licenseState">
        <template slot-scope="scope">
          <span v-if="scope.row.licenseState === '0'">正常</span>
          <span v-else-if="scope.row.licenseState === '1'">即将过期</span>
          <span v-else-if="scope.row.licenseState === '2'">已过期</span>
          <span v-else-if="scope.row.licenseState === '3'">审核失败</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>

      <el-table-column
        label="道路运输证字号"
        align="center"
        prop="dlysNumber"
      />
      <el-table-column
        label="道路运输证到期日期"
        align="center"
        prop="dlysExpirationTime"
        width="180"
        
      />
      <el-table-column label="道路运输证状态" align="center" prop="dlysState">
        <template slot-scope="scope">
          <span v-if="scope.row.dlysState === '0'">正常</span>
          <span v-if="scope.row.dlysState === '1'">即将过期</span>
          <span v-else-if="scope.row.dlysState === '2'">已过期</span>
          <span v-else-if="scope.row.dlysState === '3'">审核失败</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column label="业户名称" align="center" prop="yhName" />
      <el-table-column label="业户类型" align="center" prop="yhType" />
      <el-table-column
        label="业户社会信用代码/身份证"
        align="center"
        prop="yhIdCard"
      />

      <el-table-column
        label="经营许可证号"
        align="center"
        prop="businessCertificate"
      />
      <el-table-column label="所属辖区" align="center" prop="belongingTo" />
      <el-table-column label="行驶证正页" align="center" prop="drivingFront">
        <template slot-scope="scope">
          <el-image
            :lazy="true"
            style="width: 80px; height: 80px"
            :src="(scope.row.drivingFront || '').split(',')[0]"
            :preview-src-list="(scope.row.drivingFront || '').split(',')"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="行驶证副页" align="center" prop="drivingReverse">
        <template slot-scope="scope">
          <el-image
            :lazy="true"
            style="width: 80px; height: 80px"
            :src="(scope.row.drivingReverse || '').split(',')[0]"
            :preview-src-list="(scope.row.drivingReverse || '').split(',')"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="最新年检记录" align="center" prop="annualRecord">
        <template slot-scope="scope">
          <el-image
            :lazy="true"
            style="width: 80px; height: 80px"
            :src="(scope.row.annualRecord || '').split(',')[0]"
            :preview-src-list="(scope.row.annualRecord || '').split(',')"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="道路运输证正页" align="center" prop="dlysFront">
        <template slot-scope="scope">
          <el-image
            :lazy="true"
            style="width: 80px; height: 80px"
            :src="(scope.row.dlysFront || '').split(',')[0]"
            :preview-src-list="(scope.row.dlysFront || '').split(',')"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="道路运输证副页" align="center" prop="dlysReverse">
        <template slot-scope="scope">
          <el-image
            :lazy="true"
            style="width: 80px; height: 80px"
            :src="(scope.row.dlysReverse || '').split(',')[0]"
            :preview-src-list="(scope.row.dlysReverse || '').split(',')"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="道路运输经营许可证"
        align="center"
        prop="dlysCertificate"
      >
        <template slot-scope="scope">
          <el-image
            :lazy="true"
            style="width: 80px; height: 80px"
            :src="(scope.row.dlysCertificate || '').split(',')[0]"
            :preview-src-list="(scope.row.dlysCertificate || '').split(',')"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="人车合照" align="center" prop="rchz">
        <template slot-scope="scope">
          <el-image
            :lazy="true"
            style="width: 80px; height: 80px"
            :src="(scope.row.rchz || '').split(',')[0]"
            :preview-src-list="(scope.row.rchz || '').split(',')"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" prop="auditStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.auditStatus == '0'">待审核</span>
          <span v-else-if="scope.row.auditStatus == '1'">审核通过</span>
          <span v-else-if="scope.row.auditStatus == '2'">审核不通过</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <!--      0：待审核；1：审核通过；2：审核不通过-->

      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        class-name="small-padding fixed-width"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['archives:archivesVehicle:edit']"
            >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['archives:archivesVehicle:remove']"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加档案-车辆对话框 -->
    <!-- <el-dialog
      :title="title"
      :visible.sync="openAdd"
      width="500px"
      append-to-body
    >
      <el-form label-width="80px">
        <el-form-item label="车牌号" prop="se_vehicleNumber">
          <el-input v-model="se_vehicleNumber" placeholder="请输入车牌号" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="se_submitForm">添加</el-button>
        <el-button @click="openAdd = false">取 消</el-button>
      </div>
    </el-dialog> -->

    <el-drawer
      v-loading.fullscreen.lock="openloading"
      element-loading-background="rgba(122, 109, 240, 0.8)"
      :title="title"
      :visible.sync="open"
      direction="ttb"
      :before-close="cancel"
      visible.sync="true"
      size="100%"
    >
      <div
        class="app-container"
        style="height: 900px; overflow-y: auto; padding-bottom: 200px"
      >
        <!-- 修改档案-车辆对话框 -->
        <!--    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>-->
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <div class="mb20">
            <!-- <el-divider direction="vertical"/> <span class="weight">基础信息</span> -->
            <el-divider content-position="left">车辆信息</el-divider>
          </div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="车牌号" prop="vehicleNumber">
                <el-input v-model="form.vehicleNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="车辆颜色"
                prop="vehicleColor"
                label-width="120px"
              >
                <el-select
                  v-model="form.vehicleColor"
                  placeholder="车辆颜色"
                  clearable
                  size="small"
                >
                  <el-option label="待审核" value="0" />
                  <el-option label="审核中" value="1" />
                  <el-option label="审核通过" value="2" />
                  <el-option label="审核不通过" value="3" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="外廓尺寸(mm)" prop="vehicleSize">
                <el-input v-model="form.vehicleSize"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item
                label="车辆总质量类型"
                prop="qualityType"
                label-width="120px"
              >
                <el-select
                  v-model="form.qualityType"
                  placeholder="车辆总质量类型"
                  clearable
                  size="small"
                >
                  <el-option label="待审核" value="0" />
                  <el-option label="审核中" value="1" />
                  <el-option label="审核通过" value="2" />
                  <el-option label="审核不通过" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="整备质量(kg)" prop="tonnage">
                <el-input v-model="form.tonnage"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="核定载质量(kg)" prop="hzdQuality">
                <el-input v-model="form.hzdQuality"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="车辆分类"
                prop="vehicleType"
                label-width="120px"
              >
                <el-select
                  v-model="form.vehicleType"
                  placeholder="车辆分类"
                  clearable
                  size="small"
                >
                  <el-option label="待审核" value="0" />
                  <el-option label="审核中" value="1" />
                  <el-option label="审核通过" value="2" />
                  <el-option label="审核不通过" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="牌照类型"
                prop="vehicleNumberType"
                label-width="120px"
              >
                <el-select
                  v-model="form.vehicleNumberType"
                  placeholder="牌照类型"
                  clearable
                  size="small"
                >
                  <el-option label="待审核" value="0" />
                  <el-option label="审核中" value="1" />
                  <el-option label="审核通过" value="2" />
                  <el-option label="审核不通过" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="车辆所有人" prop="master">
                <el-input v-model="form.master"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="车辆识别代码" prop="vehicleCode">
                <el-input v-model="form.vehicleCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="车轴数(含悬浮轴)" prop="axleAmount">
                <el-input v-model="form.axleAmount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="使用性质" prop="nature">
                <el-input v-model="form.nature"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="能源类型"
                prop="energyType"
                label-width="120px"
              >
                <el-select
                  v-model="form.energyType"
                  placeholder="能源类型"
                  clearable
                  size="small"
                >
                  <el-option label="待审核" value="0" />
                  <el-option label="审核中" value="1" />
                  <el-option label="审核通过" value="2" />
                  <el-option label="审核不通过" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="mb20">
            <el-divider content-position="left">证照信息</el-divider>
            <!-- <el-divider direction="vertical"/> <span class="weight">证照信息</span> -->
          </div>

          <el-row>
            <el-col :span="6">
              <el-form-item label="车辆行驶证档案编号" prop="licenseNumber">
                <el-input v-model="form.licenseNumber"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="行驶证发证机关" prop="licenseAward">
                <el-input v-model="form.licenseAward"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="车辆行驶证注册日期" prop="licenseLoginTime">
                <el-date-picker
                  v-model="form.licenseLoginTime"
                  type="date"
                  placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

        
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="行驶证发证日期" prop="licenseAwardTime">
                <el-date-picker
                  v-model="form.licenseAwardTime"
                  type="date"
                  placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="行驶证到期日期" prop="licenseExpirationTime">
                <el-date-picker
                  v-model="form.licenseExpirationTime"
                  type="date"
                  placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="道路运输证字号" prop="dlysNumber">
                <el-input v-model="form.dlysNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="道路运输证到期日期"
                prop="dlysExpirationTime"
              >
                <el-date-picker
                  v-model="form.dlysExpirationTime"
                  type="date"
                  placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="mb20">
            <!-- <el-divider direction="vertical"/> <span class="weight">业户信息</span> -->
            <el-divider content-position="left">业户信息</el-divider>
          </div>

          <el-row>
            <el-col :span="6">
              <el-form-item label="业户名称" prop="yhName">
                <el-input v-model="form.yhName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业户类型" prop="yhType" label-width="120px">
                <el-select
                  v-model="form.yhType"
                  placeholder="业户类型"
                  clearable
                  size="small"
                >
                  <el-option label="待审核" value="0" />
                  <el-option label="审核中" value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!-- <el-form-item label="业户社会信用代码 / 身份证" prop="companyName">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item> -->
              <el-form-item label="经营许可证号" prop="businessCertificate">
                <el-input v-model="form.businessCertificate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属辖区" prop="belongingTo">
                <el-input v-model="form.belongingTo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="mb20">
            <!-- <el-divider direction="vertical"/> <span class="weight">证件照片列表</span> -->
            <el-divider content-position="left">证件照片列表</el-divider>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="行驶证正页"
                  label-width="200px"
                  prop="drivingFront"
                >
                  <ImageUpload v-model="form.drivingFront"></ImageUpload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="行驶证副页"
                  label-width="200px"
                  prop="drivingReverse"
                >
                  <ImageUpload v-model="form.drivingReverse"></ImageUpload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="最新年检记录"
                  label-width="200px"
                  prop="annualRecord"
                >
                  <ImageUpload v-model="form.annualRecord"></ImageUpload>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="道路运输证正页"
                  label-width="200px"
                  prop="dlysFront"
                >
                  <ImageUpload v-model="form.dlysFront"></ImageUpload>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="道路运输证副页"
                  label-width="200px"
                  prop="dlysReverse"
                >
                  <ImageUpload v-model="form.dlysReverse"></ImageUpload>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="道路运输经营许可证"
                  label-width="200px"
                  prop="dlysCertificate"
                >
                  <ImageUpload v-model="form.dlysCertificate"></ImageUpload>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="人车合照" label-width="200px" prop="rchz">
                  <ImageUpload v-model="form.rchz"></ImageUpload>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div style="margin-top: 20px">
            <el-form-item label="审核结果" prop="auditStatus">
              <el-radio-group v-model="form.auditStatus" size="small">
                <el-radio label="0" border>待审核</el-radio>
                <el-radio label="1" border>审核通过</el-radio>
                <el-radio label="2" border>审核不通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
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
  addArchivesVehicle,
  delArchivesVehicle,
  getArchivesVehicle,
  selectArchivesVehicleNo,
  listArchivesVehicle,
  updateArchivesVehicle,
} from "@/api/archives/archivesVehicle";
import FileUpload from "@/components/FileUpload/index";
import ImageUpload from "@/components/ImageUpload/index";

import Pagination from "../../../components/Pagination/index";

export default {
  name: "ArchivesVehicle",
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
      // 档案-车辆表格数据
      archivesVehicleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层 编辑车辆
      open: false,
      // 是否显示弹出层 添加车辆
      openAdd: false,

      se_vehicleNumber: "",
      importVehicleUrl: "/transport/clientVehicleManage/importYunliVehicle",

      openloading: true,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        vehicleColor: null,
        vehicleSize: null,
        qualityType: null,
        freightAccessState: null,
        tonnage: null,
        beginTime: "",
        endTime: "",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        vehicleColor: [
          { required: true, message: "车辆颜色不能为空", trigger: "blur" },
        ],
        vehicleSize: [
          { required: true, message: "外廓尺寸不能为空", trigger: "blur" },
        ],
        qualityType: [
          {
            required: true,
            message: "车辆总质量类型  0:12吨及以上 1:12吨以下不能为空",
            trigger: "change",
          },
        ],
        tonnage: [
          {
            required: true,
            message: "整备质量(吨位)不能为空",
            trigger: "blur",
          },
        ],
        hzdQuality: [
          { required: true, message: "核定载质量不能为空", trigger: "blur" },
        ],
        vehicleType: [
          { required: true, message: "车辆分类不能为空", trigger: "change" },
        ],
        vehicleNumberType: [
          {
            required: true,
            message: "牌照类型大型汽车号牌/小型汽车号牌/其他号牌不能为空",
            trigger: "change",
          },
        ],
        master: [
          { required: true, message: "车辆所有人不能为空", trigger: "blur" },
        ],
        energyType: [
          { required: true, message: "能源类型不能为空", trigger: "change" },
        ],
        licenseAward: [
          {
            required: true,
            message: "行驶证发证机关不能为空",
            trigger: "blur",
          },
        ],
        licenseLoginTime: [
          {
            required: true,
            message: "行驶证注册日期不能为空",
            trigger: "blur",
          },
        ],
        licenseAwardTime: [
          {
            required: true,
            message: "行驶证发证日期不能为空",
            trigger: "blur",
          },
        ],
        dlysNumber: [
          {
            required: true,
            message: "道路运输证字号不能为空",
            trigger: "blur",
          },
        ],
        dlysExpirationTime: [
          {
            required: true,
            message: "道路运输证到期日期不能为空",
            trigger: "blur",
          },
        ],
        yhName: [
          { required: true, message: "业户名称不能为空", trigger: "blur" },
        ],
        yhType: [
          { required: true, message: "业户类型不能为空", trigger: "change" },
        ],
        businessCertificate: [
          { required: true, message: "经营许可证号不能为空", trigger: "blur" },
        ],
        belongingTo: [
          { required: true, message: "所属辖区不能为空", trigger: "blur" },
        ],
        drivingFront: [
          { required: true, message: "行驶证正页不能为空", trigger: "blur" },
        ],
        drivingReverse: [
          { required: true, message: "行驶证副页不能为空", trigger: "blur" },
        ],
        isDelete: [
          {
            required: true,
            message: "是否删除 0未删除 1删除不能为空",
            trigger: "blur",
          },
        ],
      },

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      startEndTime: "",
    };
  },
  created() {
    this.getList();
  },
  components: {
    FileUpload,
    ImageUpload,
  },
  methods: {
    /** 查询档案-车辆列表 */
    getList() {
      this.loading = true;
      listArchivesVehicle(this.queryParams).then((response) => {
        console.log(response);
        this.archivesVehicleList = response.rows;
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
        vehicleId: null,
        userId: null,
        vehicleNumber: null,
        vehicleColor: null, //车辆颜色
        vehicleSize: null,
        qualityType: null,
        freightAccessState: null,
        tonnage: null,
        hzdQuality: null,
        vehicleType: null,
        vehicleNumberType: null,
        master: null,
        vehicleCode: null, //车辆识别代号
        axleAmount: null,
        nature: null,
        energyType: null,
        licenseNumber: null,
        licenseAward: null,
        licenseLoginTime: null,
        licenseAwardTime: null,
        licenseExpirationTime: null,
        licenseState: null,
        dlysNumber: null,
        dlysExpirationTime: null,
        dlysState: null,
        yhName: null,
        yhType: null,
        yhIdCard: null,
        businessCertificate: null,
        belongingTo: null,
        drivingFront: null,
        drivingReverse: null,
        annualRecord: null,
        dlysFront: null,
        dlysReverse: null,
        dlysCertificate: null,
        rchz: null,
        auditStatus: 0,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        deleteBy: null,
        deleteTime: null,
        isDelete: null,
        userId: "",  //所属用户
        dlysFront: "", //道路运输证正页
        licenseNumber: "", //车辆行驶证档案编号
        updateBy: "", //更新人
        vehicleNumber: "", //车牌号
        vehicleNumberType: "", //牌照类型


      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      const startEndTime = this.startEndTime + "";

      if (
        startEndTime != null &&
        startEndTime != "null" &&
        startEndTime != "" &&
        startEndTime.length > 0
      ) {
        const startEndTimeChar = startEndTime.split(",")[0];
        const endTimeChar = startEndTime.split(",")[1];

        this.queryParams.beginTime = startEndTimeChar;
        this.queryParams.endTime = endTimeChar;
      } else {
        this.queryParams.beginTime = "";
        this.queryParams.endTime = "";
      }

      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.startEndTime = "";
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.vehicleId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },

    //搜索新增 车辆
    /** 新增按钮操作 */
    handleAdd() {
      // this.se_vehicleNumber = "";
      this.reset();
      this.open = true;
      this.title = "添加档案-车辆";
    },

    // se_submitForm() {
    //   //搜索车辆 添加
    //   // alert(1)
    //   const vehicleNumber = this.se_vehicleNumber;
    //   selectArchivesVehicleNo(vehicleNumber).then((response) => {
    //     console.log(response);
    //     alert(1);
    //   });
    // },

    /** 修改按钮操作 */
    handleUpdate(row) {
      console.log(row);
      this.open = true;
      this.openloading=false;
      this.reset();
      const vehicleId = row.vehicleId || this.ids;
      //vehicleId
      this.form = {
        vehicleId: row.vehicleId,
        userId: row.userId, //所属用户
        vehicleNumber: row.vehicleNumber,
        vehicleColor: row.vehicleColor, //车辆颜色
        vehicleSize: row.vehicleSize,
        qualityType: row.qualityType,
        freightAccessState: row.freightAccessState,
        tonnage: row.tonnage,
        hzdQuality: row.hzdQuality,
        vehicleType: row.supplierportal,
        vehicleNumberType: row.vehicleNumberType,
        master: row.master,
        vehicleCode: row.vehicleCode, //车辆识别代号
        axleAmount: row.axleAmount,
        nature: row.nature,
        energyType: row.energyType,
        licenseNumber: row.licenseNumber,
        licenseAward: row.licenseAward,
        licenseLoginTime: row.licenseLoginTime,
        licenseAwardTime: row.licenseAwardTime,
        licenseExpirationTime: row.licenseExpirationTime ,
        licenseState: row.licenseState,
        dlysNumber: row.dlysNumber,
        dlysExpirationTime: row.dlysExpirationTime,
        dlysState: row.dlysState,
        yhName: row.yhName,
        yhType: row.yhType,
        yhIdCard: row.yhIdCard,
        businessCertificate: row.businessCertificate,
        belongingTo: row.belongingTo,
        drivingFront: row.drivingFront,
        drivingReverse: row.drivingReverse,
        annualRecord: row.annualRecord,
        dlysFront: row.dlysFront,
        dlysReverse: row.dlysReverse,
        dlysCertificate: row.dlysCertificate,
        rchz: row.rchz,
        auditStatus: row.auditStatus,
        createBy: row.createBy,
        createTime: row.createTime,
        updateBy: row.updateBy,
        updateTime: row.updateTime,
        deleteBy: row.deleteBy,
        deleteTime: row.deleteTime,
        isDelete: row.isDelete,
        dlysFront: row.dlysFront, //道路运输证正页
        licenseNumber: row.licenseNumber, //车辆行驶证档案编号
        updateBy: row.updateBy, //更新人
        vehicleNumber: row.vehicleNumber, //车牌号
        vehicleNumberType: row.vehicleNumberType, //牌照类型
      }
      getArchivesVehicle(this.form).then((response) => {
        // this.form = response.data;
        // this.open = true;
        // this.openloading = false;
        // this.title = "修改档案-车辆";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {


        if (valid) {
          if (this.form.vehicleId != null) {
            updateArchivesVehicle(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            alert("新增");
            //时间格式转换
            addArchivesVehicle(this.form).then((response) => {
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
      const vehicleIds = row.vehicleId || this.ids;
      this.$confirm(
        '是否确认删除档案-车辆编号为"' + vehicleIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delArchivesVehicle(vehicleIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },

    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.download(
        "/transport/clientVehicleManage/exportYunliVehicle",
        {
          ...this.queryParams,
        },
        `exportYunliVehicle_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
