import Vue from 'vue'
import Vuex from 'vuex'
import state from './share-state'
import * as getters from './share-getters'
import * as actions from './share-actions'
import mutations from './share-mutations'
import scenicSpot from './modules/scenic-spot'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    scenicSpot
  },
  strict: false
})
