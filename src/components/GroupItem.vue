<template lang="jade">
  .group-item
    .item-head
      .group-cover-img
        slot(name="group_cover_img")
        span.verticle-middle
    .name-description
      .group-name
        slot(name="group_name")
      .group-intro
        slot(name="group_intro")
    .group-item-action
      router-link.details(:to="groupInfoUrl")
      span.verticle-middle
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.group-item {
  width:100%;
  background-color: white;
  padding:0.3rem;
  height:3.125rem;
  text-align: left;
  display:flex;
  .item-head{
    width: 2.15rem;
    .group-cover-img{
      width:1.75rem;
      vertical-align: middle;
      > img{
        width: 1.75rem;
        height: 1.75rem;
        vertical-align: middle;
      }
    }
  }
  .name-description{
    flex: 1;
    a.group-name{
      display: block;
      font-size: 0.8rem;
      margin-bottom: 0.2rem;
    }
    .group-intro{
      margin-top:0.1rem;
      font-size: 0.5rem;
      font-style: italic;
      color:#7c7b7b;
    }
  }
  .follow-item-action{
    width: 3.15rem;
    font-size:0.6rem;
    a{
      display: block;
      height:100%;
      i{
        vertical-align: middle;
      }
    }

  }
}
</style>
<script>
  export default {
    props: ['groupId'],
    computed: {
      groupInfoUrl () {
        return {path: '/group/' + this.groupId + '/details'}
      }
    }
  }
</script>
