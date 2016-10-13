<template lang="jade">
  .product-details-item
    .product-img
      img(src="static/img/1.png")
    .hello
      h1 {{msg}}
      p
        button(@click="hb()") heart-beat
        button(@click="tpost()") test-post-crossdomain
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
  .product-details-item {
    width:100%;
    img {
      height: auto;
      width: auto\9;
      width:100%;
    }
  }
</style>
