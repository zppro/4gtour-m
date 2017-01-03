<template lang="jade">
  .group-member-list(:style="groupMemberListStyle")
    router-link.member-head-portrait-c(:style="memberHeadPortraitStyle", v-for="groupMember in groupMembers", :to="'/ta/'+groupMember.participant_id+'/details'")
      .member-head-portrait
        img(:src="groupMember.head_pic || defaultMemberHeadPortrait")
      .member-name {{ isSelf(groupMember.participant_id) ? '我(' + groupMember.name + ')' : groupMember.name}}
      .group-member-status-description.text-italic(v-if="this.showGroupMemberDescription", :class='{"text-muted": !isCheckIn(groupMember.participant_id), "text-success": isCheckIn(groupMember.participant_id) && !isLeaveOut(groupMember.participant_id), "text-primary": isCheckIn(groupMember.participant_id) && isLeaveOut(groupMember.participant_id) }') {{getGroupMemberDescription(groupMember.participant_id)}}
      mt-badge.leader-flag(v-if="groupMember.position_in_group === 'A0001'" type="error" size="small") 团长
    .clear
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.group-member-list {
  width:100%;
  .member-head-portrait-c{
    float:left;
    width:20%;
    padding:0.1rem;
    display:block;
    position: relative;
    .member-head-portrait{
      width:100%;
      margin: 0.2rem 0;
      > img{
        width: 1.75rem;
        height: 1.75rem;
        -moz-border-radius: 100%;
        -webkit-border-radius: 100%;
        border-radius: 100%;
      }
    }
    .member-name {
      width:100%;
      font-size:0.7rem;
    }
    .group-member-status-description {
      width:100%;
      font-size:0.5rem;
    }
    .leader-flag{
      position: absolute;
      top:0.2rem;
      right:0.2rem;
      font-size:0.4rem;
    }
  }
}
</style>
<script>
  import { mapState } from 'vuex'
  export default {
    props: ['group', 'bgColor', 'showGroupMemberDescription', 'memberId'],
    computed: {
      groupMemberListStyle () {
        return {
          backgroundColor: this.bgColor || 'white'
        }
      },
      memberHeadPortraitStyle () {
        return {
          height: (this.showGroupMemberDescription ? 4.5 : 4) + 'rem'
        }
      },
      groupMembers () {
        return this.group.participants
      },
      ...mapState(['defaultMemberHeadPortrait'])
    },
    methods: {
      isSelf (groupMemberId) {
        return this.memberId === groupMemberId
      },
      isCheckIn (groupMemberId) {
        return this.group.checkins.some((o) => {
          return o.member_id === groupMemberId
        })
      },
      isLeaveOut (groupMemberId) {
        return this.group.leave_outs.some((o) => {
          return o.member_id === groupMemberId
        })
      },
      getGroupMemberDescription (groupMemberId) {
        if (!this.showGroupMemberDescription) return ''
        let isCheckIn = this.isCheckIn(groupMemberId)
        let isLeaveOut = this.isLeaveOut(groupMemberId)
        if (!isCheckIn) {
          return '未签到'
        } else if (isCheckIn && !isLeaveOut) {
          return '已签到'
        } else if (isCheckIn && isLeaveOut) {
          return '已退团'
        } else {
          return ''
        }
      }
    }
  }
</script>
