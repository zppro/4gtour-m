<template lang="jade">
  nav#nav-header-product-details
    a.nav-item.nav-item-left(@click="back()")
      span.fa.fa-chevron-left
    a.nav-item.nav-item-center
      a.tab-header.tab-header-active(@click="switchTab(0)") 景点
      a.tab-header(@click="switchTab(1)") 详情
    a.nav-item.nav-item-right
      span.fa.fa-external-link
</template>
<style lang="less" scoped>
    #nav-header-product-details{
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
      .nav-item{
        color:#4f4f4f;
        font-size:1rem;
        justify-content: center;
      }
      .nav-item-center{
        flex: 1;
        -webkit-flex: 1;
        .tab-header{
          font-size: 0.8rem;
          width: 3.5rem;
          display: inline-block;
          height:100%;
          line-height:3.0rem;
        }
        .tab-header-active {
          border-bottom:solid 0.1rem #ea5513;
        }
      }
      .nav-item-left{
        flex: 0.1;
        -webkit-flex: 0.1;
        width:40px;
        font-size:1.2rem;
        margin-left:0.2rem;
      }
      .nav-item-right{
        flex: 0.1;
        -webkit-flex: 0.1;
        width:40px;
        font-size:1.2rem;
        margin-right:0.2rem;
      }
    }
</style>
<script>
  let $ = window.$
  export default {
    data () {
      return {
        title: '...'
      }
    },
    methods: {
      back () {
        window.history.back()
      },
      switchTab (index) {
        $('.tab-header').removeClass('tab-header-active')
        $($('.tab-header').get(index)).addClass('tab-header-active')
        let subDetails = index === 0 ? 'info' : 'intro'
        console.log(this.$route.params.id)
        // console.log(this.$router)
        this.$router.replace({path: '/details/' + this.$route.params.id + '/' + subDetails})
        console.log('success')
      }
    }
  }
</script>
