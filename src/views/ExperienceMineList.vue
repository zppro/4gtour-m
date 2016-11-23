<template lang="jade">
  .mine-list-c
    .switch-c
      .switch-bg
        route-link.switch-btn(:class='{"switch-tweeted":loadIndex!==0, "switch-tweeted-active":loadIndex===0}')
          .i-wrapper
            i.fa.fa-paper-plane-o
          span 我发布的
        route-link.switch-btn(:class='{"switch-stared":loadIndex!==1, "switch-stared-active":loadIndex===1}')
          .i-wrapper
            i.fa.fa-star-o
          span 我收藏的
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import ExperienceList from '../components/ExperienceList.vue'
  import ExperienceItem from '../components/ExperienceItem.vue'
  import NoMoreData from '../components/NoMoreData.vue'
  export default {
    data () {
      return {
        loadIndex: 0
      }
    },
    computed: {
      ...mapState(['infiniteScrollDistance', 'dataRefreshText', 'dataAppendText']),
      ...mapGetters(['experiencesMyTweeted', 'experiencesMyStared', 'appendMyTweetedDiabled', 'appendMyStaredDiabled', 'showExperienceFetchIndicator', 'showExperienceAppendIndicator'])
    },
    methods: {
      zoomIn () {
        console.log(123)
      },
      ...mapActions(['fetchMyTweetedList', 'appendMyTweetedList', 'fetchMyStaredList', 'appendMyStaredList'])
    },
    created () {
      this.fetchMyTweetedList()
    },
    components: {
      ExperienceList,
      ExperienceItem,
      NoMoreData
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .mine-list-c {
    width: 100%;
    .switch-c{
      width:100%;
      height: 2.2rem;
      background-color: white;
      border-bottom: solid 1px #c1c1c1;
      padding-top: 0.2rem;
      .switch-bg{
        height: 1.8rem;
        line-height:1.8rem;
        background-color: #ceced2;
        .switch-btn{
          display: inline-block;
          background-color: white;
          width:9.3625rem;
          height: 1.8rem;
          text-align:center;
          .i-wrapper{
            width:1.35rem;
            height:1.35rem;
            -moz-border-radius: 0.675rem;
            -webkit-border-radius: 0.675rem;
            border-radius: 0.675rem;
            background-color: #ceced2;
            display: inline-block;
          }
          span{
            font-size: 0.6rem;
          }
        }
      }
      .switch-tweeted{
        margin-right: 0.5px;
      }
      .switch-tweeted-active{
        .i-wrapper{
          background-color: #00a0e9;
        }
      }
      .switch-stared{
         margin-left: 0.5px;
      }
      .switch-stared-active{
        .i-wrapper{
          background-color: #eb6877;
        }
      }
    }
  }
</style>
