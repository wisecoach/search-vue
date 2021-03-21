import Vue from 'vue'

import Cookies from 'js-cookie'

import ElementUI from 'element-ui'
import '@/assets/styles/element-ui.scss'
import '@/assets/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import './assets/icons'
import './permission'


Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
