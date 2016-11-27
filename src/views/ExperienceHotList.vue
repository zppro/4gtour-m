<template lang="jade">
  .hot-list-c
    no-more-data(v-if="experiencesHot.length === 0")
    .hot-list(v-infinite-scroll="appendHotList", infinite-scroll-disabled="appendHotDiabled", infinite-scroll-distance="infiniteScrollDistance",v-show="experiencesHot.length > 0" )
      p(v-show="showExperienceFetchIndicator" class="page-refresh-loading")
        mt-spinner(type="triple-bounce" color="#ea5513")
        | {{dataRefreshText}}
      experience-list.experience-list
        experience-item(v-for="experience in experiencesHot", :experience-id="experience.id")
          img(:src="experience.member_head_portrait || defaultMemberHeadPortrait" slot="member_head_portrait")
          span(slot="member_name") {{experience.member_name}}
          span(slot="time_description") {{experience.time_description}}
          i.fa.fa-car(aria-hidden="true" slot="category" v-if="isExperienceRoute(experience)")
          span(slot="content") {{experience.content}}
          span.text-danger(slot="details-link"  v-if="isExperienceRoute(experience)") 全文
          .img-list(slot="imgs")
            image-collection(:all-images="experience.imgs", v-on:select="zoomIn")
          span(slot="location") {{experience.location}}
          span(slot="retweets" v-if="experience.retweets > 0") {{experience.retweets}}
          span(slot="stars" v-if="experience.stars > 0") {{experience.stars}}
          span(slot="likes" v-if="experience.likes > 0") {{experience.likes}}
      p(v-show="showExperienceAppendIndicator" class="page-append-loading")
        mt-spinner(type="fading-circle" color="#ea5513")
        | {{dataAppendText}}
    mt-popup(v-model="showImageSwiper",position="bottom" class="mint-popup-bottom")
      image-swiper.full-screen(:all-images="allImages", :current-image="currentImage", v-on:restore="zoomOut", v-if="showImageSwiper")
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import ExperienceList from '../components/ExperienceList.vue'
  import ExperienceItem from '../components/ExperienceItem.vue'
  import NoMoreData from '../components/NoMoreData.vue'
  import ImageCollection from '../components/ImageCollection.vue'
  import ImageSwiper from '../components/ImageSwiper.vue'
  export default {
    data () {
      return {
        allImages: [],
        currentImage: ''
      }
    },
    computed: {
      showImageSwiper () {
        return this.allImages.length > 0
      },
      ...mapState(['infiniteScrollDistance', 'dataRefreshText', 'dataAppendText', 'defaultMemberHeadPortrait']),
      ...mapGetters(['experiencesHot', 'appendHotDiabled', 'showExperienceFetchIndicator', 'showExperienceAppendIndicator'])
    },
    created () {
      this.fetchHotList()
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
      ...mapActions(['fetchHotList', 'appendHotList'])
    },
    components: {
      ExperienceList,
      ExperienceItem,
      NoMoreData,
      ImageCollection,
      ImageSwiper
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .hot-list-c{
    width: 100%;
    .hot-list {
      width: 100%;
      .experience-list{}
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
  }
</style>
