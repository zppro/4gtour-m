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
      .order-info-item
        span.item-title 出 游 日 期:
        .item-value.field-travel_date
          input.disabled(v-model="travel_date",placeholder="选择出游日期", readonly,  onfocus="this.blur();", data-as="出游日期" data-rules="required")
          a.primary(@click="triggerDatePicker")
            i.fa.fa-calendar(aria-hidden="true")
          a.warning(v-show="!travel_date" @click="toast({msg:'出游日期是必须的'})")
            i.fa.fa-warning(aria-hidden="true")
          mt-datetime-picker(ref="travelDatePicker" type="date" v-model="order.travel_date", :start-date="start_date" @confirm="")
      .order-info-item
        span.item-title 联系人姓名:
        .item-value.field-link-man
          input(v-model="link_man",placeholder="填写联系人姓名")
          a.warning(v-show="!link_man" @click="toast({msg:'联系人姓名是必须的'})")
            i.fa.fa-warning(aria-hidden="true")
      .order-info-item
        span.item-title 联系人手机:
        .item-value
          input(v-model="link_phone",placeholder="填写联系人手机")
          a.warning(v-show="!link_phone || !validMobileNo" @click="showErrorOfMobileNo")
            i.fa.fa-warning(aria-hidden="true")
      .order-info-item(v-if="needTouristIDNo")
        span.item-title 身 份 证:
        .item-value
          input.tourist_id_no(v-model="tourist_id_no",placeholder="填写联系人身份证")
          a.warning(v-show="!tourist_id_no || !validIDNo" @click="showErrorOfIDNo")
            i.fa.fa-warning(aria-hidden="true")
    .order-actions
      a.btn.pay-now(@click="orderAndPay") 生成订单并支付
    .order-padding-bottom
</template>

<script>
  import Vue from 'vue'
  import localStore from 'store'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import moment from 'moment'
  import quantityRegulator from '../components/QuantityRegulator'
  import { APICLOUD_OPEN_LOGIN_WIN, APICLOUD_PAY, APICLOUD_PAY_SUCCESS, APICLOUD_PAY_FAIL } from '../store/share-apicloud-event-names'
  import { ORDER_LINK_MAN, ORDER_LINK_PHONE, ORDER_TOURIST_ID_NO } from '../store/keys'
  export default {
    data () {
      return {
        order: {travel_date: new Date()}
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
      tourist_id_no: {
        get () {
          return this.order.tourist_id_no
        },
        set (newValue) {
          Vue.set(this.order, 'tourist_id_no', newValue)
        }
      },
      travel_date () {
        return moment(this.order.travel_date).format('YYYY-MM-DD')
      },
      start_date () {
        if (this.order.buy_days_in_advance === 0) {
          let now = moment()
          if (now.diff(moment(now.format('YYYY-MM-DD') + ' ' + this.order.buy_hour_in_advance)) >= 0) {
            return now.add(1, 'day').toDate()
          } else {
            return now.toDate()
          }
        } else {
          return moment().add(this.order.buy_days_in_advance, 'day').toDate()
        }
      },
      needTouristIDNo () {
        return this.order.tourist_IDNo_flag > 0
      },
      validIDNo: function () {
        return window.utils.isIDNo(this.order.tourist_id_no)
      },
      // a computed getter
      orderAmount: function () {
        // `this` points to the vm instance
        return this.order.quantity * this.order.p_price
      },
      validMobileNo: function () {
        return window.utils.isPhone(this.order.link_phone)
      },
      allValid: function () {
        return !!(this.link_man && this.link_phone && this.validMobileNo && (!this.needTouristIDNo || this.needTouristIDNo && (this.tourist_id_no && this.validIDNo)))
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
              self.$router.replace({path: '/order-details/' + self.order.orderId})
            } else {
              self.toast(ret.data)
            }
          })
        })
        window.api.addEventListener({ name: APICLOUD_PAY_FAIL }, (eventRet, err) => {
          self.finishLoading()
          self.toast({msg: eventRet.value.msg, option: {iconClass: 'fa fa-close'}})
          this.fetchMember$Orders(true)
        })
      }
    },
    created () {
//      window.proxy.paySuccess = this.paySuccess
      console.log('created...')
      this.ensureScenicSpot().then(() => {
        this.order = window.$.extend({travel_date: new Date()}, this.infoPreparedToOrder)
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
        this.$refs.travelDatePicker.open()
      },
      showErrorOfIDNo () {
        let msg = this.tourist_id_no ? '身份证号码是必须是一个有效二代证' : '联系人身份证是必须的'
        this.toast({msg})
      },
      showErrorOfMobileNo () {
        let msg = this.link_phone ? '联系人手机是必须是一个有效的手机号码' : '联系人手机是必须的'
        this.toast({msg})
      },
      minus () {
        this.order.quantity > 1 && this.order.quantity--
      },
      plus () {
        this.order.quantity++
      },
      orderAndPay () {
        let self = this
        if (!this.isLogined) {
          // window.proxy.$exec('openLogin') 通过代理openLogin已经过时
          if (this.env.isApiCloud) {
            this.sendEventToApiCloud({ eventName: APICLOUD_OPEN_LOGIN_WIN })
          } else {
            this.$router.push({path: '/login'})
          }
        } else {
          if (this.allValid) {
            this.startLoading('支付中...')
            if (!this.order.orderId) {
//              window.alert(JSON.stringify(this.order))
              localStore.set(ORDER_LINK_MAN, this.order.link_man)
              localStore.set(ORDER_LINK_PHONE, this.order.link_phone)
              this.needTouristIDNo && this.order.tourist_id_no && localStore.set(ORDER_TOURIST_ID_NO, this.order.tourist_id_no)
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
          } else {
            this.toast({msg: '点击警告图标查看错误'})
          }
        }
      },
      ...mapActions(['minusQuantity', 'plusQuantity', 'ensureScenicSpot', 'toast', 'sendEventToApiCloud', 'startLoading', 'finishLoading', 'fetchMember$Orders'])
    },
    components: {
      quantityRegulator
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
  .order-details {
    width: 100%;
    .disabled{
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      cursor: not-allowed;
    }
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
          input:active,input:focus{
            border:none;
          }
          .tourist_id_no {
            width:12rem;
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
