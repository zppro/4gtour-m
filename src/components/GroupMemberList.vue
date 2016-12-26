<template lang="jade">
  .group-member-list
    router-link.member-head-portrait-c(v-for="groupMember in groupMembers", :to="'/ta/'+groupMember.participant_id+'/details'")
      .member-head-portrait
        img(:src="groupMember.head_pic || defaultMemberHeadPortrait")
      .member-name {{groupMember.name}}
      mt-badge.leader-flag(v-if="groupMember.position_in_group === 'A0001'" type="error" size="small") 团长
    .clear
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.group-member-list {
  width:100%;
  background-color: white;
  .member-head-portrait-c{
    float:left;
    width:20%;
    height:4rem;
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
    .leader-flag{
      position: absolute;
      top:0.2rem;
      right:0;
    }
  }
}
</style>
<script>
  import { mapState } from 'vuex'
  export default {
    props: ['groupMembers'],
    computed: {
      ...mapState(['defaultMemberHeadPortrait'])
    }
  }
</script>
