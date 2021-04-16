import request from "@/utils/request";

export function createEmployeeInfo(Info){
  return request({
    url: '/info/employee',
    method: 'post',
    data: Info
  })
}

export function changeEmployeeInfo(employee){
  return request({
    url: '/info/employee',
    method: 'put',
    data: employee
  })
}

export function searchInfobyId(id){
  return request({
    url: '/info/employee/' + id,
    method: 'get'
  })
}

export function enterpriseInfo(){
  return request({
    url: '/info/enterprise',
    method: 'get'
  })
}

export function hrInfo(){
  return request({
    url: '/info/hr',
    method: 'get'
  })
}

export function managerInfo(){
  return request({
    url: '/info/manager',
    method: 'get'
  })
}
