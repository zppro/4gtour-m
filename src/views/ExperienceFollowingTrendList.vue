<template lang="jade">
  .follow-list
  | 关注人的见闻
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import NoMoreData from '../components/NoMoreData.vue'
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
      NoMoreData
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .follow-list {
    width: 100%;
  }
</style>
