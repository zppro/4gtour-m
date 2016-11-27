<template lang="jade">
  .experience-details-feeling-add
    .experience-content
      textarea(v-model="newExperience.content" placeholder="这一刻的想法...")
    .experience-imgs
      image-uploader(:all-images="newExperience.imgs" v-on:uploaded="onUploaded")
    div {{experienceInDetails.content}}
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import ImageUploader from '../components/ImageUploader.vue'
  export default {
    data () {
      return {
        newExperience: {
          category: 'A0001',
          content: '',
          imgs: [],
          location: '杭州'
        }
      }
    },
    computed: {
      title () {
        return ''
      },
      validation: function () {
        return {
          content$required: !!this.newExperience.content.trim()
        }
      },
      isValid: function () {
        var validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      },
      ...mapState(['env', 'submitingForm']),
      ...mapGetters(['experienceInDetails'])
    },
    watch: {
      submitingForm: function (newSubmitingForm) {
        var self = this
        if (newSubmitingForm) {
          if (this.isValid) {
            this.saveExperienceAsFeeling(this.newExperience).then(() => {
              self.$router.replace('/experience/mine')
            })
          } else {
            this.submitFormFail().then(() => {
              if (!self.validation.content$required) {
                self.toast({msg: '内容是必须的'})
              }
            })
          }
        }
      }
    },
    methods: {
      onUploaded (imgUrl) {
        console.log(imgUrl)
        this.newExperience.imgs.push(imgUrl)
      },
      ...mapActions(['toast', 'submitFormFail', 'saveExperienceAsFeeling'])
    },
    components: {
      ImageUploader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .experience-details-feeling-add {
    width:100%;
    background-color: white;
    padding: 0 0.4rem;
    .experience-content {
      width:100%;
      padding:0.2rem 0;
      textarea{
        width:100%;
        text-align: left;
        border: none;
        font-size:0.8rem;
        height: 6rem;
      }
    }
  }
</style>
