<template lang="jade">
  .img-uploader
    img(v-for="img in allImages", :src="img" @click="select(img)")
    a.addImage
      .cross.cross-lt
      .cross.cross-rt
      .cross.cross-lb
      .cross.cross-rb
    .clear
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
  .img-uploader {
    width: 100%;
    padding-bottom:0.225rem;
    img{
       float:left;
       width:4.75rem;
       height:4.75rem;
       margin-top:0.225rem;
       margin-right:0.225rem;
     }
    a.addImage{
      float:left;
      display: inline-block;
      width:3.75rem;
      height:3.75rem;
      margin-top:0.225rem;
      margin-right:0.225rem;
      border: solid #c8c8c8 1px;
      padding:0.3rem;
      .cross{
        float:left;
        width:1.5rem;
        height:1.5rem;
        margin:0;
        padding:0;
      }
      .cross-lt{
        border-right:solid 1px #c8c8c8;
        border-bottom:solid 1px #c8c8c8;
      }
      .cross-rt{
        border-left:solid 1px #c8c8c8;
        border-bottom:solid 1px #c8c8c8;
      }
      .cross-lb{
        border-right:solid 1px #c8c8c8;
        border-top:solid 1px #c8c8c8;
      }
      .cross-rb{
        border-left:solid 1px #c8c8c8;
        border-top:solid 1px #c8c8c8;
      }
    }
    .clear{
      clear:left;
    }
  }
</style>
