import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.config'
import VueResource from 'vue-resource'
import App from './App'

// load router plugin
Vue.use(VueRouter)
Vue.use(VueResource)
// console.log()
// 'http://192.168.101.3:3002/me-services' 'http://192.168.255.106:3002/me-services'
Vue.http.options.root = process.env.NODE_ENV === 'development' ? 'http://192.168.255.106:3002/me-services' : 'http://sh.okertrip.com/me-services'
Vue.http.options.emulateJSON = true
Vue.http.options.credentials = true
Vue.http.interceptors.push((request, next) => {
  let ts = Math.round(new Date().getTime() / 1000)
  request.headers.set('X-Custom-TS', '' + ts)
  // Header
  let oHeader = {alg: 'HS256', typ: 'JWT'}
  // Payload
  let oPayload = {}
  // let tNow = window.KJUR.jws.IntDate.get('now')
  // let tEnd = window.KJUR.jws.IntDate.get('now + 1day')
  // oPayload.nbf = tNow
  // oPayload.iat = tNow
  // oPayload.exp = tEnd
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

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
