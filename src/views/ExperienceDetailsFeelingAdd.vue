<template lang="jade">
  .experience-details-feeling-add
    .experience-content
      textarea(:value="feelingContent" @input="" placeholder="这一刻的想法...")
    .experience-imgs
      image-uploader(:all-images="imgs")
    div {{experienceInAddFeeling.content}}
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import ImageUploader from '../components/ImageUploader.vue'
  export default {
    data () {
      return {
        feelingContent: '',
        imgs: []
      }
    },
    computed: {
      title () {
        return ''
      },
      ...mapState(['env']),
      ...mapGetters(['experienceInAddFeeling'])
    },
    methods: {
      update: (v) => {
        this.addExperienceAsFeeling({content: v})
      },
      ...mapActions(['addExperienceAsFeeling'])
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
