<template lang="jade">
  .ta-body
    .switch-c(v-if="false")
      .switch-block
        a.switch-btn(:class='{"switch-tweeted":currentIndexInExperiencesOfTa!==0, "switch-tweeted-active":currentIndexInExperiencesOfTa===0}' @click="setTaTweeted")
          .i-wrapper
            i.fa.fa-paper-plane-o(aria-hidden="true")
          span TA的发布
      .switch-block
        a.switch-btn(:class='{"switch-stared":currentIndexInExperiencesOfTa!==1, "switch-stared-active":currentIndexInExperiencesOfTa===1}' @click="setTaStared")
          .i-wrapper
            i.fa.fa-star-o(aria-hidden="true")
          span TA的收藏
    no-more-data(v-if="currentExperiences.length === 0")
    .ta-list(v-infinite-scroll="appendCurrentList", infinite-scroll-disabled="appendCurrentDiabled", infinite-scroll-distance="infiniteScrollDistance", infinite-scroll-immediate-check="false")
      p(v-show="showExperienceFetchIndicator" class="page-refresh-loading")
        mt-spinner(type="triple-bounce" color="#ea5513")
        | {{dataRefreshText}}
      experience-list.experience-list(v-show="currentExperiences.length > 0")
        experience-item(v-for="experience in currentExperiences", :experience="experience")
          img(:src="experience.member_head_portrait || defaultMemberHeadPortrait" slot="member_head_portrait")
          span(slot="member_name") {{experience.member_name}}
          span(slot="time_description") {{experience.time_description}}
          div.inline-block(slot="content" v-html="experience.content")
          span.text-danger(slot="details-link"  v-if="isExperienceRoute(experience)") 全文
          .img-list(slot="imgs")
            image-collection(:all-images="experience.imgs", v-on:select="zoomIn")
          span(slot="location") {{experience.location}}
          span(slot="retweets" v-if="experience.retweets > 0") {{experience.retweets}}
          span(slot="stars" v-if="experience.stars > 0") {{experience.stars}}
          span(slot="likes" v-if="experience.likes > 0") {{experience.likes}}
          div(slot="retweetRoot" v-if="experience.retweet_flag" )
            experience-item-retweet-root(:experience="experience.retweet_root" )
      p(v-show="showExperienceAppendIndicator" class="page-append-loading")
        mt-spinner(type="fading-circle" color="#ea5513")
        | {{dataAppendText}}
    mt-popup(v-model="showImageSwiper",position="bottom" class="mint-popup-bottom")
      image-swiper.full-screen(:all-images="allImages", :current-image="currentImage", v-on:restore="zoomOut", v-if="showImageSwiper")
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import ExperienceList from '../../components/ExperienceList.vue'
  import ExperienceItem from '../../components/ExperienceItem.vue'
  import ExperienceItemRetweetRoot from '../../components/ExperienceItemRetweetRoot.vue'
  import NoMoreData from '../../components/NoMoreData.vue'
  import ImageCollection from '../../components/ImageCollection.vue'
  import ImageSwiper from '../../components/ImageSwiper.vue'
  export default {
    data () {
      return {
        allImages: [],
        currentImage: ''
      }
    },
    props: ['isListTweeted'],
    computed: {
      currentExperiences () {
        return this.currentIndexInExperiencesOfTa === 0 ? this.experiencesTaTweeted : this.experiencesTaStared
      },
      appendCurrentDiabled () {
        return this.currentIndexInExperiencesOfTa === 0 ? this.appendTaTweetedDiabled : this.appendTaStaredDiabled
      },
      showImageSwiper () {
        return this.allImages.length > 0
      },
      ...mapState(['infiniteScrollDistance', 'dataRefreshText', 'dataAppendText', 'defaultMemberHeadPortrait']),
      ...mapGetters(['currentIndexInExperiencesOfTa', 'experiencesTaTweeted', 'experiencesTaStared', 'appendTaTweetedDiabled', 'appendTaStaredDiabled', 'showExperienceFetchIndicator', 'showExperienceAppendIndicator'])
    },
    created () {
      console.log('this.isListTweeted:' + this.isListTweeted)
      this.isListTweeted ? this.setTaTweeted() : this.setTaStared()
    },
    watch: {
      isListTweeted () {
        console.log('TAExperience watch.isListTweeted:' + this.isListTweeted)
        this.isListTweeted ? this.setTaTweeted() : this.setTaStared()
      }
    },
    methods: {
      zoomIn (allImages, currentImage) {
        this.allImages = allImages
        this.currentImage = currentImage
      },
      zoomOut () {
        this.allImages = []
        this.currentImage = ''
      },
      isExperienceRoute: function (experience) {
        return experience.category === 'A0003'
      },
      appendCurrentList () {
        this.currentIndexInExperiencesOfTa === 0 ? this.appendTaTweetedList() : this.appendTaStaredList()
      },
      ...mapActions(['setTaTweeted', 'setTaStared', 'fetchTaTweetedList', 'appendTaTweetedList', 'fetchTaStaredList', 'appendTaStaredList'])
    },
    components: {
      ExperienceList,
      ExperienceItem,
      ExperienceItemRetweetRoot,
      NoMoreData,
      ImageCollection,
      ImageSwiper
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .ta-body {
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
          width:5rem;
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
    .ta-list{
      width:100%;
    }
    .full-screen{
      position: absolute;
      left: 0;
      top: 0;
      width:100%;
      height:100%;
    }
    .mint-popup-bottom {
      width: 100%;
      height: 100%;
      background-color: #000;
      backface-visibility: hidden;
    }
    .mint-loadmore{
      width: 100%;
      height:21.35rem;
    }
  }
</style>
