<template lang="jade">
  .TA
    router-view(name="info", :ta="taInfo")
    router-view(name="tweeted", :is-list-tweeted="true" keep-alive)
    router-view(name="stared", :is-list-tweeted="false" keep-alive)
    router-view(name="following", :is-list-following="true" keep-alive)
    router-view(name="follower", :is-list-following="false" keep-alive)
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapState(['authMemberByTokenPromise']),
      ...mapGetters(['taInfo'])
    },
    created () {
      console.log('created in TA.vue11')
      window.scrollTo(0, 0)
      let self = this
      this.authMemberByTokenPromise.then(() => {
        self.ensureMember$TA()
      })
    },
    watch: {
      $route () {
        window.scrollTo(0, 0)
        console.log(this.$route.path)
        this.ensureMember$TA()
      }
    },
    methods: {
      ...mapActions(['ensureMember$TA'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .TA {
    width:100%;
  }
</style>
