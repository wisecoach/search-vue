import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import errorCode from '@/utils/error-code'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例，用于省略baseURL等
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

export default service
