import {hrInfo, managerInfo, enterpriseInfo} from '@/api/info'
import {getUserInfobySessionId} from '@/api/user'
import {getSessionId, setSessionId, removeSessionId} from '@/utils/auth'
import {constantRoutes} from "@/router";
import {role_routes, role_name_mapper} from '@/settings-options'
import Layout from '@/layout'

const user = {
  state: {
    id: null,
    name: '',
    photo: '',
    role: null,
    remeber_me: false,
    routes: [],
    addRoutes: [],
    sidebarRouters: []
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_REMEBER: (state, remeberMe) => {
      state.remeber_me = remeberMe
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_SIDEBAR_ROUTERS: (state, routers) => {
      state.sidebarRouters = constantRoutes.concat(routers)
    },
  },

  actions: {
    Login({commit}, userInfo){
      return new Promise((resolve, reject) => {
        login(...userInfo).then(res => {

        })
      })
    },
    GetInfo({commit}){
      return new Promise((resolve, reject) => {
        const callBack = res=>{
          if (res.data.code === 100){
            let data = res.data.data
            const id = data.id
            const name = data.name
            const photo = data.photo
            commit('SET_ID', id)
            commit('SET_NAME', name)
            commit('SET_PHOTO', photo)
            resolve(res)
          }
        }
        switch (this.state.user.role) {
          case "hr":
            hrInfo().then(callBack)
            break
          case "manager":
            managerInfo().then(callBack)
            break
          case "enterprise":
            enterpriseInfo().then(callBack)
            break
        }
      })
    },
    GetRole({commit}){
      return new Promise((resolve, reject)=> {
        getUserInfobySessionId().then(res => {
          if (res.data.code === 100) {
            let role_name = res.data.data
            commit('SET_ROLE', role_name_mapper[role_name])
            resolve(res)
          }
        })
      })
    },
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        const role = this.state.user.role
        const routes = role_routes[role]
        if (role != null){
          if (routes != null) {
            const sdata = JSON.parse(JSON.stringify(routes))
            const rdata = JSON.parse(JSON.stringify(routes))
            const sidebarRoutes = filterAsyncRouter(sdata)
            const rewriteRoutes = filterAsyncRouter(rdata, false, true)
            rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
            commit('SET_ROUTES', rewriteRoutes)
            commit('SET_SIDEBAR_ROUTERS', sidebarRoutes)
            resolve(rewriteRoutes)
          }
        }
      })
    }
  }
}
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}


export default user
