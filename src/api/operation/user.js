import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/jusheng";

// 查询用户列表
export function listUser(query) {
    return request({
        url: "/operation/user/list",
        method: "get",
        params: query
    });
}

// 查询用户详细
export function getUser(userId) {
    return request({
        url: "/operation/user/" + praseStrEmpty(userId),
        method: "get"
    });
}

// 新增用户
export function addUser(data) {
    return request({
        url: "/operation/user",
        method: "post",
        data: data
    });
}

// 修改用户
export function updateUser(data) {
    return request({
        url: "/operation/user",
        method: "put",
        data: data
    });
}

// 删除用户
export function delUser(userId) {
    return request({
        url: "/operation/user/" + userId,
        method: "delete"
    });
}

// 用户密码重置
export function resetUserPwd(userId, password) {
    const data = {
        userId,
        password
    };
    return request({
        url: "/operation/user/resetPwd",
        method: "put",
        data: data
    });
}

// 用户状态修改
export function changeUserStatus(userId, status) {
    const data = {
        userId,
        status
    };
    return request({
        url: "/operation/user/changeStatus",
        method: "put",
        data: data
    });
}

// 查询用户个人信息
export function getUserProfile() {
    return request({
        url: "/operation/user/profile",
        method: "get"
    });
}

// 修改用户个人信息
export function updateUserProfile(data) {
    return request({
        url: "/operation/user/profile",
        method: "put",
        data: data
    });
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
    const data = {
        oldPassword,
        newPassword
    };
    return request({
        url: "/operation/user/profile/updatePwd",
        method: "put",
        params: data
    });
}

// 用户头像上传
export function uploadAvatar(data) {
    return request({
        url: "/operation/user/profile/avatar",
        method: "post",
        data: data
    });
}

// 分配用户角色 获取角色信息
export function getAssign(userid) {
    return request({
        url: "/operation/user/roleList/" + userid,
        method: "get"
    });
}

// 修改用户角色信息
export function updateUserRoleID(data) {
    return request({
        url: "/operation/user/editUserRoleId",
        method: "put",
        data: data
    });
}

// 修改用户菜单权限信息
export function updateUserMenuID(data) {
    return request({
        url: "/operation/user/editUserMenuId",
        method: "put",
        data: data
    });
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
    return request({
        url: "/operation/user/roleMenuTreeselect/" + roleId,
        method: "get"
    });
}

// 分配用户公司数据 获取公司列表
export function getUserCompanyList(userid) {
    return request({
        url: "/operation/company/userCompanyList/" + userid,
        method: "get"
    });
}

// 修改用户角色信息
export function updateUserCompanyID(data) {
    return request({
        url: "/operation/company/editUserCompanyID",
        method: "put",
        data: data
    });
}