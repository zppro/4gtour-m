import Vue from 'vue'
import moment from 'moment'
import localStore from 'store'
import io from 'socket.io-client'
import { memberSocketUrl } from '../../config/socket-option'
import * as mutationTypes from '../mutation-types'
import { MEMBER_TOKEN } from '../keys'
import { APICLOUD_LOGIN, APICLOUD_LOGOUT } from '../share-apicloud-event-names'
import { MEMBER_LOGIN, DATA_FETCH_TEXT } from '../loading-texts'

export const ENTITY_NAME = 'MEMBER'
export const ORDER_NAME = '$ORDER'
export const UPLOAD_TOKEN_NAME = '$UPLOAD_TOKEN'
export const SELF_FOLLOWING_NAME = '$SELF_FOLLOWING'
export const SELF_FOLLOWER_NAME = '$SELF_FOLLOWER'
export const TA_NAME = '$TA_NAME'
export const TA_FOLLOWING_NAME = '$TA_FOLLOWING'
export const TA_FOLLOWER_NAME = '$TA_FOLLOWER'
export const FOLLOWING_TREND_NAME = '$FOLLOWING_TREND_NAME'

const initEmptyMemberInfo = { member_id: 'anonymity', member_name: '匿名', head_portrait: '', member_description: '' }
// initial state
const state = {
  token: '',
  socketEnable: false,
  self: initEmptyMemberInfo,
  isLogining: false,
  listRequestTypeAppending: true,
  socket: {},
  member$UploadTokenCurrent: '',
  member$Orders: [],
  member$OrderNoMore: false,
  member$OrderCurrent: {
    orderInfo: {},
    scenicSpotInfo: {}
  },
  self$Followings: [],
  self$FollowingFirstLoaded: false,
  noMoreOfSelf$Following: false,
  self$Followers: [],
  self$FollowerFirstLoaded: false,
  noMoreOfSelf$Follower: false,
  ta: {},
  ta$Followings: [],
  ta$FollowingFirstLoaded: false,
  noMoreOfTa$Following: false,
  ta$Followers: [],
  ta$FollowerFirstLoaded: false,
  noMoreOfTa$Follower: false,
  member$FollowingTrends: [],
  member$FollowingTrendFirstLoaded: false,
  noMoreOfMember$FollowingTrend: false
}

// getters
const getters = {
  allMember$Orders (state) {
    return state.member$Orders
  },
  isLogined (state) {
    return !!state.token
  },
  isLogining (state) {
    return state.isLogining
  },
  memberHaveUnpayAndValidOrders (state, getters) {
    return getters['memberHaveUnpayAndValidCount'] > 0
  },
  memberHaveUnpayAndValidCount (state) {
    return state.member$Orders.filter((r) => {
      return r.local_status === 'A0001' && moment().isBefore(r.last_pay_time)
    }).length
  },
  memberSocket (state) {
    return state.socket
  },
  memberInfo (state) {
    return state.self
  },
  showMemberFetchIndicator (state, getters, rootState) {
    return rootState.loading && !state.listRequestTypeAppending
  },
  showMemberAppendIndicator (state, getters, rootState) {
    return rootState.loading && state.listRequestTypeAppending
  },
  appendMember$OrderDiabled (state, getters, rootState) {
    return rootState.loading || state.member$OrderNoMore
  },
  member$OrderInDetails (state) {
    return state.member$OrderCurrent
  },
  member$UploadToken (state) {
    return state.member$UploadTokenCurrent
  },
  appendSelf$FollowingDiabled (state, rootState) {
    return rootState.loading || state.noMoreOfSelf$Following || !state.self$FollowingFirstLoaded
  },
  appendSelf$FollowerDiabled (state, rootState) {
    return rootState.loading || state.noMoreOfSelf$Follower || !state.self$FollowerFirstLoaded
  },
  allSelf$Followings (state) {
    return state.self$Followings
  },
  allSelf$Followers (state) {
    return state.self$Followers
  },
  taInfo (state) {
    return state.ta
  },
  appendTa$FollowingDiabled (state, getters, rootState) {
    return rootState.loading || state.noMoreOfTa$Following || !state.ta$FollowingFirstLoaded
  },
  appendTa$FollowerDiabled (state, getters, rootState) {
    return rootState.loading || state.noMoreOfTa$Follower || !state.ta$FollowerFirstLoaded
  },
  allTa$Followings (state) {
    return state.ta$Followings
  },
  allTa$Followers (state) {
    return state.ta$Followers
  },
  appendMember$FollowingTrendDiabled (state, rootState) {
    return rootState.loading || state.noMoreOfMember$FollowingTrend || !state.member$FollowingTrendFirstLoaded
  },
  allMember$FollowingTrends (state) {
    return state.member$FollowingTrends
  },
  allMember$FollowingTrendTotals (state) {
    let trendTotals = 0
    state.member$FollowingTrends.forEach(o => {
      trendTotals += o.group_value.length
    })
    return trendTotals
  }
}

