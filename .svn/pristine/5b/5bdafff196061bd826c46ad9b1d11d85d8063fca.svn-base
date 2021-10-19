import request from '@/utils/request';


// 查询用户信息列表
export function listUser(query) {
  return request({
    url: '/client/clientAccountUser/list',
    method: 'get',
    params: query
  })
}

// 查询用户信息详细
export function getUser(userId) {
  return request({
    url: '/client/clientAccountUser/' + userId,
    method: 'get'
  })
}

// 新增用户信息
export function addUser(data) {
  return request({
    url: '/client/clientAccountUser/addUser',
    method: 'post',
    data: data
  })
}

// 修改用户信息
export function updateUser(data) {
  return request({
    url: '/client/clientAccountUser',
    method: 'put',
    data: data
  })
}

// 删除用户信息
export function delUser(userId) {
  return request({
    url: '/client/clientAccountUser/' + userId,
    method: 'delete'
  })
}



// --------------------------------------------------------------------------------------------------------------
// 分配用户角色 获取角色信息
export function getAssign(userid) {
  return request({
    url: '/client/clientAccountUser/roleList',
    method: "POST",
    params:{"userId":userid}
  });
}


// 修改用户角色信息
export function updateUserRoleID(data) {
  return request({
    url: "/client/clientAccountUser/editUserRoleId",
    method: "put",
    data: data
  });
}
// 查询机构列表
export function clientCompanyList() {
  return request({
    url: "/client/clientAccountUser/getClientCompanyInfoList",
    method: "get"
  });
}


// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(userId) {
  return request({
    url: "/client/clientAccountUser/roleMenuTreeselect/" + userId,
    method: "get"
  });
}
// 修改用户菜单权限信息
export function updateUserMenuID(data) {
  return request({
    url: "/client/clientAccountUser/editUserMenuId",
    method: "put",
    data: data
  });
}
