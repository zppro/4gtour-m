import Vue from 'vue'
import moment from 'moment'
import VueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import { Progress, Spinner, Popup, Cell, Field, Badge, Actionsheet, DatetimePicker, Swipe, SwipeItem, Loadmore, Checklist, Radio, PaletteButton, InfiniteScroll, Lazyload } from 'mint-ui'
import store from './store'
import router from './router'
import * as httpOption from './config/http-option'
import App from './App'
// import filters from './filters/datetime-filters'

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
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Checklist.name, Checklist)
Vue.component(Radio.name, Radio)
Vue.component(PaletteButton.name, PaletteButton)
Vue.use(InfiniteScroll)
Vue.use(Lazyload)
// Vue.use(VeeValidate, veeValidateOption)

// 'http://192.168.101.3:3002/me-services' 'http://192.168.255.100:3002/me-services'
Vue.http.options.root = httpOption.root
// Vue.http.options.emulateJSON = true
Vue.http.options.credentials = httpOption.credentials
Vue.http.options.timeout = store.state.loadingTimeout * 1000
Vue.http.options.before = httpOption.before
Vue.http.interceptors.push(httpOption.auth)
Vue.http.interceptors.push(httpOption.loadingIndicator)

// 时间戳：console.log(Math.round(new Date().getTime() / 1000))

// 配置微信开放平台数据
!store.state.env.isWeixin && store.dispatch('weixinOpen$getConfig')
// !store.state.env.isWeixin && window.utils.loadScript('http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=YOUR APPKEY&debug=true')
store.state.env.isApiCloud && store.dispatch('addEventListenerFromApiCloudToMember')

Vue.config.devtools = process.env.NODE_ENV !== 'production'

new Vue({
  el: '#app',
  store,
  router,
  filters: {
    formatDate: function (value, formatString) {
      formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
      return moment(value).format(formatString)
    }
  },
  render: h => h(App)
})
