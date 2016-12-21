import Vue from 'vue'
import localStore from 'store'
import router from '../../router'
import * as mutationTypes from '../mutation-types'
import { WEIXIN_OPEN_REFRESH_TOKEN } from '../keys'
import { WEIXIN_OPEN_REQUEST_ACCESS_TOKEN, WEIXIN_OPEN_REFRESH_ACCESS_TOKEN, WEIXIN_OPEN_GET_USER_INFO } from '../loading-texts'

export const ENTITY_NAME = 'WEIXIN-OPEN'
export const CONFIG_NAME = '$CONFIG'
export const ACCESS_TOKEN_DATA_NAME = '$ACCESS_TOKEN_DATA'
export const USER_INFO_NAME = '$USER_INFO'

// initial state
const state = {
  config: {},
  accessTokenData: {},
  userInfo: {}
}

// getters
const getters = {
  isWeixinConfigLoaded (state) {
    // return !!state.member_id && state.member_id !== 'anonymity'
    return !!(state.config.appid && state.config.secret && state.config.redirect_uri)
  },
  weixinOpenAppid (state) {
    return state.config.appid
  },
  weixinOpenRedirectUrl (state) {
    return state.config.redirect_uri
  },
  weixinOpenQrCssHref (state) {
    return state.config.qr_css_href
  },
  weixinOpenUserInfo (state) {
    return state.userInfo
  }
}

// mutations
const mutations = {
  [ENTITY_NAME + CONFIG_NAME + mutationTypes.FETCH_DETAILS_SUCCESS] (state, config) {
    state.config = config
  },
  [ENTITY_NAME + ACCESS_TOKEN_DATA_NAME + mutationTypes.FETCH_DETAILS_SUCCESS] (state, accessTokenData) {
    console.log('commmit accessTokenData ')
    state.accessTokenData = accessTokenData
    localStore.set(WEIXIN_OPEN_REFRESH_TOKEN, accessTokenData.refresh_token)
  },
  [ENTITY_NAME + USER_INFO_NAME + mutationTypes.FETCH_DETAILS_SUCCESS] (state, userInfo) {
    state.userInfo = userInfo
  }
}
// actions
const actions = {
  weixinOpen$getConfig ({ commit, dispatch }) {
    return Vue.http.get('weixin/open/getOpenWeiXinConfig').then(ret => {
      if (ret.data.success) {
        const configRet = ret.data.ret
        commit(ENTITY_NAME + CONFIG_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, configRet)
      } else {
        // dispatch('toastError', {msg: ret.data.msg})
        dispatch('toastError', ret.data)
      }
    })
  },
  weixinOpen$RequestAccessToken ({ commit, dispatch }, code) {
    return Vue.http.get('weixin/open/requestAccessToken/' + code, {headers: {loadingText: WEIXIN_OPEN_REQUEST_ACCESS_TOKEN}}).then(ret => {
      if (ret.data.success) {
        const accessTokenDataRet = ret.data.ret
        commit(ENTITY_NAME + ACCESS_TOKEN_DATA_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, accessTokenDataRet)
      } else {
        let errMsg = ret.data.code === 40029 ? '无效的授权码' : ret.data.msg
        dispatch('toastError', {msg: errMsg})
      }
    })
  },
  weixinOpen$RefreshAccessToken ({ commit, dispatch }, refreshToken) {
    return Vue.http.get('weixin/open/refreshAccessToken/' + refreshToken, {headers: {loadingText: WEIXIN_OPEN_REFRESH_ACCESS_TOKEN}}).then(ret => {
      if (ret.data.success) {
        const accessTokenDataRet = ret.data.ret
        commit(ENTITY_NAME + ACCESS_TOKEN_DATA_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, accessTokenDataRet)
      } else {
        if (ret.data.code === 42002) {
          dispatch('toastInfo', 'refresh_token已经超时需要用户重新授权')
          // todo:此处稍后需要实现重定向到授权页面
        } else {
          dispatch('toastError', ret.data)
        }
      }
    })
  },
  weixinOpen$GetUserInfo ({ commit, state, rootState, dispatch }, code) {
    let p = Promise.resolve(true)
    if (!state.accessTokenData.access_token) {
      p = dispatch('weixinOpen$RequestAccessToken', code)
    }
    p.then(() => {
      if (state.accessTokenData.access_token) {
        Vue.http.get('weixin/open/getUserInfo/' + state.accessTokenData.access_token + ',' + state.accessTokenData.openid, {headers: {loadingText: WEIXIN_OPEN_GET_USER_INFO}}).then(ret => {
          if (ret.data.success) {
            const userInfoRet = ret.data.ret
            commit(ENTITY_NAME + USER_INFO_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, userInfoRet)
            dispatch('authMemberByOpenWeixinOnClient').then(() => {
              dispatch('toastSuccess', '微信登录成功').then(() => {
                router.replace({path: '/'})
              })
            })
          } else {
            if (ret.data.code === 42001) {
              let refreshToken = localStore.get(WEIXIN_OPEN_REFRESH_TOKEN)
              if (refreshToken) {
                p = dispatch('weixinOpen$RefreshAccessToken', refreshToken).then(() => {
                  dispatch('toastInfo', '点击认证按钮尝试重新认证')
                })
              } else {
                p = dispatch('toastInfo', 'refresh_token已经超时需要用户重新授权')
                // todo:此处稍后需要实现重定向到授权页面
              }
            } else {
              dispatch('toastError', ret.data)
            }
          }
        })
      }
    })
    return p
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
