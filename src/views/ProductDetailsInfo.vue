<template lang="jade">
  .product-details-info
    product-info
      img(:src="product.img" slot="img")
      span(slot="title") {{product.title}}
      span(slot="price") ¥{{product.price}}
      span(slot="bid-price") ¥{{product.bid_price}}
      span(slot="buy-quantity")
        quantity-regulator(:q-value="product.buy_quantity")
      span(slot="level") {{product.level}}
      span(slot="ticket") {{product.ticket_name}}
      div(slot="address" ) {{product.address}}
      div(slot="runtime" v-html="product.runtime")
      div(slot="tip") {{product.tip}}
      div(slot="travel-guide") {{product.travel_guide}}
    .product-actions
      <!--a.btn.shopping-cart 加入购物车-->
      a.btn.buy-now 立即购买
    .product-padding-bottom
</template>

<script>
  import productInfo from '../components/ProductInfo'
  import quantityRegulator from '../components/QuantityRegulator'
  export default {
    data () {
      return {
        product: null
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(1231111)
      next(vm => {
        vm.product = {
          id: 'product 1',
          img: 'static/img/1.png',
          title: '杭州西湖雷峰塔',
          price: 30,
          bid_price: 90,
          buy_quantity: 1,
          level: 'AAAAA',
          ticket_name: '雷峰塔门票A+雷峰塔门票B',
          address: '杭州市西湖区南山路15号',
          runtime: '08:00-20:30(3月15日-11月15日)<br/>08:00-17:30(11月16日-次年3月14日)',
          tip: '...',
          travel_guide: '...'
        }
      })
    },
    methods: {
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
      }
      .shopping-cart{
        background-color: #000;
      }
      .buy-now{
        background-color: #ea5513;
      }
    }
    .product-padding-bottom{
      height:3rem;
    }
  }
</style>
