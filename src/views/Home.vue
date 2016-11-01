<template lang="jade">
  .home(v-infinite-scroll="appendScenicSpots", infinite-scroll-disabled="appendDiabled", infinite-scroll-distance="10")
    p(v-show="showFetchIndicator" class="page-refresh-loading")
      mt-spinner(type="triple-bounce" color="orange")
      | 刷新中..
    product-list
      product-item(v-for="product in allScenicSpotsInHome", :product-id="product.id")
        .product-img(slot="img")
          img(:src="product.img")
          .product-price(slot="price")
            span.unit ￥
            span {{product.price}}
        .product-title(slot="title") {{product.title}}
        .product-description(slot="description") {{product.description}}
    p(v-show="showAppendIndicator" class="page-append-loading")
      mt-spinner(type="fading-circle" color="orange")
      | 加载中...
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import productList from '../components/ProductList'
  import productItem from '../components/ProductItem'
  export default {
    computed: {
      ...mapGetters(['allScenicSpotsInHome', 'appendDiabled', 'showFetchIndicator', 'showAppendIndicator'])
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (window.proxy.$needLogin()) {
          window.proxy.$exec('autoLogin')
        }
      })
    },
    methods: {
      ...mapActions(['appendScenicSpots'])
    },
    components: {
      productList,
      productItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
  .home{
    width: 100%;
    text-align:left;
    background-color:white;
    h1 {
      color: #42b983;
    }
    .product-img{
      position:relative;
      img {
        height: auto;
        width: auto\9;
        width:100%;
      }
      .product-price{
        background-color:#e72822;
        opacity: 0.8;
        width:4rem;
        border-top-left-radius: 0.8rem;
        -moz-border-radius-topleft: 0.8rem;
        border-bottom-left-radius: 0.8rem;
        -moz-border-radius-bottomleft: 0.8rem;
        text-align: center;
        color: white;
        font-size:0.775rem;
        padding:0.4rem 0.2rem;
        position:absolute;
        bottom: 1rem;
        right: 0;
        span.unit{
          font-size:0.6rem;
        }
      }
    }
    .product-title{
      text-underline: none;
      font-size:1rem;
      margin-top:0.375rem;
      margin-bottom:0.375rem;
      width:100%;
      padding:0 0.2rem;
    }
    .product-description{
      font-size:0.7rem;
      margin-bottom: 0.65rem;
      width:100%;
      padding:0 0.2rem;
      opacity: 0.6;
    }
    .page-refresh-loading, .page-append-loading{
      text-align: center;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size:0.75rem;
      color: orange;
      div{
        display: inline-block;
        vertical-align: middle;
        margin-right:0.25rem;
      }
    }
  }
</style>
