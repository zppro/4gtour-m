<template lang="jade">
  .product-details-intro
    iframe(:src="introductionUrl || 'http://r.xiumi.us/board/v5/2thVS/23650245'")
</template>

<script>
export default {
  props: ['introduction-url']
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
