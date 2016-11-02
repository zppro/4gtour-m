<template lang="jade">
  #app
    mt-progress.router-transition(v-show="routerTransiting", :value="routerTransitValue", :bar-height="routerTransitHeight")
    router-view(name="head")
    router-view(name="body")
    mt-popup(v-model="localLeftPopupVisible",position="left" class="mint-popup-left",:modal="true", :close-on-click-modal="true")
      router-view(name="leftPopup")
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { $GLOABL_PREFIX$, HIDE_LEFT_POPUP } from './store/mutation-types'
  import Home from './views/Home'

  export default {
    data () {
      return {
        localLeftPopupVisible: false
      }
    },
    computed: mapState(['routerTransiting', 'routerTransitValue', 'routerTransitHeight', 'leftPopupVisible']),
    watch: {
      // whenever question changes, this function will run
      leftPopupVisible: function (newLeftPopupVisible) {
        this.localLeftPopupVisible = newLeftPopupVisible
      },
      localLeftPopupVisible: function (newLocalLeftPopupVisible) {
        !newLocalLeftPopupVisible && this[$GLOABL_PREFIX$ + HIDE_LEFT_POPUP]()
      }
    },
    methods: {
      ...mapMutations([$GLOABL_PREFIX$ + HIDE_LEFT_POPUP])
    },
    components: {
      Home
    }
  }
</script>

<style lang="less">
  #app {
    margin: 0 auto;
    padding:0;
    display:flex;
    flex-direction:column;
    align-items: center;
    color: #2c3e50;
    max-width: 18.75rem;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
    .router-transition{
      width:100%;
      flex:0;
    }
    .mt-progress{height:1px; line-height: 1px;}
    .mint-popup-left {
      width: 6.25rem;
      height: 100%;
      background-color: #fff;
    }
    .page-refresh-loading, .page-append-loading{
      text-align: center;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size:0.75rem;
      color: #ea5513;
      div{
        display: inline-block;
        vertical-align: middle;
        margin-right:0.25rem;
      }
    }
  }
</style>
