import request from '@/utils/request'

// 查询角色信息列表
export function listClientUserRoleInfo(query) {
  return request({
    url: '/client/clientUserRoleInfo/list',
    method: 'get',
    params: query
  })
}

// 查询角色信息详细
export function getClientUserRoleInfo(roleId) {
  return request({
    url: '/client/clientUserRoleInfo/' + roleId,
    method: 'get'
  })
}

// 新增角色信息
export function addClientUserRoleInfo(data) {
  return request({
    url: '/client/clientUserRoleInfo',
    method: 'post',
    data: data
  })
}

// 修改角色信息
export function updateClientUserRoleInfo(data) {
  return request({
    url: '/client/clientUserRoleInfo',
    method: 'put',
    data: data
  })
}

// 删除角色信息
export function delClientUserRoleInfo(roleId) {
  return request({
    url: '/client/clientUserRoleInfo/' + roleId,
    method: 'delete'
  })
}

// // 导出角色信息
// export function exportClientUserRoleInfo(query) {
//   return request({
//     url: '/client/clientUserRoleInfo/export',
//     method: 'get',
//     params: query
//   })
// }


// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: "/client/clientUserRoleInfo/treeselect",
    method: "get"
  });
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: "/client/clientUserRoleInfo/roleMenuTreeselect/" + roleId,
    method: "get"
  });
}
