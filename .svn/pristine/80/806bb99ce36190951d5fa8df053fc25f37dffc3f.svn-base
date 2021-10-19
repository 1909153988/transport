import request from '@/utils/request';

// 查询托运人认证信息
export function toUserAuthInfo() {
  return request({
    url: '/client/clientData/getUserClientAuthInfo',
    method: 'get'
  })
}




// 身份证正面照 识别
export function toUploadPersonalIdCardFile(data) {
  return request({
    url: "/client/clientData/uploadPersonalIdCardFile",
    method: "post",
    data: data
  });
}



// 个人认证 信息提交
export function toUpdatePersonalAuth(data) {
  return request({
    url: "/client/clientData/updatePersonalAuth",
    method: "post",
    data: data
  });
}


// 企业开票信息 信息提交
export function toUpdateCompanyInvoice(data) {
  return request({
    url: "/client/clientData/updateCompanyInvoice",
    method: "post",
    data: data
  });
}



// 企业开票信息 信息提交
export function toUpdateCompanyAuth(data) {
  return request({
    url: "/client/clientData/updateCompanyAuth",
    method: "post",
    data: data
  });
}
