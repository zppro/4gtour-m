<template lang="jade">
  .TA
    router-view(name="info", :ta="taInfo")
    router-view(name="experience", :ta="taInfo")
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapState(['authMemberByTokenPromise']),
      ...mapGetters(['taInfo'])
    },
    created () {
      console.log('created in TA.vue')
      window.scrollTo(0, 0)
      let self = this
      this.authMemberByTokenPromise.then(() => {
        console.log('logined')
        self.ensureMember$TA()
      })
    },
    watch: {
      $route () {
        window.scrollTo(0, 0)
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
