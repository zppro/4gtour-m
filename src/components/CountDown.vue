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
    props: ['seconds'],
    data () {
      return {
        durationSeconds: 0,
        duration: moment.duration(0)
      }
    },
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
        console.log(this.duration.seconds())
        return this.duration.seconds()
      }
    },
    created () {
      this.durationSeconds = this.seconds
      console.log(this.durationSeconds)
      window.setInterval(this.convertDuration, 1000)
    },
    methods: {
      convertDuration () {
        console.log(this.durationSeconds)
        this.durationSeconds--
        this.duration = moment.duration(this.durationSeconds * 1000)
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
