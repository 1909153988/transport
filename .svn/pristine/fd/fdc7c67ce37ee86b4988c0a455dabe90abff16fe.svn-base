import request from '@/utils/request'

// 查询收款人档案列表
export function listArchivesPayee(query) {
  return request({
    url: '/transport/clientPayeeManage/queryPayees',
    method: 'post',
    data: query
  })
}

// 查询收款人档案详细
export function getArchivesPayee(payeeId) {

  var formData = new FormData();
  formData.append("payeeId", payeeId);
  return request({
    url: '/transport/clientPayeeManage/queryPayeeById',
    method: 'post',
    data: formData
  })
}


// 新增收款人档案
export function addArchivesPayee(data) {
  return request({
    url: '/transport/clientPayeeManage/saveClientPayee',
    method: 'post',
    data: data
  })
}

// 修改收款人档案
export function updateArchivesPayee(data) {
  return request({
    url: '/transport/clientPayeeManage/updatePayee',
    method: 'post',
    data: data
  })
}

// 删除收款人档案
export function delArchivesPayee(payeeId) {
  var formData = new FormData();
  formData.append("payeeId", payeeId);

  return request({
    url: '/archives/clientPayeeManage/deletePayee',
    method: 'post',
    data: formData
  })
}
