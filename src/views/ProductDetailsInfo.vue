<template lang="jade">
  .product-details-info
    product-info(:show-change-ticket="showChangeTicket", :select-ticket-route="selectTicketRoute")
      img(:src="product.img" slot="img")
      span(slot="title") {{product.title}}
      span(slot="price") ¥{{product.selected_ticket_price}}
      span(slot="bid-price") ¥{{product.selected_ticket_bid_price}}
      span(slot="buy-quantity")
        quantity-regulator(:q-value="product.buy_quantity", v-on:minus="minusQuantity({size: 1})", v-on:plus="plusQuantity({size: 1})")
      span(slot="level") {{product.level}}
      span(slot="ticket") {{product.selected_ticket_name}}
      div(slot="address" ) {{product.address}}
      div(slot="runtime" v-html="product.runtime")
      div(slot="tip") {{product.tip}}
      div(slot="travel-guide") {{product.travel_guide}}
    .product-actions
      <!--a.btn.shopping-cart 加入购物车-->
      a.btn.order-now(@click="confirmOrder") 立即购买
    .product-padding-bottom
</template>

<script>
  import { mapActions } from 'vuex'
  import productInfo from '../components/ProductInfo'
  import quantityRegulator from '../components/QuantityRegulator'
  export default {
    props: ['product'],
    computed: {
      // a computed getter
      selectTicketRoute: function () {
        // `this` points to the vm instance
        return '/ticket-select/' + this.product.id
      },
      showChangeTicket: function () {
        if (this.product) {
          return this.product.tickets_count > 1
        } else {
          return false
        }
      },
      comfirmOrderPath: function () {
        return '/order-confirm/' + this.product.id + ',' + this.product.buy_quantity
      }
    },
    methods: {
      confirmOrder () {
        this.$router.push(this.comfirmOrderPath)
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
    .product-actions{
      text-align:center;
      margin: 0 auto;
      pading: 0;
      max-width: 18.75rem;
      width: 18.75rem;
      position: fixed;
      bottom:0;
      .btn{
        display: inline-block;
        opacity: 0.8;
        color:white;
        width: 100%;
        font-size:1.1rem;
        height:3rem;
        line-height:3rem;
        border:none;
        cursor: pointer;
      }
      .shopping-cart{
        background-color: #000;
      }
      .order-now{
        background-color: #ea5513;
      }
    }
    .product-padding-bottom{
      height:3rem;
    }
  }
</style>
