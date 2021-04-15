import request from "@/utils/request"

export function createDepartment(department){
  return request({
    url: '/department',
    method: 'post',
    data: department
  })
}

export function changeDepartment(department){
  return request({
    url: '/department',
    method: 'put',
    data: department
  })
}
