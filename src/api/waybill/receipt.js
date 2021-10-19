import request from '@/utils/request'
import qs from "qs";
// 查询运单列表

export function selectShips(data) {
  return request({
    url: '/waybill/carriageShip/selectShips',
    method: 'post',
    data: data
  })
}

export function getAllShips(data) {
  return request({
    url: '/waybill/carriageShip/getAllShips',
    method: 'get',
  })
}
