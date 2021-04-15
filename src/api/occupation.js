import request from '@/utils/request'

export function getOccupationChildren(pid){
  return request({
    url: '/occupation/list/' + pid,
    method: 'get'
  })
}

export function getOccupation(id){
  return request({
    url: '/occupation/' + id,
    method: 'get'
  })
}
