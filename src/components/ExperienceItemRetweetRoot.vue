<template lang="jade">
  .experience-item-retweet-root
    .removed.text-muted(v-if="isRemoved") 作者已删除
    .not-removed(v-if="!isRemoved")
      .item-head
        router-link.member-head-portrait(:to="memberInfoUrl")
          img(:src="experience.member_head_portrait || defaultMemberHeadPortrait" )
        .name-time
          router-link.member-name.text-danger(:to="memberInfoUrl") {{'@' + experience.member_name}}
          .time-description {{experience.time_description}}
      .item-body
        .content {{experience.content}}
        router-link(v-if="false" ,:to="routeItemUrl")
          span.text-danger 全文
        .imgs
          .img-list
            image-collection(:all-images="experience.imgs", v-on:select="zoomIn")
          .clear
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .experience-item-retweet-root {
    width:100%;
    background-color: #f5f5f5;
    text-align: left;
    padding:0.25rem;
    -moz-border-radius: 0.2rem;
    -webkit-border-radius: 2rem;
    border-radius: 0.2rem;
    .removed{
      font-style: italic;
      font-size: 0.8rem;
    }
    .item-head{
      width: 100%;
      a.member-head-portrait{
        display: inline-block;
        width:1.75rem;
        > img{
          width: 1.75rem;
          height: 1.75rem;
          -moz-border-radius: 0.875rem;
          -webkit-border-radius: 0.875rem;
          border-radius: 0.875rem;
        }
      }
      .name-time{
        display: inline-block;
        margin-left:0.4rem;
        a.member-name{
          display: block;
          font-size: 0.8rem;
          margin-bottom: 0.2rem;
        }
        .time-description{
          margin-top:0.1rem;
          font-size: 0.5rem;
          color:#7c7b7b;
        }
      }
    }
    .item-body{
      position:relative;
      clear:left;
      display: inline-block;
      padding-left:2.15rem;
      width: 100%;
      .content{
        margin-top:0.225rem;
        margin-bottom:0.225rem;
        font-size: 0.65rem;
        color:#000;
        a{
          span{
            margin-left: 0.2rem;
            text-decoration: underline;
          }
        }
      }
      .imgs{
        width: 100%;
        .clear{clear:both;}
      }
    }
  }
</style>
<script>
  import { mapState } from 'vuex'
  import ImageCollection from './ImageCollection.vue'
  export default {
    props: ['experience'],
    computed: {
      memberInfoUrl () {
        return '/ta/' + this.experience.member_id + '/details'
      },
      isRemoved () {
        return this.experience.status === 0
      },
      routeItemUrl () {
        return {path: '/experience-details/' + this.experience.id + '/route'}
      },
      ...mapState(['defaultMemberHeadPortrait'])
    },
    methods: {
      zoomIn (allImages, currentImage) {
        this.$emit('select', allImages, currentImage)
      }
    },
    components: {
      ImageCollection
    }
  }
</script>
