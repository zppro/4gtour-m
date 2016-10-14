<template lang="jade">
  router-link.product-item(:to="itemUrl")
    slot(name="img")
    slot(name="title")
    slot(name="description")
    slot(name="price")
</template>
<script>
  export default {
    props: ['productId'],
    computed: {
      itemUrl () {
        return {path: '/details/' + this.productId + '/info'}
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.product-item {
  width:100%;
}
</style>
