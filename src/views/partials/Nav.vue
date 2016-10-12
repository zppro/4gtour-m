<template lang="jade">
  nav.nav-header
    a.nav-item.nav-item-left
      span.icon.icon-me
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right
      span.icon.icon-menu
</template>
<style>
    .nav-header{
      background-color:lightgray;
      color:#333;
      height:60px;
      text-align: center;
      display:flex;
      flex-direction:row;
      align-items: center;
      padding:0;
      margin:0;
      width:100%;
    }
    .nav-item{
      font-size:1rem;
      justify-content: center;
    }
    .nav-item h1{
      padding:0;
      margin:0;
      height:100%;
      line-height: 60px;
      font-size:1rem;
      box-sizing: border-box;
    }
    .nav-header .nav-item-center{
      flex: 1;
      -webkit-flex: 1;
    }
    .nav-header .nav-item-left{
      flex: 0.1;
      -webkit-flex: 0.1;
      width:40px;
      font-size:1.2rem;
      margin-left:0.2rem;
    }
    .nav-header .nav-item-right{
      flex: 0.1;
      -webkit-flex: 0.1;
      width:40px;
      font-size:1.2rem;
      margin-right:0.2rem;
    }

    .nav-header .nav-item-left > span,.nav-header .nav-item-right > span{

    }
</style>
<script>
    export default {

      data () {
        return {
          title: '杭州',
          path: ''
        }
      }
    }
</script>
