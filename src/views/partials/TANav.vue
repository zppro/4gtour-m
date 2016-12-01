<template lang="jade">
  nav.nav-header
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right
      i.fa.fa-commenting(aria-hidden="true")
      span 聊天
      i.fa.fa-plus-circle(aria-hidden="true")
      span 关注
</template>
<style lang="less" scoped>
  .nav-header{
    height:2.5rem;
    text-align: center;
    display:flex;
    flex-direction:row;
    align-items: center;
    padding:0;
    margin:0;
    width:100%;
    background-image: url('http://img2.okertrip.com/4gtour-ta-bg.jpg');
    background-size: 100%;
  }
  .nav-item-right{
    flex: 0.5;
    width:60px;
  }
  .nav-header .nav-item-right i{
    font-size:0.7rem;
    margin-left:0.4rem;
  }
  .nav-header .nav-item-right span{
    font-size:0.7rem;
    margin-left:0.1rem;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default{
    props: ['ta'],
    computed: {
      title () {
        return ''
      },
      ...mapGetters(['isLogined'])
    },
    methods: {
      back () {
        window.history.back()
      }
    }
  }
</script>
