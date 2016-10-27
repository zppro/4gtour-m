<template lang="jade">
  .order-details
    .order-info-block
      .order-info-item
        span.item-title 商品:
        .item-value.field-title {{order.p_name}}
      .order-info-item
        span.item-title 数量:
        .item-value
          quantity-regulator(:q-value="order.quantity" v-on:minus="minus" v-on:plus="plus")
      .order-info-item
        span.item-title 金额:
        .item-value ￥{{orderAmount}}
    .order-info-block
      .order-info-item
        span.item-title 出 游 日 期:
        .item-value.field-travel_date
          date-picker(:date="travel_date", :option="date_option", :limit="date_limit")
          a(@click="triggerDatePicker")
            i.fa.fa-calendar(aria-hidden="true")
      .order-info-item
        span.item-title 联系人姓名:
        .item-value.field-link-man
          input(v-model="order.link_man",placeholder="填写联系人姓名",required)
      .order-info-item
        span.item-title 联系人手机:
        .item-value
          input(type="number", v-model="order.link_phone",placeholder="填写联系人姓名",required)
    .order-actions
      a.btn.pay-now(@click="orderAndPay") 生成订单并支付
    .order-padding-bottom
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import quantityRegulator from '../components/QuantityRegulator'
  import datePicker from 'vue-datepicker'
  import moment from 'moment'
  import defaultDateOption from '../config/datepicker-option'
  export default {
    data () {
      return {
        order: {},
        date_now: moment().format('YYYY-MM-DD'),
        date_option: defaultDateOption,
        date_limit: [{
          type: 'fromto',
          from: moment().format('YYYY-MM-DD')
        }]
      }
    },
    computed: {
      // a computed getter
      orderAmount: function () {
        // `this` points to the vm instance
        return this.order.quantity * this.order.p_price
      },
      travel_date: function () {
        return {
          time: this.order.travel_date
        }
      },
      ...mapGetters(['infoPreparedToOrder'])
    },
    created () {
      window.proxy.paySuccess = this.paySuccess
      this.ensureScenicSpot().then(() => {
        this.order = window.$.extend({travel_date: this.date_now}, this.infoPreparedToOrder, this.$route.params, (window.proxy.order_info || {}))
      })
    },
    beforeDestroy () {
      window.proxy.paySuccess = null
      console.log('before destroy')
    },
    methods: {
      triggerDatePicker () {
        window.$('.field-travel_date input').click()
      },
      minus () {
        this.order.quantity > 1 && this.order.quantity--
      },
      plus () {
        this.order.quantity++
      },
      orderAndPay () {
        if (!window.proxy.$isLogin()) {
//          window.alert('需要登录')
          window.proxy.$exec('openLogin')
        } else {
          if (!this.order.link_man) {
            window.alert('[联系人姓名]必须填写')
            return
          }
          if (!this.order.link_man) {
            window.alert('[联系人手机]必须填写')
            return
          }
          if (!window.utils.isPhone(this.order.link_phone)) {
            window.alert('[联系人手机]格式不正确')
            return
          }
//          window.alert('开始支付')
//          window.alert('in webapp:' + JSON.stringify(this.order))
          if (!this.order.orderId) {
            this.$http.post('api/order', this.order).then(ret => {
              if (ret.data.success) {
                var r = ret.data.ret
                this.order.orderId = r._id
                this.order.code = r.code
                let info = {code: r.code, amount: r.amount, order_link_man: r.link_man, order_link_phone: r.link_phone}
                window.proxy.$exec('pay', info)
              } else {
                window.alert(ret.data.msg)
              }
            })
          } else {
            this.$http.put('api/order/' + this.order.orderId, {quantity: this.order.quantity, amount: this.orderAmount, link_man: this.order.link_man, link_phone: this.order.link_phone, travel_date: this.order.travel_date}).then(ret => {
              if (ret.data.success) {
                let info = {code: this.order.code, amount: this.orderAmount, order_link_man: this.order.link_man, order_link_phone: this.order.link_phone}
                window.proxy.$exec('pay', info)
              } else {
                window.alert(ret.data.msg)
              }
            })
          }
        }
      },
      paySuccess () {
        this.$http.put('api/order/' + this.order.orderId, {local_status: 'A0003'}).then(ret => {
          if (ret.data.success) {
            window.alert('支付成功')
            window.proxy.order_info.link_man = this.order.link_man
            window.proxy.order_info.link_phone = this.order.link_phone
            this.$router.replace({path: '/'})
          } else {
            console.log(ret.data.msg)
          }
        })
      },
      ...mapActions(['minusQuantity', 'plusQuantity', 'ensureScenicSpot'])
    },
    components: {
      quantityRegulator,
      datePicker
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .order-details {
    width: 100%;
    .order-info-block{
      background-color: white;
      margin-top:0.6rem;autoLogin
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
          input:active,input:focus{
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
        cursor: pointer;
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
