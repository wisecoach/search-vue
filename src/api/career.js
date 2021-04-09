import request from '@/utils/request'
import {removeResizeListener} from "element-ui/src/utils/resize-event";

export function inputAttendance(empid){
  return request({
    url: '/career/attendance' + empid,
    method: 'post',
  })
}

export function searchAttendancebyCarId(carid){
  return request({
    url: '/career/attendance/' + carid,
    method: 'get'
  })
}

export function searchAllAvgbyEmpid(empid){
  return request({
    url: '/career/avgscore/' + empid,
    method: 'get'
  })
}

export function inputCrime(empid){
  return request({
    url: '/career/crime' + empid,
    method: 'post',

  })
}

export function searchAllCrimebyEmpid(empid){
  return request({
    url: '/career/crime/' + empid,
    method: 'get'
  })
}

export function searchThisAvgbyCarid(empid){
  return request({
    url: '/career/curavgscore/' + empid,
    method: 'get'
  })
}

export function searchThisCrimebycarid(carid){
  return request({
    url: '/career/curcrime/' + carid,
    method: 'get'
  })
}

export  function getEmployed(){
  return request({
    url: '/career/employ',
    method: 'post'
  })
}

export function inputPerformance(){
  return request({
    url: '/career/performance',
    method: 'post'
  })
}

export function searchThisPerformancebyCarid(carid){
  return request({
    url: '/career/performance/' + carid,
    method: 'get'
  })
}

export function employerQuit(empid){
  return request({
    url: '/career/quit/' + empid,
    method: 'get'
  })
}

export function searchCommentbyCaridPageSize(carid, page, pagesize){
  return request({
    url: '/career/score',
    method: 'get'
  })
}

export function detailedComment(){
  return request({
    url: '/career/score',
    method: 'post'
  })
}

export function searchAllCareerbyEmpid(empid){
  return request({
    url: '/career/' + empid,
    method: 'get'
  })
}
