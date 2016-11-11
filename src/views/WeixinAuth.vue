<template lang="jade">
  .weixin-auth
    p 正在认证...
    a.btn.btn-return(@click="weixinOpen$GetUserInfo(code)") 认证
    router-link.btn.btn-return(to="/") 返回首页
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        code: ''
      }
    },
    created () {
//      console.log(this.$route.query)
      this.code = this.$route.query.code
      if (this.code) {
        this.weixinOpen$GetUserInfo()
      } else {
        this.$router.replace({path: '/'})
      }
    },
    computed: {
      ...mapGetters(['isLogined'])
    },
    methods: {
      ...mapActions(['weixinOpen$GetUserInfo'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .weixin-auth {
    width: 100%;
    padding:0.8rem;
    .btn-return{
      margin-top:1.2rem;
      background-color: #EB5736;
      width:100%;
      -moz-border-radius: 0.2rem;
      -webkit-border-radius: 0.2rem;
      border-radius: 0.2rem;
      font-size:1.2rem;
      color: white;
      padding: 0.4rem 0;
    }
  }
</style>
