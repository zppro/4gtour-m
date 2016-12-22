<template lang="jade">
  .progress-bar(:style="barStyle")
    .progress-max
      .progress-current(:style="currentStyle") {{h}}
</template>
<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        countDownId: null,
        durationSeconds: 0,
        duration: moment.duration(0)
      }
    },
    props: ['barHeight', 'current', 'max'],
    computed: {
      currentStyle () {
        return {
          width: (this.current * 100 / this.max) + '%'
        }
      },
      barStyle () {
        return {
          height: this.barHeight
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
  .progress-bar {
    width:100%;
    .progress-max{
      width: 100%;
      height:100%;
      text-align: center;
      margin: 0 0.1rem;
      border: solid 1px #FF864E;
      background-color: #FFBEA5;
      -moz-border-radius: 1rem;
      -webkit-border-radius: 1rem;
      border-radius: 1rem;
    }
    .progress-current{
      width: 10%;
      height:100%;
      background-color: #FF864E;
      -moz-border-radius: 1rem;
      -webkit-border-radius: 1rem;
      border-radius: 1rem;
    }
  }
</style>
