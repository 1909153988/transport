import request from '@/utils/request'



// 查询企业托运人列表
export function listClient(query) {
  return request({
    url: '/client/clientCompany/clientList',
    method: 'get',
    params: query
  })
}





// 查询企业托运人的分支机构 -公司信息列表
export function listCompany(query) {
  return request({
    url: '/client/clientCompany/companyList',
    method: 'get',
    params: query
  })
}

// 查询企业托运人的分支机构 -公司信息详细
export function getCompany(companyId) {
  return request({
    url: '/client/clientCompany/' + companyId,
    method: 'get'
  })
}

// 新增企业托运人的分支机构 -公司信息
export function addCompany(data) {
  return request({
    url: '/client/clientCompany',
    method: 'post',
    data: data
  })
}

// 修改企业托运人的分支机构 -公司信息
export function updateCompany(data) {
  return request({
    url: '/client/clientCompany',
    method: 'put',
    data: data
  })
}

// 删除企业托运人的分支机构 -公司信息
export function delCompany(companyId) {
  return request({
    url: '/client/clientCompany/' + companyId,
    method: 'delete'
  })
}

// // 导出企业托运人的分支机构 -公司信息
// export function exportCompany(query) {
//   return request({
//     url: '/client/clientCompany/export',
//     method: 'get',
//     params: query
//   })
// }
