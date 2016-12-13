<template lang="jade">
  .MySelf
    router-view(name="info")
    router-view(name="mySelfSubView", :is="currentView", :is-list-tweeted="isListTweeted", :is-list-following="isListFollowing" )
</template>

<script>
  import { mapState } from 'vuex'
  import MyFollowingFollowerList from './partials/MyFollowingFollowerList.vue'
  export default {
    data () {
      return {
        isListTweeted: false,
        isListFollowing: false,
        currentView: null
      }
    },
    computed: {
      ...mapState(['authMemberByTokenPromise'])
    },
    created () {
      console.log('created in MySelf.vue')
      window.scrollTo(0, 0)
      let self = this
      this.authMemberByTokenPromise.then(() => {
        self.switchChildView()
      })
    },
    watch: {
      $route () {
        window.scrollTo(0, 0)
        console.log(this.$route.path)
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
          this.currentView = 'MyFollowingFollowerList'
        } else if (this.$route.path.endsWith('/follower')) {
          this.isListFollowing = false
          this.currentView = 'MyFollowingFollowerList'
        } else {
          this.isListTweeted = true
          this.currentView = ''
        }
      }
    },
    components: {
      MyFollowingFollowerList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .MySelf {
    width:100%;
  }
</style>
