import request from "@/utils/request";

export function uploadPhoto(photo){
  return request({
    url: '/upload/photo',
    method: 'post',
    data: photo,
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
  })
}

export function changePhoto(photo){
  return request({
    url: '/upload/photo',
    method: 'put',
    data: photo,
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
  })
}

export function uploadResume(resume){
  return request({
    url: '/upload/resume',
    method: 'post',
    data: resume,
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
  })
}
