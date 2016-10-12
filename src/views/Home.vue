<template lang="jade">
  .home
    product-list(v-for="product in products")
      product-item
        .product-img(slot="product-img")
          img(:src="product.img")
    h1 {{msg}}
    p
      button(@click="hb()") heart-beat
      button(@click="tpost()") test-post-crossdomain
</template>

<script>
  import productList from '../Components/ProductList'
  import productItem from '../Components/ProductItem'
  export default {
    data () {
      return {
        msg: 'Hello 4gtour!!!',
        products: [{img:'1.png',title:'1',description:'1',price:'1'},{img:'2.png',title:'2',description:'2',price:'2'},{img:'3.png',title:'3',description:'3',price:'3'}]
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
    h1 {
      color: #42b983;
    }
  }

</style>
