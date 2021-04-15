import request from "@/utils/request"

export function login(form){
  let data = {
    username: form.username,
    password: form.password
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout(){
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function getCode(){
  return request({
    url: '/user/code',
    method: 'get'
  })
}

export function createHrAccount(hr){
  return request({
    url: '/user/hr',
    method: 'post',
    data: hr
  })
}

export function changeHrAccount(id, password){
  return request({
    url: '/user/hr',
    method: 'put',
    data: {id: id, password: password}
  })
}

export function createManagerAccount(manager){
  return request({
    url: '/user/manager',
    method: 'post',
    data: manager
  })
}

export function changeManagerAccount(id, password){
  return request({
    url: '/user/manager',
    method: 'put',
    data: {id: id, password: password}
  })
}

export function getUserInfobySessionId(){
  return request({
    url: '/user/myInfo',
    method: 'get'
  })
}

export function checkDuplicatedName(name) {
  return request({
    url: '/user/check/' + name,
    method: 'get'
  })
}
