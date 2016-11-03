import Vue from 'vue'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import { Progress, Spinner, Popup, Cell, Field, InfiniteScroll } from 'mint-ui'

import { chinesePhone } from './patchs/vee-validate/rules'
import store from './store'
import router from './router'
import * as httpOption from './config/http-option'
import App from './App'

// load resource plugin
Vue.use(VueResource)
/* eslint-disable no-new */
// declare mint-ui
Vue.component(Progress.name, Progress)
Vue.component(Spinner.name, Spinner)
Vue.component(Popup.name, Popup)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.use(InfiniteScroll)

// extend vee custom validate rules
VeeValidate.Validator.extend('chinese-phone', chinesePhone)

// 'http://192.168.101.3:3002/me-services' 'http://192.168.255.100:3002/me-services'
Vue.http.options.root = httpOption.root
// Vue.http.options.emulateJSON = true
Vue.http.options.credentials = httpOption.credentials
Vue.http.interceptors.push(httpOption.interceptor)

// 时间戳：console.log(Math.round(new Date().getTime() / 1000))
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
