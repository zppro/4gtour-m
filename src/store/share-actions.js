import { Toast, Indicator } from 'mint-ui'
import * as mutationTypes from './mutation-types'
import { toastOption } from '../config/mint-ui-option'
import { APICLOUD_LOGIN, APICLOUD_LOGOUT, APICLOUD_SHARE_WEIXIN } from './share-apicloud-event-names'

export const noop = () => {}
export const startLoading = ({ commit }, {msg}) => {
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
  dispatch('startLoading', {msg: '分享中...'}).then(() => {
    dispatch('sendEventToApiCloud', {eventName: APICLOUD_SHARE_WEIXIN, eventData: {scene, contentType, title, description, thumbUrl, contentUrl}}).then(() => {
      dispatch('finishLoading')
    })
  })
}
