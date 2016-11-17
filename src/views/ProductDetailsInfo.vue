<template lang="jade">
  .product-details-info
    product-info(:show-change-ticket="showChangeTicket", :select-ticket-route="selectTicketRoute", :order-route="orderRoute")
      img(:src="product.img" slot="img")
      span(slot="title") {{product.title}}
      span(slot="ticket-title") {{product.selected_ticket_name}}
      span(slot="price") ¥{{product.selected_ticket_price}}
      span(slot="bid-price") ¥{{product.selected_ticket_bid_price}}
      span(slot="buy-quantity")
        quantity-regulator(:q-value="product.buy_quantity", v-on:minus="minusQuantity({size: 1})", v-on:plus="plusQuantity({size: 1})")
      span(slot="level") {{product.level}}
      div(slot="validate") {{validateInfo}}
      div(slot="address" ) {{product.address}}
      div(slot="runtime" v-html="product.runtime")
      div(slot="tip") {{product.tip}}
      div(slot="travel-guide") {{product.travel_guide}}
</template>

<script>
  import { mapActions } from 'vuex'
  import productInfo from '../components/ProductInfo'
  import quantityRegulator from '../components/QuantityRegulator'
  export default {
    props: ['product'],
    computed: {
      // a computed getter
      selectTicketRoute () {
        // `this` points to the vm instance
        return '/ticket-select/' + this.product.id
      },
      orderRoute () {
        return '/order/' + this.product.id + ',' + this.product.buy_quantity
      },
      showChangeTicket () {
        if (this.product) {
          return this.product.tickets_count > 1
        } else {
          return false
        }
      },
      validateInfo () {
        return this.product.selected_ticket_delay_days === '0' ? '限当天使用' : `自购买之日起${this.product.selected_ticket_delay_days}天内使用`
      }
    },
    methods: {
      doOrder () {
        // const url = '/order/' + this.product.id + ',' + this.product.buy_quantity
        this.$router.push({path: '/fuck/1'})
      },
      ...mapActions(['minusQuantity', 'plusQuantity'])
    },
    components: {
      productInfo,
      quantityRegulator
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .product-details-info {
    width:100%;
  }
</style>
