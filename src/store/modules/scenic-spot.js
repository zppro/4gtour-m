import Vue from 'vue'
import localStore from 'store'
import * as mutationTypes from '../mutation-types'
import { ORDER_LINK_MAN, ORDER_LINK_PHONE, ORDER_TOURIST_ID_NO } from '../keys'
import { errorCallback } from '../../config/http-option'

const ENTITY_NAME = 'SCENIC-SPOT'

const MINUS_QUANTITY = '/MINUS_QUANTITY'
const PLUS_QUANTITY = '/PLUS_QUANTITY'

const LIST_TICKETS = '/LIST_TICKETS'
const CHOOSE_TICKET = '/CHOOSE_TICKET'

// initial state
const state = {
  all: [],
  current: {},
  listRequestTypeAppending: true,
  noMore: false
}

// getters
const getters = {
  allScenicSpotsInHome (state) {
    return state.all
  },
  scenicSpotInDetails (state) {
    return state.current
  },
  ticketsInSelect (state) {
    return (state.current || {}).tickets || []
  },
  ticketIdSelected (state) {
    return (state.current || {}).selected_ticket_id
  },
  infoPreparedToOrder (state) {
    return {
      UUlid: state.current.selected_ticket_uulid,
      UUid: state.current.selected_ticket_uuid,
      p_price: state.current.selected_ticket_price,
      quantity: state.current.buy_quantity,
      p_name: state.current.selected_ticket_name,
      delay_days: state.current.selected_ticket_delay_days,
      buy_days_in_advance: state.current.selected_ticket_buy_days_in_advance,
      buy_hour_in_advance: state.current.selected_ticket_buy_hour_in_advance,
      buy_limit_up: state.current.selected_ticket_buy_limit_up,
      buy_limit_low: state.current.selected_ticket_buy_limit_low,
      tourist_IDNo_flag: state.current.selected_ticket_tourist_IDNo_flag,
      link_man: localStore.get(ORDER_LINK_MAN),
      link_phone: localStore.get(ORDER_LINK_PHONE),
      tourist_id_no: localStore.get(ORDER_TOURIST_ID_NO)
    }
  },
  appendDiabled (state, getters, rootState) {
    return rootState.loading || state.noMore
  },
  showFetchIndicator (state, getters, rootState) {
    return rootState.loading && !state.listRequestTypeAppending
  },
  showAppendIndicator (state, getters, rootState) {
    return rootState.loading && state.listRequestTypeAppending
  }
}

// mutations
const mutations = {
  [ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE] (state, { listRequestType }) {
    state.listRequestTypeAppending = listRequestType === 'append'
  },
  [ENTITY_NAME + mutationTypes.FETCH_LIST_SUCCESS] (state, { scenicSpots }) {
    state.all = scenicSpots
  },
  [ENTITY_NAME + mutationTypes.APPEND_LIST_SUCCESS] (state, { scenicSpots }) {
    state.all = state.all.concat(scenicSpots)
  },
  [ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS] (state, { scenicSpot }) {
    // state.current = Object.assign({}, state.current, scenicSpot)
    state.current = scenicSpot
  },
  [ENTITY_NAME + MINUS_QUANTITY] (state, { size = 1 }) {
    state.current && (state.current.buy_quantity - size) > 0 && (state.current.buy_quantity = state.current.buy_quantity - size)
  },
  [ENTITY_NAME + PLUS_QUANTITY] (state, { size = 1 }) {
    state.current && (state.current.buy_quantity = state.current.buy_quantity + size)
  },
  [ENTITY_NAME + LIST_TICKETS] (state, { tickets }) {
    state.current && Vue.set(state.current, 'tickets', tickets)
  },
  [ENTITY_NAME + CHOOSE_TICKET] (state, { ticketId }) {
    if (state.current) {
      const ticket = state.current.tickets.find(o => o.ticket_id === ticketId)
      if (ticket) {
        Vue.set(state.current, 'selected_ticket_id', ticket.ticket_id)
        Vue.set(state.current, 'selected_ticket_uulid', ticket.ticket_uulid)
        Vue.set(state.current, 'selected_ticket_uuid', ticket.ticket_uuid)
        Vue.set(state.current, 'selected_ticket_price', ticket.ticket_price)
        Vue.set(state.current, 'selected_ticket_bid_price', ticket.ticket_bid_price)
        Vue.set(state.current, 'selected_ticket_name', ticket.ticket_name)
        Vue.set(state.current, 'delay_days', ticket.ticket_delay_days)
        Vue.set(state.current, 'buy_days_in_advance', ticket.ticket_buy_days_in_advance)
        Vue.set(state.current, 'buy_hour_in_advance', ticket.ticket_buy_hour_in_advance)
        Vue.set(state.current, 'buy_limit_up', ticket.ticket_buy_limit_up)
        Vue.set(state.current, 'buy_limit_low', ticket.ticket_buy_limit_low)
        Vue.set(state.current, 'tourist_IDNo_flag', ticket.ticket_tourist_IDNo_flag)
      }
    }
  },
  [ENTITY_NAME + mutationTypes.SET_NO_MORE] (state, { scenicSpotRecordCount, size }) {
    state.noMore = scenicSpotRecordCount < size
  }
}

