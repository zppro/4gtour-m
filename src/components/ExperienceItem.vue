<template lang="jade">
  .experience-item
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .experience-item {
    width:100%;
    background-color: white;
    text-align: left;
    height:16.8rem;
    margin-bottom: 1px;
  }
</style>
<script>
  export default {
    props: ['experienceId'],
    computed: {
      itemUrl () {
        return {path: '/experience-details/' + this.experienceId}
      }
    }
  }
</script>
