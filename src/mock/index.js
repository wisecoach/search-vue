import Mock from 'mockjs'

Mock.mock('/api/get/user.*', 'get', (options)=>{
  return options
})
