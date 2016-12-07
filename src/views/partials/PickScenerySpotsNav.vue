<template lang="jade">
  nav.nav-header.header-color
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right(@click="ok")
      i.fa.fa-check(aria-hidden="true")
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
        this.$emit('closeDialog')
      },
      ok () {
        this.confirmScenerySpotsToRoute()
      },
      ...mapActions(['confirmScenerySpotsToRoute'])
    }
  }
</script>
