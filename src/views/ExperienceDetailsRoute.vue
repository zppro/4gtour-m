<template lang="jade">
  .experience-details-route
    experience-route-item(v-for="route in experience.routes", :is-scenery-spot="route.type === 'A0001'")
      span(slot="routeOrderNo") {{route.order_no}}
      span(slot="title") {{route.scenerySpotInfo.show_name}}
      span(slot="level") {{route.scenerySpotInfo.level}}
      image-swiper(:all-images="route.imgs",:current-image="currentImage", auto="3000" slot="routeImages")
      div(slot="routeContent") {{route.content}}
      span(slot="routeTimeConsuming") {{route.time_consuming}}
      div(slot="scenerySpotIntroduction") {{route.scenerySpotInfo.introduction_simple}}
      div(slot="scenerySpotRuntime") {{route.scenerySpotInfo.runtime}}
      div(slot="scenerySpotTel") {{route.scenerySpotInfo.tel}}
      div(slot="scenerySpotAddress") {{route.scenerySpotInfo.address}}
</template>

<script>
  import ExperienceRouteItem from '../components/ExperienceRouteItem.vue'
  import ImageSwiper from '../components/ImageSwiper.vue'
  export default {
    data () {
      return {
        currentImage: ''
      }
    },
    props: ['experience'],
    components: {
      ExperienceRouteItem,
      ImageSwiper
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .experience-details-route {
    width:100%;
  }
</style>
