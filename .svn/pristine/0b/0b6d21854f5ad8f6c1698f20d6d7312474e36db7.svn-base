import request from '@/utils/request'



// 查询付款流程配置
export function getUserPayFlowSetList(query) {
  return request({
    url: '/client/clientData/getUserPayFlowSetList',
    method: 'get',
    params: query
  })
}


// 删除配置
export function payFlowSetRemove(setId) {
  return request({
    url: '/client/clientData/payFlowSetRemove',
    method: 'post',
    params: {setId:setId}
  })
}


// 查询付款流程配置 候选人 （子账号）
export function getUserPayFlowSetUseUserList(query) {
  return request({
    url: '/client/clientData/getUserPayFlowSetUseUserList',
    method: 'get',
    params: query
  })
}



// 添加配置
export function payFlowSetAdd(auditUserId) {
  return request({
    url: '/client/clientData/insertUserPayFlowSet',
    method: 'post',
    params: {auditUserId:auditUserId}
  })
}
