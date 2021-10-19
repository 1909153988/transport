import request from '@/utils/request'
import qs from "qs";



// 条件查询收款人列表
export function queryPayees(data) {
  return request({
    url: '/transport/clientPayeeManage/queryPayees',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}


// 条件导出收款人列表
export function exportClientPayee(data) {
  return request({
    url: '/transport/clientPayeeManage/exportClientPayee',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}


// 导入收款人
export function importClientPayee(data) {
  return request({
    url: '/transport/clientPayeeManage/importClientPayee',
    method: 'post',
    data: data
  })
}


// 收款人详情
export function queryPayeeById(data) {
  return request({
    url: '/transport/clientPayeeManage/queryPayeeById',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}


// 添加收款人
export function saveClientPayee(data) {
  return request({
    url: '/transport/clientPayeeManage/saveClientPayee',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}


// 修改收款人
export function updatePayee(data) {
  return request({
    url: '/transport/clientPayeeManage/updatePayee',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}


// 删除收款人
export function deletePayee(data) {
  return request({
    url: '/transport/clientPayeeManage/deletePayee',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}
