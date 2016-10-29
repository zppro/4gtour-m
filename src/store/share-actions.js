import { Toast } from 'mint-ui'
import * as mutationTypes from './mutation-types'
import { toastOption } from '../config/mint-ui-option'

export const noop = () => {}
export const startLoading = ({ commit }) => { commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING) }
export const finishLoading = ({ commit }) => { commit(mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING) }
export const toast = (o, {msg, option}) => {
  Toast(Object.assign({message: msg}, toastOption, option))
}
export const validateAll = (o, { $validator, errors }) => {
  $validator.validateAll()
  if (errors.any()) {
    return false
  }
  return true
}
