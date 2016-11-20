<template lang="jade">
    section.leftPopupContent
      .member-info
        .member-info-left
          .member-head-portrait(v-if="!isLogined")
            .fa.fa-user(aria-hidden="true")
          img.member-head-portrait(v-if="isLogined", :src="memberInfo.head_portrait")
          p(v-if="!isLogined")
            a.btn.btn-action(@click="callLogin") 点击登录
        .member-info-right(v-show="isLogined")
          span.member-name {{memberInfo.member_name}}
          .member-description.no-wrap {{memberInfo.member_description}}
          p
            a.btn.btn-action(@click="logout") 安全退出
      .member-actions
        mt-cell(title="我的订单" is-link to="/my-orders")
          mt-badge(v-if="isLogined && memberHaveUnpayAndValidOrders" type="error" size="small") {{memberHaveUnpayAndValidCount}}
        mt-cell(title="关于四季游" is-link)
      .app-actions
        a.link.link-action(@click="")
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import { $GLOABL_PREFIX$, HIDE_LEFT_POPUP } from '../../store/mutation-types'
  import { APICLOUD_OPEN_LOGIN_WIN } from '../../store/share-apicloud-event-names'
  export default{
    data () {
      return {
        headPortrait: 'http://img2.okertrip.com/05.jpg'
      }
    },
    computed: {
      routePath () {
        return this.$route.path
      },
      ...mapState(['env']),
      ...mapGetters(['isLogined', 'memberInfo', 'memberHaveUnpayAndValidOrders', 'memberHaveUnpayAndValidCount'])
    },
    watch: {
      routePath (newRoutePath) {
        this[$GLOABL_PREFIX$ + HIDE_LEFT_POPUP]()
      }
    },
    methods: {
      callLogin () {
        if (this.env.isApiCloud) {
          // 呼出登录窗体
          this.env.isApiCloud && this.sendEventToApiCloud({ eventName: APICLOUD_OPEN_LOGIN_WIN })
        } else {
          this.$router.replace({path: '/login'})
        }
      },
      ...mapMutations([$GLOABL_PREFIX$ + HIDE_LEFT_POPUP]),
      ...mapActions(['logout', 'sendEventToApiCloud'])
    }
  }
</script>
<style lang="less" scoped>
  .leftPopupContent{
    background-color: #f8f8f8;
    box-shadow: 0.5rem 0 0.5rem #333;
    -moz-box-shadow: 0.5rem 0 0.5rem #333;
    -webkit-box-shadow: 0.5rem 0 0.5rem #333;
    height: 100%;
    position: relative;
    .mint-badge{
      margin-right:1rem;
    }
    .member-info{
      color:white;
      padding: 0.25rem 0;
      display: flex;
      align-items: center;
      .member-info-left{
        flex:1;
        .member-head-portrait{
          margin: 0 auto;
          width: 4rem;
          height: 4rem;
          -moz-border-radius: 2rem;
          -webkit-border-radius: 2rem;
          border-radius: 2rem;
          background-color: #ea5513;
          > div{
            width:100%;
            color:white;
            font-size:2rem;
            height:100%;
            line-height:4rem;
          }
        }
      }
      .member-info-right{
        flex:1;
        text-align: left;
        .member-name{
          color: #666;
        }
        .member-description{
          color: #ccc;
          font-size:0.6rem;
        }
      }
      p {
        margin:0;
        padding:0.2rem 0;
        .btn-action{
          background-color: #ea5513;
          color:white;
          padding: 0.2rem 0.4rem;
          font-size:0.75rem;
        }
      }
    }
    .member-actions{
      text-align: left;
    }
    .app-actions {
      position: absolute;
      width:100%;
      bottom: 0.1rem;
      text-align: left;
    }
    .link-action{
      padding: 0.2rem 0.4rem;
      font-size:0.6rem;
    }
  }
</style>
