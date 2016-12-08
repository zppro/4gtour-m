<template lang="jade">
  .follow-item
    .item-head
      router-link.member-head-portrait(:to="memberInfoUrl")
        slot(name="member_head_portrait")
    .name-description
      router-link.member-name(:to="memberInfoUrl")
        slot(name="member_name")
      .member-description
        slot(name="member_description")
    .follow-item-action
      a.btn(v-if="!isFollowing")
        i.fa.fa-plus-circle.text-primary(aria-hidden="true"  @click="followTa")
        span.text-primary 加关注
      a.btn(v-if="isFollowing")
        i.fa.fa-minus-circle.text-primary(aria-hidden="true" v-if="showUnFollowBtn"  @click="unFollowTa")
        | 取消关注
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.follow-item {
  width:100%;
  background-color: white;
  padding:0.2rem;
  text-align: left;
  height:2.15rem;
  display:flex;
  .item-head{
    width: 2.15rem;
    .member-head-portrait{
      width:1.75rem;
      > img{
        width: 1.75rem;
        height: 1.75rem;
        -moz-border-radius: 100%;
        -webkit-border-radius: 100%;
        border-radius: 100%;
      }
    }
  }
  .name-description{
    flex: 1;
    a.member-name{
      display: block;
      font-size: 0.8rem;
      margin-bottom: 0.2rem;
    }
    .member-description{
      margin-top:0.1rem;
      font-size: 0.5rem;
      color:#7c7b7b;
    }
  }
  .follow-item-action{
    width: 3.15rem;
    a{
      display: block;
      height:100%;
      i{

      }
      span{
        font-size:0.6rem;
        height:100%;
        vertical-align: middle;
      }
    }

  }
}
</style>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: ['taMemberId', 'taMemberId', 'isFollowing'],
    computed: {
      isFollowedByMe () {

      },
      memberInfoUrl () {
        return {path: '/ta/' + this.taMemberId + '/details'}
      },
      showFollowBtn () {
        return !this.isFollowedByMe
      },
      showUnFollowBtn () {
        return this.isFollowedByMe
      },
      ...mapGetters(['isLogined', 'memberInfo'])
    },
    created () {
      console.log(345124)
    },
    methods: {
      ...mapActions(['login', 'followMember$TA', 'unFollowMember$TA'])
    }
  }
</script>
