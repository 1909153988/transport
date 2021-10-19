import request from '@/utils/request'
import qs from "qs";

//提交申请付款信息
export function subfukuan(data) {
  return request({
    url: '/finance/carriagePaymentBillService/createCarriagePaymentBillInfo',
    method: 'post',
    data: data
  })
}



//申请开票  查询运单信息  计算单个运单 申请付款金额的服务费
export function getSelectBillServiceCharge(data) {

  return request({
    url: '/finance/carriagePaymentBillService/getPaymentBillServiceCharge',
    method: 'post',
    data: data
  })
}

//根据id查询申请付款详情
export function getfukuan(carriageIds) {
  var formData = new FormData();
  formData.append("carriageIds", carriageIds);
  return request({
    url: '/finance/carriagePaymentBillService/getPaymentBillInfo',
    method: 'post',
    data: formData
  })
}

//获取id获取发车上报信息
export function getshangbao(carriageId) {
  const data = {carriageId: carriageId}
  return request({
    url: '/waybill/CarriageInfo/bai/carriageInfo',

    method: 'post',
    data: data
  })
}




//获取id获取运单详细信息
export function getCarriageInfoById(carriageId) {
  const data = {carriageId: carriageId}
  return request({
    url: '/waybill/CarriageInfo/queryCarriageById',
    method: 'post',
    data: data
  })
}





//保存草稿运单
export function savecaogao(data) {
  return request({
    url: '/waybill/CarriageInfo/saveCarriageDraft',
    method: 'post',
    data: data
  })
}


//根据id删除运单
export function delyundan(carriageId) {
  const data = {carriageId: carriageId}
  return request({
    url: '/waybill/CarriageInfo/deleteCarriageInfo',
    headers: {"content-type": "application/x-www-form-urlencoded"},
    method: 'post',
    data: qs.stringify(data)
  })
}


//获取司机信息及收款信息(包含用户名下收款人) 精确
//查询承运司机的信息
export function getdirverinfo(phone) {
  const data = {phone: phone}
  return request({
    url: '/waybill/CarriageInfo/bai/getChauffeur',
    method: 'post',
    data: data
  })
}


//查询新建运单中的选择常发路线
export function getUserOftenPath() {
  return request({
    url: '/waybill/CarriageInfo/getUserOftenPath',
    method: 'get',
  })
}

// 查询运单列表+分页+条件查询
export function waybilllist(query) {
  return request({
    url: '/waybill/CarriageInfo/selectCarriage',
    method: 'post',
    data: query
  })
}

//新建运单
export function addwaybill(data) {

  return request({
    url: '/waybill/CarriageInfo/saveCarriageInfo',
    method: 'post',
    data: data
  })
}

//修改运单
export function updateCarriageInfo(data) {


  return request({
    url: '/waybill/CarriageInfo/updateCarriageInfo',
    method: 'put',
    data: data
  })
}








//获取用户的余额
export function userbalance() {
  return request({
    url: '/waybill/CarriageInfo/getUserBalance',
    method: 'get',
  })
}

//选择查询所有常发路线分页
export function linelist(query) {
  return request({
    url: '/waybill/carriagePath/selectOftenPath',
    method: 'post',
    params: query
  })
}


//新增常发路线
export function addline(data) {
  return request({
    url: '/waybill/carriagePath/saveOftenPath',
    method: 'post',
    data: data
  })
}


//修改常发路线
export function updateline(data) {
  return request({
    url: '/waybill/carriagePath/updateOftenPath',
    method: 'post',
    data: data
  })
}

//查询常发路线的货物类型
export function selectlinehuowu() {
  return request({
    url: '/waybill/CarriageInfo/bai/goodsType',
    method: 'get'
  })
}


// //根据id查询常发路线
export function getline(oftenPathId) {
  const data = {oftenPathId: oftenPathId}
  return request({
    url: '/waybill/carriagePath/selectOftenPathById',
    headers: {"content-type": "application/x-www-form-urlencoded"},
    method: 'post',
    data: qs.stringify(data)
  })
}


//根据id删除常发路线
export function delline(oftenPathId) {
  const data = {oftenPathId: oftenPathId}
  return request({
    url: '/waybill/carriagePath/deleteOftenPath',
    headers: {"content-type": "application/x-www-form-urlencoded"},
    method: 'post',
    data: qs.stringify(data)
  })
}


// 查询运单合同列表
export function contractlist(query) {
  return request({
    url: '/waybill/carriageContract/getCarriageContract',
    method: 'get',
    params: query
  })
}


//根据id查看合同
export function getcarriage(carriageId) {
  const data = {carriageId: carriageId}
  return request({
    url: '/waybill/carriageContract/getContractUrl',
    headers: {"content-type": "application/x-www-form-urlencoded"},
    method: 'post',
    data: qs.stringify(data)
  })
}


//查询托运人选择
export function getUserCompany() {
  // const data={carriageErrorId:carriageErrorId,disposeExplain:disposeExplain}
  return request({
    url: '/waybill/CarriageInfo/bai/getUserCompany',
    method: 'get'
  })
}

//查询第二收款人
export function querySecondPayment(data) {
  // const data={carriageErrorId:carriageErrorId,disposeExplain:disposeExplain}
  return request({
    url: '/waybill/CarriageInfo/querySecondPayment',
    //  headers:{"content-type":"application/x-www-form-urlencoded"},
    method: 'post',
    data:data
  })
}




//发车上报提交
export function toSendCarReported(data) {
  return request({
    url: '/waybill/CarriageInfo/depart',
    method: 'post',
    data:data
  })
}


//签收提交
export function tounload(data) {
  return request({
    url: '/waybill/CarriageInfo/unload',
    method: 'post',
    data:data
  })
}
