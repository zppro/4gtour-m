<template lang="jade">
  .login
    .username.login-field
      .login-icon
        i.fa.fa-user(aria-hidden="true")
      .login-value
        input(type="text" placeholder="用户名/手机号" v-model="username")
    .password.login-field
      .login-icon
        i.fa.fa-lock(aria-hidden="true")
      .login-value
        input(type="password" placeholder="密码" v-model="password")
    a.btn.btn-login(@click="authMember({username, password, category: 3})") 登录
    p 其他登录
    ul
      li
        a.iconfont.icon-weichat(v-show="isWeixinConfigLoaded" title="微信", @click="bottomPopupVisible = true")
        a.iconfont.icon-xinlang(v-show="true" title="新浪微博" @click="WeiBoLogin")
    mt-popup(v-model="bottomPopupVisible" position="bottom" class="mint-popup-bottom")
      weixin-login(v-on:closeWeixinLogin="closeWeixinLogin()")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import WeixinLogin from './partials/WeixinLogin'
  export default {
    data () {
      return {
        bottomPopupVisible: false,
        username: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters(['isWeixinConfigLoaded', 'isLogined', 'memberInfo'])
    },
    methods: {
      closeWeixinLogin () {
        this.bottomPopupVisible = false
      },
      WeiBoLogin () {
        console.log(14523)
        console.log(window.WB2)
      },
      ...mapActions(['authMember'])
    },
    watch: {
      isLogined: function (newIsLogined) {
        if (newIsLogined) {
          if (this.$route.query.redirect) {
            this.$router.replace({path: this.$route.query.redirect})
          } else {
            this.$router.replace({path: '/'})
          }
        }
      }
    },
    components: {
      WeixinLogin
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .login {
    width: 100%;
    padding:0.8rem;
    .login-field{
      width:100%;
      height: 2rem;
      padding:0.2rem;
      background-color: white;
      margin-bottom:0.4rem;
      -moz-border-radius: 0.2rem;
      -webkit-border-radius: 0.2rem;
      border-radius: 0.2rem;
      border:solid 1px #BEBCBD;
      display:inline-flex;
      align-items: center;
      .login-icon {
        color:#5A5351;
        width: 1.6rem;
        line-height:1.6rem;
        flex:0.1;
      }
      .login-value {
        height:1.6rem;
        flex:0.9;
        text-align: center;
        input {
          width:90%;
          height:1.6rem;
          line-height: 1.6rem;
          border:none;
          font-size:1.2rem;
        }
      }
    }
    .btn-login{
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
    > ul > li {
      a  {font-size:2rem;}
      a:hover{color:orange;}
      .icon-weichat {color:#00D20D}
      .icon-xinlang { color: #F56467}
      height:1.6rem;
    }
    .mint-popup-bottom {
      width: 100%;
      max-width: 18.75rem;
      height: 80%;
      background-color: #fff;
    }

  }
</style>
