<template lang="jade">
  .experience-retweeted-preview
    router-link.member-head-portrait(:to="memberInfoUrl")
      img(:src="experience.member_head_portrait || defaultMemberHeadPortrait")
    .name-content
      router-link.member-name.text-danger(:to="memberInfoUrl")
        {{experience.member_name}}
      .content
        {{experience.content}}
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    props: ['experience'],
    computed: {
      memberInfoUrl () {
        return '/'
      },
      routeItemUrl () {
        return {path: '/experience-details/' + this.experience.id + '/feeling'}
      },
      ...mapState(['defaultMemberHeadPortrait'])
    },
    methods: {
      select (img) {
        this.$emit('select', this.allImages, img)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .experience-retweeted-preview {
    width: 100%;
    .member-head-portrait{
      width:1.75rem;
      > img{
        width: 1.75rem;
        height: 1.75rem;
        -moz-border-radius: 0.875rem;
        -webkit-border-radius: 0.875rem;
        border-radius: 0.875rem;
      }
    }
    .name-content{
      display: inline-block;
      margin-left:0.4rem;
      a.member-name{
        display: block;
        font-size: 0.8rem;
        margin-bottom: 0.2rem;
      }
      .content{
        margin-top:0.1rem;
        font-size: 0.5rem;
        color:#7c7b7b;
        overflow-y: hidden;
      }
    }
  }
</style>
