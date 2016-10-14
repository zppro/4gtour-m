<template lang="jade">
  .product-details
    router-view(name="info")
    router-view(name="intro")
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .product-details {
    width:100%;
  }
</style>
