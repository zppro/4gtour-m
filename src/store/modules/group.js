import Vue from 'vue'
import * as mutationTypes from '../mutation-types'
import { DATA_FETCH_TEXT, DATA_SAVE_TEXT } from '../loading-texts'

const ENTITY_NAME = 'GROUP'
export const LATEST_NAME = '$LATEST'
// initial state
const state = {
  latest: {},
  all: [],
  current: {},
  groupsFirstLoaded: false,
  listRequestTypeAppending: true,
  noMoreOfIndexes: false,
  newGroup: true
}

// getters
const getters = {
  allGroups (state) {
    return state.all
  },
  latestParticipated (state) {
    return state.latest
  },
  groupInDetails (state) {
    return state.current
  },
  appendGroupDiabled (state, rootState) {
    return rootState.loading || state.noMoreOfIndexes || !state.groupsFirstLoaded
  },
  showGroupFetchIndicator (state, rootState) {
    return rootState.loading && !state.listRequestTypeAppending
  },
  showGroupAppendIndicator (state, rootState) {
    return rootState.loading && state.listRequestTypeAppending
  },
  haveNewGroup (state) {
    return state.newGroup
  }
}

// mutations
const mutations = {
  [ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE] (state, { listRequestType }) {
    state.listRequestTypeAppending = listRequestType === 'append'
  },
  [ENTITY_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { groups }) {
    state.all = groups
    state.groupsFirstLoaded = true
    state.newGroup = false
  },
  [ENTITY_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { groups }) {
    state.all = state.all.concat(groups)
  },
  [ENTITY_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfIndexes = fetchCount < size
  },
  [ENTITY_NAME + LATEST_NAME + mutationTypes.SET] (state, { latest }) {
    state.latest = latest
  },
  [ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS] (state, { group }) {
    state.current = group
  },
  [ENTITY_NAME + mutationTypes.HAVE_NEW_NOTIFY] (state) {
    state.newGroup = true
  },
  [ENTITY_NAME + mutationTypes.SET_ONE_IN_LIST] (state, { id, group }) {
    let theIndex = state.all.findIndex(item => item.id === id)
    if (theIndex !== -1) {
      state.all.splice(theIndex, 1, group)
    }
  }
}

// actions
const actions = {
  fetchGroups ({ commit, rootState }) {
    console.log('fetchGroups')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('trv/groups', {latestParticipated: state.latest.id, page: {size: rootState.dataFetchingSizeSmall, skip: 0}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const groups = ret.data.rows
        commit(ENTITY_NAME + mutationTypes.FETCH_LIST_SUCCESS, { groups })
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { fetchCount: groups.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  appendGroups ({ commit, state, rootState }) {
    console.log('appendGroups')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('trv/groups', {latestParticipated: state.latest.id, page: {size: rootState.dataFetchingSize, skip: state.all.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const groups = ret.data.rows
        groups.length > 0 && commit(ENTITY_NAME + mutationTypes.APPEND_LIST_SUCCESS, { groups })
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { fetchCount: groups.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  fetchLatestParticipated ({commit, dispatch}) {
    return Vue.http.get('trv/latestGroupParticipated', {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      let latest
      if (ret.data.success) {
        latest = ret.data.ret
        latest && commit(ENTITY_NAME + LATEST_NAME + mutationTypes.SET, {latest})
      } else {
        dispatch('toastError', ret.data)
      }
      return latest
    })
  },
  ensureLatestParticipated ({ state, rootState, dispatch }) {
    if (!state.latest.id) {
      return dispatch('fetchLatestParticipated')
    }
    return dispatch('noop')
  },
  fetchGroupInfo ({commit, dispatch}, {id}) {
    return Vue.http.get('trv/group/' + id, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      let group
      if (ret.data.success) {
        group = ret.data.ret
        commit(ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, {group})
      } else {
        dispatch('toastError', ret.data)
      }
      return group
    })
  },
  ensureGroup ({ state, rootState, dispatch }) {
    if (!state.current.id) {
      return dispatch('fetchGroupInfo', rootState.route.params)
    }
    return dispatch('noop')
  },
  saveGroup ({commit, dispatch}, theGroup) {
    if (!theGroup.id) {
      return Vue.http.post('trv/group', theGroup, {headers: {loadingText: DATA_SAVE_TEXT}}).then(ret => {
        const success = ret.data.success
        if (success) {
          const group = ret.data.ret
          commit(ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, {group})
          commit(ENTITY_NAME + mutationTypes.HAVE_NEW_NOTIFY)
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
      return Vue.http.put('trv/group/' + theGroup.id, theGroup, {headers: {loadingText: DATA_SAVE_TEXT}}).then(ret => {
        const success = ret.data.success
        if (success) {
          const group = ret.data.ret
          commit(ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, {group})
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
  updateLatestGroupStatus ({commit, dispatch}, {id, group_status}) {
    return Vue.http.put('trv/group/' + id, {group_status}, {headers: {loadingText: DATA_SAVE_TEXT}}).then(ret => {
      const success = ret.data.success
      if (success) {
        const latest = ret.data.ret
        latest && commit(ENTITY_NAME + LATEST_NAME + mutationTypes.SET, {latest})
        dispatch('toastSuccess')
      } else {
        dispatch('toastError', ret.data)
      }
      return success
    })
  },
  participateGroup ({commit, dispatch}, {id}) {
    return Vue.http.post('trv/groupParticipate/' + id, {}, {headers: {loadingText: DATA_SAVE_TEXT}}).then(ret => {
      const success = ret.data.success
      if (success) {
        const group = ret.data.ret
        commit(ENTITY_NAME + mutationTypes.SET_ONE_IN_LIST, {id, group})
        dispatch('toastSuccess')
      } else {
        dispatch('toastError', ret.data)
      }
      return success
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
