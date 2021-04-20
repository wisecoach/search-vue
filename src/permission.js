import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getSessionId } from '@/utils/auth'
import {login} from "@/api/passport";

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.state.user.role != null) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      window.document.title = to.meta.title == undefined?'斯尔奇人才管理系统':to.meta.title
      next()
    }
  }
  else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    }
    else {
      store.dispatch('GetRole').then(res => {
        if (res.data.code === 100 && store.state.user.role != null) {
          store.dispatch('GetInfo').then(res => {
            store.dispatch('GenerateRoutes').then(accessRoutes => {
              // 根据roles权限生成可访问的路由表
              router.addRoutes(accessRoutes) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            })
            next()
            NProgress.done()
          })
        }else {
          next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
          NProgress.done()
        }
      })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
