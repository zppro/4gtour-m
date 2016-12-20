import Vue from 'vue'
import Vuex from 'vuex'
import state from './share-state'
import * as getters from './share-getters'
import * as actions from './share-actions'
import mutations from './share-mutations'
import scenicSpot from './modules/scenic-spot'
import weixinOpen from './modules/weixin-open'
import member from './modules/member'
import scenerySpot from './modules/scenery-spot'
import experience from './modules/experience'
import group from './modules/group'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    scenicSpot,
    member,
    weixinOpen,
    scenerySpot,
    experience,
    group
  },
  strict: false
})
