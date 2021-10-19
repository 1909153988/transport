import request from '@/utils/request'

// 查询运力中心-司机列表
export function listArchivesDriver(query) {
  return request({
    url: '/transport/driverManage/queryDrivers',
    method: 'post',
    data: query
  })
}

// 查询运力中心-司机详细
export function getArchivesDriver(chauffeurId) {

  var formData = new FormData();
  formData.append("chauffeurId", chauffeurId);

  return request({
    url: '/transport/driverManage/queryDriverById',
    method: 'post',
    data: formData
  })
}

// 新增运力中心-司机
export function addArchivesDriver(data) {
  return request({
    url: '/transport/archivesDriver',
    method: 'post',
    data: data
  })
}

// 修改运力中心-司机
export function updateArchivesDriver(data) {
  return request({
    url: '/transport/driverManage/updateDriver',
    method: 'post',
    data: data
  })
}

// 删除运力中心-司机
export function delArchivesDriver(chauffeurId) {

  var formData = new FormData();
  formData.append("chauffeurId", chauffeurId);

  return request({
    url: '/transport/driverManage/deleteDriver',
    method: 'post',
    data: formData
  })


}
