<template lang="jade">
  nav.nav-header.header-color
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right
      i.fa(aria-hidden="true")
</template>
<script>
  export default {
    computed: {
      title () {
        return this.$route.name
      }
    },
    methods: {
      back () {
        window.history.back()
      }
    }
  }
</script>
