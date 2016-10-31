import Vue from 'vue'
import * as mutationTypes from '../mutation-types'
import dataFetchingOption from '../../config/data-fetching-option'

const entityName = 'SCENIC-SPOT'

const MINUS_QUANTITY = '/MINUS_QUANTITY'
const PLUS_QUANTITY = '/PLUS_QUANTITY'

const LIST_TICKETS = '/LIST_TICKETS'
const CHOOSE_TICKET = '/CHOOSE_TICKET'

// initial state
const state = {
  all: [],
  current: {}
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
      p_name: state.current.selected_ticket_name
    }
  }
}

// mutations
const mutations = {
  [entityName + mutationTypes.FETCH_LIST_SUCCESS] (state, { scenicSpots }) {
    state.all = scenicSpots
  },
  [entityName + mutationTypes.APPEND_LIST_SUCCESS] (state, { scenicSpots }) {
    state.all = state.all.concat(scenicSpots)
  },
  [entityName + mutationTypes.FETCH_DETAILS_SUCCESS] (state, { scenicSpot }) {
    // state.current = Object.assign({}, state.current, scenicSpot)
    state.current = scenicSpot
  },
  [entityName + MINUS_QUANTITY] (state, { size = 1 }) {
    state.current && (state.current.buy_quantity - size) > 0 && (state.current.buy_quantity = state.current.buy_quantity - size)
  },
  [entityName + PLUS_QUANTITY] (state, { size = 1 }) {
    state.current && (state.current.buy_quantity = state.current.buy_quantity + size)
  },
  [entityName + LIST_TICKETS] (state, { tickets }) {
    state.current && Vue.set(state.current, 'tickets', tickets)
  },
  [entityName + CHOOSE_TICKET] (state, { ticketId }) {
    if (state.current) {
      const ticket = state.current.tickets.find(o => o.ticket_id === ticketId)
      if (ticket) {
        Vue.set(state.current, 'selected_ticket_id', ticket.ticket_id)
        Vue.set(state.current, 'selected_ticket_uulid', ticket.ticket_uulid)
        Vue.set(state.current, 'selected_ticket_uuid', ticket.ticket_uuid)
        Vue.set(state.current, 'selected_ticket_price', ticket.ticket_price)
        Vue.set(state.current, 'selected_ticket_bid_price', ticket.ticket_bid_price)
        Vue.set(state.current, 'selected_ticket_name', ticket.ticket_name)
      }
    }
  }
}

// actions
const actions = {
  fetchScenicSpots ({ commit }) {
    return Vue.http.post('api/scenicSpots', {page: {size: dataFetchingOption.size, skip: 0}}).then(ret => {
      if (ret.data.success) {
        const scenicSpots = ret.data.rows
        commit(entityName + mutationTypes.FETCH_LIST_SUCCESS, {scenicSpots})
        return scenicSpots
      }
    })
  },
  appendScenicSpots ({ commit, state }) {
    return Vue.http.post('api/scenicSpots', {page: {size: dataFetchingOption.size, skip: state.all.length}}).then(ret => {
      if (ret.data.success) {
        const scenicSpots = ret.data.rows
        scenicSpots.length > 0 && commit(entityName + mutationTypes.APPEND_LIST_SUCCESS, { scenicSpots })
        return scenicSpots
      }
    })
  },
  fetchScenicSpotInfo ({commit, rootState}, { id }) {
    return Vue.http.get('api/scenicSpot/' + id).then(ret => {
      if (ret.data.success) {
        const scenicSpot = ret.data.ret
        commit(entityName + mutationTypes.FETCH_DETAILS_SUCCESS, { scenicSpot })
        return scenicSpot
      }
    })
  },
  minusQuantity ({ commit }, { size = 1 }) {
    commit(entityName + MINUS_QUANTITY, { size })
  },
  plusQuantity ({ commit }, { size = 1 }) {
    commit(entityName + PLUS_QUANTITY, { size })
  },
  listTickets ({ commit }, { id }) {
    return Vue.http.get('api/tickets/' + id).then(ret => {
      if (ret.data.success) {
        const tickets = ret.data.rows
        commit(entityName + LIST_TICKETS, { tickets })
        return tickets
      }
    })
  },
  chooseTicket ({ commit }, { ticketId }) {
    commit(entityName + CHOOSE_TICKET, { ticketId })
  },
  ensureScenicSpot ({ commit, state, rootState, dispatch }) {
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
