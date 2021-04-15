import request from '@/utils/request'

export function searchAllDepartment(){
  return request({
    url: '/search/department',
    method: 'get'
  })
}

export function searchHr(){
  return request({
    url: '/search/hr',
    method: 'get'
  })
}

export function searchManager(){
  return request({
    url: '/search/manager',
    method: 'get'
  })
}

export function searchDropEmployee(searchInfo){
  return request({
    url: '/search/drop',
    method: 'post',
    data: searchInfo
  })
}

export function searchInnerEmployee(searchInfo){
  return request({
    url: '/search/inner',
    method: 'post',
    data: searchInfo
  })
}
