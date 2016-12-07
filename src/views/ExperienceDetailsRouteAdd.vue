<template lang="jade">
  .experience-details-route-add
    .route-container
      .route-items
        experience-route-item-edit.route-item(v-on:removeItem="removeFromRoute" v-for="(routeItem, index) in newExperience.route", :experience-route-item="routeItem", :is-last="index === newExperience.route.length-1")
        .clear
    a#addRoute(@click="openPickScenerySpotsDialog")
      .cross.cross-lt
      .cross.cross-rt
      .cross.cross-lb
      .cross.cross-rb
    a.btn1.btn-save(@click="submitForm") 提交
    mt-popup(v-model="isPickScenerySpotsDialogOpen" position="bottom" class="mint-popup-bottom")
      router-view(name="dialogHead" v-on:closeDialog="closePickScenerySpotsDialog")
      router-view(name="dialogBody", v-on:comfirmDialog="confirmPicked", :scenerySpots="scenerySpots", :picked="scenerySpotIdsPickedInRoute")
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import ExperienceRouteItemEdit from '../components/ExperienceRouteItemEdit.vue'
  export default {
    data () {
      return {
        validation: {},
        isPickScenerySpotsDialogOpen: false,
        scenerySpotsPickForRoute: [], // all
        scenerySpotIdsPickedInRoute: [], // picked
        newExperience: {
          category: 'A0003',
          route: [],
          retweet_flag: false,
          location: '杭州'
        }
      }
    },
    computed: {
      scenerySpots: function () {
        return this.scenerySpotsPickForRoute.map((s) => {
          return { label: s.show_name, value: s.id, disabled: s.disabled }
        })
      },
      ...mapState(['env', 'submitingForm', 'ordinal'])
    },
    created () {
      console.log('12')
      this.ensureD('trv03')
      this.cds$FetchScenerySpotsAllAsSource().then((rows) => {
        this.scenerySpotsPickForRoute = rows
      })
    },
    watch: {
      submitingForm: function (newSubmitingForm) {
        let self = this
        if (newSubmitingForm) {
          console.log(this.newExperience.route)
          if (this.isValid()) {
            console.log('validate success')
            this.newExperience.content = this.newExperience.route.filter(o => o.type === 'A0001').map(o => self.ordinal[o.order_no] + o.title).join(' -> ')
            this.newExperience.imgs = this.newExperience.route.filter(o => o.type === 'A0001').reduce((prev, next) => { return prev.concat(next.imgs) }, [])
            this.saveExperience(this.newExperience).then((success) => {
              success && self.$router.replace('/experience/mine')
            })
          } else {
            this.submitFormFail().then(() => {
              if (!self.validation.route$required) {
                self.toast({msg: '路线必须是包含至少两个景点'})
              } else if (!self.validation.route$contentRequired) {
                self.toast({msg: '景点介绍或者景点间的交通不能为空'})
              }
            })
          }
        }
      }
    },
    methods: {
      isValid () {
        let self = this
        this.validation = this.validate()
        return Object.keys(this.validation).every(function (key) {
          return self.validation[key]
        })
      },
      validate () {
        let self = this
        return {
          route$required: self.newExperience.route.length > 1,
          route$contentRequired: self.newExperience.route.every(o => {
            console.log(o)
            return (o.content || '').Trim().length > 0
          })
        }
      },
      openPickScenerySpotsDialog () {
        this.isPickScenerySpotsDialogOpen = true
      },
      closePickScenerySpotsDialog () {
        this.isPickScenerySpotsDialogOpen = false
      },
      confirmPicked (scenerySpotIds) {
        if (scenerySpotIds.length > 10) {
          this.toast({msg: '路线的景点最多不能超过10个'})
          return
        }
        this.isPickScenerySpotsDialogOpen = false
        for (var s = 0; s < scenerySpotIds.length; s++) {
          for (var i = 0; i < this.scenerySpotsPickForRoute.length; i++) {
            if (this.scenerySpotsPickForRoute[i].id === scenerySpotIds[s]) {
              if (!this.scenerySpotsPickForRoute[i].disabled) {
//                this.scenerySpotsPickForRoute[i].disabled = true
                Vue.set(this.scenerySpotsPickForRoute[i], 'disabled', true)
                let length = this.newExperience.route.length
                if (length > 0) {
                  this.newExperience.route.push({ type: 'A0003', imgs: [], order_no: length + 0.5 })
                }
                this.newExperience.route.push({ type: 'A0001', imgs: [], scenerySpotId: scenerySpotIds[s], order_no: (length + 1), title: this.scenerySpotsPickForRoute[i].show_name })
              }
            }
          }
        }
        console.log(this.scenerySpotsPickForRoute)
        this.scenerySpotIdsPickedInRoute = scenerySpotIds
        this.restoreConfirmScenerySpotsToRoute()
      },
      removeFromRoute (orderNo) {
        let length = this.newExperience.route.length
        let index = this.newExperience.route.findIndex(item => item.order_no === orderNo)
        if (index !== -1) {
          if (length > index + 1) {
            this.newExperience.route.splice(index + 1, 1) // 当不是最后一个景点时删除后面的路线
          }
          let removedScenerySpots = this.newExperience.route.splice(index, 1)
          if (length === index + 1) {
            this.newExperience.route.splice(index - 1, 1) // 当是最后一个景点则删除前面的路线
          }
          for (var i = 0; i < this.scenerySpotsPickForRoute.length; i++) {
            if (this.scenerySpotsPickForRoute[i].id === removedScenerySpots[0].scenerySpotId) {
//              this.scenerySpotsPickForRoute[i].disabled = undefined
              Vue.set(this.scenerySpotsPickForRoute[i], 'disabled', undefined)
            }
          }
          let indexOfIds = this.scenerySpotIdsPickedInRoute.findIndex(id => id === removedScenerySpots[0].scenerySpotId)
          indexOfIds !== -1 && this.scenerySpotIdsPickedInRoute.splice(indexOfIds, 1)
          for (var k = index; k < this.newExperience.route.length; k++) {
            this.newExperience.route[k].order_no -= 1
          }
        }
      },
      ...mapActions(['toast', 'ensureD', 'submitForm', 'submitFormFail', 'saveExperience', 'fetchExperienceInfo', 'cds$FetchScenerySpotsAllAsSource', 'restoreConfirmScenerySpotsToRoute'])
    },
    components: {
      ExperienceRouteItemEdit
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .experience-details-route-add {
    width:100%;
    background-color: white;
    padding: 0.75rem;
    .route-container{
      width:100%;
      position: relative;
      .route-items {
        width: 0.75rem;
        height:100%;
        display:block;
        border-right: dashed 1px #c1c1c1;
        .route-item{
          float:left;
          width:17.25rem;
        }
      }
    }
    .mint-popup-bottom {
      width: 100%;
      height: 100%;
      background-color: #e5e5e5;
    }
    a#addRoute{
      display: inline-block;
      margin: 1.1rem auto;
      width:3.75rem;
      height:3.75rem;
      -moz-border-radius: 1.875rem;
      -webkit-border-radius: 1.875rem;
      border-radius: 1.875rem;
      border: solid #c8c8c8 1px;
      padding:0.3rem;
      .cross{
        float:left;
        width:1.5rem;
        height:1.5rem;
        margin:0;
        padding:0;
      }
      .cross-lt{
        border-right:solid 1px #c8c8c8;
        border-bottom:solid 1px #c8c8c8;
      }
      .cross-rt{
        border-left:solid 1px #c8c8c8;
        border-bottom:solid 1px #c8c8c8;
      }
      .cross-lb{
        border-right:solid 1px #c8c8c8;
        border-top:solid 1px #c8c8c8;
      }
      .cross-rb{
        border-left:solid 1px #c8c8c8;
        border-top:solid 1px #c8c8c8;
      }
    }
    .btn-confirm{
      margin-top: 2rem;
    }
  }
</style>
