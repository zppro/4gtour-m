import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.config'
import VueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import VeeValidate from 'vee-validate'
import { chinesePhone } from './patchs/vee-validate/rules'
import veeValidateOption from './config/vee-validate-option'
import { Progress, Spinner, Popup, InfiniteScroll } from 'mint-ui'

import store from './store'
import App from './App'

// load router plugin
Vue.use(VueRouter)
Vue.use(VueResource)

// 'http://192.168.101.3:3002/me-services' 'http://192.168.255.100:3002/me-services'
Vue.http.options.root = process.env.NODE_ENV === 'development' ? 'http://sh.okertrip.com/me-services' : 'http://sh.okertrip.com/me-services'
// Vue.http.options.emulateJSON = true
Vue.http.options.credentials = true
Vue.http.interceptors.push((request, next) => {
  let ts = Math.round(new Date().getTime() / 1000)
  request.headers.set('X-Custom-TS', '' + ts)
  // Header
  let oHeader = {alg: 'HS256', typ: 'JWT'}
  // Payload
  let oPayload = {}
  let salt = 'carrycheng:' + ts
  oPayload.member = window.proxy.member || {member_id: 'everyone', member_name: 'everyone'}
  let sHeader = JSON.stringify(oHeader)
  let sPayload = JSON.stringify(oPayload)
  let sJWT = window.KJUR.jws.JWS.sign('HS256', sHeader, sPayload, salt)
  request.headers.set('Authorization', 'Bearer ' + sJWT) // 'Bearer or Basic: '
  next()
})

// 时间戳：console.log(Math.round(new Date().getTime() / 1000))

/* eslint-disable no-new */

const router = new VueRouter({
  routes // 相当于 routes: routes
})

let moveId
const move = (current, step, ts, cbEnd) => {
  if (current < 100) {
    store.state.routerTransitValue = current
    current = current + step
    return setTimeout(() => {
      return move(current, step, ts, cbEnd)
    }, ts)
  } else {
    cbEnd && cbEnd()
  }
}
const endMove = () => {
  store.state.routerTransitValue = 100
  store.state.routerTransiting = false
}
router.beforeEach((to, from, next) => {
  store.state.routerTransiting = true
  moveId = move(0, 1, 10)
  next()
})
router.afterEach(route => {
  moveId && clearTimeout(moveId)
  if (store.state.routerTransitValue >= 99) {
    endMove()
  } else {
    move(store.state.routerTransitValue, 5, 1, endMove)
  }
  route.name === '填写订单' && Vue.use(VeeValidate, veeValidateOption)
})

sync(store, router) // done.

// declare mint-ui
Vue.component(Progress.name, Progress)
Vue.component(Spinner.name, Spinner)
Vue.component(Popup.name, Popup)
Vue.use(InfiniteScroll)

// extend vee custom validate rules
VeeValidate.Validator.extend('chinese-phone', chinesePhone)
// Vue.use(VeeValidate, veeValidateOption)

new Vue({
  el: '#app',
  store,
  router: router,
  render: h => h(App)
})

