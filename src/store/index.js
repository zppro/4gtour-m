import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './share-actions'
import scenicSpot from './modules/scenic-spot'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    scenicSpot
  },
  strict: false
})
