import Vue from 'vue'
import VueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import { Progress, Spinner, Popup, Cell, Field, Badge, Actionsheet, DatetimePicker, InfiniteScroll } from 'mint-ui'
import store from './store'
import router from './router'
import * as httpOption from './config/http-option'
import App from './App'

sync(store, router)
// load resource plugin
Vue.use(VueResource)
/* eslint-disable no-new */
// declare mint-ui
Vue.component(Progress.name, Progress)
Vue.component(Spinner.name, Spinner)
Vue.component(Popup.name, Popup)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(Badge.name, Badge)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.use(InfiniteScroll)
// Vue.use(VeeValidate, veeValidateOption)

// 'http://192.168.101.3:3002/me-services' 'http://192.168.255.100:3002/me-services'
Vue.http.options.root = httpOption.root
// Vue.http.options.emulateJSON = true
Vue.http.options.credentials = httpOption.credentials
Vue.http.interceptors.push(httpOption.interceptor)

// 时间戳：console.log(Math.round(new Date().getTime() / 1000))

// 配置微信开放平台数据
!store.state.env.isWeixin && store.dispatch('weixinOpen$getConfig')
// !store.state.env.isWeixin && window.utils.loadScript('http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=YOUR APPKEY&debug=true')
store.state.env.isApiCloud && store.dispatch('addEventListenerFromApiCloud')

Vue.config.devtools = process.env.NODE_ENV !== 'production'
console.log(Vue.config.devtools)
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
