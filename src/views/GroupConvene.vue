<template lang="jade">
  .group-convene-c(:style="conveneContainerStyle")
    .map-container
      .map-container-bg-text.text-muted.text-italic 地图位置
      span.verticle-middle
    .bottom-info
      .always-show
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
    computed: {
      conveneContainerStyle () {
        let h = 30.15
        if (this.env.isApiCloud) {
          h = h - 2.55
        }
        return {
          height: h + 'rem'
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
      iconButtonTouched () {
        console.log('touched..')
      },
      ...mapActions(['sendEventToApiCloud', 'addEventListenerFromApiCloud', 'removeEventListenerFromApiCloud', 'ensureConveningGroup'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .group-convene-c{
    width: 100%;
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
      height: 2rem;
      background-color: white;
      .always-show{
        height:100%;
        display: flex;
        .assembling_place{
          flex:1;
          text-align: left;
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
          width: 2.5rem;
          height:100%;
          .pb{
            width: 1.8rem;
            height: 1.8rem;
            line-height: 1.8rem;
            color: #FFF;
          }
          .my-icon-button{
            width:30px;
            height:30px;
            border-radius:50%;
            background-color:#26a2ff;
            color: #fff;
            line-height:30px;
            text-align:center;
          }
        }
      }
    }
  }
</style>
