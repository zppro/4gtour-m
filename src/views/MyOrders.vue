<template lang="jade">
  .my-orders-c
    .my-orders(v-infinite-scroll="appendMember$Orders", infinite-scroll-disabled="appendMember$OrderDiabled", infinite-scroll-distance="infiniteScrollDistance")
      p(v-show="showMemberFetchIndicator" class="page-refresh-loading")
        mt-spinner(type="triple-bounce" color="#ea5513")
          | {{dataRefreshText}}
      no-more-data(v-show="allMember$Orders.length === 0")
      order-list.order-list(v-show="allMember$Orders.length > 0")
        order-item(v-for="order in allMember$Orders", :order-id="order.id")
          span(slot="title", :title="order.p_name") {{order.p_name}}
          span(slot="status")
            span(:class="{'order-status-not-pay': order.local_status === 'A0001', 'order-status-pay-success': order.local_status === 'A0003','order-status-gen-ticket-success': order.local_status === 'A0005', 'order-status-gen-ticket-fail': order.local_status === 'A0007' , 'order-status-ticket-refunding': order.local_status === 'A0009' , 'order-status-ticket-refund-success': order.local_status === 'A0011'}") {{order.local_status_name}}
          span(slot="code") {{order.code}}
          span(slot="time") {{order.check_in_time | formatDate }}
          span(slot="amount") ¥{{order.amount}}
      p(v-show="showMemberAppendIndicator" class="page-append-loading")
        mt-spinner(type="fading-circle" color="#ea5513")
          | {{dataAppendText}}
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import orderList from '../components/OrderList'
  import orderItem from '../components/OrderItem'
  import NoMoreData from '../components/NoMoreData.vue'
  export default {
    computed: {
      ...mapState(['infiniteScrollDistance', 'dataRefreshText', 'dataAppendText', 'authMemberByTokenPromise']),
      ...mapGetters(['allMember$Orders', 'appendMember$OrderDiabled', 'showMemberFetchIndicator', 'showMemberAppendIndicator'])
    },
    methods: {
      ...mapActions(['fetchMember$Orders', 'appendMember$Orders'])
    },
    created () {
      console.log(this.showMemberFetchIndicator)
      this.authMemberByTokenPromise.then(() => {
        this.fetchMember$Orders()
        console.log(this.showMemberFetchIndicator)
      })
    },
    components: {
      orderList,
      orderItem,
      NoMoreData
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .my-orders-c{
    width: 100%;
    .my-orders {
      width: 100%;
      .order-list {
      }
      .order-status-not-pay,.order-status-ticket-refunding{
        color: #ccc;
      }
      .order-status-ticket-refund-success, .order-status-gen-ticket-faild{
        color: red;
      }
      .order-status-pay-success {
        color: blue;
      }
      .order-status-gen-ticket-success {
        color: green;
      }
    }
  }
</style>
