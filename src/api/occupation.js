import request from '@/utils/request'

export function getOccupationChildren(pid){
  return request({
    url: '/occupation/' + pid,
    method: 'get'
  })
}
