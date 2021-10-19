<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" inline>
      <div class="mb20">
        <el-divider direction="vertical" /> <span class="weight">基本信息</span>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="船东姓名" prop="companyName">
            <el-input v-model="form.companyName"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="注册手机" prop="companyName">
            <el-input v-model="form.companyName"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="身份证号码" prop="companyName">
            <el-input v-model="form.companyName"></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="身份有效期" prop="companyName">
            <el-input v-model="form.companyName"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="发证机关" prop="companyName">
            <el-input v-model="form.companyName"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="身份证地址" prop="companyName">
            <el-input v-model="form.companyName"></el-input> </el-form-item
        ></el-col>
      </el-row>

      <div class="mb20">
        <el-divider direction="vertical" /> <span class="weight">证件信息</span>
      </div>

      <el-form-item label="身份证人像面" prop="companyName">
        <ImageUpload></ImageUpload>
      </el-form-item>
      <el-form-item label="身份证国徽面" prop="companyName">
        <ImageUpload></ImageUpload>
      </el-form-item>

      <div>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
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
      },
      urls: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      ],
      url:
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
      carList: [],
      payeeList: [],
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
    addCar() {},
    addPayee() {},
    getImg(url) {
      this.url = url;
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

.imgBox {
  width: 220px;
  height: 400px;
  overflow: auto;
}

.showBox {
  height: 400px;
  min-width: 600px;
  width: 60%;
}

/*.showBox .el-image__inner {*/
/*  width: auto;*/
/*  height: 360px;*/
/*}*/

.imgs {
  width: 200px;
}
</style>
