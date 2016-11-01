<template lang="jade">
  #app
    mt-progress.router-transition(v-show="routerTransiting", :value="routerTransitValue", :bar-height="routerTransitHeight")
    router-view(name="head")
    a.nav-item.nav-item-left(@click="showLeft") 弹出左栏
    router-view(name="body")
    mt-popup(v-model="localLeftPopupVisible",position="left" class="mint-popup-left",:modal="true", :close-on-click-modal="true")
</template>

<script>
  import { mapState } from 'vuex'
  import Home from './views/Home'

  export default {
    data () {
      return {
        localLeftPopupVisible: false
      }
    },
    computed: mapState(['routerTransiting', 'routerTransitValue', 'routerTransitHeight', 'leftPopupVisible']),
    methods: {
      showLeft () {
        this.localLeftPopupVisible = true
      }
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
      width: 70%;
      height: 100%;
      background-color: #fff;
    }
  }
</style>
