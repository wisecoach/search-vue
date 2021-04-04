import request from "@/utils/request"

export function createDepartment(department){
  return request({
    url: '/department',
    method: 'post',
    data: department
  })
}

export function changeDepartment(name){
  return request({
    url: '/department',
    method: 'put',
    params: name
  })
}
