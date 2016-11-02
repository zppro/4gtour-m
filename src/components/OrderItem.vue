<template lang="jade">
  .order-item
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
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.order-item {
  width:100%;
  margin-top: 0.6rem;
  padding:0 0.8rem;
  text-align: left;
  height:6.35rem;
  border-bottom: solid 1px #c1c1c1;
  border-top: solid 1px #c1c1c1;
  .order-line-top{
    width:100%;
    height:2.2rem;
    line-height:2.2rem;
    border-bottom: solid 1px #f5f5f5;
    display: inline-flex;
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
    width: 100%;
    height:4.15rem;
    font-size:0.8rem;
    color:#C7C5C6;
    span{
      color:#7E7C7D;
    }
    .order-code, .order-time, .order-amount{
      font-size:0.6rem;
      height:1.38rem;
      line-height:1.38rem;
    }
    .order-amount{
      color: #fa761d;
    }
  }
}
</style>
