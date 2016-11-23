<template lang="jade">
  .hot-list-c
    .hot-list(v-infinite-scroll="appendHotList", infinite-scroll-disabled="appendHotDiabled", infinite-scroll-distance="infiniteScrollDistance")
      p(v-show="showExperienceFetchIndicator" class="page-refresh-loading")
        mt-spinner(type="triple-bounce" color="#ea5513")
        | {{dataRefreshText}}
      experience-list.experience-list
        experience-item(v-for="experience in experiencesHot", :experience-id="experience.id")
      p(v-show="showExperienceAppendIndicator" class="page-append-loading")
        mt-spinner(type="fading-circle" color="#ea5513")
        | {{dataAppendText}}
    no-more-data
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
      ...mapActions(['fetchHotList', 'appendHotList'])
    },
    created () {
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
    .hot-list {
      width: 100%;
      .experience-list{}
    }
  }
</style>
