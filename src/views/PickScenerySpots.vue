<template lang="jade">
  .pick-scenery-spots
    mt-checklist(v-model="newPicked", :options="scenerySpots")
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        newPicked: []
      }
    },
    computed: {
      ...mapState(['infiniteScrollDistance', 'dataRefreshText', 'dataAppendText', 'env']),
      ...mapGetters(['allScenerySpots', 'appendDiabled', 'showFetchIndicator', 'showAppendIndicator'])
    },
    props: ['scenerySpots', 'picked'],
    created () {
      console.log(111)
      this.newPicked = [].concat(this.picked)
    },
    methods: {
      syncToVue () {
        console.log('sync 1111')
        this.syncScenerySpotsToRoute()
      },
      ...mapActions(['syncScenerySpotsToRoute'])
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
    .mint-checkbox-input:checked + .mint-checkbox-core{
      background-color: #ff8193;
      border-color: #ff8193;
    }
  }
</style>
