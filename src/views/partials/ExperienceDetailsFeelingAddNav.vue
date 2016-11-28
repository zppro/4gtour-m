<template lang="jade">
  nav.nav-header.header-color
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right(@click="submitForm")
      a.btn-send 发送
</template>
<style lang="less" scoped>
  .nav-header{
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
  .nav-header .nav-item-left{
    flex: 0.1;
    -webkit-flex: 0.1;
    width:40px;
    font-size:1.2rem;
    margin-left:0.2rem;
  }
  .nav-header .nav-item-right{
    flex: 0.3;
    font-size:1.2rem;
    margin-right:0.2rem;
    .btn-send{
      background-color: #00D20D;
      width:100%;
      -moz-border-radius: 0.2rem;
      -webkit-border-radius: 0.2rem;
      border-radius: 0.2rem;
      font-size:0.8rem;
      color: white;
      padding: 0.4rem 0.8rem;
    }
  }

  .nav-header .nav-item-center > h1 > span{
    margin-left:0.2rem;
  }
</style>
<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      title () {
        return this.$route.name
      },
      ...mapState(['env']),
      ...mapGetters(['experienceInDetails'])
    },
    methods: {
      back () {
        this.$router.replace('/experience/mine')
      },
      ...mapActions(['submitForm'])
    }
  }
</script>
