<template lang="jade">
  .img-rotator(@click="close")
    mt-swipe(:auto="swipeAuto")
      mt-swipe-item(v-for=" image in allImages")
        .img-wrapper
          img(:src="format(image)" @click="close")
        span
</template>
<script>
  export default {
    props: ['allImages', 'currentImage', 'auto', 'width', 'height'],
    computed: {
      swipeAuto () {
        return this.auto || 0
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
    .img-wrapper{
      width: 100%;
      display: inline-block;
      vertical-align:middle;
      img{
        margin: 0 auto;
        max-width: 18.75rem;
        vertical-align:middle;
        display: block;
      }
    }

    span{
      height:100%;
      display:inline-block;
      vertical-align:middle;
    }
  }
</style>
