import request from '@/utils/request'

// 查询档案-车辆列表
export function listArchivesVehicle(query) {
  return request({
    url: '/transport/clientVehicleManage/queryVehicles',
    method: 'post',
    data: query
  })
}

//根据车牌号查询车辆
export function selectArchivesVehicleNo(vehicleNo) {
  var formData = new FormData();
  formData.append("vehicleNo", vehicleNo);
  return request({
    url: '/transport/clientVehicleManage/queryVehicleById',
    method: 'post',
    data:formData
  })
}


// 查询档案-车辆详细
export function getArchivesVehicle(vehicleId) {
  var formData = new FormData();
  formData.append("vehicleId", vehicleId);

  return request({
    url: '/transport/clientVehicleManage/queryVehicleById',
    method: 'post',
    data:formData
  })
}


// 新增档案-车辆
export function addArchivesVehicle(data) {
  return request({
    url: '/transport/clientVehicleManage/saveVehicle',
    method: 'post',
    data: data
  })
}


// 修改档案-车辆
export function updateArchivesVehicle(data) {
  return request({
    url: '/transport/clientVehicleManage/updateVehicle',
    method: 'post',
    data: data
  })
}

// 删除档案-车辆
export function delArchivesVehicle(vehicleId) {
  var formData = new FormData();
  formData.append("vehicleId", vehicleId);

  return request({
    url: '/transport/clientVehicleManage/deleteVehicle',
    method: 'post',
    data:formData
  })
}
