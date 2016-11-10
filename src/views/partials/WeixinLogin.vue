<template lang="jade">
    .weixin-login
      p 在微信中扫描下面的二维码登录
      #weixin-qr
        .wrapper-center
          mt-spinner(style="float:left" type="snake" color="#666" ,:size="spinnerSize")
          span 获取二维码...
      p
        a.btn.btn-close(@click="closeSelf") 关闭
</template>
<style lang="less" scoped>
    .weixin-login {
      width: 100%;
      p{
        padding:0 0.4rem;
      }
      #weixin-qr{
        background-color: #e5e5e5;
        margin: 0 auto;
        width:8rem;
        height:10rem;
        text-align:center;
        .wrapper-center{
          padding-top: 4rem;
          font-size:0.8rem;
          width:6rem;
          margin:0 auto;
          vertical-align: middle;
        }
      }
      .btn-close{
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
<script>
  import { mapGetters } from 'vuex'
  export default{
    data () {
      return {
        spinnerSize: 32
      }
    },
    computed: {
      ...mapGetters(['openWeixinAppid'])
    },
    mounted () {
      console.log(this.openWeixinAppid)
      var obj = new window.WxLogin({
        id: 'weixin-qr',
        appid: this.openWeixinAppid,
        redirect_uri: encodeURIComponent('http://weixin.okertrip.com/#/weixin-auth'),
        scope: 'snsapi_login',
        state: 'auto',
        style: '',
        href: ''
      })
      console.log(obj)
    },
    methods: {
      closeSelf () {
        this.$emit('closeWeixinLogin')
      }
    }
  }
</script>
