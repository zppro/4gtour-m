<template lang="jade">
  nav.nav-header.header-color
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right2(@click="submitForm")
      a.btn-send 保存
</template>
<style lang="less" scoped>
  .nav-header .nav-item-right2{
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
  import { mapActions } from 'vuex'
  export default {
    computed: {
      title () {
        return this.$route.name
      }
    },
    methods: {
      back () {
        this.$router.replace('/experience/mine')
      },
      ...mapActions(['submitForm'])
    }
  }
</script>
