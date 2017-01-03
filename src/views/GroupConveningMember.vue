<template lang="jade">
  .group-member-c
    group-member-list(:group="conveningGroup", :show-group-member-description="true", :member-id="memberInfo.member_id")
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import GroupMemberList from '../components/GroupMemberList.vue'
  export default {
    computed: {
      ...mapState(['authMemberByTokenPromise']),
      ...mapGetters(['isLogined', 'memberInfo', 'conveningGroup'])
    },
    created () {
      this.authMemberByTokenPromise.then(() => {
        this.ensureConveningGroup()
      })
    },
    methods: {
      ...mapActions(['ensureConveningGroup'])
    },
    components: {
      GroupMemberList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .group-member-c{
    width: 100%;
  }
</style>
