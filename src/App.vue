<template lang="jade">
  #app
    mt-progress.router-transition(v-show="routerTransiting", :value="routerTransitValue", :bar-height="routerTransitHeight")
    router-view(name="head")
    transition(:name="transitionName")
      router-view(calss="body-view" name="body")
</template>

<script>
  import { mapState } from 'vuex'
  import Home from './views/Home'

  export default {
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    computed: mapState(['routerTransiting', 'routerTransitValue', 'routerTransitHeight']),
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    components: {
      Home
    }
  }
</script>

<style lang="less">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .body-view {
    position: absolute;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
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
