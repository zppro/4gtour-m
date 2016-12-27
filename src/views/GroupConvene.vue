<template lang="jade">
  .group-convene-c(:style="conveneContainerStyle")
    .map-container
      .map-container-bg-text.text-muted.text-italic 地图位置
      span.verticle-middle
    .bottom-info
      .btn-up
        i.fa(:class='{"fa-angle-up": isBottomRawPosition, "fa-angle-down": !isBottomRawPosition}', aria-hidden="true")
      .group-details-info(:style="groupDetailsInfoStyle")
        .assembling_place
          .location-text
            i.fa.fa-map-marker.text-primary(aria-hidden="true")
            span {{conveningGroup.assembling_place.location_text}}
          span.verticle-middle
        .actions
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { APICLOUD_OPEN_MAP, APICLOUD_CLOSE_MAP, APICLOUD_OPEN_MAP_SUCCESS, APICLOUD_OPEN_MAP_FAIL, APICLOUD_LOCATE, APICLOUD_LOCATE_SUCCESS, APICLOUD_LOCATE_FAIL } from '../store/share-apicloud-event-names'
  export default {
    data () {
      let h = 2
      return {
        hammerBtnUp: {},
        rawGroupDetailsInfoH: h,
        groupDetailsInfoStyle: {
          height: h + 'rem'
        }
      }
    },
    computed: {
      maxH () {
        let h = 30.15 - 2
        if (this.env.isApiCloud) {
          h = h - 2.55
        }
        return h
      },
      maxPanH () {
        return this.maxH - this.rawGroupDetailsInfoH
      },
      isBottomRawPosition () {
        return this.groupDetailsInfoStyle.height === this.rawGroupDetailsInfoH + 'rem'
      },
      conveneContainerStyle () {
        return {
          height: this.maxH + 'rem'
        }
      },
      ...mapState(['env', 'authMemberByTokenPromise']),
      ...mapGetters(['isLogined', 'memberInfo', 'conveningGroup'])
    },
    created () {
      this.authMemberByTokenPromise.then(() => {
        this.ensureConveningGroup().then(() => {
          console.log('begin loading map')
          if (this.env.isApiCloud) {
            let hTop = window.utils.rem2px(3.2)
            let hBottom = window.utils.rem2px(2)
            this.sendEventToApiCloud({ eventName: APICLOUD_OPEN_MAP, eventData: {hTop, hBottom} })
            console.log('send event open map')
          }
        })
      })
    },
    mounted () {
      if (this.env.isApiCloud) {
        console.log('add listener')
        this.addEventListenerFromApiCloud({
          eventName: APICLOUD_OPEN_MAP_SUCCESS,
          eventHandler: (eventRet) => {
            console.log(eventRet)
            this.sendEventToApiCloud({ eventName: APICLOUD_LOCATE })
          }
        })
        this.addEventListenerFromApiCloud({
          eventName: APICLOUD_OPEN_MAP_FAIL,
          eventHandler: (eventRet, err) => {
            console.log(eventRet)
            this.toastError(eventRet.value)
          }
        })
        this.addEventListenerFromApiCloud({
          eventName: APICLOUD_LOCATE_SUCCESS,
          eventHandler: (eventRet) => {
            console.log(eventRet)
          }
        })
        this.addEventListenerFromApiCloud({
          eventName: APICLOUD_LOCATE_FAIL,
          eventHandler: (eventRet, err) => {
            console.log(eventRet)
            this.toastError(eventRet.value)
          }
        })
      }
      var elem = window.$('.group-convene-c .btn-up')[0]
      this.hammerBtnUp = new window.Hammer.Manager(elem)
      this.hammerBtnUp.add(new window.Hammer.Pan())
      this.hammerBtnUp.add(new window.Hammer.Tap())
      this.hammerBtnUp.on('panstart panmove panend', (ev) => {
//        console.log(ev.type + ' gesture detected.')
        if (ev.type === 'panstart') {
          elem.style.backgroundColor = 'whitesmoke'
        } else if (ev.type === 'panend') {
          elem.style.backgroundColor = 'white'
        } else if (ev.type === 'panmove') {
          let rawHpx = window.utils.rem2px(this.groupDetailsInfoStyle.height.replace('rem', ''))
          let newHrem = window.utils.px2rem(rawHpx - ev.velocityY * 10)
          if (ev.deltaY < 0) {
            // 往上
            if (newHrem > this.maxPanH) {
              newHrem = this.maxPanH
            }
          } else {
            // 往下
            if (newHrem < this.rawGroupDetailsInfoH) {
              newHrem = this.rawGroupDetailsInfoH
            }
          }
          this.groupDetailsInfoStyle.height = newHrem + 'rem'
          this.makeWebkitRedraw()
        }
      })
      this.hammerBtnUp.on('tap', (ev) => {
        if (this.isBottomRawPosition) {
          this.groupDetailsInfoStyle.height = this.maxPanH + 'rem'
        } else {
          this.groupDetailsInfoStyle.height = this.rawGroupDetailsInfoH + 'rem'
        }
        this.makeWebkitRedraw()
//        let self = this
//        const stepMS = 7
//        let intervalId
//        console.log(this.isBottomRawPosition)
//        if (this.isBottomRawPosition) {
//          intervalId = window.setInterval(() => {
//            let rawHpx = window.utils.rem2px(self.groupDetailsInfoStyle.height.replace('rem', ''))
//            console.log(typeof rawHpx)
//            let newHrem = window.utils.px2rem(parseFloat(rawHpx) + 10.7)
//            console.log(newHrem)
//            if (newHrem > self.maxPanH) {
//              newHrem = self.maxPanH
//              window.clearInterval(intervalId)
//              intervalId = undefined
//            }
//            self.groupDetailsInfoStyle.height = newHrem + 'rem'
//            self.makeWebkitRedraw()
//          }, stepMS)
//        } else {
//          intervalId = window.setInterval(() => {
//            let rawHpx = window.utils.rem2px(self.groupDetailsInfoStyle.height.replace('rem', ''))
//            console.log(typeof rawHpx)
//            let newHrem = window.utils.px2rem(parseFloat(rawHpx) - 10)
//            if (newHrem < self.rawGroupDetailsInfoH) {
//              newHrem = self.rawGroupDetailsInfoH
//
//              window.clearInterval(intervalId)
//              intervalId = undefined
//            }
//            self.groupDetailsInfoStyle.height = newHrem + 'rem'
//            self.makeWebkitRedraw()
//          }, stepMS)
//        }
      })
    },
    beforeDestroy () {
      if (this.env.isApiCloud) {
        this.removeEventListenerFromApiCloud('APICLOUD_LOCATE_SUCCESS')
        this.removeEventListenerFromApiCloud('APICLOUD_LOCATE_FAIL')
        this.sendEventToApiCloud({ eventName: APICLOUD_CLOSE_MAP })
      }
      console.log('before destroy')
    },
    methods: {
      makeWebkitRedraw () {
        this.$el.style.display = 'none'
        this.$el.offsetHeight
        this.$el.style.display = 'flex'
      },
      ...mapActions(['sendEventToApiCloud', 'addEventListenerFromApiCloud', 'removeEventListenerFromApiCloud', 'ensureConveningGroup'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .group-convene-c{
    width: 100%;
    overflow-y: hidden;
    display:flex;
    flex-direction: column;
    .map-container{
      flex: 1;
      background-color: #737d7d;
      .map-container-bg-text{
        vertical-align: middle;
        display: inline-block;
        font-size: 2rem;
      }
    }
    .bottom-info {
      background-color: white;
      .btn-up{
        font-size:1.2rem;
        text-align: center;
        border-bottom: solid 1px #F6F6F7;
      }
      .group-details-info-active{
        height:10rem;
      }
      .group-details-info{
        height:2rem;
        display: flex;
        .assembling_place{
          flex:1;
          text-align: left;
          height:2rem;
          .location-text{
            display: inline-block;
            vertical-align: middle;
            font-size:0.7rem;
            > i{
              margin:0 0.2rem;
            }
          }
        }
        .actions{
          background-color: red;
          width: 2.5rem;
          height:2rem;
          transition: width 1s ease-out;
        }
        .actions-active{
          width:10rem;
        }
      }
    }
  }
</style>
