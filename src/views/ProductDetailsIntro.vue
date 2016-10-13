<template lang="jade">
  .product-details-intro
    iframe(src="http://r.xiumi.us/board/v5/2thVS/23650245")
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    console.log(1231111)
    next()
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
  .product-details-intro {
    width: 100%;
    height: 100%;
    flex: 1;
    iframe {
      width: 100%;
      height: 100%;
      border:none;
    }
  }
</style>
