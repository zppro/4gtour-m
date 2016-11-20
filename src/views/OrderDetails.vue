<template lang="jade">
  .order-details
    .order-block
      .scenicSpot-img
        img(:src="member$OrderInDetails.scenicSpotInfo.img")
      .scenicSpot-other1
        .ticket-name {{member$OrderInDetails.scenicSpotInfo.ticket_name}}
        .runtime
          i.fa.fa-calendar
          | {{member$OrderInDetails.scenicSpotInfo.runtime}}
        a.pay(v-if="canPay" @click="pay") 支付
        a.refund(v-if="canRefund" @click="refund") 退票
        .expire.text-muted(v-if="showExpire") 订单已过期
        .issuing.text-primary(v-if="showIssuing") 出票中
        .status-name(v-if="showNotWaitToPayOrIssuing", :class="{'text-muted': this.showExpire, 'text-primary': this.showIssuing,'text-success': this.member$OrderInDetails.orderInfo.status === 'A0005', 'text-danger': this.member$OrderInDetails.orderInfo.status === 'A0007' , 'text-primary': this.member$OrderInDetails.orderInfo.status === 'A0009' , 'text-warning': this.member$OrderInDetails.orderInfo.status === 'A0011'}") {{member$OrderInDetails.orderInfo.status_name}}
    .order-block(v-if="member$OrderInDetails.orderInfo.qr_show")
      .order-qr
        span.text-muted 凭证号:
        .order-validate-code.text-primary(:class="{'notUsed': this.member$OrderInDetails.orderInfo.validate_code_status === 0 }") {{member$OrderInDetails.orderInfo.validate_code}}
      .order-qr
        span.text-muted 二维码图片:
        iframe.img-loader.order-qr-img(:src="member$OrderInDetails.orderInfo.qrcode_img")
    .order-block
      .order-a
        .order-row
          span.text-muted 订单号:
          .order-code {{member$OrderInDetails.orderInfo.code}}
        .order-row
          span.text-muted 下单日期:
          .order-check-in-time {{member$OrderInDetails.orderInfo.check_in_time  | formatDate}}
          span.mr.text-muted 游玩日期:
          .order-travel-date {{member$OrderInDetails.orderInfo.travel_date  | formatDate('YYYY-MM-DD')}}
        .order-row
          span.text-muted 联系人:
          .order-link-man {{member$OrderInDetails.orderInfo.link_man}}
          span.mr.text-muted 联系电话:
          .order-link-phone {{member$OrderInDetails.orderInfo.link_phone}}
        .order-row
          span.text-muted 单价:
          .order-price ￥ {{member$OrderInDetails.orderInfo.price}}
          span.mr.text-muted 数量:
          .order-quantity {{member$OrderInDetails.orderInfo.quantity}}
          span.mr.text-muted 金额:
          .order-amount {{member$OrderInDetails.orderInfo.amount}}
      a.order-b
        .scenicSpot-custome-service 联系客服
        i.fa.fa-chevron-right.text-muted.action(aria-hidden="true")
    .order-block
      .scenicSpot-a
        .scenicSpot-name {{member$OrderInDetails.scenicSpotInfo.name}}
        .scenicSpot-level.text-danger {{member$OrderInDetails.scenicSpotInfo.level}}
        a.fa.fa-phone.text-danger.scenicSpot-tel
      a.scenicSpot-b
        .scenicSpot-address
          i.fa.fa-map-marker.text-muted
          | {{member$OrderInDetails.scenicSpotInfo.address}}
        i.fa.fa-chevron-right.text-muted.action(aria-hidden="true")
      .scenicSpot-b
    .order-block
      span.text-muted 相关说明:
      .scenicSpot-tip {{member$OrderInDetails.scenicSpotInfo.tip}}
</template>

