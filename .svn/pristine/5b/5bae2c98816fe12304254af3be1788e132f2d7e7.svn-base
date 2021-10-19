import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/jusheng";




// -------------------------------------------------------------------------------------------
// 查询用户个人信息
export function getUserProfile() {
    return request({
        url: "/client/user/getUserInfo",
        method: "get"
    });
}

// 修改托运人密码
export function toUpdatePassWord(data) {
  return request({
    url: "/client/clientData/updatePassWord",
    method: "post",
    data: data
  });
}
