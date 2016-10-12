<template lang="jade">
  .product-item
    slot(name="product-img")
    slot(name="product-title")
    slot(name="product-description")
    slot(name="product-price")
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.product-item {
  width:100%;
}
</style>
