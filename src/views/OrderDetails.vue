<template lang="jade">
  .order-details
    .order-block
      .scenicSpot-img
        img(:src="member$OrderInDetails.scenicSpotInfo.img")
      .scenicSpot-other1
        .ticket-name.text-muted {{member$OrderInDetails.scenicSpotInfo.ticket_name}}
        .runtime.text-muted
          i.fa.fa-calendar
          | {{member$OrderInDetails.scenicSpotInfo.runtime}}
        i.fa.fa-phone.text-muted.tel-icon
        a.tel
          | {{member$OrderInDetails.scenicSpotInfo.tel}}
    .order-block(v-if="member$OrderInDetails.orderInfo.qr_show")
      .order-qr
        span.text-muted 凭证号:
        .order-validate-code {{member$OrderInDetails.orderInfo.validate_code}}
      .order-qr
        span.text-muted 二维码图片:
        .order-validate-code {{member$OrderInDetails.orderInfo.validate_code}}
    .order-block(v-if="member$OrderInDetails.orderInfo.order_show")
      .order-a
        .order-row
          span.text-muted 单价:
          .order-price ￥ {{member$OrderInDetails.orderInfo.price}}
          span.mr.text-muted 数量:
          .order-quantity {{member$OrderInDetails.orderInfo.quantity}}
          span.mr.text-muted 金额:
          .order-amount {{member$OrderInDetails.orderInfo.amount}}
        .order-row
          span.text-muted 联系人:
          .order-link_man {{member$OrderInDetails.orderInfo.link_man}}
          span.mr.text-muted 联系电话:
          .order-link_phone {{member$OrderInDetails.orderInfo.link_phone}}
        .order-row
          span.text-muted 游玩日期:
          .order-travel_date {{member$OrderInDetails.orderInfo.travel_date  | formatDate('YYYY-MM-DD')}}
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
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['member$OrderInDetails'])
    },
    created () {
      console.log('created...')
      this.ensureMember$OrderInfo()
    },
    methods: {
      ...mapActions(['ensureMember$OrderInfo'])
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
        .tel-icon{
          font-size:0.7rem;
        }
        .tel{
          background-color: lightblue;
          border:solid 1px deepskyblue;
          font-size: 1rem;
          text-align: center;
          border-radius: 0.2rem;
          opacity: 0.8;
          padding: 0 0.5rem;
          height:1.6rem;
          line-height:1.6rem;
          cursor: pointer;
          margin:0 0.25rem;
        }
      }
      .order-a{
        padding: 0.4rem 0;
        position: relative;
        border-bottom: solid 1px #f5f5f5;
        span.mr{
          margin-left:0.4rem;
        }
        .order-price,.order-quantity, .order-amount, .order-link_man,.order-link_phone,.order-travel_date{
          display: inline-block;
          font-size: 0.6rem;
          padding-left:0.4rem;
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
