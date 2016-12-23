<template lang="jade">
  span.count-down
    .count-part.days {{days}}
    span.count-unit 天
    .count-part.hours {{hours}}
    span.count-unit 时
    .count-part.minutes {{minutes}}
    span.count-unit 分
    .count-part.seconds {{seconds}}
    span.count-unit 秒
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
    props: ['secondsToAssembly', 'trigger'],
    computed: {
      days () {
        return this.duration.days()
      },
      hours () {
        return this.duration.hours()
      },
      minutes () {
        return this.duration.minutes()
      },
      seconds () {
        return this.duration.seconds()
      }
    },
    created () {
      this.restart()
    },
    methods: {
      restart () {
        if (this.countDownId) {
          window.clearInterval(this.countDownId)
        }
        if (this.secondsToAssembly > 0) {
          this.durationSeconds = this.secondsToAssembly
          this.countDownId = window.setInterval(this.convertDuration, 1000)
        } else {
          this.$emit('count-down-finish')
        }
      },
      convertDuration () {
        this.durationSeconds--
        this.duration = moment.duration(this.durationSeconds * 1000)
        if (this.countDownId && this.durationSeconds === 0) {
          window.clearInterval(this.countDownId)
          this.countDownId = null
          this.$emit('count-down-finish')
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .count-down {
    .count-part{
      display:inline-block;
      background-color: black;
      color:white;
      font-size:1.13rem;
      width: 1.8rem;
      text-align: center;
      margin: 0 0.1rem;
    }
    .count-unit{
      text-align: center;
    }
  }
</style>
