<template lang="jade">
  #app
    mt-progress.router-transition(v-show="routerTransiting", :value="routerTransitValue", :bar-height="routerTransitHeight")
    router-view(name="head")
    router-view(name="body")
</template>

<script>
  import { mapState } from 'vuex'
  import Home from './views/Home'

  export default {
    computed: mapState(['routerTransiting', 'routerTransitValue', 'routerTransitHeight']),
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
  }
</style>
