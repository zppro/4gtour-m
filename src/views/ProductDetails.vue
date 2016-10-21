<template lang="jade">
  .product-details
    router-view(name="info" , :product="ticket")
    router-view(name="intro", :introduction-url="ticket.introduction_url")
</template>

<script>
  export default {
    data () {
      return {
        ticket: {}
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.fetchScenicSpotInfo(to.params.id).then(p => {
          vm.ticket = p
        })
      })
    },
    methods: {
      fetchScenicSpotInfo (scenicSpotId) {
        console.log(scenicSpotId)
        return this.$http.get('api/scenicSpot/' + scenicSpotId).then(ret => {
          let t = {}
          if (ret.data.success) {
            t = ret.data.ret
          }
          return t
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .product-details {
    width:100%;
  }
</style>
