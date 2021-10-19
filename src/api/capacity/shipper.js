import request from '@/utils/request'
import qs from "qs";

// 查询船舶列表
export function querySkipperInfo() {
  return request({
    url: '/transport/shipManage/queryShipInfo',
    method: 'get'
  })
}


// 条件查询船舶列表
export function queryShips(data) {
  return request({
    url: '/transport/shipManage/queryShips',
    method: 'post',
    data: data
  })
}


// 条件导出船舶列表
export function exportShip(data) {
  return request({
    url: '/transport/shipManage/exportShip',
    method: 'post',
    data: data
  })
}


// 导入船舶
export function importShip(data) {
  return request({
    url: '/transport/shipManage/importShip',
    method: 'post',
    data: data
  })
}


// 船舶详情
export function queryShipById(data) {
  return request({
    url: '/transport/shipManage/queryShipById',
    method: 'post',
    data: data
  })
}


// 添加船舶
export function saveShip(data) {
  return request({
    url: '/transport/shipManage/saveShip',
    method: 'post',
    data: data
  })
}


// 修改船舶
export function updateShip(data) {
  return request({
    url: '/transport/shipManage/updateShip',
    method: 'post',
    data: data
  })
}


// 删除船舶
export function deleteShip(data) {
  return request({
    url: '/transport/shipManage/deleteShip',
    method: 'post',
    data: data
  })
}
