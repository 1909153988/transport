import request from '@/utils/request'


//注册,找回密码,登录获取验证码接口
export function getPhoneCode(phoneNumber,type) {
  return request({
      url: "/client/reg/getVerifyCode/" + phoneNumber+'/'+type,
      method: "get"
  });
}
//注册接口：
export function regUserInfo(data) {
  return request({
      url: "/client/reg/regUser",
      method: "post",
      data: data
  });
}