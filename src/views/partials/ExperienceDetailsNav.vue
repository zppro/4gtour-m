<template lang="jade">
  nav.nav-header.header-color
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right(@click="refreshOrderDetails")
      i.fa.fa-external-link(aria-hidden="true" @click="showShareAction")
    mt-actionsheet(:actions="shareActions" v-model="sheetVisible")
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
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        sheetVisible: false,
        shareActions: []
      }
    },
    computed: {
      title () {
        return this.$route.name
      },
      isExperienceRoute: function () {
        return this.experienceInDetails.category === 'A0003'
      },
      experienceContent: function () {
        return this.experienceInDetails.content
      },
      experienceFirstImage: function () {
        if (this.experienceInDetails.imgs.length > 0) {
          return this.experienceInDetails.imgs[0]
        }
        return ''
      },
      ...mapState(['env']),
      ...mapGetters(['experienceInDetails'])
    },
    mounted () {
      this.shareActions = [{
        name: '分享到微信朋友圈',
        method: this.shareWeixinTimeline
      }, {
        name: '发送给微信好友',
        method: this.shareWeixinSession
      }]
    },
    methods: {
      back () {
        window.history.back()
      },
      showShareAction () {
        this.sheetVisible = true
      },
      refreshOrderDetails () {
        this.fetchMember$OrderInfo(this.$route.params)
      },
      shareWeixinTimeline () {
        if (this.env.isApiCloud) {
          this.shareToWeixinOnApiCloud({scene: 'timeline', title: this.experienceContent, description: '感受', thumbUrl: this.experienceFirstImage, contentUrl: window.location.href})
        } else {
          // 判断是否在微信公众号内
        }
        this.sheetVisible = false
      },
      shareWeixinSession () {
        if (this.env.isApiCloud) {
          // window.proxy.$exec('pay', info)  通过代理支付已经过时
          this.shareToWeixinOnApiCloud({scene: 'timeline', title: this.experienceContent, description: '感受', thumbUrl: this.experienceFirstImage, contentUrl: window.location.href})
        } else {
          // 判断是否在微信公众号内
        }
        this.sheetVisible = false
      },
      ...mapActions(['shareToWeixinOnApiCloud'])
    }
  }
</script>
