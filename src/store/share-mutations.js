import Vue from 'vue'
import * as mutationTypes from './mutation-types'

export default {
  [mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING] (state) {
    state.loading = true
  },
  [mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING] (state) {
    state.loading = false
  },
  [mutationTypes.$GLOABL_PREFIX$ + mutationTypes.SHOW_LEFT_POPUP] (state) {
    state.leftPopupVisible = true
  },
  [mutationTypes.$GLOABL_PREFIX$ + mutationTypes.HIDE_LEFT_POPUP] (state) {
    state.leftPopupVisible = false
  },
  [mutationTypes.$GLOABL_PREFIX$ + mutationTypes.SUBMIT_FORM] (state) {
    state.submitingForm = true
  },
  [mutationTypes.$GLOABL_PREFIX$ + mutationTypes.SUBMIT_FORM_SUCCESS] (state) {
    state.submitingForm = false
  },
  [mutationTypes.$GLOABL_PREFIX$ + mutationTypes.SUBMIT_FORM_FAIL] (state) {
    state.submitingForm = false
  },
  [mutationTypes.$DICTIONARY$ + mutationTypes.SET] (state, {key, values}) {
    Vue.set(state.d, key, values)
  }
}
