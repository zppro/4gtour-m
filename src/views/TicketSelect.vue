<template lang="jade">
  .product-details-tickets
    .product-ticket-select-intro 选择门票后左上角返回
    ticket-list.ticket-list(v-for="ticket in ticketsInSelect")
      ticket-item(:ticket-id="ticket.ticket_id",v-on:selectTicket="chooseTicket",:choosen="ticketIdSelected")
        span(slot="title") {{ticket.ticket_name}}
        span(slot="price") ¥{{ticket.ticket_price}}
        span(slot="bid-price") ¥{{ticket.ticket_bid_price}}
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ticketList from '../components/TicketList'
  import ticketItem from '../components/TicketItem'
  export default {
    computed: {
      ...mapGetters(['ticketsInSelect', 'ticketIdSelected'])
    },
    created () {
      this.ensureScenicSpot().then(() => {
        this.listTickets(this.$route.params)
      })
    },
    methods: {
      ...mapActions(['listTickets', 'chooseTicket', 'ensureScenicSpot'])
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
