<template lang="jade">
  .mine-list-c
    .switch-c
      .switch-block
        a.switch-btn(:class='{"switch-tweeted":currentIndexInExperiencesOfMine!==0, "switch-tweeted-active":currentIndexInExperiencesOfMine===0}' @click="setMyTweetedOfMine")
          .i-wrapper
            i.fa.fa-paper-plane-o
          span 我发布的
      .switch-block
        a.switch-btn(:class='{"switch-stared":currentIndexInExperiencesOfMine!==1, "switch-stared-active":currentIndexInExperiencesOfMine===1}' @click="setMyStaredOfMine")
          .i-wrapper
            i.fa.fa-star-o
          span 我收藏的
    no-more-data(v-if="currentExperiences.length === 0")
    .mine-list(v-if="currentExperiences.length > 0")
      experience-list.experience-list
        experience-item(v-for="experience in currentExperiences", :experience-id="experience.id")
          img(:src="experience.member_head_portrait" slot="member_head_portrait")
          span(slot="member_name") {{experience.member_name}}
          span(slot="time_description") {{experience.time_description}}
          span(slot="content") {{experience.content}}
          .img-list(slot="imgs")
            img(v-for="img in experience.imgs", :src="img" @click="zoomIn")
          span(slot="location") {{experience.location}}
          span(slot="retweets" v-if="experience.retweets > 0") {{experience.retweets}}
          span(slot="stars" v-if="experience.stars > 0") {{experience.stars}}
          span(slot="likes" v-if="experience.likes > 0") {{experience.likes}}
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import ExperienceList from '../components/ExperienceList.vue'
  import ExperienceItem from '../components/ExperienceItem.vue'
  import NoMoreData from '../components/NoMoreData.vue'
  export default {
    computed: {
      currentExperiences () {
        return this.currentIndexInExperiencesOfMine === 0 ? this.experiencesMyTweeted : this.experiencesMyStared
      },
      appendCurrentDiabled () {
        return this.currentIndexInExperiencesOfMine === 0 ? this.appendMyTweetedDiabled : this.appendMyStaredDiabled
      },
      ...mapState(['infiniteScrollDistance', 'dataRefreshText', 'dataAppendText']),
      ...mapGetters(['currentIndexInExperiencesOfMine', 'experiencesMyTweeted', 'experiencesMyStared', 'appendMyTweetedDiabled', 'appendMyStaredDiabled', 'showExperienceFetchIndicator', 'showExperienceAppendIndicator'])
    },
    methods: {
      zoomIn () {
        console.log(123)
      },
      appendCurrentList () {
        this.currentIndexInExperiencesOfMine === 0 ? this.appendMyTweetedList() : this.appendMyStaredList()
      },
      ...mapActions(['setMyTweetedOfMine', 'setMyStaredOfMine', 'fetchMyTweetedList', 'appendMyTweetedList', 'fetchMyStaredList', 'appendMyStaredList'])
    },
    created () {
      console.log(this.currentIndexInExperiencesOfMine)
      this.currentIndexInExperiencesOfMine === 0 ? this.fetchMyTweetedList() : this.fetchMyTweetedList()
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
      .switch-block{
        display: inline-block;
        width:50%;
        margin-top:0.2rem;
        height: 1.8rem;
        .switch-btn{
          display: block;
          background-color: white;
          width:4rem;
          margin: 0 auto;
          padding-top:0.2rem;
          height: 1.8rem;
          text-align:center;
          .i-wrapper{
            color:white;
            width:1.35rem;
            height:1.35rem;
            -moz-border-radius: 0.675rem;
            -webkit-border-radius: 0.675rem;
            border-radius: 0.675rem;
            display: inline-block;
            font-size:0.7rem;
            i{height:1.35rem;line-height:1.35rem;}
          }
          span{
            padding-left:0.2rem;
            font-size: 0.6rem;
          }
        }
        .switch-tweeted,.switch-stared{
          .i-wrapper{
            background-color: #ceced2;
          }
          span{
            color:#ceced2;
          }
        }
        .switch-tweeted-active{
          .i-wrapper{
            background-color: #00a0e9;
          }
          span{
            color: #000;
          }
        }
        .switch-stared-active{
          .i-wrapper{
            background-color: #eb6877;
          }
        }
      }
      .switch-block:first-child{
        border-right: solid 1px #ceced2;
      }
    }
    .mine-list{
      width:100%;
    }
  }
</style>
