import request from '@/utils/request'

// 查询运单-运单开票申请列表
export function listCarriageApplyInvoice(query) {
  return request({
    url: '/finance/carriageApplyInvoice/carriageList',
    method: 'get',
    params: query
  })
}


// 查询 申请开票 计算信息
export function getFindForInvoiceInfo(carriageIds) {
  return request({
    url: '/finance/carriageApplyInvoice/findForInvoiceInfo',
    method: 'post',
    data: carriageIds
  })
}

// 运单提交开票   创建申请开票记录
export function createCarriageForInvoice(data) {
  return request({
    url: '/finance/carriageApplyInvoice/createCarriageForInvoice',
    method: 'post',
    data: data
  })
}

