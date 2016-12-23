<template lang="jade">
  .group-member-list
    router-link.member-head-portrait-c
      .member-head-portrait(v-for="groupMember in groupMembers")
        img(:src="groupMember.head_pic || defaultMemberHeadPortrait")
      .member-name {{groupMember.name}}
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.experience-list {
  width:100%;
  .member-head-portrait-c{
    width:1.95rem;
    padding:0.1rem;
    background-color: white;
    .member-head-portrait{
      width:100%;
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
    }
  }
}
</style>
<script>
  export default {
    props: ['groupMembers'],
    computed: {
      memberInfoUrl () {
        return '/ta/' + this.groupMembers.member_id + '/details'
      }
    }
  }
</script>
