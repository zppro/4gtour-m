import Vue from 'vue'
import * as mutationTypes from '../mutation-types'
import { DATA_FETCH_TEXT, DATA_SAVE_TEXT } from '../loading-texts'

const ENTITY_NAME = 'EXPERIENCE'

export const HOT_NAME = '$HOT'
export const MY_TWEETED_NAME = '$MY_TWEETED'
export const MY_STARED_NAME = '$MY_STARED'
export const FEELING_NAME = '$FEELING_NAME'
export const LIKES_NAME = '$LIKES'
export const STARS_NAME = '$STARS'

const MAX_HOT_COUNT = 100

// initial state
const state = {
  hot: [],
  hotFirstLoaded: false,
  currentIndexOfMine: 0,
  myTweeted: [],
  myTweetedFirstLoaded: false,
  myStared: [],
  myStaredFirstLoaded: false,
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
    return rootState.loading || state.noMoreOfHot || !state.hotFirstLoaded
  },
  appendMyTweetedDiabled (state, getters, rootState) {
    return rootState.loading || state.noMoreOfMyTweeted || !state.myTweetedFirstLoaded
  },
  appendMyStaredDiabled (state, getters, rootState) {
    return rootState.loading || state.noMoreOfMyStared || !state.myStaredFirstLoaded
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
    state.hotFirstLoaded = true
  },
  [ENTITY_NAME + HOT_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { experiences }) {
    state.hot = state.hot.concat(experiences)
  },
  [ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { experiences }) {
    state.myTweeted = experiences
    state.myTweetedFirstLoaded = true
  },
  [ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { experiences }) {
    state.myTweeted = state.myTweeted.concat(experiences)
  },
  [ENTITY_NAME + MY_STARED_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { experiences }) {
    state.myStared = experiences
    state.myStaredFirstLoaded = true
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
  },
  [ENTITY_NAME + FEELING_NAME + mutationTypes.ADD_DETAILS] (state, { content, imgs, location }) {
    state.current = { content, imgs, location }
  },
  [ENTITY_NAME + FEELING_NAME + mutationTypes.EDIT_DETAILS] (state, { content, imgs, location }) {
    content && Vue.set(state.current, 'content', content)
    imgs && Vue.set(state.current, 'imgs', imgs)
    location && Vue.set(state.current, 'location', location)
  },
  [ENTITY_NAME + LIKES_NAME + mutationTypes.SET] (state, {id, likes, liked}) {
    let theOne = state.hot.find(item => item.id === id)
    if (theOne) {
      Vue.set(theOne, 'likes', likes)
      Vue.set(theOne, 'liked', liked)
    }
    theOne = state.myTweeted.find(item => item.id === id)
    if (theOne) {
      Vue.set(theOne, 'likes', likes)
      Vue.set(theOne, 'liked', liked)
    }
    theOne = state.myStared.find(item => item.id === id)
    if (theOne) {
      Vue.set(theOne, 'likes', likes)
      Vue.set(theOne, 'liked', liked)
    }
  },
  [ENTITY_NAME + STARS_NAME + mutationTypes.SET] (state, {id, stars, stared}) {
    let theOne = state.hot.find(item => item.id === id)
    if (theOne) {
      Vue.set(theOne, 'stars', stars)
      Vue.set(theOne, 'stared', stared)
    }
    theOne = state.myTweeted.find(item => item.id === id)
    if (theOne) {
      Vue.set(theOne, 'stars', stars)
      Vue.set(theOne, 'stared', stared)
    }
    theOne = state.myStared.find(item => item.id === id)
    if (theOne) {
      Vue.set(theOne, 'stars', stars)
      Vue.set(theOne, 'stared', stared)
    }
  }
}

