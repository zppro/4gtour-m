<template lang="jade">
  span.quantity-regulator
    span.btn.fa.fa-minus(@click="minus()")
    span.q-value {{qValue}}
    span.btn.fa.fa-plus(@click="plus()")
</template>
<script>
  export default {
    props: ['qValue'],
    methods: {
      minus () {
        console.log(this.qValue)
        // this.qValue--
      },
      plus () {
        this.qValue++
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .quantity-regulator {
    border-radius: 0.8rem;
    -moz-border-radius: 0.8rem;
    border:solid 1px #000;
    span.btn{
      cursor:pointer;
      margin: 0 0.3rem;
    }
    span.q-value{
      border:solid 1px #000;
      padding: 0 0.4rem;
    }
  }
</style>
