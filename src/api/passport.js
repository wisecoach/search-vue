import {encrypt} from "@/utils/encrypt";
import request from '@/utils/request'

export function getInfo(){
  return request({
    url: '/passport/info',
    method: 'get'
  })
}

export function login(username, password, code, uuid){
  const encrypt_pwd = encrypt(password)
  const data = {
    username,
    password: encrypt_pwd,
    code,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getCodeImg(){
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}

export function mocktest(){
  return request({
    url: '/api/get/user',
    method: 'get',
    data: {'b': 234},
    params: {'a': 123}
  })
}
