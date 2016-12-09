<template lang="jade">
  .ta-following-follower-c
    no-more-data(v-if="currentFollowList.length === 0")
    .ta-following-follower(v-show="currentFollowList.length > 0", v-infinite-scroll="appendCurrentList", infinite-scroll-disabled="appendCurrentDiabled", infinite-scroll-distance="infiniteScrollDistance" , infinite-scroll-immediate-check="false")
      p(v-show="showTa$FollowingFollowedFetchIndicator" class="page-refresh-loading")
        mt-spinner(type="triple-bounce" color="#ea5513")
          | {{dataRefreshText}}
      mt-loadmore(:top-method="loadFollow" @top-status-change="handleFollowChange" ref="myList")
        ta-following-follower-list
          ta-following-follower-item(v-for="followItem in currentFollowList", :ta-member-id="followItem.id", :is-following="isListFollowing")
            img(:src="followItem.headpic || defaultMemberHeadPortrait" slot="member_head_portrait")
            span(slot="member_name") {{followItem.nickName}}
            span(slot="member_description") {{followItem.headpic}}
      p(v-show="showTa$FollowingFollowedAppendIndicator" class="page-append-loading")
        mt-spinner(type="fading-circle" color="#ea5513")
          | {{dataAppendText}}
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import NoMoreData from '../../components/NoMoreData.vue'
  import TaFollowingFollowerList from '../../components/TAFollowingFollowerList.vue'
  import TaFollowingFollowerItem from '../../components/TAFollowingFollowerItem.vue'
  export default {
    props: ['isListFollowing'],
    computed: {
      currentFollowList () {
        return this.isListFollowing ? this.allTa$Followings : this.allTa$Followers
      },
      appendCurrentDiabled () {
        return this.isListFollowing ? this.appendTa$FollowingDiabled : this.appendTa$FollowerDiabled
      },
      fetchData () {
        return this.isListFollowing ? this.fetchTa$FollowingList : this.fetchTa$FollowerList
      },
      ...mapState(['infiniteScrollDistance', 'dataRefreshText', 'dataAppendText']),
      ...mapGetters(['allTa$Followings', 'allTa$Followers', 'appendTa$FollowingDiabled', 'appendTa$FollowerDiabled', 'showTa$FollowingFollowedFetchIndicator', 'showTa$FollowingFollowedAppendIndicator'])
    },
    methods: {
      handleFollowChange (status) {
        this.topStatus = status
      },
      loadFollow (id) {
        this.fetchData().then(() => {
          this.$refs.myList.onTopLoaded(id)
        })
      },
      appendCurrentList () {
        this.isListFollowing ? this.appendTa$FollowingList() : this.appendTa$FollowerList()
      },
      ...mapActions(['fetchTa$FollowingList', 'appendTa$FollowingList', 'fetchTa$FollowerList', 'appendTa$FollowerList'])
    },
    created () {
      this.fetchData()
    },
    components: {
      NoMoreData,
      TaFollowingFollowerList,
      TaFollowingFollowerItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
  .ta-following-follower-c {
    width: 100%;
    .ta-following-follower{
      width: 100%;
    }
  }
</style>