// actions
const actions = {
  fetchScenicSpots ({ commit, rootState }) {
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'fetch' })
    return Vue.http.post('api/scenicSpots', {page: {size: rootState.dataFetchingSize, skip: 0}}, {headers: {loadingText: 'dataFetchText'}}).then(ret => {
      if (ret.data.success) {
        const scenicSpots = ret.data.rows
        commit(ENTITY_NAME + mutationTypes.FETCH_LIST_SUCCESS, { scenicSpots })
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { scenicSpotRecordCount: scenicSpots.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { scenicSpotRecordCount: 0, size: 1 })
      }
    }, errorCallback)
  },
  appendScenicSpots ({ commit, state, rootState }) {
    commit(ENTITY_NAME + mutationTypes.SET_LIST_REQUEST_TYPE, { listRequestType: 'append' })
    return Vue.http.post('api/scenicSpots', {page: {size: rootState.dataFetchingSize, skip: state.all.length}}, {headers: {loadingText: 'dataFetchText'}}).then(ret => {
      if (ret.data.success) {
        const scenicSpots = ret.data.rows
        scenicSpots.length > 0 && commit(ENTITY_NAME + mutationTypes.APPEND_LIST_SUCCESS, { scenicSpots })
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { scenicSpotRecordCount: scenicSpots.length, size: rootState.dataFetchingSize })
      } else {
        commit(ENTITY_NAME + mutationTypes.SET_NO_MORE, { scenicSpotRecordCount: 0, size: 1 })
      }
    }, errorCallback)
  },
  fetchScenicSpotInfo ({commit, rootState}, { id }) {
    return Vue.http.get('api/scenicSpot/' + id, {headers: {loadingText: 'dataFetchText'}}).then(ret => {
      if (ret.data.success) {
        const scenicSpot = ret.data.ret
        commit(ENTITY_NAME + mutationTypes.FETCH_DETAILS_SUCCESS, { scenicSpot })
        return scenicSpot
      }
    }, errorCallback)
  },
  minusQuantity ({ commit }, { size = 1 }) {
    commit(ENTITY_NAME + MINUS_QUANTITY, { size })
  },
  plusQuantity ({ commit }, { size = 1 }) {
    commit(ENTITY_NAME + PLUS_QUANTITY, { size })
  },
  listTickets ({ commit }, { id }) {
    return Vue.http.get('api/tickets/' + id, {headers: {loadingText: 'dataFetchText'}}).then(ret => {
      if (ret.data.success) {
        const tickets = ret.data.rows
        commit(ENTITY_NAME + LIST_TICKETS, { tickets })
        return tickets
      }
    }, errorCallback)
  },
  chooseTicket ({ commit }, { ticketId }) {
    commit(ENTITY_NAME + CHOOSE_TICKET, { ticketId })
  },
  ensureScenicSpot ({ state, rootState, dispatch }) {
    if (!state.current.id) {
      return dispatch('fetchScenicSpotInfo', rootState.route.params)
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
