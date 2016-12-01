<template lang="jade">
    .ta-head
      .ta-head-portrait-c
        .ta-head-portrait-w1
          .ta-head-portrait-w2
            img.ta-head-portrait(:src="format(ta.head_portrait || defaultTAHeadPortrait)")
      .ta-name {{ta.name}}
      .ta-follow-unfollow
        .ta-follow 关注 365
        .ta-unfollow 粉丝 835
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
              min-width:4.35rem;
              min-height:4.35rem;
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
      .ta-follow-unfollow{
        font-size:0.667rem;
        width:7rem;
        margin: 0 auto;
        .ta-follow,.ta-unfollow {
          width:50%;
          display: inline-block;
          text-align: center;
        }
        .ta-follow{
          border-right: solid 0.5px whitesmoke;
        }
        .ta-unfollow{
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
      ...mapState(['defaultTAHeadPortrait']),
      ...mapGetters(['isLogined'])
    },
    created () {
      console.log('ta=')
      window.setTimeout(() => {
        console.log(this.ta.name)
      }, 2000)
    },
    methods: {
      format: function (img) {
        return window.utils.qiniuImageView(img, window.utils.rem2px(4.35), window.utils.rem2px(4.35))
      },
      closeSelf () {
        this.$emit('AAA')
      }
    }
  }
</script>
