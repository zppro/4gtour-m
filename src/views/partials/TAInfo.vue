<template lang="jade">
    .ta-head
      .ta-head-portrait-c
        .ta-head-portrait-w1
          .ta-head-portrait-w2
            img.ta-head-portrait(:src="format(ta.head_portrait || defaultTAHeadPortrait)")
      .ta-name {{ta.name}}
      .ta-stat-actions
        router-link.ta-following(:to="taFollowingUrl" replace) 关注 {{ta.following || 0}}
        router-link.ta-follower(:to="taFollowerUrl" replace) 粉丝 {{ta.follower || 0}}
        router-link.ta-tweeted(:to="taTweetedUrl" replace) 发布 {{ta.following || 0}}
        router-link.ta-stared(:to="taStaredUrl" replace) 收藏 {{ta.follower || 0}}
</template>
<style lang="less" scoped>
    .ta-head {
      width: 100%;
      height: 9.5rem;
      background-image: url('http://img2.okertrip.com/4gtour-ta-bg.jpg');
      background-size: 100%;
      background-position: 0 -2.5rem;
      color:white;
      .ta-head-portrait-c{
        width:5rem;
        height:5rem;
        margin: 0 auto;
        padding:0.05rem;
        .ta-head-portrait-w1{
          width:4.95rem;
          height:4.95rem;
          background-color: #6185DB;
          padding:0.1rem;
          -moz-border-radius: 2.475rem;
          -webkit-border-radius: 2.475rem;
          border-radius: 2.375rem;
          .ta-head-portrait-w2{
            width:4.75rem;
            height:4.75rem;
            background-color: #ABA6CB;
            padding:0.2rem;
            -moz-border-radius: 2.375rem;
            -webkit-border-radius: 2.375rem;
            border-radius: 2.375rem;
            .ta-head-portrait{
              opacity: 1!important;
              width:4.35rem;
              height:4.35rem;
              -moz-border-radius: 2.175rem;
              -webkit-border-radius: 2.175rem;
              border-radius: 2.175rem;
            }
          }
        }
      }
      .ta-name{
        font-size:1rem;
        text-align: center;
        margin-top:0.45rem;
        margin-bottom: 0.35rem;
      }
      .ta-stat-actions{
        font-size:0.667rem;
        width:14rem;
        margin: 0 auto;
        .ta-following,.ta-follower,.ta-tweeted,.ta-stared {
          width:25%;
          display: inline-block;
          text-align: center;
          color:white;
        }
        .ta-following{
          border-right: solid 0.5px whitesmoke;
        }
        .ta-follower,.ta-tweeted{
          border-left: solid 0.5px whitesmoke;
          border-right: solid 0.5px whitesmoke;
        }
        .ta-stared{
          border-left: solid 0.5px whitesmoke;
        }
      }
    }
</style>
<script>
  import { mapState, mapGetters } from 'vuex'
  export default{
    props: ['ta'],
    computed: {
      taFollowingUrl () {
        return '/ta/' + this.ta.code + '/following'
      },
      taFollowerUrl () {
        return '/ta/' + this.ta.code + '/follower'
      },
      taTweetedUrl () {
        return '/ta/' + this.ta.code + '/tweeted'
      },
      taStaredUrl () {
        return '/ta/' + this.ta.code + '/stared'
      },
      ...mapState(['defaultTAHeadPortrait']),
      ...mapGetters(['isLogined'])
    },
    methods: {
      format: function (img) {
        return window.utils.qiniuImageView(img, window.utils.rem2px(4.35), window.utils.rem2px(4.35))
      }
    }
  }
</script>
