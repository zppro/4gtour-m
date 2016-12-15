<template lang="jade">
  .following-trend-group-item
    .group-date
      span.today(v-if="isToday") 今天
      span.yesterday(v-if="isYesterday") 昨天
      span.day(v-if="!(isToday || isYesterday)") {{groupDay}}
      span.month(v-if="!(isToday || isYesterday)") {{groupMonth}}月
    .group-items
      following-trend-item(v-for="trend in trendGroup.group_value", :trend="trend")
        span(slot="subject_name") {{trend.subject_name}}
        span(slot="check_in_hour_min") {{trend.check_in_hour_min}}
        span(slot="action_name") {{trend.action_name}}
        span(slot="object_name") {{trend.object_name}}
        .thumbnail.inline-block(slot="item_imgs" v-if="trend.imgs.length > 0")
          img(:src="format(trend.imgs[0])" @click="select(img)")
        span.text-muted(slot="img_totals" v-if="trend.imgs.length>1") 共 {{trend.imgs.length}} 张
        .inline-block(slot="content" v-if="trend.content" v-html="trend.content")
        span.text-danger.link(slot="details-link") 全文
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .following-trend-group-item {
    width:100%;
    background-color: white;
    text-align: center;
    padding:0.25rem;
    margin-bottom: 0.3rem;
    -moz-border-radius: 0.2rem;
    -webkit-border-radius: 0.2rem;
    border-radius: 0.2rem;
    display: flex;
    .group-date{
      width:20%;
      span.today,span.yesterday{
        font-size: 1.2rem;
      }
      span.day{
        font-size: 1rem;
        font-weight: bold;
      }
      span.month{
        font-size: 0.6rem;
        font-weight: bold;
      }
    }
    .group-items{
      flex: 1;
    }
  }
</style>
<script>
  import moment from 'moment'
  import FollowingTrendItem from '../components/FollowingTrendItem.vue'
  export default {
    props: ['trendGroup'],
    computed: {
      isToday () {
        return moment().isSame(this.trendGroup.group_key, 'day')
      },
      isYesterday () {
        return moment().subtract(1, 'days').isSame(this.trendGroup.group_key, 'day')
      },
      groupDay () {
        return moment(this.trendGroup.group_key).format('DD')
      },
      groupMonth () {
        return moment(this.trendGroup.group_key).format('MM')
      }
    },
    methods: {
      format: function (img) {
        return window.utils.qiniuImageView(img, window.utils.rem2px(3), window.utils.rem2px(3))
      }
    },
    components: {
      FollowingTrendItem
    }
  }
</script>
