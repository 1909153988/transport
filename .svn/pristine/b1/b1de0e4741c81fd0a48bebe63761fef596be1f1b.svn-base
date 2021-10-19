import request from '@/utils/request'

// 查询运单中心_回单列表
export function listTransportShip(query) {
  return request({
    url: '/waybill/carriageShip/selectShips',
    method: 'post',
    data: query
  })
}

// 查询运单中心_回单详细
export function getTransportShip(carriageId) {
  var formData = new FormData();
  formData.append("carriageId", carriageId);
  return request({
    url: '/waybill/carriageShip/getCourierNumber',
    method: 'post',
    data:formData
  })
}


// 修改运单中心_回单
export function updateTransportShip(data) {
  return request({
    url: '/waybill/carriageShip/courierNumber',
    method: 'post',
    data: data
  })
}


