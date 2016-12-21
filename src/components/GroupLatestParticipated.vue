<template lang="jade">
  .group-latest-participated
    .have-no-participated.text-muted.text-italic(v-if="!haveGroupLatestPariticipated") 没有任何参团信息
    .participated(v-if="haveGroupLatestPariticipated")
      .item-head
        .count-down-part(v-if="showCountDown") 据集合还剩
          count-down(:seconds="10000")
      .item-body
        .group-left
          img(v-if="showGroupImg", :src="group.imgs[0]")
          span.verticle-middle
        .group-right
          .title {{group.name}}
          .assembing-time
            i.fa.fa-clock-o.text-primary(aria-hidden="true")
            span {{assemblyTimeFormatted}}
          .participate-max
            i.fa.fa-users(aria-hidden="true")
            span {{group.participate_max}}人团
          .action-status
            .action
              a.btn1.btn-convene-enter 召集
              span.verticle-middle
            .success-img-tag
              .tag-wrapper
                img(:src="participatedSuccessImg")
                span.verticle-middle
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped >
.group-latest-participated {
  width:100%;
  background-color: white;
  padding:0 0.75rem;
  height: 10.4rem;
  text-align: center;
  .have-no-participated{
    height: 100%;
    font-size: 1.5rem;
  }
  .participated{
    height: 100%;
    display:flex;
    flex-direction: column;
    .item-head{
      padding: 0.5rem 0;
      border-bottom: solid 1px #F6F6F7;
      height: 2rem;
      flex:0;
      .count-down-part{
        text-align:left;
        color:#737d7d;
        font-size:1rem;
      }
    }
    .item-body{
      flex: 1;
      padding: 0.5rem 0;
      display: flex;
      .group-left{
        width: 6.5rem;
        height: 6.5rem;
        background-color: black;
        img{
          max-width: 6.5rem;
          max-height: 6.5rem;
          vertical-align: middle;
          display: inline-block;
        }
      }
      .group-right{
        flex: 1;
        padding-left: 0.5rem;
        text-align: left;
        display: flex;
        flex-direction: column;
        .title{
          font-size:1rem;
          height:1.6rem;
          line-height:1.6rem;
        }
        .assembing-time{
          color:#737d7d;
          font-size:0.8rem;
          height:1.2rem;
          line-height:1.2rem;
          span{
            padding-left:0.2rem;
          }
        }
        .participate-max{
          color:#737d7d;
          font-size:0.55rem;
          height:0.8rem;
          line-height:0.8rem;
          span{
            padding-left:0.3rem;
          }
        }
        .action-status{
          flex: 1;
          display: flex;
          .action{
            flex:2;
            height:100%;
            a.btn-convene-enter{
              width:6.25rem;
              display: inline-block;
              vertical-align: middle;
            }
          }
          .success-img-tag{
            flex:1;
            .tag-wrapper{
              width:3.45rem;
              height:3.45rem;
              img{
                max-width: 3.45rem;
                max-height: 3.45rem;
                vertical-align: middle;
                display: inline-block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<script>
  import moment from 'moment'
  import CountDown from '../components/CountDown.vue'
  export default {
    props: ['group'],
    computed: {
      haveGroupLatestPariticipated () {
        return !!this.group.id
      },
      showCountDown () {
        return this.group.group_status === 'A0003'
      },
      showGroupImg () {
        return this.group.imgs.length > 0
      },
      assemblyTimeFormatted () {
        return moment(this.group.assembly_time).format('MM月DD日 HH:mm')
      },
      groupInfoUrl () {
        return this.group.group_status === 'A0009' ? '/group/' + this.group.id + '/convene' : '/group/' + this.group.id + '/details'
      },
      participatedSuccessImg () {
        return window.utils.qiniuImageView('http://img2.okertrip.com/participated-success.png', window.utils.rem2px(6.5), window.utils.rem2px(6.5))
      }
    },
    methods: {
      format: function (img) {
        return window.utils.qiniuImageView(img, window.utils.rem2px(3.45), window.utils.rem2px(3.45))
      }
    },
    components: {
      CountDown
    }
  }
</script>
