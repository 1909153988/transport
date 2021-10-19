import request from "@/utils/request";

// 查询公司信息列表
export function listInfo(query) {
    return request({
        url: "/operation/companyInfo/list",
        method: "get",
        params: query
    });
}

// 查询公司信息详细
export function getInfo(companyId) {
    return request({
        url: "/operation/companyInfo/" + companyId,
        method: "get"
    });
}

// 新增公司信息
export function addInfo(data) {
    return request({
        url: "/operation/companyInfo/add",
        method: "post",
        data: data
    });
}

// 修改公司信息
export function updateInfo(data) {
    return request({
        url: "/operation/companyInfo/edit",
        method: "post",
        data: data
    });
}

// 删除公司信息
export function delInfo(companyId) {
    return request({
        url: "/operation/companyInfo/" + companyId,
        method: "delete"
    });
}

//查看部门信息
export function getBumen(query) {
    return request({
        url: "/operation/companyInfo/deptInfoList",
        method: "get",
        params: query
    });
}

// 删除部门信息
export function delbumenInfo(deptId) {
    return request({
        url: "/operation/companyInfo/removeDeptInfo/" + deptId,
        method: "delete"
    });
}

// 新增部门信息
export function addDeptInfo(data) {
    return request({
        url: "/operation/companyInfo/addDeptInfo",
        method: "post",
        data: data
    });
}

// 修改部门信息
export function upDeptInfo(data) {
    return request({
        url: "/operation/companyInfo/editDeptInfo",
        method: "put",
        data: data
    });
}

// 查询部门信息详细
export function getDeptInfo(deptId) {
    return request({
        url: "/operation/companyInfo/getDeptInfo/" + deptId,
        method: "get"
    });
}