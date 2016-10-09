<template>
  <nav class="nav-header">
    <a class="nav-item nav-item-left" >
      <span class="icon icon-me"></span>
    </a>
    <a class="nav-item nav-item-center" >
      <h1 class="" v-text="title"></h1>
    </a>
    <a class="nav-item nav-item-right" >
      <span class="icon icon-menu"></span>
    </a>
  </nav>
</template>
<style>
    .nav-header{
      background-color:lightgray;
      color:#333;
      height:60px;
      text-align: center;
      display:-webkit-box;
      display:-webkit-flex;
      display:-ms-flexbox;
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
