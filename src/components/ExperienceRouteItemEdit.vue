<template lang="jade">
  .experience-route-item-edit(:class='{"bg-white":isLast}')
    .route-item-left
      .ball-scenery-spot(v-if="isScenerySpot") {{experienceRouteItem.order_no}}
      .ball-traffic-line(v-if="!isScenerySpot")
        i.fa.fa-bus(aria-hidden="true")
    .route-item-right
      .route-item-title-actions(v-if="isScenerySpot")
        .route-item-title {{experienceRouteItem.title}}
        a.route-item-remove(@click="removeItem")
          i.fa.fa-trash.text-muted(aria-hidden="true")
      .route-traffic-line(v-if="!isScenerySpot")
        .route-traffic-line-title 景点间交通
        textarea(v-model="experienceRouteItem.content" placeholder="相邻景点的出行方式..")
      .route-item-imgs(v-if="isScenerySpot")
        image-uploader(:upload-id="uploadId", :all-images="experienceRouteItem.imgs" v-on:uploaded="onUploaded" v-on:remove="onRemove")
      .route-item-content(v-if="isScenerySpot")
        .route-item-label
          .ball-small
          | 推荐理由
        textarea(v-model="experienceRouteItem.content" placeholder="例如：风景优美， 心旷神怡..")
      .route-time-consuming
        .route-item-label
          .ball-small
          | {{isScenerySpot ? '游玩时间': '耗时'}}
        mt-radio(v-model="experienceRouteItem.time_consuming", :options="trv03")
</template>
<!-- Add "scoped" attribute to limit CSS to this component only  -->
<style lang="less">
.bg-white{
  background-color: white;
}
.experience-route-item-edit {
  width:100%;
  padding-bottom: 0.4rem;
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
    textarea{
      width: 100%;
      height:3rem;
    }
    .route-traffic-line {
      display: block;
      .route-traffic-line-title{
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: left;
        font-size: 0.9333rem;
      }
    }
    .route-item-content, .route-time-consuming{
      .route-item-label {
        height: 1.6rem;
        line-height: 1.6rem;
        text-align: left;
        font-size: 0.9rem;
        .ball-small{
          margin:0.1rem 0.2rem;
          width:0.4rem;
          height:0.4rem;
          background-color: #6ec782;
          display: inline-block;
          -moz-border-radius: 100%;
          -webkit-border-radius: 100%;
          border-radius: 100%;
        }
      }
      .mint-cell-wrapper{
        text-align: left;
        font-size:0.8rem;
      }
    }
  }
}
</style>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import ImageUploader from '../components/ImageUploader.vue'
  export default {
    props: ['experienceRouteItem', 'isLast'],
    computed: {
      isScenerySpot () {
        return this.experienceRouteItem.type === 'A0001'
      },
      uploadId () {
        return 'experience-route-item-' + this.experienceRouteItem.order_no
      },
      ...mapGetters(['trv03'])
    },
    methods: {
      onUploaded (imgUrl) {
        this.experienceRouteItem.imgs.push(imgUrl)
      },
      onRemove (imgUrlIndex) {
        console.log(imgUrlIndex)
        this.experienceRouteItem.imgs.splice(imgUrlIndex, 1)
      },
      removeItem () {
        let self = this
        this.confirm('确定将当前景点从路线编辑中移除么?').then(action => {
          this.$emit('removeItem', self.experienceRouteItem.order_no)
        })
      },
      ...mapActions(['toast', 'updateRouteField', 'removeScenerySpotFromRoute', 'confirm'])
    },
    components: {
      ImageUploader
    }
  }
</script>
