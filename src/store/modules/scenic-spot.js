import Vue from 'vue'
import * as mutationTypes from '../mutation-types'

const moduleName = 'SCENIC-SPOT'
const MINUS_QUANTITY = '/MINUS_QUANTITY'
const PLUS_QUANTITY = '/PLUS_QUANTITY'

// initial state
const state = {
  all: [],
  current: {}
}

// getters
const getters = {
  allScenicSpotsInHome (state) {
    return state.all
  },
  scenicSpotInDetails (state) {
    return state.current
  }
}

// mutations
const mutations = {
  [moduleName + mutationTypes.REFRESH_SUCCESS] (state, { scenicSpots }) {
    state.all = scenicSpots
  },
  [moduleName + mutationTypes.APPEND_SUCCESS] (state, { scenicSpots }) {
    state.all = state.all.concat(scenicSpots)
  },
  [moduleName + mutationTypes.FETCH_DETAILS_SUCCESS] (state, { scenicSpot }) {
    // state.current = Object.assign({}, state.current, scenicSpot)
    state.current = scenicSpot
  },
  [moduleName + MINUS_QUANTITY] (state, { size = 1 }) {
    state.current && (state.current.buy_quantity - size) > 0 && (state.current.buy_quantity = state.current.buy_quantity - size)
  },
  [moduleName + PLUS_QUANTITY] (state, { size = 1 }) {
    state.current && (state.current.buy_quantity = state.current.buy_quantity + size)
  }
}

// actions
const actions = {
  fetchScenicSpots ({ commit }) {
    return Vue.http.get('api/scenicSpots').then(ret => {
      if (ret.data.success) {
        const scenicSpots = ret.data.rows
        commit(moduleName + mutationTypes.REFRESH_SUCCESS, { scenicSpots })
        return scenicSpots
      }
    })
  },
  fetchScenicSpotInfo ({ commit }, { id }) {
    return Vue.http.get('api/scenicSpot/' + id).then(ret => {
      if (ret.data.success) {
        const scenicSpot = ret.data.ret
        commit(moduleName + mutationTypes.FETCH_DETAILS_SUCCESS, { scenicSpot })
        return scenicSpot
      }
    })
  },
  minusQuantity ({ commit }, { size = 1 }) {
    commit(moduleName + MINUS_QUANTITY, { size })
  },
  plusQuantity ({ commit }, { size = 1 }) {
    commit(moduleName + PLUS_QUANTITY, { size })
  }
}

export default {
  moduleName,
  state,
  getters,
  mutations,
  actions
}
