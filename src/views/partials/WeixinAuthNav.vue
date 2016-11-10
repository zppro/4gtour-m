<template lang="jade">
  nav.nav-header
    a.nav-item.nav-item-center
      h1 {{title}}
</template>
<style lang="less" scoped>
    .nav-header{
      background-color:#ea5513;
      height:3.2rem;
      text-align: center;
      display:flex;
      flex-direction:row;
      align-items: center;
      padding:0;
      margin:0;
      width:100%;
    }
    .nav-item{
      color:white;
      font-size:1rem;
      justify-content: center;
    }
    .nav-item h1{
      padding:0;
      margin:0;
      height:100%;
      line-height: 3.2rem;
      font-size:1rem;
      box-sizing: border-box;
    }
    .nav-header .nav-item-center{
      flex: 1;
      -webkit-flex: 1;
    }
    .nav-header .nav-item-center > h1 > span{
      margin-left:0.2rem;
    }
</style>
<script>
    export default {
      computed: {
        title () {
          return this.$route.name
        }
      },
      methods: {
        back () {
          window.history.back()
        }
      }
    }
</script>
