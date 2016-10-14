<template lang="jade">
  .product-details-tickets hahahah
</template>

<script>
  import quantityRegulator from '../components/QuantityRegulator'
  export default {
    data () {
      return {
        tickets: []
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(1231111)
      next(vm => {
        vm.tickets = []
      })
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      console.log('created in productDetailsIntro')
    },
    methods: {
      hb () {
        let success = this.$http.get('api/hb')
            .then(ret => ret.success)
        console(success)
      },
      tpost () {
        let ret = this.$http.post('api/tpost', {foo: 'bar'})
        console(ret)
      }
    },
    components: {
      quantityRegulator
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .product-details-tickets {
    width: 100%;
  }
</style>
