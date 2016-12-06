<template lang="jade">
  .experience-route-item-edit
    .route-item-left
      .ball-scenery-spot(v-if="isScenerySpot") {{experienceRouteItem.order_no}}
      .ball-traffic-line(v-if="!isScenerySpot")
        i.fa.fa-bus(aria-hidden="true")
    .route-item-right
      .route-item-title-actions(v-if="isScenerySpot")
        .route-item-title {{experienceRouteItem.title}}
        .route-item-remove
          i.fa.fa-trash(aria-hidden="true")
      .route-item-title-actions(v-if="!isScenerySpot")
        span 景点间交通：
        textarea(v-model="routeContent")
      .route-item-imgs(v-if="isScenerySpot")
        image-uploader(:all-images="experienceRouteItem.imgs" v-on:uploaded="onUploaded")
      .route-item-content(v-if="isScenerySpot")
        span 推荐理由：
        textarea(v-model="routeContent")
      .route-time-consuming(v-if="isScenerySpot")
        span 游玩时间：
        mt-radio(v-model="routeTimeConsuming", :options="scenerySpots")
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.experience-route-item-edit {
  width:100%;
  .route-item-left{
    width: 1.5rem;
    float: left;
    .ball-scenery-spot{
      width: 1.5rem;
      height: 1.5rem;
      line-height: 1.5rem;
      font-style: italic;
      font-size: 1.2rem;
      -moz-border-radius: 100%;
      -webkit-border-radius: 100%;
      border-radius: 100%;
      background-color: #ea5513;
      color:white;
      text-align: center;
    }
    .ball-traffic-line{
      margin: 0.2rem;
      width: 1.1rem;
      height: 1.1rem;
      line-height: 1.1rem;
      font-size: 0.6rem;
      -moz-border-radius: 100%;
      -webkit-border-radius: 100%;
      border-radius: 100%;
      background-color: #428bca;
      color:white;
    }
  }
  .route-item-right {
    float: right;
    width: 15.5rem;
    .route-item-title-actions{
      display:flex;
      height: 1.5rem;
      line-height: 1.5rem;
      .route-item-title{
        flex: 1;
        font-size: 0.9333rem;
        text-align: left;
      }
      .route-item-remove{
        flex: 0.1;
      }
    }
    .order-code, .order-time, .order-amount{
      font-size:0.8rem;
      height:1.38rem;
      line-height:1.38rem;
    }
    .order-code{
      color: #428bca;
    }
    .order-amount{
      color: #fa761d;
    }
    .action-left-right{
      position:absolute;
      font-size:0.8rem;
      right:0.3rem;
      bottom:0.3rem;
    }
  }
}
</style>
<script>
  import ImageUploader from '../components/ImageUploader.vue'
  export default {
    props: ['experienceRouteItem'],
    computed: {
      isScenerySpot () {
        return this.experienceRouteItem.type === 'A0001'
      }
    },
    components: {
      ImageUploader
    }
  }
</script>
