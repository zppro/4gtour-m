<template lang="jade">
  .experience-details-route-add
    .route-container
    a#addRoute(@click="openPickScenerySpotsDialog")
      .cross.cross-lt
      .cross.cross-rt
      .cross.cross-lb
      .cross.cross-rb
    mt-popup(v-model="isPickScenerySpotsDialogOpen" position="bottom" class="mint-popup-bottom")
      router-view(name="dialogHead" v-on:closeDialog="closePickScenerySpotsDialog")
      router-view(name="dialogBody", :scenerySpots="scenerySpotPickForRoute", :picked="scenerySpotIdsPickedInRoute")
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import ImageUploader from '../components/ImageUploader.vue'
  import ExperienceRetweetedPreview from '../components/ExperienceRetweetedPreview.vue'
  export default {
    data () {
      return {
        isPickScenerySpotsDialogOpen: false,
        newExperience: {
          category: 'A0003',
          route: [],
          retweet_flag: false,
          location: '杭州'
        }
      }
    },
    computed: {
      validation: function () {
        return {
          route$required: this.newExperience.route.length > 1
        }
      },
      isValid: function () {
        var validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      },
      ...mapState(['env', 'submitingForm']),
      ...mapGetters(['scenerySpotPickForRoute', 'scenerySpotIdsPickedInRoute'])
    },
    created () {
      console.log('123')
      this.ensureScenerySpots()
    },
    watch: {
      submitingForm: function (newSubmitingForm) {
        var self = this
        if (newSubmitingForm) {
          if (this.isValid) {
            console.log(this.newExperience)
            this.saveExperienceAsRoute(this.newExperience).then(() => {
              self.$router.replace('/experience/mine')
            })
          } else {
            this.submitFormFail().then(() => {
              if (!self.validation.route$required) {
                self.toast({msg: '路线必须是包含至少两个景点'})
              }
            })
          }
        }
      }
    },
    methods: {
      openPickScenerySpotsDialog () {
        this.isPickScenerySpotsDialogOpen = true
      },
      closePickScenerySpotsDialog () {
        this.isPickScenerySpotsDialogOpen = false
      },
      onUploaded (imgUrl) {
        console.log(imgUrl)
//        this.newExperience.imgs.push(imgUrl)
      },
      ...mapActions(['toast', 'submitFormFail', 'saveExperienceAsRoute', 'fetchExperienceInfo', 'ensureScenerySpots'])
    },
    components: {
      ImageUploader,
      ExperienceRetweetedPreview
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .experience-details-route-add {
    width:100%;
    background-color: white;
    padding: 0.75rem;
    .route-container{
      width:100%;
    }
    .mint-popup-bottom {
      width: 100%;
      height: 100%;
      background-color: #e5e5e5;
    }
    a#addRoute{
      display: inline-block;
      margin: 0 auto;
      width:3.75rem;
      height:3.75rem;
      -moz-border-radius: 1.875rem;
      -webkit-border-radius: 1.875rem;
      border-radius: 1.875rem;
      border: solid #c8c8c8 1px;
      padding:0.3rem;
      .cross{
        float:left;
        width:1.5rem;
        height:1.5rem;
        margin:0;
        padding:0;
      }
      .cross-lt{
        border-right:solid 1px #c8c8c8;
        border-bottom:solid 1px #c8c8c8;
      }
      .cross-rt{
        border-left:solid 1px #c8c8c8;
        border-bottom:solid 1px #c8c8c8;
      }
      .cross-lb{
        border-right:solid 1px #c8c8c8;
        border-top:solid 1px #c8c8c8;
      }
      .cross-rb{
        border-left:solid 1px #c8c8c8;
        border-top:solid 1px #c8c8c8;
      }
    }
  }
</style>