<script>
  import moment from 'moment'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { APICLOUD_PAY, APICLOUD_PAY_SUCCESS, APICLOUD_PAY_FAIL } from '../store/share-apicloud-event-names'
  export default {
    computed: {
      canPay () {
        return this.member$OrderInDetails.orderInfo.status === 'A0001' && moment().isBefore(this.member$OrderInDetails.scenicSpotInfo.last_pay_time)
      },
      showExpire () {
        return (this.member$OrderInDetails.orderInfo.status === 'A0001' || this.member$OrderInDetails.orderInfo.status === 'A0003') && moment().isAfter(this.member$OrderInDetails.scenicSpotInfo.last_pay_time)
      },
      showIssuing () {
        return this.member$OrderInDetails.orderInfo.status === 'A0003' && moment().isBefore(this.member$OrderInDetails.scenicSpotInfo.last_pay_time)
      },
      showNotWaitToPayOrIssuing () {
        return this.member$OrderInDetails.orderInfo.status !== 'A0001' && this.member$OrderInDetails.orderInfo.status !== 'A0003'
      },
      ...mapState(['env']),
      ...mapGetters(['member$OrderInDetails'])
    },
    created () {
      console.log('created...')
      this.ensureMember$OrderInfo()
    },
    mounted () {
      console.log('mounted...')
      let self = this
      if (this.env.isApiCloud && window.api) {
        window.api.addEventListener({ name: APICLOUD_PAY_SUCCESS }, (eventRet, err) => {
          self.$http.put('api/order/' + self.member$OrderInDetails.orderInfo.orderId, Object.assign({local_status: 'A0003'}, eventRet.value)).then(ret => {
            self.finishLoading()
            if (ret.data.success) {
              self.toast({msg: '支付成功', option: {iconClass: 'fa fa-check'}})
              // 刷新
              this.fetchMember$OrderInfo(self.$route.params)
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
    beforeDestroy () {
  //      window.proxy.paySuccess = null
      if (this.env.isApiCloud && window.api) {
        window.api.removeEventListener({ name: APICLOUD_PAY_SUCCESS })
        window.api.removeEventListener({ name: APICLOUD_PAY_FAIL })
      }
      console.log('before destroy')
    },
    methods: {
      pay () {
        this.startLoading('支付中...')
        let info = {code: this.member$OrderInDetails.orderInfo.code, amount: this.member$OrderInDetails.orderInfo.amount, order_link_man: this.member$OrderInDetails.orderInfo.link_man, order_link_phone: this.member$OrderInDetails.orderInfo.link_phone}
        if (this.env.isApiCloud) {
          // window.proxy.$exec('pay', info)  通过代理支付已经过时
          this.sendEventToApiCloud({ eventName: APICLOUD_PAY, eventData: info })
        } else {
          // 判断是否在微信公众号内
          this.finishLoading()
        }
      },
      refund () {
        console.log('退票')
      },
      ...mapActions(['ensureMember$OrderInfo', 'fetchMember$OrderInfo', 'toast', 'sendEventToApiCloud', 'startLoading', 'finishLoading'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .order-details {
    width:100%;
    .order-block{
      background-color: white;
      margin-bottom: 0.6rem;
      padding: 0 0.4rem;
      text-align: left;
      display:block;
      border-top: solid 1px #c1c1c1;
      border-bottom: solid 1px #c1c1c1;
      span {
        font-size:0.6rem;
      }
      .action {
        font-size:0.6rem;
        flex: 0.05;
        text-align: right;
        vertical-align: bottom;
      }
      .scenicSpot-img{
        padding: 0.4rem 0;
        display: inline-block;
        width:40%;
        img {
          width:100%;
        }

      }
      .scenicSpot-other1{
        float: right;
        padding: 0.4rem;
        display: inline-block;
        width:60%;
        .ticket-name{
          font-size: 0.7rem;
          height: 1.1rem;
          line-height:1.1rem;
        }
        .runtime{
          font-size: 0.6rem;
          height: 1rem;
          line-height:1rem;
          i{ margin-right:0.4rem;}
        }
        .pay,.refund {
          display: block;
          background-color: orange;
          border:solid 1px darkorange;
          font-size: 0.8rem;
          text-align: center;
          border-radius: 0.2rem;
          opacity: 0.8;
          margin-top: 0.5rem;
          padding: 0 0.5rem;
          height:1.6rem;
          line-height:1.6rem;
          cursor: pointer;
          color:white;
        }
        .expire{
          font-size: 0.5rem;
        }
        .status-name{
          font-size: 0.8rem;
        }
      }
      .order-validate-code{
        text-align: center;
        font-size: 1.5rem;
        text-decoration: line-through;
      }
      .notUsed{
        text-decoration: none;
      }
      .order-qr-img{
        display: block;
        width:8.5rem;
        height:8.5rem;
        margin: 0 auto;
        border:solid 1px #ccc;
        margin-bottom:0.4rem;
      }
      .order-a{
        padding: 0.4rem 0;
        position: relative;
        border-bottom: solid 1px #f5f5f5;
        span.mr{
          margin-left:0.4rem;
        }
        .order-price,.order-quantity, .order-amount, .order-link-man,.order-link-phone,.order-travel-date,.order-check-in-time{
          display: inline-block;
          font-size: 0.6rem;
          padding-left:0.4rem;
        }
        .order-code{
          font-size:0.8rem;
          display: inline-block;
          padding-left:0.4rem;
          color: #428bca;
        }
      }
      .order-b{
        padding-top: 0.2rem;
        padding-bottom: 0.4rem;
        width:100%;
        margin-top: 0.2rem;
        display: flex;
        .scenicSpot-custome-service{
          flex: 1;
          font-size:0.6rem;
          i{ margin-right:0.4rem;}
        }
      }
      .scenicSpot-a {
        padding: 0.4rem 0;
        position: relative;
        border-bottom: solid 1px #f5f5f5;
        .scenicSpot-name {
          font-size: 0.8rem;
        }
        .scenicSpot-level{
          font-size: 0.6rem;
        }
        .scenicSpot-tel{
          position:absolute;
          right: 0.8rem;
          top: 0.8rem;
        }
      }
      .scenicSpot-b {
        padding-top: 0.2rem;
        width:100%;
        margin-top: 0.2rem;
        display: flex;
        .scenicSpot-address {
          flex: 1;
          font-size:0.6rem;
          i{ margin-right:0.4rem;}
        }
      }
      .scenicSpot-tip{
        font-size:0.5rem;
        padding:0.2rem 0;
      }
    }

  }
</style>
