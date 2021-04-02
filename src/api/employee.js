import request from "@/utils/request";

export function getEmployee(id){
  return new request({
    url: '/employee/' + id,
    method: 'get'
  })
}

export function getEmployeeList(){
  return new request({
    url: '/employee/list',
    method: 'get'
  })
}



