import request from '@/utils/request'
import qs from "qs";

//查询所有异常列表+分页
export function selectlist(query) {
  return request({
    url: '/waybill/carriageError/getAllCarriageError',
    method: 'get',
    params: query
  })
}


//条件查询异常列表
export function errorlist(query) {
    return request({
      url: '/waybill/carriageError/selectCarriageError',
      method: 'post',
      params: query
    })
  }
//根据id查询异常报备信息
export function selecterrorinfo(carriageId) {
  const data={carriageId:carriageId}
  return request({
    url: '/waybill/CarriageInfo/bai/carriageInfo',
    method: 'post',
    data: data
  })
}


//修改司机在途异常报备处理
export function adddivererror(carriageErrorId,disposeExplain) {

  var formData = new FormData();
  formData.append("carriageErrorId", carriageErrorId);
  formData.append("disposeExplain", disposeExplain);

  return request({
    url: '/waybill/carriageError/chauffeurReportSolve',

    method: 'post',
    data:formData
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


//修改平台审核异常报备处理
export function addpintaierror(data) {
  // const data={carriageErrorId:carriageErrorId,disposeExplain:disposeExplain}
 return request({
   url: '/waybill/carriageError/platformCheckSolve',
  //  headers:{"content-type":"application/x-www-form-urlencoded"},
   method: 'post',
   data:data
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
      data:data
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
  const data={oftenPathId:oftenPathId}
  return request({
    url: '/waybill/carriagePath/selectOftenPathById',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    method: 'post',
      data:qs.stringify(data)
  })
}



//根据id删除常发路线
 export function delline(oftenPathId) {
  const data={oftenPathId:oftenPathId}
  return request({
    url: '/waybill/carriagePath/deleteOftenPath',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    method: 'post',
    data:qs.stringify(data)
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
  const data={carriageId:carriageId}
  return request({
    url: '/waybill/carriageContract/getContractUrl',
    headers:{"content-type":"application/x-www-form-urlencoded"},
    method: 'post',
    data:qs.stringify(data)
  })
}
