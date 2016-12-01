<template lang="jade">
  nav.nav-header.header-color
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right(@click="showShareAction")
      i.fa.fa-external-link(aria-hidden="true")
    mt-actionsheet(:actions="shareActions" v-model="sheetVisible")
</template>
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
