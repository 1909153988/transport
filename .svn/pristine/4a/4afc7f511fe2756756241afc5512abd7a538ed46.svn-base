import request from '@/utils/request'

// 查询运单付款申请单 列表
export function listCarriagePaymentBill(query) {
  return request({
    url: '/finance/carriagePaymentBillService/carriagePaymentBillList',
    method: 'post',
    data: query
  })
}

// 导出运单中心-运单
export function exportCarriagePaymentBill(query) {
  return request({
    url: '/finance/carriagePaymentBillService/exportCarriagePaymentBillList',
    method: 'post',
    data: query
  })
}

// 查询付款申请单  详细
export function getCarriagePaymentBill(payApplyCode) {
  return request({
    url: '/finance/carriagePaymentBillService/getCarriagePaymentBillById',
    method: 'post',
    data: payApplyCode
  })
}




// 运单付款申请单审核
export function submitCarriagePaymentBillInfoResult(data) {
  return request({
    url: '/finance/carriagePaymentBillService/submitCarriagePaymentBillInfoResult',
    method: 'post',
    data: data
  })
}

