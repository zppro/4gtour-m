<template lang="jade">
  .group-index-c
    group-latest-participated(:group="latestParticipated")
    .index-list(v-infinite-scroll="appendGroups", infinite-scroll-disabled="appendGroupDiabled", infinite-scroll-distance="infiniteScrollDistance", infinite-scroll-immediate-check="false")
      p(v-show="showGroupFetchIndicator" class="page-refresh-loading")
        mt-spinner(type="triple-bounce" color="#ea5513")
        | {{dataRefreshText}}
      mt-loadmore(:top-method="loadTop" @top-status-change="handleTopChange" ref="groupIndexList")
        group-list
          group-item(v-for="group in allGroups", :group="group", :member-id="memberInfo.member_id" v-on:participate-group="participateGroup")
        .mint-loadmore-top.text-muted(slot="top")
          span(v-show="topStatus !== 'loading'") 下拉刷新
      p(v-show="showGroupAppendIndicator" class="page-append-loading")
        mt-spinner(type="fading-circle" color="#ea5513")
        | {{dataAppendText}}
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import GroupLatestParticipated from '../components/GroupLatestParticipated.vue'
  import GroupList from '../components/GroupList.vue'
  import GroupItem from '../components/GroupItem.vue'
  export default {
    data () {
      return {
        topStatus: ''
      }
    },
    computed: {
      ...mapState(['infiniteScrollDistance', 'dataRefreshText', 'dataAppendText', 'authMemberByTokenPromise']),
      ...mapGetters(['isLogined', 'memberInfo', 'haveNewGroup', 'latestParticipated', 'allGroups', 'appendGroupDiabled', 'showGroupFetchIndicator', 'showGroupAppendIndicator'])
    },
    created () {
      this.authMemberByTokenPromise.then(() => {
        this.ensureLatestParticipated().then(() => {
          (this.allGroups.length === 0 || this.haveNewGroup) && this.fetchGroups()
        })
      })
    },
    methods: {
      handleTopChange (status) {
        this.topStatus = status
      },
      loadTop (id) {
        this.fetchGroups().then(() => {
          this.$refs.groupIndexList.onTopLoaded(id)
        })
      },
      ...mapActions(['ensureLatestParticipated', 'fetchGroups', 'appendGroups', 'participateGroup'])
    },
    components: {
      GroupLatestParticipated,
      GroupList,
      GroupItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .group-index-c{
    width: 100%;
    .index-list {
      margin-top:0.2rem;
      width: 100%;
      background-color: white;
      height:19.25rem;

    }
    .mint-loadmore-top {
      font-size: 0.8rem;
    }
  }
</style>
