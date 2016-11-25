<template lang="jade">
  .img-collection(:class='{"one-image":allImages.length===1, "four-images":allImages.length===4}')
    img(v-for="img in allImages", :src="img" @click="select(img)")
</template>
<script>
  export default {
    props: ['allImages'],
    methods: {
      select (img) {
        this.$emit('select', this.allImages, img)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .img-swiper {
    width: 100%;
    img{
       float:left;
       width:4.75rem;
       height:4.75rem;
       margin-top:0.225rem;
       margin-right:0.225rem;
     }
  }
  .one-image{
    max-width:12.5rem;
    max-height:12.5rem;
  }
  .four-images {
    max-width:10rem;
  }
</style>
