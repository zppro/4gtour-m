import Vue from 'vue'
import * as mutationTypes from '../mutation-types'
import { DATA_FETCH_TEXT } from '../loading-texts'
import { errorCallback } from '../../config/http-option'

const ENTITY_NAME = 'SCENERY-SPOT'

// initial state
const state = {
  all: [],
  listRequestTypeAppending: true,
  noMore: false
}

// getters
const getters = {
  allScenerySpots (state) {
    return state.all
  },
  appendScenerySpotDiabled (state, getters, rootState) {
    return rootState.loading || state.noMore
  },
  showScenerySpotFetchIndicator (state, getters, rootState) {
    return rootState.loading && !state.listRequestTypeAppending
  },
  showScenerySpotAppendIndicator (state, getters, rootState) {
    return rootState.loading && state.listRequestTypeAppending
  }
}

// mutations
const mutations = {
  [ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE] (state, { listRequestType }) {
    state.listRequestTypeAppending = listRequestType === 'append'
  },
  [ENTITY_NAME + mutationTypes.FETCH_ALL_SUCCESS] (state, { scenerySpots }) {
    state.all = scenerySpots
    state.noMore = true
  },
  [ENTITY_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { scenerySpots }) {
    state.all = scenerySpots
  },
  [ENTITY_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { scenerySpots }) {
    state.all = state.all.concat(scenerySpots)
  },
  [ENTITY_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMore = fetchCount < size
  }
}

// actions
const actions = {
  cds$FetchScenerySpotsAllAsSource ({ state, commit, rootState }) {
    return Vue.http.post('trv/scenerySpotsAll').then(ret => {
      if (ret.data.success) {
        const scenerySpots = ret.data.rows
        commit(ENTITY_NAME + mutationTypes.FETCH_ALL_SUCCESS, { scenerySpots })
      } else {
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
      return state.all
    }, errorCallback)
  },
  fetchScenerySpots ({ commit, rootState }) {
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('trv/scenerySpots', {page: {size: rootState.dataFetchingSize, skip: 0}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const scenerySpots = ret.data.rows
        commit(ENTITY_NAME + mutationTypes.FETCH_LIST_SUCCESS, { scenerySpots })
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { fetchCount: scenerySpots.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    }, errorCallback)
  },
  appendScenerySpots ({ commit, state, rootState }) {
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('trv/scenerySpots', {page: {size: rootState.dataFetchingSize, skip: state.all.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const scenerySpots = ret.data.rows
        scenerySpots.length > 0 && commit(ENTITY_NAME + mutationTypes.APPEND_LIST_SUCCESS, { scenerySpots })
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { fetchCount: scenerySpots.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    }, errorCallback)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
