import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.config'
// import App from './App'

// load router plugin
Vue.use(VueRouter)
/* eslint-disable no-new */

const router = new VueRouter({
  routes // 相当于 routes: routes
})

new Vue({
  router
}).$mount('#app')
