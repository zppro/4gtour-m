import Vue from 'vue'
import { Indicator } from 'mint-ui'
import * as mutationTypes from '../mutation-types'

const ENTITY_NAME = 'EXPERIENCE'

export const HOT_NAME = '$HOT'
export const MY_TWEETED_NAME = '$MY_TWEETED'
export const MY_STARED_NAME = '$MY_STARED'

const MAX_HOT_COUNT = 100

// initial state
const state = {
  hot: [],
  currentIndexOfMine: 0,
  myTweeted: [],
  myStared: [],
  current: {},
  listRequestTypeAppending: true,
  noMoreOfHot: false,
  noMoreOfMyTweeted: false,
  noMoreOfMyStared: false
}

// getters
const getters = {
  experiencesHot (state) {
    return state.hot
  },
  currentIndexInExperiencesOfMine (state) {
    return state.currentIndexOfMine
  },
  experiencesMyTweeted (state) {
    return state.myTweeted
  },
  experiencesMyStared (state) {
    return state.myStared
  },
  experienceInDetails (state) {
    return state.current
  },
  appendHotDiabled (state, getters, rootState) {
    return rootState.loading || state.noMoreOfHot
  },
  appendMyTweetedDiabled (state, getters, rootState) {
    return rootState.loading || state.noMoreOfMyTweeted
  },
  appendMyStaredDiabled (state, getters, rootState) {
    return rootState.loading || state.noMoreOfMyStared
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
  [ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { experiences }) {
    state.myTweeted = experiences
  },
  [ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { experiences }) {
    state.myTweeted = state.myTweeted.concat(experiences)
  },
  [ENTITY_NAME + MY_STARED_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { experiences }) {
    state.myStared = experiences
  },
  [ENTITY_NAME + MY_STARED_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { experiences }) {
    state.myStared = state.myStared.concat(experiences)
  },
  [ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS] (state, { experience }) {
    state.current = experience
  },
  [ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfHot = state.hot >= MAX_HOT_COUNT || fetchCount < size
  },
  [ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfMyTweeted = state.hot >= MAX_HOT_COUNT || fetchCount < size
  },
  [ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfMyStared = state.hot >= MAX_HOT_COUNT || fetchCount < size
  },
  [ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_CURRENT] (state) {
    state.currentIndexOfMine = 0
  },
  [ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_CURRENT] (state) {
    state.currentIndexOfMine = 1
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
        experiences.length > 0 && commit(ENTITY_NAME + HOT_NAME + mutationTypes.APPEND_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
      commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
      Indicator.close()
    })
  },
  fetchMyTweetedList ({ commit, rootState }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    Indicator.open(rootState.dataFetchText)
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    Vue.http.post('trv/experiencesMyTweeted', {page: {size: rootState.dataFetchingSize, skip: 0}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.FETCH_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
      commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
      Indicator.close()
    })
  },
  appendMyTweetedList ({ commit, state, rootState }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    Indicator.open(rootState.dataFetchText)
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    Vue.http.post('trv/experiencesMyStared', {page: {size: rootState.dataFetchingSize, skip: state.hot.length}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        experiences.length > 0 && commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.APPEND_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
      commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
      Indicator.close()
    })
  },
  fetchMyStaredList ({ commit, rootState }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    Indicator.open(rootState.dataFetchText)
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    Vue.http.post('trv/experiencesMyStared', {page: {size: rootState.dataFetchingSize, skip: 0}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.FETCH_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
      commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
      Indicator.close()
    })
  },
  appendMyStaredList ({ commit, state, rootState }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    Indicator.open(rootState.dataFetchText)
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    Vue.http.post('trv/experiencesMyStared', {page: {size: rootState.dataFetchingSize, skip: state.hot.length}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        experiences.length > 0 && commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.APPEND_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
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
  setMyTweetedOfMine ({commit, dispatch}) {
    commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_CURRENT)
    return state.myTweeted.length === 0 ? dispatch('fetchMyTweetedList') : dispatch('noop')
  },
  setMyStaredOfMine ({commit, dispatch}) {
    commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_CURRENT)
    return state.myStared.length === 0 ? dispatch('fetchMyStaredList') : dispatch('noop')
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
