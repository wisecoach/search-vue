import request from "@/utils/request";

export function createEmployeeInfo(Info){
  return request({
    url: '/info/employee',
    method: 'post',
    data: Info
  })
}

export function changeEmployeeInfo(id){
  return request({
    url: '/info/employee' + id,
    method: 'put'
  })
}

export function searchInfobyId(id){
  return request({
    url: '/info/employee' + id,
    method: 'get'
  })
}

export function searchEnterpriseInfo(){
  return request({
    url: '/info/enterprise',
    method: 'get'
  })
}

export function hrSearchHrInfo(id){
  return request({
    url: '/info/hr' + id,
    method: 'get'
  })
}

export function managerSearchManagerInfo(id){
  return request({
    url: '/info/manager' + id,
    method: 'get'
  })
}
