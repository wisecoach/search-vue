import request from '@/utils/request'

export function searchAllDepartment(){
  return request({
    url: '/search/department',
    method: 'get'
  })
}

export function searchDropEmployee(id){
  return request({
    url: '/search/drop' + id,
    method: 'post'
  })
}

export function searchHr(id){
  return request({
    url: '/search/hr' + id,
    method: 'get'
  })
}

export function searchInnerEmployee(searchInfo){
  return request({
    url: '/search/inner',
    method: 'post',
    data: searchInfo
  })
}

export function searchManager(id){
  return request({
    url: '/search/manager' + id,
    method: 'get'
  })
}
