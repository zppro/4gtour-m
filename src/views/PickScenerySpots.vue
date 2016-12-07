<template lang="jade">
  .pick-scenery-spots
    mt-checklist(v-model="newPicked", :options="scenerySpots")
    a.btn1.btn-confirm(@click="pick") 选择
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        newPicked: []
      }
    },
    props: ['scenerySpots', 'picked'],
    created () {
      this.newPicked = [].concat(this.picked)
      console.log(this.scenerySpots)
    },
    computed: {
      ...mapGetters(['scenerySpotsConfirmPickToRoute'])
    },
    watch: {
      scenerySpotsConfirmPickToRoute: function (newScenerySpotsConfirmPickToRoute) {
        newScenerySpotsConfirmPickToRoute && this.pick()
      }
    },
    methods: {
      pick () {
        this.$emit('comfirmDialog', this.newPicked)
      },
      ...mapActions(['confirmScenerySpotsToRoute'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
  .pick-scenery-spots{
    max-width: 18.75rem;
    margin: 0 auto;
    width: 100%;
    text-align: left;
    .mint-cell-wrapper{
      height: 1.8rem;
    }
    .mint-checklist-title{
      margin:0;
    }
    .mint-checkbox-label{
      font-size:0.8rem;
    }
    .btn-confirm{
      margin-top: 2rem;
    }
  }
</style>
