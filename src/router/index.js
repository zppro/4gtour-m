import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import veeValidateOption from '../config/vee-validate-option'
import routes from './router.config'
import store from '../store'

Vue.use(VueRouter)

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
  if (to.matched.some(r => r.meta.auth)) {
    if (store.state.member.self.member_id === 'anonymity') {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      store.state.routerTransiting = true
      moveId = move(0, 1, 10)
      next()
    }
  } else {
    store.state.routerTransiting = true
    moveId = move(0, 1, 10)
    next()
  }
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

export default router
