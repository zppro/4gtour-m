<template lang="jade">
  nav.nav-header.header-color
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right(@click="refreshOrderDetails")
      i.fa.fa-refresh(aria-hidden="true")
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    computed: {
      title () {
        return this.$route.name
      }
    },
    methods: {
      back () {
        this.$router.replace('/my-orders')
      },
      refreshOrderDetails () {
        this.fetchMember$OrderInfo(this.$route.params)
      },
      ...mapActions(['fetchMember$OrderInfo'])
    }
  }
</script>
