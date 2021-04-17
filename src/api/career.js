import request from '@/utils/request'
import {removeResizeListener} from "element-ui/src/utils/resize-event";

export function inputAttendance(attendance){
  return request({
    url: '/career/attendance',
    method: 'post',
    data: attendance
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

export function searchThisAvgbyCarid(carid){
  return request({
    url: '/career/curavgscore/' + carid,
    method: 'get'
  })
}

export function searchThisCrimebycarid(carid){
  return request({
    url: '/career/curcrime/' + carid,
    method: 'get'
  })
}

export  function getEmployed(career){
  return request({
    url: '/career/employ',
    method: 'post',
    data: career
  })
}

export function inputPerformance(performance){
  return request({
    url: '/career/performance',
    method: 'post',
    data: performance
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

export function searchCommentbyCaridPageSize(carid, page, pageSize){
  return request({
    url: '/career/score',
    method: 'get',
    params: {carid, page, pageSize}
  })
}

export function detailedComment(score){
  return request({
    url: '/career/score',
    method: 'post',
    data: score
  })
}

export function searchAllCareerbyEmpid(empid){
  return request({
    url: '/career/employee/' + empid,
    method: 'get'
  })
}


export function searchCareerbyCarid(carid){
  return request({
    url: '/career/' + carid,
    method: 'get'
  })
}
