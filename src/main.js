import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.config'
import VueResource from 'vue-resource'
// import 'font-awesome-webpack'
import App from './App'

// load router plugin
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.root = process.env.NODE_ENV === 'development' ? 'http://localhost:3002/me-services' : 'http://sh.okertrip.com/me-services'
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */

const router = new VueRouter({
  routes // 相当于 routes: routes
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
