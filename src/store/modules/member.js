import Vue from 'vue'
import moment from 'moment'
import { Indicator } from 'mint-ui'
import localStore from 'store'
import * as mutationTypes from '../mutation-types'
import { MEMBER_TOKEN } from '../keys'
import { APICLOUD_LOGIN, APICLOUD_LOGOUT } from '../share-apicloud-event-names'

export const ENTITY_NAME = 'MEMBER'
export const ORDER_NAME = '$ORDER'
export const UPLOAD_TOKEN = '$UPLOAD_TOKEN'

const initEmptyMemberInfo = { member_id: 'anonymity', member_name: '匿名', head_portrait: '', member_description: '' }
// initial state
const state = {
  token: '',
  self: initEmptyMemberInfo,
  member$Orders: [],
  member$OrderListRequestTypeAppending: true,
  member$OrderNoMore: false,
  member$OrderCurrent: {
    orderInfo: {},
    scenicSpotInfo: {}
  },
  member$UploadTokenCurrent: ''
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
  memberHaveUnpayAndValidOrders (state, getters) {
    return getters['memberHaveUnpayAndValidCount'] > 0
  },
  memberHaveUnpayAndValidCount (state) {
    return state.member$Orders.filter((r) => {
      return r.local_status === 'A0001' && moment().isBefore(r.last_pay_time)
    }).length
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
  },
  member$OrderInDetails (state) {
    return state.member$OrderCurrent
  },
  member$UploadToken (state) {
    return state.member$UploadTokenCurrent
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
  [ENTITY_NAME + ORDER_NAME + mutationTypes.FETCH_DETAILS_SUCCESS] (state, { member$Order }) {
    state.member$OrderCurrent = member$Order
  },
  [ENTITY_NAME + ORDER_NAME + mutationTypes.SET_NO_MORE] (state, { member$OrderRecordCount, size }) {
    state.member$OrderNoMore = member$OrderRecordCount < size
  },
  [ENTITY_NAME + UPLOAD_TOKEN + mutationTypes.SET] (state, uploadToken) {
    state.member$UploadTokenCurrent = uploadToken
  },
  [ENTITY_NAME + UPLOAD_TOKEN + mutationTypes.CLEAR] (state) {
    state.member$UploadTokenCurrent = ''
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
      commit(ENTITY_NAME + UPLOAD_TOKEN + mutationTypes.CLEAR)
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
  fetchMember$Orders ({ commit, rootState }, noLoading) {
    if (!noLoading) {
      commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
      Indicator.open(rootState.dataFetchText)
    }
    commit(ENTITY_NAME + ORDER_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    Vue.http.post('api/orders', {page: {size: rootState.dataFetchingSize, skip: 0}}).then(ret => {
      if (ret.data.success) {
        const member$Orders = ret.data.rows
        commit(ENTITY_NAME + ORDER_NAME + mutationTypes.FETCH_LIST_SUCCESS, { member$Orders })
        commit(ENTITY_NAME + ORDER_NAME + mutationTypes.SET_NO_MORE, { member$OrderRecordCount: member$Orders.length, size: rootState.dataFetchingSize })
      }
      if (!noLoading) {
        commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
        Indicator.close()
      }
    })
  },
  appendMember$Orders ({ commit, state, rootState }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    commit(ENTITY_NAME + ORDER_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    Vue.http.post('api/orders', {page: {size: rootState.dataFetchingSize, skip: state.member$Orders.length}}).then(ret => {
      if (ret.data.success) {
        const member$Orders = ret.data.rows
        member$Orders.length > 0 && commit(ENTITY_NAME + ORDER_NAME + mutationTypes.APPEND_LIST_SUCCESS, { member$Orders })
        commit(ENTITY_NAME + ORDER_NAME + mutationTypes.SET_NO_MORE, { member$OrderRecordCount: member$Orders.length, size: rootState.dataFetchingSize })
      }
      commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
    })
  },
  fetchMember$OrderInfo ({commit, rootState}, { id }) {
    commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
    Indicator.open(rootState.dataFetchText)
    return Vue.http.get('api/order-details/' + id).then(ret => {
      if (ret.data.success) {
        const member$Order = ret.data.ret
        commit(ENTITY_NAME + ORDER_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, {member$Order})
      }
      commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
      Indicator.close()
    })
  },
  ensureMember$OrderInfo ({ state, rootState, dispatch }) {
    if (!state.member$OrderCurrent.id || state.member$OrderCurrent.id !== rootState.route.params.id) {
      return dispatch('fetchMember$OrderInfo', rootState.route.params)
    }
    return dispatch('noop')
  },
  fetchMember$UploadToken ({commit, dispatch}) {
    return Vue.http.get('qiniu/open/uploadToken/').then(ret => {
      if (ret.data.success) {
        const uploadToken = ret.data.ret
        commit(ENTITY_NAME + UPLOAD_TOKEN + mutationTypes.SET, uploadToken)
      } else {
        dispatch('toast', {msg: ret.data.msg, option: {iconClass: 'fa fa-close'}})
      }
    })
  },
  ensureMember$UploadToken ({ state, dispatch }) {
    if (!state.member$UploadTokenCurrent) {
      return dispatch('fetchMember$UploadToken')
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
