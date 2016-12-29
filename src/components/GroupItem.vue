<template lang="jade">
  .group-item-c
    router-link.group-item(:to="groupInfoUrl")
      .group-left
        img(v-if="group.imgs.length > 0", :src="group.imgs[0]")
        span.verticle-middle(v-if="group.imgs.length > 0")
        .no-img(v-if="group.imgs.length === 0")
          .no-img-text.text-muted.text-italic 暂无图片
          span.verticle-middle
      .group-right
        .title {{group.name}}
        .assembling-time
          i.fa.fa-clock-o.text-primary(aria-hidden="true")
          span {{group.assembling_time | humanizeDate}}
        .participate-max
          i.fa.fa-users(aria-hidden="true")
          span {{group.participant_number}} /{{group.participate_max}}人团
        .participate-and-action
          .group-participate-progress
            progress-bar.process-bar(bar-height="0.6rem", :current="group.participant_number", :max="group.participate_max")
            span.verticle-middle
          .action(v-if="checkParticipateButtonVisible")
            a.btn1.btn-participate(@click.prevent="participate", :class='{"disabled":!checkParticipateButtonEnable}') {{participateText}}
            span.verticle-middle
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.group-item-c {
  width:100%;
  background-color: white;
  padding:0.1rem 0.75rem;
  height:5.05rem;
  text-align: center;
  .group-item{
    width:100%;
    padding:0.425rem 0;
    border-bottom: solid 1px #F6F6F7;
    display:flex;
    .group-left{
      width: 4rem;
      height: 4rem;
      background-color: black;
      img{
        max-width: 4rem;
        max-height: 4rem;
        vertical-align: middle;
        display: inline-block;
      }
      .no-img{
        width: 4rem;
        height: 4rem;
        background-color: #737d7d;
        .no-img-text{
          vertical-align: middle;
          display: inline-block;
          font-size:0.7rem;
        }
      }
    }
    .group-right{
      flex: 1;
      padding-left: 0.5rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      .title{
        font-size:0.9rem;
        height:1.2rem;
        line-height:1.2rem;
      }
      .assembling-time{
        color:#737d7d;
        font-size:0.7rem;
        height:0.9rem;
        line-height:0.9rem;
        span{
          padding-left:0.2rem;
        }
      }
      .participate-max{
        color:#737d7d;
        font-size:0.5rem;
        height:0.6rem;
        line-height:0.6rem;
        span{
          padding-left:0.3rem;
        }
      }
      .participate-and-action{
        flex: 1;
        display: flex;
        .group-participate-progress{
          flex:1;
          font-size:0.6rem;
          .process-bar{
            display: inline-block;
            width:60%;
            vertical-align: middle;
          }
        }
        .action{
          width: 3rem;
          a.btn-participate{
            width:3rem;
            height:1rem;
            line-height:1rem;
            -moz-border-radius: 0.2rem;
            -webkit-border-radius: 0.2rem;
            border-radius: 0.2rem;
            font-size: 0.6rem;
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
<script>
  import moment from 'moment'
  import ProgressBar from '../components/ProgressBar.vue'
  export default {
    props: ['group', 'memberId'],
    computed: {
      groupInfoUrl () {
        return {path: '/group/details/' + this.group.id}
      },
      AssemblingTimeFormatted () {
        return moment(this.group.assembling_time).format('MM月DD日 HH:mm')
      },
      checkParticipateButtonVisible () {
        return this.group.group_status !== 'A0007' && this.group.group_status !== 'A0011'
      },
      checkParticipateButtonEnable () {
        return this.group.group_status === 'A0003' && this.group.participant_number < this.group.participate_max && !this.group.participanter_ids.some((o) => {
          return o === this.memberId
        })
      },
      participateText () {
        if (this.group.group_status === 'A0003') {
          if (this.group.participant_number < this.group.participate_max) {
            if (!this.group.participanter_ids.some((o) => {
              return o === this.memberId
            })) {
              return '立即参团'
            } else {
              return '已参团'
            }
          } else {
            return '满员'
          }
        } else {
          return '报名截止'
        }
      }
    },
    methods: {
      participate () {
        if (!this.checkParticipateButtonEnable) {
          return false
        }
        this.$emit('participate-group', this.group)
      }
    },
    components: {
      ProgressBar
    }
  }
</script>
