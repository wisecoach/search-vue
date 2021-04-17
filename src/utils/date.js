export function formatDate(date, format){
  if (date == null) {
    return null
  }
  date = new Date(date)
  let o = {
    "M+" :date.getMonth() + 1, // month
    "d+" :date.getDate(), // day
    "h+" :date.getHours(), // hour
    "m+" :date.getMinutes(), // minute
    "s+" :date.getSeconds(), // second
    "q+" :Math.floor((date.getMonth() + 3) / 3), // quarter
    "S" :date.getMilliseconds() // millisecond
  }
  format = format || "yyyy-MM-dd hh:mm:ss"
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "")
      .substr(4 - RegExp.$1.length));
  }
  for ( let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
        : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format
}

export function formDateBeforeList(length, format, distance) {
  let currentDate = new Date()
  let distanceMap = {
    'd': 3600 * 1000  * 24,
  }
  let dist = distanceMap[distance] || 3600 * 1000 * 1000 * 24
  let datelist = []
  datelist.unshift(formatDate(currentDate, format))
  let datei = currentDate
  for( let i = 0; i < length-1; i++){
    datei -= dist
    datelist.unshift(formatDate(new Date(datei), format))
  }
  return datelist
}

export function formatDistance(from, to, format){
  if (from == null) {
    return null
  }
  const fromDate = new Date(from)
  const toDate = to == null ? new Date() : new Date(to)
  const distance = toDate - fromDate
  let o = {
    "s": Math.floor(distance / 1000),
    "m": Math.floor(distance / 1000 / 60),
    "h": Math.floor(distance / 1000 / 60 / 60),
    "d": Math.floor(distance / 1000 / 60 / 60 / 24),
    "M": Math.floor(distance / 1000 / 60 / 60 / 24 / 30),
    "y": Math.floor(distance / 1000 / 60 / 60 / 24 / 30 / 12),
  }
  let c = {
    "s": "秒",
    "m": "分",
    "h": "小时",
    "d": "天",
    "M": "月",
    "y": "年",
  }
  if (o[format] != null){
    return o[format] + c[format]
  }
  else {

    let l = ["y", "M", "d", "h", "m", "s"]
    for(let k of l){
      if (o[k] > 0){
        return o[k] + c[k]
      }
    }
  }
}
