import request from '@/utils/request'

// 查询返利账户列表
export function rebateAccountList(query) {
  return request({
    url: '/client/clientRebateRecord/selectRebateAccountList',
    method: 'get',
    params: query
  })
}




// 查询返利发放记录列表
export function listRebateRecord(query) {
  return request({
    url: '/client/clientRebateRecord/list',
    method: 'get',
    params: query
  })
}







// 查询返利发放记录详细
export function getRebateRecord(number) {
  return request({
    url: '/client/clientRebateRecord/' + number,
    method: 'get'
  })
}

// 新增返利发放记录
export function addRebateRecord(data) {
  return request({
    url: '/client/clientRebateRecord',
    method: 'post',
    data: data
  })
}

// 修改返利发放记录
export function updateRebateRecord(data) {
  return request({
    url: '/client/clientRebateRecord',
    method: 'put',
    data: data
  })
}

// 删除返利发放记录
export function delRebateRecord(number) {
  return request({
    url: '/client/clientRebateRecord/' + number,
    method: 'delete'
  })
}

// 导出返利发放记录
export function exportRebateRecord(query) {
  return request({
    url: '/client/clientRebateRecord/export',
    method: 'get',
    params: query
  })
}
