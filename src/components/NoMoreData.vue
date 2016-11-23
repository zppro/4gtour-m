<template lang="jade">
  .no-more-data
    h1.text-muted {{msg}}
</template>

<script>
export default {
  data () {
    return {
      msg: '没有任何数据！'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .no-more-data{
    width:100%;
    height:30.15rem;
    padding:0;
    margin:0;
    background-color: white;
  }

</style>
