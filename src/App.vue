<template lang="jade">
  #app
    router-view(name="head")
    router-view(name="body" transition="fade" transition-mode="out-in" keep-alive)
    #home
      p Welcome to your 4gtour web app!!!
</template>

<script>
import Home from './views/Home'

export default {
  components: {
    Home
  }
}
</script>

<style>

  .fade-transition {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
  #app {
    margin: 0 auto;
    padding:0;
    display:flex;
    flex-direction:column;
    align-items: center;
    color: #2c3e50;
    max-width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
    -webkit-box-flex:1;
    -webkit-flex:1;
    -ms-flex:1;
    flex:1;
  }

  .logo {
    width: 100px;
    height: 100px
  }
</style>
