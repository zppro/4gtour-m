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
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters(['isLogined', 'memberInfo'])
    },
    methods: {
      ...mapActions(['authMember'])
    },
    watch: {
      isLogined: function (newIsLogined) {
        if (newIsLogined) {
          if (this.$route.query.redirect) {
            this.$router.push({path: this.$route.query.redirect})
          } else {
            this.$router.push({path: '/'})
          }
        }
      }
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
  }
</style>
