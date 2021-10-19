import request from '@/utils/request'

// 查询承运方-开票申请单列表
export function listInvoiceBill(query) {
  return request({
    url: '/finance/carriageInvoiceBillService/list',
    method: 'get',
    params: query
  })
}

// 查询承运方-开票申请单详细
export function getInvoiceBill(formData) {
  return request({
    url: '/finance/carriageInvoiceBillService/financeInvoiceInfo',
    method: 'post',
    data: formData
  })
}

// 查询承运方-开票申请单详情---运单明细 列表
export function getInvoiceCarriageList(formData) {
  return request({
    url: '/finance/carriageInvoiceBillService/financeInvoiceCarriageList',
    method: 'post',
    data: formData
  })
}
// 查询承运方-开票申请单详情---运单明细 列表
export function getDeleteCarriageForInvoice(formData) {
  return request({
    url: '/finance/carriageInvoiceBillService/deleteCarriageForInvoice',
    method: 'post',
    data: formData
  })
}

