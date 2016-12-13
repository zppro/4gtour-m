<template lang="jade">
  .my-following-follower-c
    no-more-data(v-if="currentFollowList.length === 0")
    .my-following-follower(v-show="currentFollowList.length > 0", v-infinite-scroll="appendCurrentList", infinite-scroll-disabled="appendCurrentDiabled", infinite-scroll-distance="infiniteScrollDistance" , infinite-scroll-immediate-check="false")
      p(v-show="showTa$FollowingFollowedFetchIndicator" class="page-refresh-loading")
        mt-spinner(type="triple-bounce" color="#ea5513")
          | {{dataRefreshText}}
      mt-loadmore(:top-method="loadFollow" @top-status-change="handleFollowChange" ref="myList")
        following-follower-list
          following-follower-item(v-for="followItem in currentFollowList", :ta-member-id="followItem.id", :relation="followItem.relation")
            img(:src="followItem.headPic || defaultMemberHeadPortrait" slot="member_head_portrait")
            span(slot="member_name") {{followItem.nickName}}
            span(slot="member_description") {{followItem.headpic}}
      p(v-show="showTa$FollowingFollowedAppendIndicator" class="page-append-loading")
        mt-spinner(type="fading-circle" color="#ea5513")
          | {{dataAppendText}}
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import NoMoreData from '../../components/NoMoreData.vue'
  import FollowingFollowerList from '../../components/FollowingFollowerList.vue'
  import FollowingFollowerItem from '../../components/FollowingFollowerItem.vue'
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
      ...mapState(['infiniteScrollDistance', 'dataRefreshText', 'dataAppendText', 'defaultMemberHeadPortrait']),
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
      console.log('fetchData at created isListFollowing:' + this.isListFollowing)
      this.fetchData()
    },
    watch: {
      isListFollowing () {
        this.fetchData()
      }
    },
    components: {
      NoMoreData,
      FollowingFollowerList,
      FollowingFollowerItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
  .my-following-follower-c {
    width: 100%;
    .my-following-follower{
      width: 100%;
    }
  }
</style>
