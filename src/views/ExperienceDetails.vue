<template lang="jade">
  .experience-details
    router-view(name="feeling", :experience="experienceInDetails")
    router-view(name="route", :experience="experienceInDetails")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['experienceInDetails'])
    },
    created () {
      this.ensureExperience()
    },
    methods: {
      ...mapActions(['ensureExperience'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .experience-details {
    width:100%;
  }
</style>
