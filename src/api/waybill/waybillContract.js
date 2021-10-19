import request from '@/utils/request'

// 查询运单中心-运输合同列表
export function listWaybillContract(query) {
  return request({
    url: '/waybill/carriageContract/getCarriageContract',
    method: 'get',
    params: query
  })
}

//根据id查看合同
export function getContractUrl(carriageId) {
  var formData = new FormData();
  formData.append("carriageId", carriageId);
  return request({
    url: '/waybill/carriageContract/getContractUrl',
    method: 'post',
    data: formData
  })
}
