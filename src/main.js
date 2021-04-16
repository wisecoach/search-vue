import Vue from 'vue'
import VueCropper from 'vue-cropper'
import Cookies from 'js-cookie'

import ElementUI from 'element-ui'
import '@/assets/styles/element-ui.scss'
import '@/assets/styles/index.scss'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

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
Vue.use(VueCropper)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
