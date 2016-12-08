import Vue from 'vue'
import * as mutationTypes from '../mutation-types'
import { DATA_FETCH_TEXT, DATA_SAVE_TEXT } from '../loading-texts'

const ENTITY_NAME = 'EXPERIENCE'

export const HOT_NAME = '$HOT'
export const MY_TWEETED_NAME = '$MY_TWEETED'
export const MY_STARED_NAME = '$MY_STARED'
export const TA_TWEETED_NAME = '$TA_TWEETED'
export const TA_STARED_NAME = '$TA_STARED'
export const FEELING_NAME = '$FEELING'
export const LIKES_NAME = '$LIKES'
export const STARS_NAME = '$STARS'
export const SCENERY_ROUTE_NAME = '$SCENERY_ROUTE'

const MAX_HOT_COUNT = 100

// initial state
const state = {
  hot: [],
  hotFirstLoaded: false,
  currentIndexOfMine: 0,
  currentIndexOfTa: 0,
  myTweeted: [],
  myTweetedFirstLoaded: false,
  myStared: [],
  myStaredFirstLoaded: false,
  taTweeted: [],
  taTweetedFirstLoaded: false,
  taStared: [],
  taStaredFirstLoaded: false,
  current: {},
  listRequestTypeAppending: true,
  noMoreOfHot: false,
  noMoreOfMyTweeted: false,
  noMoreOfMyStared: false,
  noMoreOfTaTweeted: false,
  noMoreOfTaStared: false,
  newExperiences: true,
  scenerySpotsConfirmPick: false // 确认选择
}

