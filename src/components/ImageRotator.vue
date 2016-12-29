<template lang="jade">
  .img-rotator(@click="close", :style="imgRotatorStyle" )
    mt-swipe(v-show="allImages && allImages.length > 0", :auto="swipeAuto")
      mt-swipe-item(v-for=" image in allImages")
        .img-wrapper
          img(:src="format(image)" @click="close")
        span.verticle-middle
    .no-images(v-show="!(allImages && allImages.length > 0)")
      .no-images-text.text-muted.text-italic 暂无图片
      span.verticle-middle
</template>
<script>
  export default {
    props: ['allImages', 'currentImage', 'auto', 'width', 'height'],
    computed: {
      swipeAuto () {
        return this.auto || 0
      },
      imgRotatorStyle () {
        return {
          height: this.height + 'rem'
        }
      }
    },
    methods: {
      format: function (img) {
        return window.utils.qiniuImageView(img, window.utils.rem2px(this.width), window.utils.rem2px(this.height))
      },
      close () {
        this.$emit('restore')
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
  .img-rotator {
    width: 100%;
    height:100%;
    background-color: #000;
    .no-images{
      width: 100%;
      height:100%;
      text-align: center;
      .no-img-text{
        vertical-align: middle;
        display: inline-block;
      }
    }
    .img-wrapper{
      width: 100%;
      display: inline-block;
      img{
        margin: 0 auto;
        max-width: 18.75rem;
        vertical-align:middle;
        display: block;
      }
    }
  }
</style>
