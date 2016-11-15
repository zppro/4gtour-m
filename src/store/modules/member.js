import Vue from 'vue'
import { Indicator } from 'mint-ui'
import localStore from 'store'
import * as mutationTypes from '../mutation-types'
import { MEMBER_TOKEN } from '../keys'
import { APICLOUD_LOGIN, APICLOUD_LOGOUT } from '../share-apicloud-event-names'

export const ENTITY_NAME = 'MEMBER'
export const ORDER_NAME = '$ORDER'

const initEmptyMemberInfo = { member_id: 'anonymity', member_name: '匿名', head_portrait: '', member_description: '' }
// initial state
const state = {
  token: '',
  self: initEmptyMemberInfo,
  member$Orders: [],
  member$OrderUnreadCount: 0,
  member$OrderListRequestTypeAppending: true,
  member$OrderNoMore: false
}

// getters
const getters = {
  allMember$Orders (state) {
    return state.member$Orders
  },
  isLogined (state) {
    // return !!state.member_id && state.member_id !== 'anonymity'
    return !!state.token
  },
  memberHaveUnreadOrders (state) {
    return state.member$OrderUnreadCount > 0
  },
  memberUnreadOrderCount (state) {
    return state.member$OrderUnreadCount
  },
  memberInfo (state) {
    return state.self
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
  [ENTITY_NAME + mutationTypes.LOGIN_SUCCESS] (state, { memberInfo, token }) {
    state.self = memberInfo
    state.token = token
    localStore.set(MEMBER_TOKEN, token)
  },
  [ENTITY_NAME + mutationTypes.LOGIN_FAIL] (state) {
    state.self = initEmptyMemberInfo
    state.token = ''
    // localStore.set(MEMBER_TOKEN, '')
  },
  [ENTITY_NAME + mutationTypes.LOGIN_OUT] (state) {
    state.self = initEmptyMemberInfo
    state.token = ''
    localStore.set(MEMBER_TOKEN, '')
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
  },
  [ENTITY_NAME + ORDER_NAME + mutationTypes.ADD_UNREADED] (state, quantity) {
    state.member$OrderUnreadCount = state.member$OrderUnreadCount + quantity
  },
  [ENTITY_NAME + ORDER_NAME + mutationTypes.REMOVE_UNREADED] (state, quantity) {
    state.member$OrderUnreadCount - quantity >= 0 ? (state.member$OrderUnreadCount = state.member$OrderUnreadCount - quantity) : (state.member$OrderUnreadCount = 0)
  },
  [ENTITY_NAME + ORDER_NAME + mutationTypes.CLEAR_UNREADED] (state) {
    state.member$OrderUnreadCount = 0
  }
}
// actions
const actions = {
  authMember ({ commit, rootState, dispatch }, { username, password, category }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    Indicator.open('登录中...')
    setTimeout(() => {
      Vue.http.post('api/proxyLogin', { username, password, category }).then(ret => {
        if (ret.data.success) {
          const loginRet = ret.data.ret
          commit(ENTITY_NAME + mutationTypes.LOGIN_SUCCESS, loginRet)
          rootState.env.isApiCloud && dispatch('sendEventToApiCloud', { eventName: APICLOUD_LOGIN, eventData: {token: loginRet.token} })
        } else {
          dispatch('toast', {msg: ret.data.msg, option: {iconClass: 'fa fa-close'}})
        }
        commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
        Indicator.close()
      })
    }, rootState.preLoadingMillisecond)
  },
  authMemberByToken ({ commit, rootState, dispatch }, token) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    Indicator.open('登录中...')
    setTimeout(() => {
      Vue.http.post('api/proxyLoginByToken', { token }).then(ret => {
        if (ret.data.success) {
          const loginRet = ret.data.ret
          commit(ENTITY_NAME + mutationTypes.LOGIN_SUCCESS, loginRet)
        } else {
          dispatch('toast', {msg: ret.data.msg, option: {iconClass: 'fa fa-close'}})
          commit(ENTITY_NAME + mutationTypes.LOGIN_FAIL)
        }
        commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
        Indicator.close()
      })
    }, rootState.preLoadingMillisecond)
  },
  logout ({ commit, rootState, dispatch }, isMannual = true) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    Indicator.open('安全退出...')
    setTimeout(() => {
      commit(ENTITY_NAME + mutationTypes.LOGIN_OUT)
      rootState.env.isApiCloud && isMannual && dispatch('sendEventToApiCloud', { eventName: APICLOUD_LOGOUT })
      commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
      Indicator.close()
    }, rootState.preLoadingMillisecond)
  },
  authMemberByOpenWeixinOnClient ({ commit, dispatch, rootState, getters }) {
    let userInfo = getters['weixinOpenUserInfo']
    let p = Promise.resolve({ token: userInfo.openid, memberInfo: { member_id: userInfo.openid, member_name: userInfo.nickname, head_portrait: userInfo.headimgurl, member_description: '' } })
    if (!window.env.isApiCloud) {
      console.log('isApiCloud')
      p = Vue.http.post('api/proxyLoginByWeiXinOpenIdSyncToAPICloud', userInfo).then(ret => {
        if (ret.data.success) {
          rootState.env.isApiCloud && dispatch('sendEventToApiCloud', { eventName: 'login', eventData: ret.data.ret.token })
          return ret.data.ret
        } else {
          dispatch('toast', {msg: ret.data.msg, option: {iconClass: 'fa fa-close'}})
          commit(ENTITY_NAME + mutationTypes.LOGIN_FAIL)
          return null
        }
      })
    }
    p.then((loginRet) => {
      loginRet && commit(ENTITY_NAME + mutationTypes.LOGIN_SUCCESS, loginRet)
    })
    return p
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
          commit(ENTITY_NAME + ORDER_NAME + mutationTypes.CLEAR_UNREADED)
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
          commit(ENTITY_NAME + ORDER_NAME + mutationTypes.CLEAR_UNREADED)
        }
        commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
      })
    }, rootState.preLoadingMillisecond)
  },
  markMember$OrderUnread ({ commit }) {
    commit(ENTITY_NAME + ORDER_NAME + mutationTypes.ADD_UNREADED, 1)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
