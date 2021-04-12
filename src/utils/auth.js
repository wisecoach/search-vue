import Cookies from 'js-cookie'

const SessionKey = 'JSESSIONID'

export function getSessionId(){
  return Cookies.get(SessionKey)
}

export function setSessionId(sessionID){
  return Cookies.set(SessionKey, sessionID)
}

export function removeSessionId(){
  return Cookies.remove(SessionKey)
}