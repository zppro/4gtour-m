<template lang="jade">
  .group-latest-participated
    .have-no-participated.text-muted.text-italic(v-if="!haveGroupLatestPariticipated") 没有任何参团信息
    .participated(v-if="haveGroupLatestPariticipated")
      .item-head 头
      .item-body 身体
      .item-foot 脚
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.group-latest-participated {
  width:100%;
  background-color: white;
  padding:0.3rem;
  height: 8.4rem;
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
      height: 2rem;
      flex:0;
    }
    .item-body{
      flex: 1;
    }
    .item-foot{
      height: 2rem;
    }
  }
}
</style>
<script>
  export default {
    props: ['group'],
    computed: {
      haveGroupLatestPariticipated () {
        return !!this.group.id
      },
      groupInfoUrl () {
        return this.group.group_status === 'A0009' ? '/group/' + this.group.id + '/convene' : '/group/' + this.group.id + '/details'
      }
    }
  }
</script>
