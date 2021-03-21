import {encrypt} from "@/utils/encrypt";
import request from '@/utils/request'

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
