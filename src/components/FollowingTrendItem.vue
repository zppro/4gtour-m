<template lang="jade">
  .follow-item
    .item-head
      router-link.subject_name(:to="memberInfoUrl")
        slot(name="subject_name")
      .check_in_hour_min
        slot(name="check_in_hour_min")
    .item-imgs-content
      .item-imgs
        slot(name="item_imgs")
      .item-content
        slot(name="content")
    .item-foot(v-if="showImgTotal")
      span.item-img-totals
        | 共
        slot(name="img_totals")
        | 张
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.follow-item {
  width:100%;
  padding:0.05rem;
  height:3.1rem;
  text-align: left;
  display:flex;
  flex-direction:column;
  .item-head{
    height: 0.8rem;
  }
  .item-imgs-content{
    flex: 1;
  }
  .item-foot{
    height: 0.5rem;
  }
}
</style>
<script>
  export default {
    props: ['memberId', 'showImgTotal'],
    computed: {
      memberInfoUrl () {
        return {path: '/ta/' + this.memberId + '/details'}
      }
    }
  }
</script>
