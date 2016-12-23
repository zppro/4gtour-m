<template lang="jade">
  nav.nav-header.header-color
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    router-link.nav-item.nav-item-right(:to="groupConveningMemberUrl")
      i.fa.fa-users(aria-hidden="true")
</template>
<script>
  export default {
    computed: {
      title () {
        return this.$route.name
      },
      groupConveningMemberUrl () {
        return '/group/convening-member'
      }
    },
    methods: {
      back () {
        window.history.back()
      }
    }
  }
</script>
<style lang="less" scoped>
  .nav-header .nav-item-right > i{
    color:white;
  }
</style>
