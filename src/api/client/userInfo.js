import request from '@/utils/request';

// 查询托运人信息详细
export function getUserInfo() {
  return request({
    url: '/client/clientData/getUserClientInfo',
    method: 'get'
  })
}
// 修改托运人密码
export function toUpdatePassWord(data) {
  return request({
    url: "/client/clientData/updatePassWord",
    method: "post",
    data: data
  });
}
// 修改托运人密码
export function toUpdatePhone(data) {
  return request({
    url: "/client/clientData/updatePhone",
    method: "post",
    data: data
  });
}


//注册,找回密码,登录获取验证码接口
export function getPhoneCode(phoneNumber,type) {
  return request({
    url: "/client/reg/getVerifyCode/" + phoneNumber+'/'+type,
    method: "get"
  });
}
