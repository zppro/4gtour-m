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
          a.primary(@click="triggerDatePicker")
            i.fa.fa-calendar(aria-hidden="true")
      .order-info-item
        span.item-title 联系人姓名:
        .item-value.field-link-man
          input(v-model="link_man",placeholder="填写联系人姓名",v-validate="link_man", data-as="联系人姓名" data-rules="required")
          a.warning(v-show="errors.has('link_man')" @click="toast({msg:errors.first('link_man')})")
            i.fa.fa-warning(aria-hidden="true")
      .order-info-item
        span.item-title 联系人手机:
        .item-value
          input(v-model="link_phone",placeholder="填写联系人手机",v-validate="link_phone",data-as="联系人手机" data-rules="required|chinese-phone")
          a.warning(v-show="errors.has('link_phone')" @click="toast({msg:errors.first('link_phone')})")
            i.fa.fa-warning(aria-hidden="true")
    .order-actions
      a.btn.pay-now(@click="orderAndPay") 生成订单并支付
    .order-padding-bottom
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import datePicker from 'vue-datepicker'
  import moment from 'moment'
  import quantityRegulator from '../components/QuantityRegulator'
  import defaultDateOption from '../config/datepicker-option'
  import { APICLOUD_OPEN_LOGIN_WIN, APICLOUD_PAY, APICLOUD_PAY_SUCCESS, APICLOUD_PAY_FAIL } from '../store/share-apicloud-event-names'
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
      link_man: {
        get () {
          return this.order.link_man
        },
        set (newValue) {
          Vue.set(this.order, 'link_man', newValue)
        }
      },
      link_phone: {
        get () {
          return this.order.link_phone
        },
        set (newValue) {
          Vue.set(this.order, 'link_phone', newValue)
        }
      },
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
      ...mapState(['env']),
      ...mapGetters(['infoPreparedToOrder', 'isLogined'])
    },
    mounted () {
      console.log('mounted...')
      let self = this
      if (this.env.isApiCloud && window.api) {
        window.api.addEventListener({ name: APICLOUD_PAY_SUCCESS }, (eventRet, err) => {
          self.$http.put('api/order/' + self.order.orderId, Object.assign({local_status: 'A0003'}, eventRet.value)).then(ret => {
            self.finishLoading()
            if (ret.data.success) {
              self.toast({msg: '支付成功', option: {iconClass: 'fa fa-check'}})
      //              window.proxy.order_info.link_man = self.order.link_man
      //              window.proxy.order_info.link_phone = self.order.link_phone
              self.$router.replace({path: '/'})
            } else {
              self.toast(ret.data)
            }
          })
        })
        window.api.addEventListener({ name: APICLOUD_PAY_FAIL }, (eventRet, err) => {
          self.finishLoading()
          self.toast({msg: eventRet.value.msg, option: {iconClass: 'fa fa-close'}})
        })
      }
    },
    created () {
//      window.proxy.paySuccess = this.paySuccess
      console.log('created...')
      this.ensureScenicSpot().then(() => {
        this.order = window.$.extend({travel_date: this.date_now}, this.infoPreparedToOrder)
      })
    },
    beforeDestroy () {
//      window.proxy.paySuccess = null
      if (this.env.isApiCloud && window.api) {
        window.api.removeEventListener({ name: APICLOUD_PAY_SUCCESS })
        window.api.removeEventListener({ name: APICLOUD_PAY_FAIL })
      }
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
        let self = this
        this.validateAll(this).then((b) => {
          if (!b) {
            return
          }
          if (!this.isLogined) {
            // window.proxy.$exec('openLogin') 通过代理openLogin已经过时
            if (this.env.isApiCloud) {
              this.sendEventToApiCloud({ eventName: APICLOUD_OPEN_LOGIN_WIN })
            } else {
              this.$router.push({path: '/login'})
            }
          } else {
            this.startLoading('支付中...')
            if (!this.order.orderId) {
              this.$http.post('api/order', this.order).then(ret => {
                if (ret.data.success) {
                  var r = ret.data.ret
                  self.order.orderId = r._id
                  self.order.code = r.code
                  let info = {code: r.code, amount: r.amount, order_link_man: r.link_man, order_link_phone: r.link_phone}
                  if (self.env.isApiCloud) {
                    // window.proxy.$exec('pay', info)  通过代理支付已经过时
                    self.sendEventToApiCloud({ eventName: APICLOUD_PAY, eventData: info })
                  } else {
                    // 判断是否在微信公众号内
                    this.finishLoading()
                  }
                } else {
                  self.toast(ret.data)
                  this.finishLoading()
                }
              })
            } else {
              this.$http.put('api/order/' + this.order.orderId, {quantity: this.order.quantity, amount: this.orderAmount, link_man: this.order.link_man, link_phone: this.order.link_phone, travel_date: this.order.travel_date}).then(ret => {
                if (ret.data.success) {
                  let info = {code: self.order.code, amount: self.orderAmount, order_link_man: self.order.link_man, order_link_phone: self.order.link_phone}
                  if (self.env.isApiCloud) {
                    // window.proxy.$exec('pay', info)  通过代理支付已经过时
                    self.sendEventToApiCloud({ eventName: APICLOUD_PAY, eventData: info })
                  } else {
                    // 判断是否在微信公众号内
                    this.finishLoading()
                  }
                } else {
                  self.toast(ret.data)
                  this.finishLoading()
                }
              })
            }
          }
        })
      },
      ...mapActions(['minusQuantity', 'plusQuantity', 'ensureScenicSpot', 'toast', 'validateAll', 'sendEventToApiCloud', 'startLoading', 'finishLoading'])
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
        .primary{
          color:#418BCA;
        }
        .warning{
          color:orange;
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
