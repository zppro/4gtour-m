<template lang="jade">
  .experience-route-item-c
    .experience-route-scenery-spot(v-if="isScenerySpot")
      .scenery-spot-head
        .scenery-spot-order-no
          slot(name="routeOrderNo")
        .scenery-spot-title
          slot(name="title")
        .scenery-spot-level.text-danger
          slot(name="level")
      .item-line-block.route-image-collection
        slot(name="routeImages")
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
        span.info-label.text-danger 联系电话
        .info-content.scenery-spot-tel
          slot(name="scenerySpotTel")
      .item-line-block
        span.info-label.text-danger 详细地址
        .info-content.scenery-spot-address
          slot(name="scenerySpotAddress")
    .experience-route-traffic(v-if="!isScenerySpot")
      i.fa.fa-bus(aria-hidden="true")
      .traffic-start-left
      .traffic-start-right
      .traffic-content
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
          margin-bottom:0.4rem;
          display: inline-block;
        }
        .info-content{
          text-align:left;
          padding: 0.1rem;
          font-size:0.6rem;
        }

      }
      .scenery-spot-head{
        font-size:0.9333rem;
        height: 1.8rem;
        line-height:1.8rem;
        background-color: white;
        display: flex;
        .scenery-spot-order-no{
          flex: 1;
          background-color: orange;
          color:white;
          text-align: center;
        }
        .scenery-spot-title{
          padding-left:0.2rem;
          flex: 4;
        }
        .scenery-spot-level{
          flex: 1;
          text-align: center;
          padding-right:0.75rem;
        }
      }
      .route-image-collection{
        height:7.2rem;
        padding:0;
      }
    }
    .experience-route-traffic {
      background-color:#F0EFF5;
      position: relative;
      display:flex;
      i{
        position: absolute;
        left:1.08rem;
        top: 1.08rem;
        flex:1;
      }
      .traffic-start-left,.traffic-start-right{
        flex:1;
      }
      .traffic-start-right{
        border-left:1px #000 dotted;
      }
      .traffic-content {
        flex:10;
        padding:0.5rem;
        font-size:0.65rem;
        text-align:left;
      }
      .traffic-end{
        flex: 1;
      }
    }
  }
</style>