// mutations
const mutations = {
  [ENTITY_NAME + mutationTypes.LOGIN_SUCCESS] (state, { memberInfo, token }) {
    state.self = memberInfo
    state.token = token
    state.isLogining = false
    localStore.set(MEMBER_TOKEN, token)
    if (state.socketEnable) {
      // 设置socket
      state.socket = io(memberSocketUrl)
      state.socket.on('connect', () => {
        console.log('member ' + memberInfo.member_id + ' connected')
      })
      state.socket.on('disconnect', () => {
        console.log('member ' + memberInfo.member_id + ' disconnected')
      })
      state.socket.on('SM001', (data) => {
        console.log('memberLogined: ' + data)
      })

      state.socket.emit('CM001', memberInfo.member_id)
    }
  },
  [ENTITY_NAME + mutationTypes.LOGIN_FAIL] (state) {
    state.self = initEmptyMemberInfo
    state.token = ''
    state.isLogining = false
    localStore.set(MEMBER_TOKEN, '')
  },
  [ENTITY_NAME + mutationTypes.LOGIN_OUT] (state) {
    state.self = initEmptyMemberInfo
    state.token = ''
    localStore.set(MEMBER_TOKEN, '')
  },
  [ENTITY_NAME + mutationTypes.LOGINING] (state) {
    state.isLogining = true
  },
  [ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE] (state, { listRequestType }) {
    state.listRequestTypeAppending = listRequestType === 'append'
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
  [ENTITY_NAME + UPLOAD_TOKEN_NAME + mutationTypes.SET] (state, uploadToken) {
    state.member$UploadTokenCurrent = uploadToken
  },
  [ENTITY_NAME + UPLOAD_TOKEN_NAME + mutationTypes.CLEAR] (state) {
    state.member$UploadTokenCurrent = ''
  },
  [ENTITY_NAME + SELF_FOLLOWING_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { followings }) {
    state.self$Followings = followings
    state.self$FollowingFirstLoaded = true
  },
  [ENTITY_NAME + SELF_FOLLOWING_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { followings }) {
    state.self$Followings = state.self$Followings.concat(followings)
  },
  [ENTITY_NAME + SELF_FOLLOWING_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfSelf$Following = fetchCount < size
  },
  [ENTITY_NAME + SELF_FOLLOWER_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { followers }) {
    state.self$Followers = followers
    state.self$FollowerFirstLoaded = true
  },
  [ENTITY_NAME + SELF_FOLLOWER_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { followers }) {
    state.self$Followers = state.self$Followers.concat(followers)
  },
  [ENTITY_NAME + SELF_FOLLOWER_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfSelf$Follower = fetchCount < size
  },
  [ENTITY_NAME + TA_NAME + mutationTypes.FETCH_DETAILS_SUCCESS] (state, { member$TA }) {
    state.ta = member$TA
  },
  [ENTITY_NAME + TA_NAME + mutationTypes.SET] (state, { isFollowedByMe, following, follower }) {
    Vue.set(state.ta, 'isFollowedByMe', isFollowedByMe)
    Vue.set(state.ta, 'following', following)
    Vue.set(state.ta, 'follower', follower)
  },
  [ENTITY_NAME + TA_FOLLOWING_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { followings }) {
    state.ta$Followings = followings
    state.ta$FollowingFirstLoaded = true
  },
  [ENTITY_NAME + TA_FOLLOWING_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { followings }) {
    state.ta$Followings = state.ta$Followings.concat(followings)
  },
  [ENTITY_NAME + TA_FOLLOWING_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfTa$Following = fetchCount < size
  },
  [ENTITY_NAME + TA_FOLLOWER_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { followers }) {
    state.ta$Followers = followers
    state.ta$FollowerFirstLoaded = true
  },
  [ENTITY_NAME + TA_FOLLOWER_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { followers }) {
    state.ta$Followers = state.ta$Followers.concat(followers)
  },
  [ENTITY_NAME + TA_FOLLOWER_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfTa$Follower = fetchCount < size
  },
  [ENTITY_NAME + FOLLOWING_TREND_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { trends }) {
    state.member$FollowingTrends = trends
    state.member$FollowingTrendFirstLoaded = true
  },
  [ENTITY_NAME + FOLLOWING_TREND_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { trends }) {
    let newFirstTrendGroup = trends.splice(0, 1)[0]
    let oldLastTrendGroup = state.member$FollowingTrends.find(item => item.group_key === newFirstTrendGroup.group_key)
    if (oldLastTrendGroup) {
      Vue.set(oldLastTrendGroup, 'group_value', oldLastTrendGroup.group_value.concat(newFirstTrendGroup.group_value))
    } else {
      state.member$FollowingTrends.push(newFirstTrendGroup)
    }
    state.member$FollowingTrends = state.member$FollowingTrends.concat(trends)
  },
  [ENTITY_NAME + FOLLOWING_TREND_NAME + mutationTypes.SET_NO_MORE] (state, { fetchCount, size }) {
    state.noMoreOfMember$FollowingTrend = fetchCount < size
  }
}
// actions
const actions = {
  authMember ({ commit, rootState, dispatch }, { username, password, category }) {
    commit(ENTITY_NAME + mutationTypes.LOGINING)
    return Vue.http.post('api/proxyLogin', { username, password, category }, {headers: {loadingText: MEMBER_LOGIN}}).then(ret => {
      if (ret.data.success) {
        const loginRet = ret.data.ret
        commit(ENTITY_NAME + mutationTypes.LOGIN_SUCCESS, loginRet)
        rootState.env.isApiCloud && dispatch('sendEventToApiCloud', { eventName: APICLOUD_LOGIN, eventData: {token: loginRet.token} })
      } else {
        dispatch('toastError', ret.data)
      }
    })
  },
  authMemberByToken ({ commit, rootState, dispatch }, token) {
    commit(ENTITY_NAME + mutationTypes.LOGINING)
    rootState.authMemberByTokenPromise = Vue.http.post('api/proxyLoginByToken', { token }, {headers: {loadingText: MEMBER_LOGIN}}).then(ret => {
      if (ret.data.success) {
        const loginRet = ret.data.ret
        commit(ENTITY_NAME + mutationTypes.LOGIN_SUCCESS, loginRet)
        dispatch('fetchMember$UploadToken')
      } else {
        dispatch('toastError', ret.data)
        commit(ENTITY_NAME + mutationTypes.LOGIN_FAIL)
      }
    })
    return rootState.authMemberByTokenPromise
  },
  logout ({ commit, rootState, dispatch }, isMannual = true) {
    commit(ENTITY_NAME + mutationTypes.LOGIN_OUT)
    commit(ENTITY_NAME + UPLOAD_TOKEN_NAME + mutationTypes.CLEAR)
    rootState.env.isApiCloud && isMannual && dispatch('sendEventToApiCloud', { eventName: APICLOUD_LOGOUT })
    return Promise.resolve(true)
  },
  authMemberByOpenWeixinOnClient ({ commit, dispatch, rootState, getters }) {
    commit(ENTITY_NAME + mutationTypes.LOGINING)
    let userInfo = getters['weixinOpenUserInfo']
    let p = Promise.resolve({ token: userInfo.openid, memberInfo: { member_id: userInfo.openid, member_name: userInfo.nickname, head_portrait: userInfo.headimgurl, member_description: '' } })
    if (!window.env.isApiCloud) {
      console.log('isApiCloud')
      p = Vue.http.post('api/proxyLoginByWeiXinOpenIdSyncToAPICloud', userInfo).then(ret => {
        if (ret.data.success) {
          rootState.env.isApiCloud && dispatch('sendEventToApiCloud', { eventName: 'login', eventData: ret.data.ret.token })
          return ret.data.ret
        } else {
          dispatch('toastError', ret.data)
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
    console.log(noLoading)
    let options = noLoading ? null : {headers: {loadingText: DATA_FETCH_TEXT}}
    console.log(options)
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('api/orders', {page: {size: rootState.dataFetchingSize, skip: 0}}, options).then(ret => {
      if (ret.data.success) {
        const member$Orders = ret.data.rows
        commit(ENTITY_NAME + ORDER_NAME + mutationTypes.FETCH_LIST_SUCCESS, { member$Orders })
        commit(ENTITY_NAME + ORDER_NAME + mutationTypes.SET_NO_MORE, { member$OrderRecordCount: member$Orders.length, size: rootState.dataFetchingSize })
      }
    })
  },
  appendMember$Orders ({ commit, state, rootState }, noLoading) {
    let options = noLoading ? null : {headers: {loadingText: DATA_FETCH_TEXT}}
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('api/orders', {page: {size: rootState.dataFetchingSize, skip: state.member$Orders.length}}, options).then(ret => {
      if (ret.data.success) {
        const member$Orders = ret.data.rows
        member$Orders.length > 0 && commit(ENTITY_NAME + ORDER_NAME + mutationTypes.APPEND_LIST_SUCCESS, { member$Orders })
        commit(ENTITY_NAME + ORDER_NAME + mutationTypes.SET_NO_MORE, { member$OrderRecordCount: member$Orders.length, size: rootState.dataFetchingSize })
      }
    })
  },
  fetchMember$OrderInfo ({commit, rootState}, { id }) {
    return Vue.http.get('api/order-details/' + id, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const member$Order = ret.data.ret
        commit(ENTITY_NAME + ORDER_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, {member$Order})
      }
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
        commit(ENTITY_NAME + UPLOAD_TOKEN_NAME + mutationTypes.SET, uploadToken)
      } else {
        dispatch('toastError', ret.data)
      }
    })
  },
  ensureMember$UploadToken ({ state, dispatch }) {
    if (state.self.member_id !== initEmptyMemberInfo.member_id && !state.member$UploadTokenCurrent) {
      return dispatch('fetchMember$UploadToken')
    }
    return dispatch('noop')
  },
  fetchSelf$FollowingList ({ commit, rootState }) {
    console.log('fetchSelf$FollowingList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('trv/followings/' + state.self.member_id, {page: {size: rootState.dataFetchingSize, skip: 0}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const followings = ret.data.rows
        commit(ENTITY_NAME + SELF_FOLLOWING_NAME + mutationTypes.FETCH_LIST_SUCCESS, { followings })
        commit(ENTITY_NAME + SELF_FOLLOWING_NAME + mutationTypes.SET_NO_MORE, { fetchCount: followings.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + SELF_FOLLOWING_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  appendSelf$FollowingList ({ commit, state, rootState }) {
    console.log('appendSelf$FollowingList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('trv/followings/' + state.self.member_id, {page: {size: rootState.dataFetchingSize, skip: state.ta$Followings.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const followings = ret.data.rows
        followings.length > 0 && commit(ENTITY_NAME + SELF_FOLLOWING_NAME + mutationTypes.APPEND_LIST_SUCCESS, { followings })
        commit(ENTITY_NAME + SELF_FOLLOWING_NAME + mutationTypes.SET_NO_MORE, { fetchCount: followings.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + SELF_FOLLOWING_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  fetchSelf$FollowerList ({ commit, rootState }) {
    console.log('fetchSelf$FollowerList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('trv/followers/' + state.self.member_id, {page: {size: rootState.dataFetchingSize, skip: 0}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const followers = ret.data.rows
        commit(ENTITY_NAME + SELF_FOLLOWER_NAME + mutationTypes.FETCH_LIST_SUCCESS, { followers })
        commit(ENTITY_NAME + SELF_FOLLOWER_NAME + mutationTypes.SET_NO_MORE, { fetchCount: followers.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + SELF_FOLLOWER_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  appendSelf$FollowerList ({ commit, state, rootState }) {
    console.log('appendSelf$FollowerList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('trv/followers/' + state.self.member_id, {page: {size: rootState.dataFetchingSize, skip: state.ta$Followings.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const followers = ret.data.rows
        followers.length > 0 && commit(ENTITY_NAME + SELF_FOLLOWER_NAME + mutationTypes.APPEND_LIST_SUCCESS, { followers })
        commit(ENTITY_NAME + SELF_FOLLOWER_NAME + mutationTypes.SET_NO_MORE, { fetchCount: followers.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + SELF_FOLLOWER_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  fetchMember$TA ({commit, dispatch}, { id }) {
    return Vue.http.get('trv/member/' + id).then(ret => {
      if (ret.data.success) {
        const member$TA = ret.data.ret
        commit(ENTITY_NAME + TA_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, {member$TA})
      } else {
        dispatch('toastError', ret.data)
      }
    })
  },
  ensureMember$TA ({ state, rootState, dispatch }) {
    if (!state.ta.code || state.ta.code !== rootState.route.params.id) {
      return dispatch('fetchMember$TA', rootState.route.params)
    }
    return dispatch('noop')
  },
  followMember$TA ({ state, commit, dispatch }, followMemberId) {
    return Vue.http.post('trv/memberFollow/' + (followMemberId || state.ta.code)).then(ret => {
      if (ret.data.success) {
        const followResult = ret.data.ret
        commit(ENTITY_NAME + TA_NAME + mutationTypes.SET, followResult)
      } else {
        dispatch('toastError', ret.data)
      }
    })
  },
  unFollowMember$TA ({ state, commit, dispatch }, unFollowMemberId) {
    return Vue.http.post('trv/memberUnFollow/' + (unFollowMemberId || state.ta.code)).then(ret => {
      if (ret.data.success) {
        const unFollowResult = ret.data.ret
        commit(ENTITY_NAME + TA_NAME + mutationTypes.SET, unFollowResult)
      } else {
        dispatch('toastError', ret.data)
      }
    })
  },
  fetchTa$FollowingList ({ commit, rootState }) {
    console.log('fetchTa$FollowingList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('trv/followings/' + (state.ta.code || rootState.route.params.id), {page: {size: rootState.dataFetchingSize, skip: 0}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const followings = ret.data.rows
        commit(ENTITY_NAME + TA_FOLLOWING_NAME + mutationTypes.FETCH_LIST_SUCCESS, { followings })
        commit(ENTITY_NAME + TA_FOLLOWING_NAME + mutationTypes.SET_NO_MORE, { fetchCount: followings.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + TA_FOLLOWING_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  appendTa$FollowingList ({ commit, state, rootState }) {
    console.log('appendTa$FollowingList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('trv/followings/' + (state.ta.code || rootState.route.params.id), {page: {size: rootState.dataFetchingSize, skip: state.ta$Followings.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const followings = ret.data.rows
        followings.length > 0 && commit(ENTITY_NAME + TA_FOLLOWING_NAME + mutationTypes.APPEND_LIST_SUCCESS, { followings })
        commit(ENTITY_NAME + TA_FOLLOWING_NAME + mutationTypes.SET_NO_MORE, { fetchCount: followings.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + TA_FOLLOWING_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  fetchTa$FollowerList ({ commit, rootState }) {
    console.log('fetchTa$FollowerList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('trv/followers/' + (state.ta.code || rootState.route.params.id), {page: {size: rootState.dataFetchingSize, skip: 0}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const followers = ret.data.rows
        commit(ENTITY_NAME + TA_FOLLOWER_NAME + mutationTypes.FETCH_LIST_SUCCESS, { followers })
        commit(ENTITY_NAME + TA_FOLLOWER_NAME + mutationTypes.SET_NO_MORE, { fetchCount: followers.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + TA_FOLLOWER_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  appendTa$FollowerList ({ commit, state, rootState }) {
    console.log('appendTa$FollowerList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('trv/followers/' + (state.ta.code || rootState.route.params.id), {page: {size: rootState.dataFetchingSize, skip: state.ta$Followings.length}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const followers = ret.data.rows
        followers.length > 0 && commit(ENTITY_NAME + TA_FOLLOWER_NAME + mutationTypes.APPEND_LIST_SUCCESS, { followers })
        commit(ENTITY_NAME + TA_FOLLOWER_NAME + mutationTypes.SET_NO_MORE, { fetchCount: followers.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + TA_FOLLOWER_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  fetchMember$FollowingTrendList ({ commit, rootState }) {
    console.log('fetchMember$FollowingTrendList')
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('trv/followingTrends', {page: {size: rootState.dataFetchingSize, skip: 0}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const trends = ret.data.rows
        let fetchCount = 0
        trends.forEach((o) => {
          fetchCount += o.group_value.length
        })
        commit(ENTITY_NAME + FOLLOWING_TREND_NAME + mutationTypes.FETCH_LIST_SUCCESS, { trends })
        commit(ENTITY_NAME + FOLLOWING_TREND_NAME + mutationTypes.SET_NO_MORE, { fetchCount: fetchCount, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + FOLLOWING_TREND_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
      }
    })
  },
  appendMember$FollowingTrendList ({ commit, getters, rootState }) {
    console.log('appendMember$FollowingTrendList')
    let skip = getters['allMember$FollowingTrendTotals']
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('trv/followingTrends', {page: {size: rootState.dataFetchingSize, skip: skip}}, {headers: {loadingText: DATA_FETCH_TEXT}}).then(ret => {
      if (ret.data.success) {
        const trends = ret.data.rows
        let fetchCount = 0
        trends.forEach((o) => {
          fetchCount += o.group_value.length
        })
        trends.length > 0 && commit(ENTITY_NAME + FOLLOWING_TREND_NAME + mutationTypes.APPEND_LIST_SUCCESS, { trends })
        commit(ENTITY_NAME + FOLLOWING_TREND_NAME + mutationTypes.SET_NO_MORE, { fetchCount: fetchCount, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + FOLLOWING_TREND_NAME + mutationTypes.SET_NO_MORE, { fetchCount: 0, size: 1 })
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
