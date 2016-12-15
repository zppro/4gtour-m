<template lang="jade">
  .following-trend-c
    .following-trend(v-infinite-scroll="allMember$FollowingTrends", infinite-scroll-disabled="appendMember$FollowingTrendDiabled", infinite-scroll-distance="infiniteScrollDistance" , infinite-scroll-immediate-check="false")
      p(v-show="showMemberFetchIndicator" class="page-refresh-loading")
        mt-spinner(type="triple-bounce" color="#ea5513")
        | {{dataRefreshText}}
      mt-loadmore(:top-method="loadTop" @top-status-change="handleTopChange" ref="followingTrendList")
        no-more-data(v-show="allMember$FollowingTrends.length === 0")
        following-trend-group-list(v-show="allMember$FollowingTrends.length > 0")
          following-trend-group-item(v-for="trendGroup in allMember$FollowingTrends", :trend-group="trendGroup")
      p(v-show="showMemberAppendIndicator" class="page-append-loading")
        mt-spinner(type="fading-circle" color="#ea5513")
        | {{dataAppendText}}
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import NoMoreData from '../components/NoMoreData.vue'
  import FollowingTrendGroupList from '../components/FollowingTrendGroupList.vue'
  import FollowingTrendGroupItem from '../components/FollowingTrendGroupItem.vue'
  export default {
    computed: {
      ...mapState(['infiniteScrollDistance', 'dataRefreshText', 'dataAppendText', 'defaultMemberHeadPortrait', 'authMemberByTokenPromise']),
      ...mapGetters(['isLogined', 'allMember$FollowingTrends', 'appendMember$FollowingTrendDiabled', 'showMemberFetchIndicator', 'showMemberAppendIndicator'])
    },
    created () {
      console.log('followingTrendList.vue')
      this.authMemberByTokenPromise.then(() => {
        this.allMember$FollowingTrends.length === 0 && this.fetchMember$FollowingTrendList()
      })
    },
    methods: {
      handleTopChange (status) {
        this.topStatus = status
      },
      loadTop (id) {
        this.fetchMember$FollowingTrendList().then(() => {
          this.$refs.trendList.onTopLoaded(id)
        })
      },
      ...mapActions(['fetchMember$FollowingTrendList', 'appendMember$FollowingTrendList'])
    },
    components: {
      NoMoreData,
      FollowingTrendGroupList,
      FollowingTrendGroupItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .following-trend-c {
    width: 100%;
    .following-trend{
      width:100%;
    }
  }
</style>
