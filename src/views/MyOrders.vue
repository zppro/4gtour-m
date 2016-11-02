<template lang="jade">
  .my-orders(v-infinite-scroll="appendMember$Orders", infinite-scroll-disabled="appendMember$OrderDiabled", infinite-scroll-distance="infiniteScrollDistance")
    p(v-show="showMember$OrderFetchIndicator" class="page-refresh-loading")
      mt-spinner(type="triple-bounce" color="#ea5513")
        | {{dataFetchText}}
    order-list.order-list(v-for="order in allMember$Orders")
      order-item
        span(slot="title", :title="order.p_name") {{order.p_name}}
        span(slot="status")
          span(:class="{'order-status-not-pay': order.local_status === 'A0001', 'order-status-pay-success': order.local_status === 'A0003','order-status-gen-ticket-success': order.local_status === 'A0003'}") {{order.local_status_name}}
        span(slot="code") {{order.code}}
        span(slot="time") {{order.check_in_time}}
        span(slot="amount") ¥{{order.amount}}
    p(v-show="showMember$OrderAppendIndicator" class="page-append-loading")
      mt-spinner(type="fading-circle" color="#ea5513")
        | {{dataAppendText}}
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import orderList from '../components/OrderList'
  import orderItem from '../components/OrderItem'
  export default {
    computed: {
      ...mapState(['infiniteScrollDistance', 'dataFetchText', 'dataAppendText']),
      ...mapGetters(['allMember$Orders', 'appendMember$OrderDiabled', 'showMember$OrderFetchIndicator', 'showMember$OrderAppendIndicator'])
    },
    methods: {
      ...mapActions(['fetchMember$Orders', 'appendMember$Orders'])
    },
    components: {
      orderList,
      orderItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .my-orders {
    width: 100%;
    .order-list {
      background-color: white;
    }
    .order-status-not-pay {
      color: red;
    }
    .order-status-pay-success {
      color: blue;
    }
    .order-status-gen-ticket-success {
      color: green;
    }
  }
</style>
