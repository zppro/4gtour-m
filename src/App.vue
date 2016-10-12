<template lang="jade">
  #home
    home
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
#home {
  color: #2c3e50;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
  -webkit-box-flex:1;
  -webkit-flex:1;
  -ms-flex:1;
  flex:1;
}

#home a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
