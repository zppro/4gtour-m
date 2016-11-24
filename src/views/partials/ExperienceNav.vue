<template lang="jade">
  nav#nav-header-experience.header-color
    a.nav-item.nav-item-left
      i.fa(aria-hidden="true")
    a.nav-item.nav-item-center
      a.tab-header(:class='{"tab-header-active":tabIndex===0}' @click="switchTab(0)") 关注
      a.tab-header(:class='{"tab-header-active":tabIndex===1}' @click="switchTab(1)") 热门
      a.tab-header(:class='{"tab-header-active":tabIndex===2}' @click="switchTab(2)") 我的
    a.nav-item.nav-item-right
      i.fa.fa-camera(aria-hidden="true" @click="tweetExperience")
    mt-actionsheet(:actions="shareActions" v-model="sheetVisible")
</template>
<style lang="less" scoped>
    #nav-header-experience{
      height:3.2rem;
      text-align: center;
      display:flex;
      flex-direction:row;
      align-items: center;
      padding:0;
      margin:0;
      width:100%;
      color:white;
      a{color:white;}
      .nav-item{
        font-size:1rem;
        justify-content: center;
      }
      .nav-item-center{
        flex: 1;
        -webkit-flex: 1;
        .tab-header{
          font-size: 1rem;
          width: 33%;
          display: inline-block;
          height:2rem;
          line-height:2rem;
        }
        .tab-header-active {
          border-bottom:solid 0.1rem white;
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
  import { mapState, mapGetters, mapActions } from 'vuex'
  let $ = window.$
  export default {
    data () {
      return {
        title: '...',
        sheetVisible: false,
        shareActions: []
      }
    },
    computed: {
      tabIndex () {
        if (this.$route.path === '/experience/follow') {
          return 0
        } else if (this.$route.path === '/experience/hot') {
          return 1
        } else if (this.$route.path === '/experience/mine') {
          return 2
        }
      },
      ...mapState(['env']),
      ...mapGetters(['scenicSpotInDetails'])
    },
    methods: {
      switchTab (index) {
        $('.tab-header').removeClass('tab-header-active')
        $($('.tab-header').get(index)).addClass('tab-header-active')
        let subView = index === 0 ? 'follow' : index === 1 ? 'hot' : 'mine'
        this.$router.replace({path: '/experience/' + subView})
      },
      tweetExperience () {
        if (this.env.isApiCloud) {
          // window.proxy.$exec('pay', info)  通过代理支付已经过时
          this.shareToWeixinOnApiCloud({scene: 'timeline', title: this.scenicSpotInDetails.selected_ticket_name, description: ' ￥(' + this.scenicSpotInDetails.selected_ticket_price + ')', thumbUrl: this.scenicSpotInDetails.img, contentUrl: window.location.href})
        } else {
          // 判断是否在微信公众号内
        }
        this.sheetVisible = false
      },
      ...mapActions(['shareToWeixinOnApiCloud'])
    }
  }
</script>
