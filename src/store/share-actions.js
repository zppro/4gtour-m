import Vue from 'vue'
import { Toast, Indicator, MessageBox } from 'mint-ui'
import router from '../router'
import * as mutationTypes from './mutation-types'
import { toastOption } from '../config/mint-ui-option'
import { APICLOUD_OPEN_LOGIN_WIN, APICLOUD_LOGIN, APICLOUD_LOGOUT, APICLOUD_SHARE_WEIXIN } from './share-apicloud-event-names'

export const noop = () => {}
export const startLoading = ({ commit }, msg) => {
  commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING)
  Indicator.open(msg)
  return Promise.resolve(true)
}
export const finishLoading = ({ commit }) => {
  commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING)
  Indicator.close()
  return Promise.resolve(true)
}
export const submitForm = ({ commit }) => {
  commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.SUBMIT_FORM)
}
export const submitFormSuccess = ({ commit }) => {
  commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.SUBMIT_FORM_SUCCESS)
}
export const submitFormFail = ({ commit }) => {
  commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.SUBMIT_FORM_FAIL)
}
export const toast = (o, {msg, option}) => {
  Toast(Object.assign({message: msg}, toastOption, option))
}

export const toastSuccess = (o, msg = '操作成功') => {
  Toast(Object.assign({message: msg}, toastOption, {iconClass: 'fa fa-check'}))
}

export const toastError = (o, {msg}) => {
  Toast(Object.assign({message: msg}, toastOption, {iconClass: 'fa fa-close'}))
}

export const toastInfo = (o, msg) => {
  Toast(Object.assign({message: msg}, toastOption, {iconClass: 'fa fa-info'}))
}

export const confirm = (o, msg) => {
  return MessageBox.confirm('确定执行此操作?')
}

export const preloadD = ({ commit, dispatch }, key) => {
  return Vue.http.get('api/d/' + key).then(ret => {
    if (ret.data.success) {
      const values = ret.data.rows
      commit(mutationTypes.$DICTIONARY$ + mutationTypes.SET, {key, values})
      return values
    } else {
      dispatch('toastError', ret.data)
    }
  })
}

export const ensureD = ({ state, dispatch }, key) => {
  let values = state.d[key]
  if (!values) {
    return dispatch('preloadD', key)
  } else {
    return Promise.resolve(values)
  }
}

export const login = ({ state, dispatch }) => {
  if (state.env.isApiCloud) {
    // 呼出登录窗体
    dispatch('sendEventToApiCloud', { eventName: APICLOUD_OPEN_LOGIN_WIN })
  } else {
    router.replace({path: '/login', query: {redirect: window.location.hash.substr(1)}})
  }
}

export const addEventListenerFromApiCloud = ({ state, dispatch }) => {
  return Promise.resolve(true).then(() => {
    window.apiready = function () {
      window.api.addEventListener({ name: APICLOUD_LOGIN }, (ret, err) => {
        let token = ret.value.token
        if (token && token !== state.member.token) {
          dispatch('authMemberByToken', token)
        }
      })
      window.api.addEventListener({ name: APICLOUD_LOGOUT }, (ret, err) => {
        dispatch('logout', false)
      })
    }
  })
}
export const sendEventToApiCloud = ({ dispatch }, { eventName, eventData = null }) => {
  return Promise.resolve(true).then(() => {
    window.api && window.api.sendEvent({name: eventName, extra: eventData})
  })
}
export const shareToWeixinOnApiCloud = ({ dispatch }, { scene, title, description, thumbUrl, contentUrl, contentType = 'web_page' }) => {
  dispatch('startLoading', '分享中...').then(() => {
    dispatch('sendEventToApiCloud', {eventName: APICLOUD_SHARE_WEIXIN, eventData: {scene, contentType, title, description, thumbUrl, contentUrl}}).then(() => {
      dispatch('finishLoading')
    })
  })
}
