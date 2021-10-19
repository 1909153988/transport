import request from '@/utils/request'

// 查询财务中心-托运方资金账户列表
export function listAccount(query) {
  return request({
    url: '/client/clientAccount/getClientUserAccountList',
    method: 'get',
    params: query
  })
}


// 查询财务中心-托运方资金账户明细列表
export function listAccountDetailsList(query) {
  return request({
    url: '/client/clientAccount/getClientUserAccountDetailsList',
    method: 'get',
    params: query
  })
}





// 查询财务中心-托运方资金账户详细
export function getAccount(id) {
  return request({
    url: '/client/account/' + id,
    method: 'get'
  })
}

// 新增财务中心-托运方资金账户
export function addAccount(data) {
  return request({
    url: '/client/account',
    method: 'post',
    data: data
  })
}

// 修改财务中心-托运方资金账户
export function updateAccount(data) {
  return request({
    url: '/client/account',
    method: 'put',
    data: data
  })
}

// 删除财务中心-托运方资金账户
export function delAccount(id) {
  return request({
    url: '/client/account/' + id,
    method: 'delete'
  })
}

// 导出财务中心-托运方资金账户
export function exportAccount(query) {
  return request({
    url: '/client/account/export',
    method: 'get',
    params: query
  })
}
