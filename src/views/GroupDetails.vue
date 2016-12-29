<template lang="jade">
  .group-details
    .group-imgs
        image-rotator(:all-images="groupInDetails.imgs", :auto="3000" slot="routeImages" width="18.75" height="7")
    .group-row.display-flex
      .group-label.group-field-name {{groupInDetails.name}}
      .group-field-participated-max {{participatedMaxText}}
    .group-row.display-flex.group-row-border-top
      i.fa.fa-clock-o.text-primary(aria-hidden="true")
      .group-label 报名截止
      .group-text(v-if="otherStatus") {{deadline | humanizeDate}}
      .group-control
        count-down(v-if="beforeDeadline && secondsToAssembly > 0", :seconds-to-assembly="secondsToAssembly", :part-width="'1rem'", :font-size="'0.6rem'")
        count-down(v-if="beforeAssembling && secondsToAssembly > 0", :seconds-to-assembly="secondsToAssembly", :part-width="'1rem'", :font-size="'0.6rem'")
        a.btn1.btn-participate(v-if="showParticipateButton")(@click.prevent="participate") 立即参团
        a.btn1.btn-exit(v-if="showExitButton")(@click.prevent="exit") 取消报名
        span.verticle-middle
    .group-row.display-flex.group-row-border-top
      i.fa.fa-clock-o.text-primary(aria-hidden="true")
      .group-label 集合时间
      .group-text {{groupInDetails.assembling_time | humanizeDate}}
    .group-row.display-flex.group-row-border-top
      i.fa.fa-map-marker.text-primary(aria-hidden="true")
      .group-label 集合地点
      .group-text {{groupInDetails.assembling_place.location_text}}
    .group-row.display-flex.group-row-border-top.group-header-top
      .group-label 我们邀请您参加团，快来看看吧～
    .group-row.display-flex.group-header-middle
      .group-control.group-field-leader
        router-link.group-leader-head-portrait(:to="'/ta/'+groupLeader.participant_id+'/details'")
          img(:src="groupLeader.head_pic || defaultMemberHeadPortrait")
          mt-badge.leader-flag(type="error" size="small") 团长
        .group-leader-nick-name {{groupLeader.nick_name}}
        .group-leader-phone {{groupLeader.phone}}
        .group-leader-phone-icon.iconfont-misc.icon-misc-xihebiaozhunyuanjian439
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import moment from 'moment'
  import ImageRotator from '../components/ImageRotator.vue'
  import CountDown from '../components/CountDown.vue'
  export default {
    computed: {
      participatedMaxText () {
        return (this.groupInDetails.participate_max || '0') + '人团'
      },
      deadline () {
        return this.groupInDetails.deadline || this.groupInDetails.assembling_time
      },
      beforeDeadline () {
        return this.groupInDetails.group_status === 'A0003'
      },
      beforeAssembling () {
        return this.groupInDetails.group_status === 'A0005'
      },
      otherStatus () {
        return !this.beforeDeadline && !this.beforeAssembling
      },
      secondsToDeadline () {
        var seconds = moment(this.groupInDetails.deadline || this.groupInDetails.assembling_time).unix() - moment().unix()
        console.log(seconds)
        return seconds > 0 ? seconds : 0
      },
      secondsToAssembly () {
        var seconds = moment(this.groupInDetails.assembling_time).unix() - moment().unix()
        console.log(seconds)
        return seconds > 0 ? seconds : 0
      },
      showParticipateButton () {
        return this.beforeDeadline && this.groupInDetails.participant_number < this.groupInDetails.participate_max && !this.groupInDetails.participanter_ids.some((o) => {
          return o === this.memberId
        })
      },
      showExitButton () {
        return this.beforeDeadline && this.groupInDetails.participanter_ids.some((o) => {
          return o === this.memberId
        })
      },
      groupLeader () {
        var arr = this.groupInDetails.participants.filter((o) => {
          return o.position_in_group === 'A0001'
        })
        if (arr.length === 1) {
          return arr[0]
        } else {
          return {}
        }
      },
      ...mapState(['env', 'authMemberByTokenPromise']),
      ...mapGetters(['groupInDetails'])
    },
    created () {
      this.authMemberByTokenPromise.then(() => {
        this.ensureGroup()
      })
    },
    methods: {
      participate () {
        if (!this.showParticipateButton) {
          return false
        }
      },
      exit () {
        if (!this.showExitButton) {
          return false
        }
      },
      ...mapActions(['ensureGroup'])
    },
    components: {
      ImageRotator,
      CountDown
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .group-details {
    width:100%;
    .group-row-border-top{
      border-top: solid 1px #DADADB;
    }
    .group-imgs{
      width:100%;
    }
    height: 0.8rem;
    line-height:0.8rem;
    .group-row{
      width:100%;
      background-color: white;
      height:1.5rem;
      padding:0.2rem 0;
      &:before, &:after {
        width: 0.5rem;
        content: ''
      }
      i{
        width:1rem;
        text-align: center;
        font-size: 0.8rem;
        padding-right:0.3rem;
        line-height: 1.1rem;
      }
      .group-label {
        font-size: 0.7rem;
        text-align: left;
        line-height: 1.1rem;
      }
      .group-text {
        line-height: 1.1rem;
        font-size:0.6rem;
        color:#A0A0A0;
        padding-left:0.3rem;
      }
      .group-field-name {
        flex: 1;
        font-size: 0.8rem;
      }
      .group-field-participated-max {
        width:3rem;
        font-size: 0.6rem;
        border-radius: 0.3rem;
        background-color: #FDE4E5;
        line-height: 1.1rem;
        padding:0 0.2rem;
      }
      .group-control{
        padding-left:0.3rem;
        a.btn-participate, a.btn-exit{
          width:3rem;
          height:1.1rem;
          line-height:1.1rem;
          border-radius: 0.2rem;
          font-size: 0.6rem;
          display: inline-block;
          vertical-align: middle;
          margin-left:0.3rem;
        }
        a.btn-exit{
          background-color: #428bca;
        }
      }
    }
    .group-header-top{
      background-color: #FDE4E5;
    }
    .group-header-middle{
      height:2.5rem;
      background-color: #FDE4E5;
      &:before, &:after {
        width: 0.5rem;
        content: ''
      }
      .group-field-leader{
        width:100%;
        height:100%;
        margin-bottom:0.5rem;
        border: solid 0.05rem #F00F22;
        border-radius: 2rem;
        display: flex;
        .group-leader-head-portrait{
          width:2rem;
          height:2rem;
          display: inline-block;
          text-align: left;
          position: relative;
          > img{
            width: 1.9rem;
            height: 1.9rem;
            border-radius: 100%;
          }
          > .leader-flag{
            position: absolute;
            top:-0.2rem;
            right:-0.5rem;
            font-size:0.4rem;
          }
        }
        .group-leader-nick-name{
          flex:1;
          line-height:2rem;
          text-align: left;
          text-indent: 0.2rem;
          color:#A0A0A0;
        }
        .group-leader-phone{
          flex:1;
          line-height:2rem;
        }
        .group-leader-phone-icon{
          width:2rem;
          background-color: #F00F22;
          font-size:1.2rem;
          line-height:1.8rem;
          color:white;
          border-top-right-radius: 100%;
          border-bottom-right-radius: 100%;
        }
      }
    }
  }
</style>
