<template lang="jade">
  .home
    product-list(v-for="product in products")
      product-item(:product-id="product.id")
        .product-img(slot="img")
          img(:src="product.img")
          .product-price(slot="price")
            span.unit ￥
            span {{product.price}}
        .product-title(slot="title") {{product.title}}
        .product-description(slot="description") {{product.description}}
</template>

<script>
  import productList from '../components/ProductList'
  import productItem from '../components/ProductItem'
  export default {
    data () {
      return {
        products: []
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.autoLogin()
        vm.fetchScenicSpots().then(rows => {
          vm.products = rows
        })
      })
    },
    methods: {
      autoLogin () {
        window.proxy.$exec('autoLogin')
      },
      fetchScenicSpots () {
        return this.$http.get('api/scenicSpots').then(ret => {
          let rows = []
          if (ret.data.success) {
            rows = ret.data.rows
          }
          return rows
        })
      }
    },
    components: {
      productList,
      productItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
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
  }
</style>
