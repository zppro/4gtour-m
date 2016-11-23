import Vue from 'vue'
import { Indicator } from 'mint-ui'
import * as mutationTypes from '../mutation-types'

const ENTITY_NAME = 'EXPERIENCE'

export const HOT_NAME = '$HOT'

const MAX_HOT_COUNT = 100

// initial state
const state = {
  hot: [],
  current: {},
  listRequestTypeAppending: true,
  noMoreOfHot: false
}

// getters
const getters = {
  experiencesHot (state) {
    return state.hot
  },
  experienceInDetails (state) {
    return state.current
  },
  appendHotDiabled (state, getters, rootState) {
    return rootState.loading || state.noMoreOfHot
  },
  showExperienceFetchIndicator (state, getters, rootState) {
    return rootState.loading && !state.listRequestTypeAppending
  },
  showExperienceAppendIndicator (state, getters, rootState) {
    return rootState.loading && state.listRequestTypeAppending
  }
}

// mutations
const mutations = {
  [ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE] (state, { listRequestType }) {
    state.listRequestTypeAppending = listRequestType === 'append'
  },
  [ENTITY_NAME + HOT_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { experiences }) {
    state.hot = experiences
  },
  [ENTITY_NAME + HOT_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { experiences }) {
    state.hot = state.hot.concat(experiences)
  },
  [ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS] (state, { experience }) {
    state.current = experience
  },
  [ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfHot = state.hot >= MAX_HOT_COUNT || fetchCount < size
  }
}

// actions
const actions = {
  fetchHotList ({ commit, rootState }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    Indicator.open(rootState.dataFetchText)
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    Vue.http.post('trv/experiencesHot', {page: {size: rootState.dataFetchingSize, skip: 0}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.FETCH_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
      commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
      Indicator.close()
    })
  },
  appendHotList ({ commit, state, rootState }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    Indicator.open(rootState.dataFetchText)
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    Vue.http.post('trv/experiencesHot', {page: {size: rootState.dataFetchingSize, skip: state.hot.length}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        experiences.length > 0 && commit(ENTITY_NAME + mutationTypes.APPEND_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
      commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
      Indicator.close()
    })
  },
  fetchExperienceInfo ({commit, rootState}, { id }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    Indicator.open(rootState.dataFetchText)
    return Vue.http.get('trv/experience/' + id).then(ret => {
      if (ret.data.success) {
        const experience = ret.data.ret
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, {experience})
      }
      commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
      Indicator.close()
    })
  },
  ensureExperience ({ state, rootState, dispatch }) {
    if (!state.current.id) {
      return dispatch('fetchExperienceInfo', rootState.route.params)
    }
    return dispatch('noop')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
