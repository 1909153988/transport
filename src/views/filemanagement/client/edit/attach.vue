<template>
  <div class="app-container">
    <div class="mb20">
      <el-button
        size="small"
        type="primary"
        plain
        @click="dialogFormVisible = true"
        >上传附件</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="date" label="文件名"></el-table-column>
      <el-table-column prop="date" label="文件类型"></el-table-column>
      <el-table-column prop="date" label="描述信息"></el-table-column>
      <el-table-column prop="date" label="操作人"></el-table-column>
      <el-table-column prop="date" label="操作时间"></el-table-column>
      <el-table-column prop="date" label="操作" fixed="right" width="200px">
        <template slot-scope="data">
          <span class="operate mr10" @click="goEdit">查看</span>
          <span class="operate mr10">删除</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新建附件" :visible.sync="dialogFormVisible" style="width：80%">
      <el-form :model="form">
        <el-form-item label="文件类型" required :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述说明" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            type="textarea"
            :rows="5"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item required label="上传附件" :label-width="formLabelWidth">
          <ImageUpload></ImageUpload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImageUpload from "../../../../components/ImageUpload/index";
export default {
  data() {
    return {
      time: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  components: {
    ImageUpload,
  },
  methods: {
    goEdit() {},
    goAdd() {},
  },
};
</script>

<style scoped>
</style>