// getters
const getters = {
  experiencesHot (state) {
    return state.hot
  },
  currentIndexInExperiencesOfMine (state) {
    return state.currentIndexOfMine
  },
  currentIndexInExperiencesOfTa (state) {
    return state.currentIndexOfTa
  },
  experiencesMyTweeted (state) {
    return state.myTweeted
  },
  experiencesMyStared (state) {
    return state.myStared
  },
  experiencesTaTweeted (state) {
    return state.taTweeted
  },
  experiencesTaStared (state) {
    return state.taStared
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
  appendTaTweetedDiabled (state, getters, rootState) {
    return rootState.loading || state.noMoreOfTaTweeted || !state.taTweetedFirstLoaded
  },
  appendTaStaredDiabled (state, getters, rootState) {
    return rootState.loading || state.noMoreOfTaStared || !state.taStaredFirstLoaded
  },
  showExperienceFetchIndicator (state, getters, rootState) {
    return rootState.loading && !state.listRequestTypeAppending
  },
  showExperienceAppendIndicator (state, getters, rootState) {
    return rootState.loading && state.listRequestTypeAppending
  },
  haveNewExperience (state) {
    return state.newExperiences
  },
  scenerySpotsConfirmPickToRoute (state) {
    return state.scenerySpotsConfirmPick
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
    state.newExperiences = false
  },
  [ENTITY_NAME + HOT_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { experiences }) {
    state.hot = state.hot.concat(experiences)
  },
  [ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { experiences }) {
    state.myTweeted = experiences
    state.myTweetedFirstLoaded = true
    state.newExperiences = false
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
  [ENTITY_NAME + TA_TWEETED_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { experiences }) {
    state.taTweeted = experiences
    state.taTweetedFirstLoaded = true
  },
  [ENTITY_NAME + TA_TWEETED_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { experiences }) {
    state.taTweeted = state.taTweeted.concat(experiences)
  },
  [ENTITY_NAME + TA_STARED_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { experiences }) {
    state.taStared = experiences
    state.taStaredFirstLoaded = true
  },
  [ENTITY_NAME + TA_STARED_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { experiences }) {
    state.taStared = state.taStared.concat(experiences)
  },
  [ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS] (state, { experience }) {
    state.current = experience
  },
  [ENTITY_NAME + HOT_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfHot = state.hot >= MAX_HOT_COUNT || fetchCount < size
  },
  [ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfMyTweeted = fetchCount < size
  },
  [ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfMyStared = fetchCount < size
  },
  [ENTITY_NAME + TA_TWEETED_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfTaTweeted = fetchCount < size
  },
  [ENTITY_NAME + TA_STARED_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfTaStared = fetchCount < size
  },
  [ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_CURRENT] (state) {
    state.currentIndexOfMine = 0
  },
  [ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_CURRENT] (state) {
    state.currentIndexOfMine = 1
  },
  [ENTITY_NAME + TA_TWEETED_NAME + mutationTypes.SET_CURRENT] (state) {
    state.currentIndexOfTa = 0
  },
  [ENTITY_NAME + TA_STARED_NAME + mutationTypes.SET_CURRENT] (state) {
    state.currentIndexOfTa = 1
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
    theOne = state.taTweeted.find(item => item.id === id)
    if (theOne) {
      Vue.set(theOne, 'likes', likes)
      Vue.set(theOne, 'liked', liked)
    }
    theOne = state.taStared.find(item => item.id === id)
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
    theOne = state.taTweeted.find(item => item.id === id)
    if (theOne) {
      Vue.set(theOne, 'stars', stars)
      Vue.set(theOne, 'stared', stared)
    }
    theOne = state.taStared.find(item => item.id === id)
    if (theOne) {
      Vue.set(theOne, 'stars', stars)
      Vue.set(theOne, 'stared', stared)
    }
  },
  [ENTITY_NAME + mutationTypes.HAVE_NEW_NOTIFY] (state) {
    state.newExperiences = true
  },
  [ENTITY_NAME + SCENERY_ROUTE_NAME + mutationTypes.CONFIRM] (state) {
    state.scenerySpotsConfirmPick = true
  },
  [ENTITY_NAME + SCENERY_ROUTE_NAME + mutationTypes.CONFIRM_RESTORE] (state) {
    state.scenerySpotsConfirmPick = false
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
    return Vue.http.post('trv/experiencesMyTweeted', {page: {size: rootState.dataFetchingSize, skip: state.myTweeted.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
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
    return Vue.http.post('trv/experiencesMyStared', {page: {size: rootState.dataFetchingSize, skip: state.myStared.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        experiences.length > 0 && commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.APPEND_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  fetchTaTweetedList ({ commit, rootState }) {
    console.log('fetchTaTweetedList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('trv/experiencesTaTweeted/' + rootState.route.params.id, {page: {size: rootState.dataFetchingSizeSmall, skip: 0}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        commit(ENTITY_NAME + TA_TWEETED_NAME + mutationTypes.FETCH_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + TA_TWEETED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSizeSmall })
      } else {
        commit(ENTITY_NAME + TA_TWEETED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  appendTaTweetedList ({ commit, state, rootState }) {
    console.log('appendTaTweetedList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('trv/experiencesTaTweeted/' + rootState.route.params.id, {page: {size: rootState.dataFetchingSizeSmall, skip: state.taTweeted.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        experiences.length > 0 && commit(ENTITY_NAME + TA_TWEETED_NAME + mutationTypes.APPEND_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + TA_TWEETED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSizeSmall })
      } else {
        commit(ENTITY_NAME + TA_TWEETED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  fetchTaStaredList ({ commit, rootState }) {
    console.log('fetchTaStaredList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('trv/experiencesTaStared/' + rootState.route.params.id, {page: {size: rootState.dataFetchingSizeSmall, skip: 0}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        commit(ENTITY_NAME + TA_STARED_NAME + mutationTypes.FETCH_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + TA_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSizeSmall })
      } else {
        commit(ENTITY_NAME + TA_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  appendTaStaredList ({ commit, state, rootState }) {
    console.log('appendTaStaredList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('trv/experiencesTaStared' + rootState.route.params.id, {page: {size: rootState.dataFetchingSizeSmall, skip: state.taStared.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const experiences = ret.data.rows
        experiences.length > 0 && commit(ENTITY_NAME + TA_STARED_NAME + mutationTypes.APPEND_LIST_SUCCESS, { experiences })
        commit(ENTITY_NAME + TA_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: experiences.length, size: rootState.dataFetchingSizeSmall })
      } else {
        commit(ENTITY_NAME + TA_STARED_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
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
  setMyTweeted ({commit, dispatch}) {
    commit(ENTITY_NAME + MY_TWEETED_NAME + mutationTypes.SET_CURRENT)
    return state.myTweeted.length === 0 ? dispatch('fetchMyTweetedList') : dispatch('noop')
  },
  setMyStared ({commit, dispatch}) {
    commit(ENTITY_NAME + MY_STARED_NAME + mutationTypes.SET_CURRENT)
    return state.myStared.length === 0 ? dispatch('fetchMyStaredList') : dispatch('noop')
  },
  setTaTweeted ({commit, dispatch}) {
    commit(ENTITY_NAME + TA_TWEETED_NAME + mutationTypes.SET_CURRENT)
    return state.taTweeted.length === 0 ? dispatch('fetchTaTweetedList') : dispatch('noop')
  },
  setTaStared ({commit, dispatch}) {
    commit(ENTITY_NAME + TA_STARED_NAME + mutationTypes.SET_CURRENT)
    return state.taStared.length === 0 ? dispatch('fetchTaStaredList') : dispatch('noop')
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
  saveExperience ({rootState, commit, dispatch}, theExperience) {
    if (!theExperience.id) {
      return Vue.http.post('trv/experience', theExperience, {headers: {loadingText: DATA_SAVE_TEXT}}).then(ret => {
        const success = ret.data.success
        if (success) {
          const experience = ret.data.ret
          commit(ENTITY_NAME + mutationTypes.HAVE_NEW_NOTIFY)
          commit(ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, {experience})
          dispatch('submitFormSuccess').then(() => {
            dispatch('toastSuccess')
          })
        } else {
          dispatch('submitFormFail').then(() => {
            dispatch('toastError', ret.data)
          })
        }
        return success
      })
    } else {
      return Vue.http.put('trv/experience/' + theExperience.id, theExperience, {headers: {loadingText: DATA_SAVE_TEXT}}).then(ret => {
        const success = ret.data.success
        if (success) {
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
        return success
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
  },
  confirmScenerySpotsToRoute ({commit, dispatch}) {
    return dispatch('noop').then(ret => {
      commit(ENTITY_NAME + SCENERY_ROUTE_NAME + mutationTypes.CONFIRM)
    })
  },
  restoreConfirmScenerySpotsToRoute ({commit, dispatch}) {
    return dispatch('noop').then(ret => {
      commit(ENTITY_NAME + SCENERY_ROUTE_NAME + mutationTypes.CONFIRM_RESTORE)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
