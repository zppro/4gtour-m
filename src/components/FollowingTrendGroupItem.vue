<template lang="jade">
  .following-trend-group-item
    .group-date
      span.day {{groupDay}}
      span.month {{groupMonth}}
    .group-items
      following-trend-item(v-for="trend in trendGroupItem.group_value", :trend="trend")
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .following-trend-group-item {
    width:100%;
    background-color: white;
    text-align: center;
    padding:0.25rem;
    display: flex;
    .group-date{
      width:25%;
      span.day{
        font-size: 1rem;
        font-weight: bold;
      }
      span.month{
        font-size: 1.2rem;
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
  import { mapGetters, mapActions } from 'vuex'
  import FollowingTrendItem from '../components/FollowingTrendItem.vue'
  export default {
    props: ['trendGroupItem'],
    computed: {
      groupDay () {
        return moment(this.trendGroupItem.group_key).format('DD')
      },
      groupMonth () {
        return moment(this.trendGroupItem.group_key).format('MM')
      }
    },
    components: {
      FollowingTrendItem
    }
  }
</script>
