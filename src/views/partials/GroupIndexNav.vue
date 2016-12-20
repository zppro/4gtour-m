<template lang="jade">
  nav.nav-header.header-color
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right(@click="addGroup")
      i.fa.fa-plus(aria-hidden="true")
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      title () {
        return this.$route.name
      },
      ...mapGetters(['isLogined'])
    },
    methods: {
      back () {
        this.$router.replace('/')
      },
      addGroup () {
        if (!this.isLogined) {
          this.login()
        } else {
          this.$router.push({path: '/group/add'})
        }
      },
      ...mapActions(['login'])
    }
  }
</script>
