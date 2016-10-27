<template lang="jade">
  nav#nav-header-home
    a.nav-item.nav-item-left
      span.fa.fa-user
    a.nav-item.nav-item-center
      h1 {{title}}
        span.fa.fa-caret-down
    a.nav-item.nav-item-right
      span.fa.fa-list
</template>
<style lang="less" scoped>
    #nav-header-home{
      background-color:#ea5513;
      height:3.2rem;
      text-align: center;
      display:flex;
      flex-direction:row;
      align-items: center;
      padding:0;
      margin:0;
      width:100%;
      a{
        cursor: pointer;
      }
      > .nav-item{
        color:white;
        font-size:1rem;
        justify-content: center;
        h1{
          padding:0;
          margin:0;
          height:100%;
          line-height: 3.2rem;
          font-size:1.2rem;
          box-sizing: border-box;
        }
      }
      > .nav-item-center{
        flex: 1;
        -webkit-flex: 1;
        > h1 > span{
          margin-left:0.2rem;
        }
      }
      > .nav-item-left{
        flex: 0.1;
        -webkit-flex: 0.1;
        width:40px;
        font-size:1.2rem;
        margin-left:0.2rem;
      }
      > .nav-item-right{
        flex: 0.1;
        -webkit-flex: 0.1;
        width:40px;
        font-size:1.2rem;
        margin-right:0.2rem;
      }
    }
</style>
<script>
    export default {
      data () {
        return {
          title: '杭州'
        }
      }
    }
</script>
