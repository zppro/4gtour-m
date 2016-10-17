<template lang="jade">
  .product-info
    .product-block-img
      slot(name="img")
    .product-block.product-block-title-price-quantity-level
      .product-title
        slot(name="title")
      .product-price
        slot(name="price")
      .product-bid-price
        slot(name="bid-price")
      .product-buy-quantity
        slot(name="buy-quantity")
      .product-level
        slot(name="level")
    .product-block.product-block-ticket
      .product-ticket
        slot(name="ticket")
      router-link.fa.fa-ellipsis-h(v-show="showChangeTicket" , :to="selectTicketRoute")
    .product-block.product-block-address
      .label-title 详细地址
      slot(name="address")
    .product-block.product-block-runtime
      .label-title 营业时间
      slot(name="runtime")
    .product-block.product-block-tip
      .label-title 相关说明
      slot(name="tip")
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
    props: ['showChangeTicket', 'selectTicketRoute'],
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
        position: absolute;
        right:0.6rem;
        bottom:0.6rem;
        font-size:1.2rem;
        color:#ea5513;
        display: inline-block;
        width:4.25rem;
        text-align: right;
      }
    }
    .product-block-ticket{
      display: flex;
      align-items: center;
      width:100%;
      > span{
        width: 1px!important;
        flex: 0.05;
        color:#7f7d7d;
        cursor:pointer;
        justify-content: center;
      }
      .product-ticket{
        padding-left:0!important;
        :before {
          content: '门票';
          font-size:0.9rem;
          color:#000;
          padding-right:0.6rem;
        }
        flex:1;
        -moz-box-flex: 1;
        font-size:0.7rem;
        color:#4f4f4f;
        display: inline-block;
        padding-left:0.2rem;
      }
    }

  }
</style>
