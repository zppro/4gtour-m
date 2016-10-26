import Vue from 'vue'
import Vuex from 'vuex'
import scenicSpot from './modules/scenic-spot'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    scenicSpot
  },
  strict: false
})
