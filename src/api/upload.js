import request from "@/utils/request";

export function uploadPhoto(photo){
  return request({
    url: '/upload/photo',
    method: 'post',
    data: photo
  })
}

export function changePhoto(photo){
  return request({
    url: '/upload/photo',
    method: 'put',
    data: photo
  })
}

export function uploadResume(resume){
  return request({
    url: '/upload/resume',
    method: 'post',
    data: resume
  })
}
