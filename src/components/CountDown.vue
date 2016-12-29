<template lang="jade">
  .count-down
    .count-part.days(:style="countPartStyle") {{days}}
    span.count-unit(:style="countUnitStyle") 天
    .count-part.hours(:style="countPartStyle") {{hours}}
    span.count-unit(:style="countUnitStyle") 时
    .count-part.minutes(:style="countPartStyle") {{minutes}}
    span.count-unit(:style="countUnitStyle") 分
    .count-part.seconds(:style="countPartStyle") {{seconds}}
    span.count-unit(:style="countUnitStyle") 秒
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
    props: ['secondsToAssembly', 'partWidth', 'fontSize'],
    computed: {
      countPartStyle () {
        let w = this.partWidth || '1.8rem'
        let f = this.fontSize || '1.13rem'
        return {
          width: w,
          fontSize: f
        }
      },
      countUnitStyle () {
        return {
          fontSize: this.countPartStyle.fontSize
        }
      },
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
    display:inline-block;
    vertical-align: middle;
    .count-part{
      display:inline-block;
      background-color: black;
      color:white;
      text-align: center;
      margin: 0 0.1rem;
    }
    .count-unit{
      text-align: center;
      display:inline-block;
    }
  }
</style>
