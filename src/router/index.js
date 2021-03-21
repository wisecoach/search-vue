import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '',
    component: Layout
  }

]

export default new Router({
  mode: 'history',
  routes: constantRoutes
})
