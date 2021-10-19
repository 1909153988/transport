import Vue from "vue";

import Cookies from "js-cookie";

import Element from "element-ui";
import "./assets/styles/element-variables.scss";

import "@/assets/styles/index.scss"; // global css
import "@/assets/styles/ruoyi.scss"; // ruoyi css
import App from "./App";
import store from "./store";
import router from "./router";
import permission from './directive/permission'
import { download } from "@/utils/request";
import "@/assets/styles/jusheng.scss";
import "./assets/icons"; // icon
import "./permission"; // permission control

import {
    parseTime,
    resetForm,
    addDateRange,
    selectDictLabel,
    selectDictLabels,
    handleTree
} from "@/utils/ruoyi";
import Pagination from "@/components/Pagination";
// 自定义表格工具扩展
import RightToolbar from "@/components/RightToolbar";
// import echarts from 'echarts'
// 引入基本模板
// let echarts = require("echarts/lib/echarts");
// // 引入柱状图组件
// require("echarts/lib/chart/bar");
// // 引入提示框和title组件
// require("echarts/lib/component/grid");
// require("echarts/lib/chart/bar");

import echarts from 'echarts'

import { pcaa } from 'area-data-vue';
import "@/assets/styles/arealistindex.css"; // global css
import AreaLinkageVue from 'area-linkage-vue';
Vue.prototype.$echarts = echarts;
Vue.prototype.$pcaa = pcaa;

Vue.use(AreaLinkageVue)


// 全局方法挂载

Vue.prototype.parseTime = parseTime;
Vue.prototype.resetForm = resetForm;
Vue.prototype.addDateRange = addDateRange;
Vue.prototype.selectDictLabel = selectDictLabel;
Vue.prototype.selectDictLabels = selectDictLabels;
Vue.prototype.download = download;
Vue.prototype.handleTree = handleTree;
Vue.prototype.$echarts = echarts;
Vue.prototype.msgSuccess = function(msg) {
    this.$message({ showClose: true, message: msg, type: "success" });
};

Vue.prototype.msgError = function(msg) {
    this.$message({ showClose: true, message: msg, type: "error" });
};

Vue.prototype.msgInfo = function(msg) {
    this.$message.info(msg);
};

// 全局组件挂载
Vue.component("Pagination", Pagination);
Vue.component("RightToolbar", RightToolbar);

Vue.use(permission)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
    size: Cookies.get("size") || "medium" // set element-ui default size
});

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});
