import request from '@/utils/request'
import qs from "qs";



// 条件查询客户列表
export function getShipperClient(data) {
  return request({
    url: '/transport/shipperClientManage/getShipperClient',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}


// 条件导出客户列表
export function exportClientSide(data) {
  return request({
    url: '/transport/shipperClientManage/exportClientSide',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}


// 导入客户
export function importClientSide(data) {
  return request({
    url: '/transport/shipperClientManage/importClientSide',
    method: 'post',
    data: data
  })
}


// 客户详情
export function getShipperClientById(data) {
  return request({
    url: '/transport/shipperClientManage/getShipperClientById',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}


// 添加客户
export function saveShipperClient(data) {
  return request({
    url: '/transport/shipperClientManage/saveShipperClient',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}


// 修改客户
export function updateShipperClient(data) {
  return request({
    url: '/transport/shipperClientManage/updateShipperClient',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}

// 删除客户
export function deleteShipperClient(data) {
  return request({
    url: '/transport/shipperClientManage/deleteShipperClient',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}

// 查询附件
export function selectAccessory(data) {
  return request({
    url: '/transport/shipperClientManage/selectAccessory',
    method: 'post',
    data: data
  })
}

// 保存附件
export function saveAccessory(data) {
  return request({
    url: '/transport/shipperClientManage/saveAccessory',
    method: 'post',
    data: data
  })
}

// 导出附件
export function exportClientSideAccessory(data) {
  return request({
    url: '/transport/shipperClientManage/exportClientSideAccessory',
    method: 'post',
    data: data
  })
}


