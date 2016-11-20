<template lang="jade">
  .product-info
    .product-block-img
      slot(name="img")
    .product-block.product-block-title-price-quantity-level
      .product-title
        slot(name="title")
      .product-ticket-title
        slot(name="ticket-title")
      .product-price
        slot(name="price")
      .product-bid-price
        slot(name="bid-price")
      .product-buy-quantity
        slot(name="buy-quantity")
      .product-level
        slot(name="level")
      .product-actions
        router-link.btn.order-now(:to="orderRoute") 立即购买
        router-link.btn.changeTicket(v-show="showChangeTicket", :to="selectTicketRoute") 其他价格
    .product-block.product-block-validate
      .label-title 有效期
      slot(name="validate")
    .product-block.product-block-tip
      .label-title 相关说明
      slot(name="tip")
    .product-block.product-block-runtime
      .label-title 营业时间
      slot(name="runtime")
    .product-block.validate-block-address
      .label-title 详细地址
      slot(name="address")
    .product-block.product-block-travel-guide
      .label-title 交通指南
      slot(name="travel-guide")
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: ['showChangeTicket', 'selectTicketRoute', 'orderRoute'],
    methods: {
      changeTicket () {
        this.$emit('changeTicket')
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .product-info {
    text-align: left;
    width:100%;
    color:#4f4f4f;
    background-color:#e5e5e5;
    .product-block-img {
      background-color: white;
      img {
        height: auto;
        width: auto \9;
        width: 100%;
      }
    }
    .product-block{
      min-height: 2.4rem;
      padding:0.4rem;
      border-top:solid 1px #4f4f4f;
      background-color: white;
      .label-title{
        font-size:0.9rem;
        color:#000;
      }
      span{
        padding-left:0.05rem;
      }
      div{
        padding:0.05rem;
        font-size:0.7rem;
        color:#4f4f4f;
        line-height:1rem;
      }
    }
    .product-block-title-price-quantity-level{
      border-top:none;
      border-bottom:solid 1px #4f4f4f;
      margin-bottom: 0.35rem;
      position: relative;
      /*height:3.75rem;*/
      .product-title{
        font-size:1rem;
        color:#000;
        padding-top:0.25rem;
      }
      .product-price{
        font-size:1.6rem;
        color:#ea5513;
        display: inline-block;
        margin-top:0.5rem;
      }
      .product-bid-price{
        font-size:1rem;
        color:#7f7d7d;
        display: inline-block;
        padding-left:0.2rem;
        text-decoration: line-through;
      }
      .product-buy-quantity{
        padding-left:0.2rem;
        display: inline-block;
        font-size:1rem;
      }
      .product-level{
        font-size:1.2rem;
        color:#ea5513;
        display: inline-block;
        text-align: right;
        text-indent: 1rem;
      }
      .product-actions{
        text-align:center;
        margin: 0 auto;
        padding: 0.2rem;
        max-width: 18.75rem;
        height:4rem;
        line-height:4rem;
        position: relative;
        .btn{
          opacity: 0.8;
          color:white;
          width: 7rem;
          font-size:1rem;
          height:2rem;
          line-height:2rem;
          border:none;
          cursor: pointer;
          margin:0 0.25rem;
        }
        .shopping-cart{
          background-color: #000;
        }
        .changeTicket{
          background-color: lightskyblue;
        }
        .order-now{
          background-color: #ea5513;
        }
      }
    }
    .product-block-validate{
      div{
        color: #ea5513;
      }
    }
  }
</style>
