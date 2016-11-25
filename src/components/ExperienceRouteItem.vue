<template lang="jade">
  .experience-route-item-c
    .experience-route-scenery-spot(v-if="isScenerySpot")
      .item-line-block.scenery-spot-head
        .scenery-spot-index
          slot(name="scenerySpotIndex")
        .scenery-spot-title
          slot(name="title")
        .scenery-spot-level.text-danger
          slot(name="level")
      .item-line-block.scenery-spot-image-collection
        slot(name="scenerySpotImages")
      .item-line-block
        span.info-label.text-danger 推荐理由
        .info-content.experience-content
          slot(name="routeContent")
      .item-line-block
        span.info-label.text-danger 游玩时间
        .info-content.experience-time-consuming
          slot(name="routeTimeConsuming")
      .item-line-block
        span.info-label.text-danger 景点介绍
        .info-content.scenery-spot-introduction
          slot(name="scenerySpotIntroduction")
      .item-line-block
        span.info-label.text-danger 营业时间
        .info-content.scenery-spot-runtime
          slot(name="scenerySpotRuntime")
      .item-line-block
        span.info-label.text-danger 相关提示
        .info-content.scenery-spot-tip
          slot(name="scenerySpotTip")
      .item-line-block
        span.info-label.text-danger 联系电话
        .info-content.scenery-spot-tel
          slot(name="scenerySpotTel")
      .item-line-block
        span.info-label.text-danger 相关提示
        .info-content.scenery-spot-tip
          slot(name="scenerySpotTip")
      .item-line-block
        span.info-label.text-danger 详细地址
        .info-content.scenery-spot-address
          slot(name="scenerySpotAddress")
      .item-line-block
        span.info-label.text-danger 交通指南
        .info-content.scenery-spot-traffic
          slot(name="scenerySpotTraffic")
    .experience-route-traffic(v-if="!isScenerySpot")
      .traffice-content
        slot(name="routeContent")
</template>
<script>
  export default {
    props: ['isScenerySpot']
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .experience-route-item-c{
    width:100%;
    .experience-route-scenery-spot {
      text-align: left;
      width:100%;
      .item-line-block{
        width:100%;
        padding:0.4rem 0.75rem;
        background-color: white;
        span.info-label{
          padding: 0.175rem;
          font-size: 0.8rem;
          border:solid 1px #ea5513;
          -moz-border-radius: 0.1rem;
          -webkit-border-radius: 0.1rem;
          border-radius: 0.1rem;
        }
        .info-content{
          padding: 0.1rem;
          font-size:0.6rem;
        }
      }
      .scenery-spot-head{
        font-size:0.9333rem;
        height: 1.8rem;
        line-height:1.8rem;
        display: flex;
        .scenery-spot-index{
          flex: 1;
          background-color: orange;
          color:white;
        }
        .scenery-spot-title{
          flex: 4;
        }
        .scenery-spot-level{
          flex: 1;
          text-align: right;
        }
      }
      .scenery-spot-image-collection{
        height:7.2rem;
      }
    }
    .experience-route-traffic {
      background-color:#F0EFF5;
      height: 2.65rem;
      .traffice-content {
        padding:0.2rem;
        font-size:0.7rem;
      }
    }
  }
</style>
