<template lang="jade">
  span.quantity-regulator
    span.btn.fa.fa-minus(@click="minus")
    .q-value {{qValue}}
    span.btn.fa.fa-plus(@click="plus")
</template>
<script>
  export default {
    props: ['qValue'],
    methods: {
      minus () {
        this.$emit('minus')
      },
      plus () {
        this.$emit('plus')
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
    padding:0.2rem;
    span.btn{
      cursor:pointer;
      margin: 0 0.2rem;
    }
    .q-value{
      width:1.8rem;
      display:inline-block;
      padding: 0 0.4rem;
      text-align: center;
    }
  }
</style>
