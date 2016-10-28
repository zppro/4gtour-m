import * as mutationTypes from './mutation-types'

export default {
  [mutationTypes.$GLOABL_PREFIX$ + mutationTypes.START_LOADING] (state) {
    state.loading = true
  },
  [mutationTypes.$GLOABL_PREFIX$ + mutationTypes.FINISH_LOADING] (state) {
    state.loading = false
  }
}
