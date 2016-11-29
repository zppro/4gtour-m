<template lang="jade">
  .experience-details-feeling-add
    .experience-content
      textarea(v-model="newExperience.content" placeholder="placeHolder" cols="200" maxlength="200")
    .experience-imgs
      image-uploader(:all-images="newExperience.imgs" v-on:uploaded="onUploaded")
    experience-retweeted-preview(:experience="retweetedRoot" v-if="isRetweet")
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import ImageUploader from '../components/ImageUploader.vue'
  import ExperienceRetweetedPreview from '../components/ExperienceRetweetedPreview.vue'
  export default {
    data () {
      return {
        newExperience: {
          category: 'A0001',
          content: '',
          imgs: [],
          retweet_flag: false,
          location: '杭州'
        },
        retweetedParent: {},
        retweetedRoot: {}
      }
    },
    computed: {
      placeHolder () {
        return this.isRetweet ? '转发内容' : '这一刻的想法...'
      },
      validation: function () {
        return {
          content$required: !!this.newExperience.content.trim()
        }
      },
      isRetweet () {
        return !!this.$route.params.id
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
    created () {
      console.log('content:')
      console.log(this.newExperience.content)
      this.isRetweet && this.fetchExperienceInfo(this.$route.params).then(parentExperience => {
        this.retweetedParent = parentExperience
        this.newExperience.content = '\r\n//@' + this.retweetedParent.member_name + ':' + (this.retweetedParent.pure_content || this.retweetedParent.content)
        this.newExperience.retweet_flag = true
        this.newExperience.retweet_from = {item_id: this.retweetedParent.id, member_id: this.retweetedParent.member_id, member_name: this.retweetedParent.member_name}
        this.newExperience.retweet_chains = (this.retweetedParent.retweet_chains || [])
        this.newExperience.retweet_chains.push(parentExperience.id)
        let p
        if (!parentExperience.retweet_flag) {
          // 从原创转发
          p = Promise.resolve(parentExperience)
        } else {
          // 非原创转发，找到root
          p = this.fetchExperienceInfo({id: parentExperience.retweet_root.item_id}).then(rootExperience => {
            return rootExperience
          })
        }
        return p
      }).then(rootExperience => {
        this.retweetedRoot = rootExperience
        this.newExperience.retweet_root = {item_id: this.retweetedRoot.id, member_id: this.retweetedRoot.member_id, member_name: this.retweetedRoot.member_name}
      })
    },
    watch: {
      submitingForm: function (newSubmitingForm) {
        var self = this
        if (newSubmitingForm) {
          if (this.isValid) {
            console.log(this.newExperience)
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
      ...mapActions(['toast', 'submitFormFail', 'saveExperienceAsFeeling', 'fetchExperienceInfo'])
    },
    components: {
      ImageUploader,
      ExperienceRetweetedPreview
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
