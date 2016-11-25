<template lang="jade">
  .img-swiper(@click="close")
    mt-swipe(:auto="0")
      mt-swipe-item(v-for=" image in allImages")
        img(:src="image" @click="close")
        span
</template>
<script>
  export default {
    props: ['allImages', 'currentImage'],
    methods: {
      close () {
        this.$emit('restore')
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
  .img-swiper {
    width: 100%;
    background-color: #000;
    img{
      width:100%;
      vertical-align:middle;
    }
    span{
      height:100%;
      display:inline-block;
      vertical-align:middle;
    }
  }
</style>
