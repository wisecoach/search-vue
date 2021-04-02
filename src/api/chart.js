import request from '@/utils/request'

export function getAmount(pid, size=7){
  return request({
    url: '/chart/amount',
    methods: 'get',
    params: {occid: pid, size: size}
  })
}
