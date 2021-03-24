import Mock from 'mockjs'

Mock.mock('/api/get/user.*', 'get', (options)=>{
  return options
})

Mock.mock('/passport/info', 'get', require('@/mock/info.json'))
