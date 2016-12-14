<template lang="jade">
  .TA
    router-view(name="info", :ta="taInfo")
    router-view(name="taSubView", :is="currentView", :is-list-tweeted="isListTweeted", :is-list-following="isListFollowing" )
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import TAExperience from './partials/TAExperience.vue'
  import TAFollowingFollowerList from './partials/TAFollowingFollowerList.vue'
  export default {
    data () {
      return {
        isListTweeted: false,
        isListFollowing: false,
        currentView: null
      }
    },
    computed: {
      ...mapState(['authMemberByTokenPromise']),
      ...mapGetters(['taInfo'])
    },
    created () {
      console.log('created in TA.vue')
      window.scrollTo(0, 0)
      let self = this
      this.authMemberByTokenPromise.then(() => {
        self.ensureMember$TA()
        self.switchChildView()
      })
    },
    watch: {
      $route () {
        window.scrollTo(0, 0)
        console.log('TA watch $route')
        console.log(this.$route.path)
        this.ensureMember$TA()
        this.switchChildView()
      }
    },
    methods: {
      switchChildView () {
        if (this.$route.path.endsWith('/stared')) {
          this.isListTweeted = false
          this.currentView = 'TAExperience'
        } else if (this.$route.path.endsWith('/following')) {
          this.isListFollowing = true
          this.currentView = 'TAFollowingFollowerList'
        } else if (this.$route.path.endsWith('/follower')) {
          this.isListFollowing = false
          this.currentView = 'TAFollowingFollowerList'
        } else {
          this.isListTweeted = true
          this.currentView = 'TAExperience'
        }
      },
      ...mapActions(['ensureMember$TA'])
    },
    components: {
      TAExperience,
      TAFollowingFollowerList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .TA {
    width:100%;
  }
</style>
