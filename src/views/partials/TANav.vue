<template lang="jade">
  nav.nav-header
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right
      <!--i.fa.fa-commenting(aria-hidden="true")-->
      <!--span 聊天-->
      i.fa.fa-plus-circle(aria-hidden="true" v-if="showFollowBtn" @click="followTa")
        span 关注
      i.fa.fa-minus-circle(aria-hidden="true" v-if="showUnFollowBtn"  @click="unFollowTa")
        span 取关
</template>
<style lang="less" scoped>
  .nav-header{
    height:2.5rem;
    text-align: center;
    display:flex;
    flex-direction:row;
    align-items: center;
    padding:0;
    margin:0;
    width:100%;
    background-image: url('http://img2.okertrip.com/4gtour-ta-bg.jpg');
    background-size: 100%;
  }
  .nav-item-right{
    flex: 0.5;
    width:60px;
    text-align: right;
  }
  .nav-header .nav-item-right i{
    font-size:0.7rem;
    margin:0 0.2rem;
  }
  .nav-header .nav-item-right span{
    font-size:0.7rem;
    margin-left:0.1rem;
  }
</style>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default{
    computed: {
      title () {
        return ''
      },
      showFollowBtn () {
        return this.memberInfo.member_id !== this.taInfo.code && !this.taInfo.isFollowedByMe
      },
      showUnFollowBtn () {
        return this.memberInfo.member_id !== this.taInfo.code && this.taInfo.isFollowedByMe
      },
      ...mapGetters(['isLogined', 'memberInfo', 'taInfo'])
    },
    methods: {
      back () {
        window.history.back()
      },
      followTa () {
        if (!this.isLogined) {
          this.login()
        } else {
          this.followMember$TA()
        }
      },
      unFollowTa () {
        if (!this.isLogined) {
          this.login()
        } else {
          this.unFollowMember$TA()
        }
      },
      ...mapActions(['login', 'followMember$TA', 'unFollowMember$TA'])
    }
  }
</script>
