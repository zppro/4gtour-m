<template lang="jade">
  .product-details-info
    product-info(:show-change-ticket="showChangeTicket", :select-ticket-route="selectTicketRoute")
      img(:src="product.img" slot="img")
      span(slot="title") {{product.title}}
      span(slot="price") ¥{{product.selected_ticket_price}}
      span(slot="bid-price") ¥{{product.selected_ticket_bid_price}}
      span(slot="buy-quantity")
        quantity-regulator(:q-value="product.buy_quantity", v-on:minus="minus", v-on:plus="plus")
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
  import productInfo from '../components/ProductInfo'
  import quantityRegulator from '../components/QuantityRegulator'
  export default {
    data () {
      return {
        product: {}
      }
    },
    computed: {
      // a computed getter
      selectTicketRoute: function () {
        // `this` points to the vm instance
        return '/ticket-select/' + this.product.id + '/' + this.product.selected_ticket_id
      },
      showChangeTicket: function () {
        console.log(this.product)
        if (this.product) {
          return this.product.tickets_count > 1
        } else {
          return false
        }
      },
      comfirmOrderPath: function () {
        return '/order-confirm/' + this.product.selected_ticket_uulid + ',' + this.product.selected_ticket_uuid + ',' + this.product.selected_ticket_price + ',' + this.product.buy_quantity + ',' + this.product.selected_ticket_name
      }
    },
    beforeRouteEnter (to, from, next) {
//      next(vm => {
//        vm.product = {
//          id: 'product 1',
//          img: 'static/img/1.png',
//          title: '杭州西湖雷峰塔',
//          buy_quantity: 1,
//          level: 'AAAAA',
//          selected_ticket_id: 'ticket 1',
//          selected_ticket_price: 30,
//          selected_ticket_bid_price: 90,
//          selected_ticket_name: '雷峰塔门票A+雷峰塔门票B',
//          tickets_count: 2,
//          address: '杭州市西湖区南山路15号',
//          runtime: '08:00-20:30(3月15日-11月15日)<br/>08:00-17:30(11月16日-次年3月14日)',
//          tip: '...',
//          travel_guide: '...'
//        }
//        console.log('vm.product')
//      })
      next(vm => {
        vm.fetchScenicSpotInfo(to.params.id).then(p => {
          vm.product = p
        })
      })
    },
    methods: {
      fetchScenicSpotInfo (scenicSpotId) {
        console.log(scenicSpotId)
        return this.$http.get('api/scenicSpot/' + scenicSpotId).then(ret => {
          let p = {}
          if (ret.data.success) {
            p = ret.data.ret
          }
          return p
        })
      },
      minus () {
        this.product.buy_quantity > 1 && this.product.buy_quantity--
      },
      plus () {
        this.product.buy_quantity++
      },
      confirmOrder () {
        this.$router.push(this.comfirmOrderPath)
      }
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
      margin: 0;
      pading: 0;
      max-width: 18.75rem;
      width:18.75rem;
      position: fixed;
      bottom:0;
      .btn{
        display: inline-block;
        opacity: 0.8;
        color:white;
        width:100%;
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