// actions
const actions = {
  fetchHotList ({ commit, rootState }) {
    console.log('fetchHotList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('trv/experiencesHot', {page: {size: rootState.dataFetchingSize, skip: 0}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.FETCH_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  appendHotList ({ commit, state, rootState }) {
    console.log('appendHotList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('trv/experiencesHot', {page: {size: rootState.dataFetchingSize, skip: state.hot.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        experiences.length > 0 && commit(ENTITY_NAME + HOT_NAME + mutationTypes.APPEND_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  fetchMyTweetedList ({ commit, rootState }) {
    console.log('fetchMyTweetedList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('trv/experiencesMyTweeted', {page: {size: rootState.dataFetchingSize, skip: 0}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.FETCH_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  appendMyTweetedList ({ commit, state, rootState }) {
    console.log('appendMyTweetedList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('trv/experiencesMyStared', {page: {size: rootState.dataFetchingSize, skip: state.hot.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        experiences.length > 0 && commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.APPEND_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  fetchMyStaredList ({ commit, rootState }) {
    console.log('fetchMyStaredList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('trv/experiencesMyStared', {page: {size: rootState.dataFetchingSize, skip: 0}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.FETCH_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  appendMyStaredList ({ commit, state, rootState }) {
    console.log('appendMyStaredList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('trv/experiencesMyStared', {page: {size: rootState.dataFetchingSize, skip: state.hot.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        experiences.length > 0 && commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.APPEND_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  fetchExperienceInfo ({commit, rootState, dispatch}, {id, setCurrent = true}) {
    return Vue.http.get('trv/experience/' + id, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      let experience
      if (ret.data.success) {
        experience = ret.data.ret
        setCurrent && commit(ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, {experience})
      } else {
        dispatch('toastError', ret.data)
      }
      return experience
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
  },
  addExperienceAsFeeling ({state, commit, dispatch}, feelingExperience) {
    return dispatch('noop').then(() => {
      commit(ENTITY_NAME + FEELING_NAME + mutationTypes.ADD_DETAILS, feelingExperience)
      return state.current
    })
  },
  editExperienceAsFeeling ({state, commit, dispatch}, feelingExperience) {
    return dispatch('noop').then(() => {
      commit(ENTITY_NAME + FEELING_NAME + mutationTypes.EDIT_DETAILS, feelingExperience)
      return state.current
    })
  },
  saveExperienceAsFeeling ({rootState, commit, dispatch}, feelingExperience) {
    if (!feelingExperience.id) {
      return Vue.http.post('trv/experience', feelingExperience, {headers: {loadingText: DATA_SAVE_TEXT}}).then(ret => {
        if (ret.data.success) {
          const experience = ret.data.ret
          commit(ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, {experience})
          dispatch('submitFormSuccess').then(() => {
            dispatch('toastSuccess')
          })
        } else {
          dispatch('submitFormFail').then(() => {
            dispatch('toastError', ret.data)
          })
        }
      })
    } else {
      return Vue.http.put('trv/experience/' + feelingExperience.id, feelingExperience, {headers: {loadingText: DATA_SAVE_TEXT}}).then(ret => {
        if (ret.data.success) {
          const experience = ret.data.ret
          commit(ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, {experience})
          dispatch('submitFormSuccess').then(() => {
            dispatch('toastSuccess')
          })
        } else {
          dispatch('submitFormFail').then(() => {
            dispatch('toastError', ret.data)
          })
        }
      })
    }
  },
  toggleLikeExperience ({rootState, commit, dispatch}, {id, liked}) {
    return Vue.http.post('trv/' + (liked ? 'experienceUnLike/' : 'experienceLike/') + id).then(ret => {
      if (ret.data.success) {
        const experienceLike = ret.data.ret
        commit(ENTITY_NAME + LIKES_NAME + mutationTypes.SET, experienceLike)
      } else {
        dispatch('toastError', ret.data)
      }
    })
  },
  toggleStarExperience ({rootState, commit, dispatch}, {id, stared}) {
    return Vue.http.post('trv/' + (stared ? 'experienceUnStar/' : 'experienceStar/') + id).then(ret => {
      if (ret.data.success) {
        const experienceStar = ret.data.ret
        commit(ENTITY_NAME + STARS_NAME + mutationTypes.SET, experienceStar)
      } else {
        dispatch('toastError', ret.data)
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
