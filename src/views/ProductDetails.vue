<template lang="jade">
  .product-details
    router-view(name="item")
    router-view(name="intro")
</template>

<script>
export default {
  ready () {
    console.log(123)
  },
  data () {
    return {
      msg: 'Hello 4gtour!!!'
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
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .product-details {
    width:100%;
    display:flex;
    height:30.15rem;
    flex-direction:column;
  }
</style>
