<template lang="jade">
  .product-details
    router-view(name="info" , :product="scenicSpotInDetails")
    router-view(name="intro", :introduction-url="scenicSpotInDetails.introduction_url")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['scenicSpotInDetails'])
    },
    beforeRouteEnter (to, from, next) {
      if (from.path === '/') {
        next(vm => {
          vm.fetchScenicSpotInfo(to.params)
        })
      } else {
        next()
      }
    },
    created () {
      window.scrollTo(0, 0)
      // this.fetchScenicSpotInfo(this.$route.params)
    },
    methods: {
      ...mapActions(['fetchScenicSpotInfo'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .product-details {
    width:100%;
  }
</style>
