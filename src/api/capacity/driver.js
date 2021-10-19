import request from '@/utils/request'
import qs from "qs";

// 查询司机列表
export function queryDriverInfo() {
  return request({
    url: '/transport/driverManage/queryDriverInfo',
    method: 'get'
  })
}

// 条件查询司机列表
export function queryDrivers(data) {
  return request({
    url: '/transport/driverManage/queryDrivers',
    method: 'post',
    data:data
  })
}
// 司机详情
export function queryDriverById(data) {
  return request({
    url: '/transport/driverManage/queryDriverById',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}
// 删除司机
export function deleteDriver(data) {
  return request({
    url: '/transport/driverManage/deleteDriver',
    method: 'post',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    data:qs.stringify(data)
  })
}
// 添加司机
export function saveDriver(data) {
  return request({
    url: '/transport/driverManage/saveDriver',
    method: 'post',
    data: data
  })
}
// 编辑司机
export function updateDriver(data) {
  return request({
    url: '/transport/driverManage/updateDriver',
    method: 'post',
    data:data
  })
}


// 导入司机
export function importDriver(data) {
  return request({
    url: '/transport/driverManage/importDriver',
    method: 'post',
    headers:{"Content-Type":"multipart/form-data"},
    data:data
  })
}

// 条件导出司机
export function exportDriver(data) {
  return request({
    url: '/transport/driverManage/exportDriver',
    method: 'post',
    data:data
  })
}

