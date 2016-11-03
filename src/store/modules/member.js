import Vue from 'vue'
import { Indicator } from 'mint-ui'
import localStore from 'store'
import * as mutationTypes from '../mutation-types'

const ENTITY_NAME = 'MEMBER'
const ORDER_NAME = '$ORDER'

// initial state
const state = {
  token: '',
  self: (function () {
    let ret = { member_id: 'anonymity', member_name: '匿名' }
    if (window.env.isApiCloud) {
      ret = window.proxy.member
    } else {
      let _member = localStore.get('member')
      _member && (ret = _member)
    }
    return ret
  }()),
  member$Orders: [],
  member$OrderListRequestTypeAppending: true,
  member$OrderNoMore: false
}

// getters
const getters = {
  allMember$Orders (state) {
    return state.member$Orders
  },
  appendMember$OrderDiabled (state, getters, rootState) {
    return rootState.loading || state.member$OrderNoMore
  },
  showMember$OrderFetchIndicator (state, getters, rootState) {
    return rootState.loading && !state.member$OrderListRequestTypeAppending
  },
  showMember$OrderAppendIndicator (state, getters, rootState) {
    return rootState.loading && state.member$OrderListRequestTypeAppending
  }
}

// mutations
const mutations = {
  [ENTITY_NAME + mutationTypes.LOGIN] (state, { member_d, member_name }) {
    Vue.set(state.self, 'member_id', member_d)
    Vue.set(state.self, 'member_name', member_name)
  },
  [ENTITY_NAME + ORDER_NAME + mutationTypes.SET_LIST_REQUEST_TYPE] (state, { listRequestType }) {
    state.member$OrderListRequestTypeAppending = listRequestType === 'append'
  },
  [ENTITY_NAME + ORDER_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { member$Orders }) {
    state.member$Orders = member$Orders
  },
  [ENTITY_NAME + ORDER_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { member$Orders }) {
    state.member$Orders = state.member$Orders.concat(member$Orders)
  },
  [ENTITY_NAME + ORDER_NAME + mutationTypes.SET_NO_MORE] (state, { member$OrderRecordCount, size }) {
    state.member$OrderNoMore = member$OrderRecordCount < size
  }
}
console.log(111123)
// actions
const actions = {
  authMember ({ commit, rootState }, { username, password }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    Indicator.open('登录中...')
    setTimeout(() => {
      Vue.http.post('api/proxyLogin', { username, password, category: 3 }).then(ret => {
        console.log(ret)
        commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
        Indicator.close()
      })
    }, rootState.preLoadingMillisecond)
  },
  fetchMember$Orders ({ commit, rootState }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    commit(ENTITY_NAME + ORDER_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    setTimeout(() => {
      Vue.http.post('api/orders', {page: {size: rootState.dataFetchingSize, skip: 0}}).then(ret => {
        if (ret.data.success) {
          const member$Orders = ret.data.rows
          commit(ENTITY_NAME + ORDER_NAME + mutationTypes.FETCH_LIST_SUCCESS, { member$Orders })
          commit(ENTITY_NAME + ORDER_NAME + mutationTypes.SET_NO_MORE, { scenicSpotRecordCount: member$Orders.length, size: rootState.dataFetchingSize })
        }
        commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
      })
    }, rootState.preLoadingMillisecond)
  },
  appendMember$Orders ({ commit, state, rootState }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    commit(ENTITY_NAME + ORDER_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    setTimeout(() => {
      Vue.http.post('api/orders', {page: {size: rootState.dataFetchingSize, skip: state.member$Orders.length}}).then(ret => {
        if (ret.data.success) {
          const member$Orders = ret.data.rows
          member$Orders.length > 0 && commit(ENTITY_NAME + ORDER_NAME + mutationTypes.APPEND_LIST_SUCCESS, { member$Orders })
          commit(ENTITY_NAME + ORDER_NAME + mutationTypes.SET_NO_MORE, { member$OrderRecordCount: member$Orders.length, size: rootState.dataFetchingSize })
        }
        commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
      })
    }, rootState.preLoadingMillisecond)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
