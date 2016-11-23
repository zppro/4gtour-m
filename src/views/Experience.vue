<template lang="jade">
  .experience
    router-view(name="follow")
    router-view(name="hot")
    router-view(name="mine")
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .experience {
    width:100%;
  }
</style>
