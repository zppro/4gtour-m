<template lang="jade">
  .experience-item-retweet-root
    .item-head
      router-link.member-name.text-danger(:to="memberInfoUrl") {{'@' + experience.member_name}}
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
    /*min-height:16.425rem;*/
    margin-bottom: 0.05rem;
    padding:0.75rem;
    .item-head{
      width: 100%;
      float:left;
      display: inline-block;
      a.member-name{
        margin-left:0.4rem;
        display: block;
        font-size: 0.8rem;
        margin-bottom: 0.2rem;
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
  export default {
    props: ['experience'],
    data () {
      return {
        allImages: [],
        currentImage: ''
      }
    },
    computed: {
      memberInfoUrl () {
        return '/member-profile/' + this.experience.member_id
      },
      routeItemUrl () {
        return {path: '/experience-details/' + this.experience.id + '/route'}
      }
    },
    methods: {
      zoomIn (allImages, currentImage) {
        this.allImages = allImages
        this.currentImage = currentImage
      },
      zoomOut () {
        this.allImages = []
        this.currentImage = ''
      }
    }
  }
</script>
