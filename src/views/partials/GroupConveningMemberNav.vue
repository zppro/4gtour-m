<template lang="jade">
  nav.nav-header.header-color
    a.nav-item.nav-item-left(@click="back")
      i.fa.fa-chevron-left(aria-hidden="true")
    a.nav-item.nav-item-center
      h1 {{title}}
    a.nav-item.nav-item-right2(@click="leaveOut")
      a.btn-send 退团
</template>
<style lang="less" scoped>
  .nav-header .nav-item-right2{
    flex: 0.3;
    font-size:1.2rem;
    margin-right:0.2rem;
    .btn-send{
      background-color: #00D20D;
      width:100%;
      -moz-border-radius: 0.2rem;
      -webkit-border-radius: 0.2rem;
      border-radius: 0.2rem;
      font-size:0.8rem;
      color: white;
      padding: 0.4rem 0.8rem;
    }
  }
  .nav-header .nav-item-center > h1 > span{
    margin-left:0.2rem;
  }
</style>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      title () {
        return this.$route.name
      },
      ...mapGetters(['conveningGroup'])
    },
    methods: {
      back () {
        window.history.back()
      },
      leaveOut () {
        this.checkGroupMemberPosition({group: this.conveningGroup}).then((groupMemberPosition) => {
          let msg = '退团时确认本团行程已全部结束，要继续么?'
          let isGroupLeader = groupMemberPosition === 'A0001'
          if (isGroupLeader) {
            msg = '您是本团的团长，一旦退团，本团将立即解散，要继续么?'
          }
          this.confirm(msg).then(action => {
            console.log('checkout')
            this.leaveOutConveningGroup({isGroupLeader}).then(() => {
              this.$router.push('/group/index')
            })
          })
        })
      },
      ...mapActions(['confirm', 'leaveOutConveningGroup', 'checkGroupMemberPosition'])
    }
  }
</script>
