<template lang="jade">
  .hello
    h1 {{msg}}
    p
      button(@click="hb()") heart-beat
      button(@click="tpost()") test-post-crossdomain
</template>

<script>
export default {
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
h1 {
  color: #42b983;
}
</style>
