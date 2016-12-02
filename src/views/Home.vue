<template lang="jade">
  .home(v-infinite-scroll="appendScenicSpots", infinite-scroll-disabled="appendDiabled", infinite-scroll-distance="infiniteScrollDistance", infinite-scroll-immediate-check="false")
    p(v-show="showFetchIndicator" class="page-refresh-loading")
      mt-spinner(type="triple-bounce" color="#ea5513")
      | {{dataRefreshText}}
    product-list
      product-item(v-for="product in allScenicSpotsInHome", :product-id="product.id")
        .product-img(slot="img")
          img(v-lazy="product.img")
          .product-price(slot="price")
            span.unit ￥
            span {{product.price}}
        .product-title(slot="title") {{product.title}}
        .product-description(slot="description") {{product.description}}
    p(v-show="showAppendIndicator" class="page-append-loading")
      mt-spinner(type="fading-circle" color="#ea5513")
      | {{dataAppendText}}
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import productList from '../components/ProductList'
  import productItem from '../components/ProductItem'
  export default {
    computed: {
      ...mapState(['infiniteScrollDistance', 'dataRefreshText', 'dataAppendText', 'env']),
      ...mapGetters(['allScenicSpotsInHome', 'appendDiabled', 'showFetchIndicator', 'showAppendIndicator'])
    },
    created () {
      this.allScenicSpotsInHome.length === 0 && this.fetchScenicSpots()
    },
    methods: {
      ...mapActions(['fetchScenicSpots', 'appendScenicSpots'])
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
    image[lazy=loading] {
      width: 100%;
      height: 8.75rem;
      margin: auto;
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
  }
</style>
