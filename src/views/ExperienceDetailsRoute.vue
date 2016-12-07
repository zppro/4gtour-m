<template lang="jade">
  .experience-details-route
    experience-route-item(v-for="routeItem in experience.route", :is-scenery-spot="routeItem.type === 'A0001'")
      span(slot="routeOrderNo") {{routeItem.order_no}}
      span(slot="title") {{routeItem.scenerySpotId.show_name}}
      span(slot="level") {{routeItem.scenerySpotId.level}}
      image-rotator(:all-images="getScenerySpotImgs(routeItem)",:current-image="currentImage", :auto="3000" slot="routeImages" width="18.75" height="7.5")
      div(slot="routeContent") {{routeItem.content}}
      span(slot="routeTimeConsuming") {{routeItem.time_consuming}}
      div(slot="scenerySpotIntroduction") {{routeItem.scenerySpotId.introduction_simple}}
      div(slot="scenerySpotRuntime") {{routeItem.scenerySpotId.runtime}}
      div(slot="scenerySpotTel") {{routeItem.scenerySpotId.tel}}
      div(slot="scenerySpotAddress") {{routeItem.scenerySpotId.address}}
</template>

<script>
  import ExperienceRouteItem from '../components/ExperienceRouteItem.vue'
  import ImageRotator from '../components/ImageRotator.vue'
  export default {
    data () {
      return {
        currentImage: ''
      }
    },
    props: ['experience'],
    created () {
      console.log('1111111111111111111111111111111created')
      console.log(this.experience)
    },
    methods: {
      getScenerySpotImgs (routeItem) {
        if (routeItem.imgs.length > 0) {
          return routeItem.imgs
        } else {
          return [routeItem.scenerySpotId.img]
        }
      }
    },
    components: {
      ExperienceRouteItem,
      ImageRotator
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .experience-details-route {
    width:100%;
  }
</style>
