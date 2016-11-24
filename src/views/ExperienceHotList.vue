<template lang="jade">
  .hot-list-c
    no-more-data(v-if="experiencesHot.length === 0")
    .hot-list(v-infinite-scroll="appendHotList", infinite-scroll-disabled="appendHotDiabled", infinite-scroll-distance="infiniteScrollDistance",v-show="experiencesHot.length > 0" )
      p(v-show="showExperienceFetchIndicator" class="page-refresh-loading")
        mt-spinner(type="triple-bounce" color="#ea5513")
        | {{dataRefreshText}}
      experience-list.experience-list
        experience-item(v-for="experience in experiencesHot", :experience-id="experience.id")
          img(:src="experience.member_head_portrait" slot="member_head_portrait")
          span(slot="member_name") {{experience.member_name}}
          span(slot="time_description") {{experience.time_description}}
          i.fa.fa-car(aria-hidden="true" slot="category" v-if="experience.category === 'A0003'")
          span(slot="content") {{experience.content}}
          .img-list(slot="imgs")
            img(v-for="img in experience.imgs", :src="img" @click="zoomIn")
          span(slot="location") {{experience.location}}
          span(slot="retweets" v-if="experience.retweets > 0") {{experience.retweets}}
          span(slot="stars" v-if="experience.stars > 0") {{experience.stars}}
          span(slot="likes" v-if="experience.likes > 0") {{experience.likes}}
      p(v-show="showExperienceAppendIndicator" class="page-append-loading")
        mt-spinner(type="fading-circle" color="#ea5513")
        | {{dataAppendText}}
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import ExperienceList from '../components/ExperienceList.vue'
  import ExperienceItem from '../components/ExperienceItem.vue'
  import NoMoreData from '../components/NoMoreData.vue'
  export default {
    computed: {
      ...mapState(['infiniteScrollDistance', 'dataRefreshText', 'dataAppendText']),
      ...mapGetters(['experiencesHot', 'appendHotDiabled', 'showExperienceFetchIndicator', 'showExperienceAppendIndicator'])
    },
    methods: {
      zoomIn () {
        console.log(11)
      },
      ...mapActions(['fetchHotList', 'appendHotList'])
    },
    created () {
      console.log('hot created')
      this.fetchHotList()
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
  .hot-list-c{
    width: 100%;
    .hot-list {
      width: 100%;
      .experience-list{}
    }
  }
</style>
