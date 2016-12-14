<template lang="jade">
  .ta-following-follower-c
    .ta-following-follower(v-infinite-scroll="appendCurrentList", infinite-scroll-disabled="appendCurrentDiabled", infinite-scroll-distance="infiniteScrollDistance" , infinite-scroll-immediate-check="false")
      p(v-show="showMemberFetchIndicator" class="page-refresh-loading")
        mt-spinner(type="triple-bounce" color="#ea5513")
          | {{dataRefreshText}}
      mt-loadmore(:top-method="loadFollow" @top-status-change="handleFollowChange" ref="myList")
        no-more-data(v-show="currentFollowList.length === 0")
        following-follower-list(v-show="currentFollowList.length > 0")
          following-follower-item(v-for="followItem in currentFollowList", :ta-member-id="followItem.id", :relation="followItem.relation")
            img(:src="followItem.headPic || defaultMemberHeadPortrait" slot="member_head_portrait")
            span(slot="member_name") {{followItem.nickName}}
            span(slot="member_description") {{followItem.description || '暂无'}}
      p(v-show="showMemberAppendIndicator" class="page-append-loading")
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
      ...mapGetters(['allTa$Followings', 'allTa$Followers', 'appendTa$FollowingDiabled', 'appendTa$FollowerDiabled', 'showMemberFetchIndicator', 'showMemberAppendIndicator'])
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
  .ta-following-follower-c {
    width: 100%;
    .mint-loadmore{
      width: 100%;
      min-height:21.35rem;
    }
  }
</style>
