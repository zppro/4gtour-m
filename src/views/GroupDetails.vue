<template lang="jade">
  .group-details
    .group-row
      .group-imgs
        image-rotator(:all-images="groupInDetails.imgs", :auto="3000" slot="routeImages" width="18.75" height="7")
    .group-row
      .group-row-left
      .group-row-content.display-flex
        .group-label.group-field-name {{groupInDetails.name}}
        .group-field-participated-max {{participatedMaxText}}
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import ImageRotator from '../components/ImageRotator.vue'
  export default {
    computed: {
      participatedMaxText () {
        return this.groupInDetails.participate_max + '人团'
      },
      ...mapState(['env']),
      ...mapGetters(['groupInDetails'])
    },
    created () {
      this.ensureGroup()
    },
    methods: {
      ...mapActions(['ensureGroup'])
    },
    components: {
      ImageRotator
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .group-details {
    width:100%;
    .group-row{
      background-color: white;
      .group-imgs{
        width:100%;
      }
      .group-row-left,.group-row-right{
        width: 1rem;
      }
      .group-row-content{
        flex: 1;
        .group-label {
          font-size: 0.6rem;
          text-align: left;
        }
        .group-field-name {
          flex: 1;
        }
        .group-field-participated-max {
          width:2rem;
          font-size: 0.6rem;
          border-radius: 0.3rem;
        }
      }
    }
  }
</style>
