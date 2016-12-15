<template lang="jade">
  .following-trend-item
    .item-head
      .check_in_hour_min.inline-block.text-muted
        slot(name="check_in_hour_min")
      router-link.subject_name(:to="subjectUrl")
        slot(name="subject_name")
      .action_name.inline-block
        slot(name="action_name")
      router-link.object_name(v-if="isMember", :to="objectMemberUrl")
        slot(name="object_name")
      .object_name.inline-block(v-if="!isMember")
        slot(name="object_name")
    .item-imgs-content(v-if="!isExperienceRemoved")
      .item-imgs.inline-block
        slot(name="item_imgs")
        .item-img-totals
          slot(name="img_totals")
      .item-content.inline-block
        slot(name="content")
        router-link.details-link(v-if="trend.is_experience_route", :to="routeItemUrl")
          slot(name="details-link")
    .item-content-removed.inline-block.text-muted(v-if="isExperienceRemoved") 原文已删除
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.following-trend-item {
  width:100%;
  min-height:1.5rem;
  padding:0.2rem;
  margin: 0.2rem 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  background-color: #efeff4;
  -moz-border-radius: 0.2rem;
  -webkit-border-radius: 0.2rem;
  border-radius: 0.2rem;
  .item-head{
    width: 100%;
    padding: 0 0.2rem;
    height: 0.8rem;
    font-size:0.7rem;
    span{
      font-size:0.7rem;
    }
    .subject_name,.object_name{
      margin:0 0.1rem;
      color:#e95513;
    }
    .check_in_hour_min{
      span{
        font-size:0.6rem;
      }
    }
  }
  .item-imgs-content{
    padding: 0.2rem;
    margin-top:0.2rem;
    flex: 1;
    font-size: 0.6rem;
    color:#7c7b7b;
    .item-imgs{
      text-align: center;
      img{
        max-width:3rem;
        max-height:3rem;
      }
    }
    .item-content{
      vertical-align: top;
      padding:0.1rem;
    }
    .details-link{
      padding-left:0.2rem;
    }
  }
  .item-content-removed{
    padding:0.2rem;
    font-size: 0.6rem;
    font-style: italic;
  }
}
</style>
<script>
  export default {
    props: ['trend', 'showImgTotal'],
    computed: {
      isMember () {
        return this.trend.object_type === 'A0001'
      },
      subjectUrl () {
        return {path: '/ta/' + this.trend.subject_id + '/details'}
      },
      objectMemberUrl () {
        return {path: '/ta/' + this.trend.object_id + '/details'}
      },
      routeItemUrl () {
        return {path: '/experience-details/' + this.trend.object_id + '/route'}
      },
      isExperienceRemoved () {
        return this.trend.action_type === 'A0009'
      }
    }
  }
</script>
