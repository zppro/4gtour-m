<template lang="jade">
  .home
    product-list(v-for="product in products")
      product-item(:product-id="product.id")
        .product-img(slot="img")
          img(:src="product.img")
          .product-price(slot="price")
            span ￥
            {{product.price}}
        .product-title(slot="title") {{product.title}}
        .product-description(slot="description") {{product.description}}
    p
      button(@click="hb()") heart-beat
      button(@click="tpost()") test-post-crossdomain
</template>

<script>
  import productList from '../components/ProductList'
  import productItem from '../components/ProductItem'
  export default {
    data () {
      return {
        msg: 'Hello 4gtour!!!',
        products: [
          {id: 'product 1', img: 'static/img/1.png', title: '杭州西湖雷峰塔', description: '船游千年运河 赏潺潺流水人家', price: '30'},
          {id: 'product 2', img: 'static/img/2.png', title: '杭州京杭大运河', description: '船游千年运河 赏潺潺流水人家', price: '78'},
          {id: 'product 3', img: 'static/img/3.png', title: '杭州宋城', description: '船游千年运河 赏潺潺流水人家', price: '45'}
        ]
      }
    },
    methods: {
      hb () {
        let success = this.$http.get('api/hb')
            .then(ret => ret.success)
        console(success)
      },
      tpost () {
        let ret = this.$http.post('api/tpost', {foo: 'bar'})
        console(ret)
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
        span{
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
    }

  }

</style>
