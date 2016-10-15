<template lang="jade">
  .order-details
    .order-info-block
      .order-info-item
        span.item-title 商品:
        .item-value.field-title {{order.title}}
      .order-info-item
        span.item-title 数量:
        .item-value
          quantity-regulator(:q-value="order.buy_quantity" v-on:minus="minus" v-on:plus="plus")
      .order-info-item
        span.item-title 金额:
        .item-value ￥{{orderAmount}}
    .order-info-block
      .order-info-item
        span.item-title 联系人姓名:
        .item-value.field-link-man
          input(v-model="order.link_man",placeholder="填写联系人姓名")
      .order-info-item
        span.item-title 联系人手机:
        .item-value
          input(v-model="order.link_phone",placeholder="填写联系人姓名")
    .order-actions
      a.btn.pay-now(@click="pay") 立即购买
    .order-padding-bottom
</template>

<script>
  import quantityRegulator from '../components/QuantityRegulator'
  export default {
    data () {
      return {
        order: null
      }
    },
    computed: {
      // a computed getter
      orderAmount: function () {
        // `this` points to the vm instance
        return this.order.buy_quantity * this.order.price
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.order = {ticket_id: 'ticket 1', title: '雷峰塔门票A+雷峰塔门票B+雷峰塔门票C', price: 30, buy_quantity: 2, link_phone: '18668001381'}
      })
    },
    created () {
      console.log(this.$route.params)
    },
    methods: {
      minus () {
        this.order.buy_quantity > 1 && this.order.buy_quantity--
      },
      plus () {
        this.order.buy_quantity++
      },
      selectTicket (ticketId) {
        console.log(ticketId)
        this.choosen = ticketId
      },
      pay () {
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
      quantityRegulator
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .order-details {
    width: 100%;

    .order-info-block{
      background-color: white;
      margin-top:0.6rem;
      padding: 0.2rem;
      border-top: solid 1px lightgray;
      border-bottom: solid 1px lightgray;
      .order-info-item{
        text-align:left;
        height:2.5rem;
        padding-left:0.2rem;
        border-bottom: solid 1px lightgray;
        font-size:0.935rem;
        span.item-title{
          color: #4f4f4f;
          line-height:2.5rem;
          margin-right: 0.5rem;
        }
        .item-value{
          color: #000;
          display: inline-block;
          text-align: right;
          input{
            font-size:0.935rem;
            width:8rem;
            border:none;
          }
        }
        .field-title{
          font-size:0.6rem;
        }
      }
      .order-info-item:last-child{
        border-bottom: none;
      }
    }
    .order-actions{
      margin-top:0.6rem;
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
      .pay-now{
        background-color: #fa761d;
      }
    }
    .order-padding-bottom{
      margin-top:0.6rem;
      min-height: 2rem;
    }
  }
</style>
