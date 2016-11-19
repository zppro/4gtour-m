<template lang="jade">
  router-link.order-item(:to="itemUrl")
    .order-line-top
      span.order-title.no-wrap
        slot(name="title")
      span.order-status.no-wrap
        slot(name="status")
    .order-line-bottom
      .order-code
        span 订单号：
        slot(name="code")
      .order-time
        span 下单时间：
        slot(name="time")
      .order-amount
        span 订单金额：
        slot(name="amount")
      .action-left-right
        i.fa.fa-chevron-right(aria-hidden="true")
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.order-item {
  width:100%;
  background-color: white;
  margin:0.6rem auto;
  padding:0 0.4rem;
  text-align: left;
  height:6.35rem;
  display:block;
  border-top: solid 1px #c1c1c1;
  border-bottom: solid 1px #c1c1c1;
  box-shadow: 0 0 0.5rem #999;
  -moz-box-shadow: 0 0 0.5rem #999;
  -webkit-box-shadow: 0 0 0.5rem #999;
  .order-line-top{
    height:2.2rem;
    line-height:2.2rem;
    border-bottom: solid 1px #f5f5f5;
    display: flex;
    .order-title{
      font-size:1rem;
      flex: 3;
    }
    .order-status{
      font-size:0.93rem;
      text-align: right;
      flex: 1;
    }
  }
  .order-line-bottom {
    position:relative;
    height:4.15rem;
    font-size:0.6rem;
    color:#C7C5C6;
    span{
      color:#7E7C7D;
      font-size:0.6rem;
    }
    .order-code, .order-time, .order-amount{
      font-size:0.8rem;
      height:1.38rem;
      line-height:1.38rem;
    }
    .order-code{
      color: #428bca;
    }
    .order-amount{
      color: #fa761d;
    }
    .action-left-right{
      position:absolute;
      font-size:0.8rem;
      right:0.3rem;
      bottom:0.3rem;
    }
  }
}
</style>
<script>
  export default {
    props: ['orderId'],
    computed: {
      itemUrl () {
        return {path: '/order-details/' + this.orderId}
      }
    }
  }
</script>
