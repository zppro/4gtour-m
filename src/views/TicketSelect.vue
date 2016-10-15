<template lang="jade">
  .product-details-tickets
    .product-ticket-select-intro 选择门票后左上角返回
    ticket-list.ticket-list(v-for="ticket in tickets")
      ticket-item(:ticket-id="ticket.id",v-on:selectTicket="selectTicket",:choosen="choosen")
        span(slot="title") {{ticket.title}}
        span(slot="price") ¥{{ticket.price}}
        span(slot="bid-price") ¥{{ticket.bid_price}}
</template>

<script>
  import ticketList from '../components/TicketList'
  import ticketItem from '../components/TicketItem'
  export default {
    data () {
      return {
        tickets: [],
        choosen: this.$route.params.ticketId
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.tickets = [
          {id: 'ticket 1', title: '雷峰塔门票A+雷峰塔门票B', price: 30, bid_price: 78},
          {id: 'ticket 2', title: '雷峰塔门票A', price: 13, bid_price: 33},
          {id: 'ticket 3', title: '雷峰塔门票B', price: 17, bid_price: 45}
        ]
      })
    },
    created () {
      console.log(this.$route.params)
    },
    methods: {
      selectTicket (ticketId) {
        console.log(ticketId)
        this.choosen = ticketId
      },
      hb () {
        let success = this.$http.get('api/hb')
            .then(ret => ret.success)
        console(success)
      },
      tpost () {
        let ret = this.$http.post('api/tpost', {foo: 'bar'})
        console(ret)
      }
    },
    components: {
      ticketList,
      ticketItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .product-details-tickets {
    width: 100%;

    .product-ticket-select-intro{
      text-align:left;
      height:1.95rem;
      line-height:1.95rem;
      padding-left:0.5rem;
      font-size:0.7rem;
      border-bottom: #f4f4f4;
    }
    .ticket-list{
      background-color:white;
    }
  }
</style>
