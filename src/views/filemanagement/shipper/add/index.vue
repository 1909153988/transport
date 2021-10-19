<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" inline>
      <!-- <el-form-item label="身份信息">
        <el-radio-group v-model="form.name">
          <el-radio :label="3">企业</el-radio>
          <el-radio :label="6">个人/经纪人</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <div class="mb20">
        <!-- <el-divider direction="vertical" /> <span class="weight">基本信息</span> -->
        <el-divider content-position="left">基本信息</el-divider>
      </div>

      <el-row>
        <el-form-item label="所属船东" prop="companyName">
          <el-select size="small mr5" :value="form.master">
            <el-option value="" label="船舶名称"></el-option>
            <el-option value="1" label="已停用"></el-option>
            <el-option value="1" label="待审核"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="船舶名称" prop="companyName">
            <el-input v-model="form.ship"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="MMSI(9位码)" prop="companyName">
            <el-input v-model="form.mmsi"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="船舶类型" prop="companyName">
            <el-select size="small mr5" :value="form.shipType">
              <el-option value="" label="船舶名称"></el-option>
              <el-option value="1" label="已停用"></el-option>
              <el-option value="1" label="待审核"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="载货吨(吨)" prop="companyName">
            <el-input v-model="form.tonnage"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="船舶属性" prop="shipProperty">
            <el-checkbox-group v-model="form.shipProperty" style="margin-left: 160px">
              <el-checkbox :value="0" label="有封舱"></el-checkbox>
              <el-checkbox :value="1" label="前驾驶"></el-checkbox>
              <el-checkbox :value="2" label="后驾驶"></el-checkbox>
              <el-checkbox :value="3" label="马钢水尺"></el-checkbox>
              <el-checkbox :value="4" label="武钢水尺"></el-checkbox>
              <el-checkbox :value="5" label="有隔舱"></el-checkbox>
              <el-checkbox :value="6" label="有横梁"></el-checkbox>
              <el-checkbox :value="7" label="有打孔"></el-checkbox>
              <el-checkbox :value="8" label="可自卸"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="mb20">
        <!-- <el-divider direction="vertical" /> <span class="weight">详细信息</span> -->
        <el-divider content-position="left">详细信息</el-divider>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="船长(米)" prop="companyName">
            <el-input v-model="form.longs"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="船宽(米）" prop="companyName">
            <el-input v-model="form.wide"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="满载吃水(米）" prop="companyName">
            <el-input v-model="form.mzcs"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="船籍港" prop="companyName">
            <el-input v-model="form.registry"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="mb20">
        <!-- <el-divider direction="vertical" /> <span class="weight">证件信息</span> -->
        <el-divider content-position="left">详细信息</el-divider>

      </div>
      <el-row>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%">
            上传船舶所有权证 含封面前三页（或国籍证两页）
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="50%">
            上传船舶营运证 （含年审合格证共三张）
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%" prop="">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%">
            上传船舶所有人身份证（请保证图片清晰完整）
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%" prop="">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%"> 上传船AIS证书 </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%">
            上传船舶产权协议
          </el-form-item></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%" prop="">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%">
            上传产权协议签订人身份证
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: center">
          <el-form-item label-width="50%" prop="">
            <ImageUpload></ImageUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('form')" plain
          >保存</el-button
          >
          <el-button  @click="submitForm('form')" plain
          >取消</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from "../../../../components/ImageUpload/index";

export default {
  data() {
    return {
      form: {
        name: [],
        shipProperty:[]
      },
      rules: {
        companyName: [{ required: true, message: "不能为空" }],
      },
    };
  },
  components: {
    ImageUpload,
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.el-divider--vertical {
  width: 5px;
  height: 1.5em;
  background-color: #1890ff;
}
</style>
