<template lang="jade">
  nav.nav-header.header-color
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right(@click="fetchMember$Orders")
      i.fa.fa-refresh(aria-hidden="true")
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
    flex: 0.1;
    -webkit-flex: 0.1;
    width:40px;
    font-size:1.2rem;
    margin-right:0.2rem;
  }

  .nav-header .nav-item-center > h1 > span{
    margin-left:0.2rem;
  }
</style>
<script>
  import { mapActions } from 'vuex'
  export default {
    computed: {
      title () {
        return this.$route.name
      }
    },
    methods: {
      back () {
        this.$router.replace('/')
      },
      refreshOrderDetails () {
        this.fetchMember$Orders(this.$route.params)
      },
      ...mapActions(['fetchMember$Orders'])
    }
  }
</script>
