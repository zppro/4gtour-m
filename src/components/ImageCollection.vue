<template lang="jade">
  .img-collection(:class='{"one-image":allImages.length===1, "four-images":allImages.length===4}')
    img(v-for="img in allImages", :src="format(img)" @click="select(img)")
</template>
<script>
  export default {
    props: ['allImages'],
    methods: {
      format: function (img) {
        if (this.allImages.length === 1) {
          return window.utils.qiniuImageView(img, window.utils.rem2px(9.775), window.utils.rem2px(9.775))
        } else {
          return window.utils.qiniuImageView(img, window.utils.rem2px(4.75), window.utils.rem2px(4.75))
        }
      },
      select (img) {
        this.$emit('select', this.allImages, img)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .img-collection {
    width: 100%;
    img{
      float:left;
      max-width:3.75rem;
      max-height:3.75rem;
      margin-top:0.225rem;
      margin-right:0.225rem;
     }
  }
  .one-image{
    max-width:12.5rem;
    max-height:12.5rem;
    img{
      float:left;
      max-width:9.775rem;
      max-height:9.775rem;
      margin-top:0.225rem;
      margin-right:0.225rem;
    }
  }
  .four-images {
    max-width:10rem;
  }
</style>
