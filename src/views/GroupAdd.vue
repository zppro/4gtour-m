<template lang="jade">
  .group-add
    .item-block.base-info
      mt-field(label="团名" placeholder="16字以内", :attr="{ maxlength: 16 }" v-model="newGroup.name")
      mt-field(label="简介" placeholder="48字以内", :attr="{ maxlength: 48 }" type="textarea" rows="3" v-model="newGroup.intro")
      mt-field(label="注意事项" placeholder="64字以内", :attr="{ maxlength: 64 }" type="textarea" rows="4" v-model="newGroup.tip")
    .item-block.group-imgs
      image-uploader(:all-images="newGroup.imgs" v-on:uploaded="onUploaded" v-on:remove="onRemove")
    .item-block.leader-info
      mt-field(label="团长昵称", :attr="{ maxlength: 20 }" v-model="newGroup.leader.nick_name")
      mt-field(label="团长手机" v-model="newGroup.leader.phone")
    .item-block.signup-info
      mt-field(label="最少成团" placeholder="至少两人" v-model="newGroup.participate_min" type="number")
      mt-field(label="最大参团" placeholder="本团最多允许报名人数" v-model="newGroup.participate_max" type="number")
      mt-field(label="报名截止" placeholder="右方日历图标" v-model="deadline", :readonly="true", :disableClear="true" )
        a.primary(@click="triggerDatePicker('deadlinePicker')")
          i.fa.fa-calendar(aria-hidden="true")
        mt-datetime-picker(ref="deadlinePicker" type="datetime", :start-date="start_date" @confirm="selectDeadline" )
    .item-block.assembling-info
      mt-field(label="集合地点" v-model="newGroup.assembling_place.location_text")
        a.primary(@click="pickLocation")
          i.fa.fa-map-marker(aria-hidden="true")
      mt-field(label="集合时间" placeholder="右方日历图标" v-model="assemblingTime", :readonly="true", :disableClear="true" )
        a.primary(@click="triggerDatePicker('assemblingTimePicker')")
          i.fa.fa-calendar(aria-hidden="true")
        mt-datetime-picker(ref="assemblingTimePicker" type="datetime", :start-date="start_date" @confirm="selectassemblingTime" )
    .group-add-actions
      a.btn1.btn-save(@click="submitForm") 提交
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import moment from 'moment'
  import ImageUploader from '../components/ImageUploader.vue'
  import { APICLOUD_OPEN_MAP_DIALOG, APICLOUD_OPEN_MAP_DIALOG_PICKED } from '../store/share-apicloud-event-names'
  export default {
    data () {
      return {
        newGroup: {
          name: '',
          intro: '',
          tip: '',
          leader: {
            nick_name: '',
            phone: ''
          },
          participate_min: 2,
          participate_max: 10,
          deadline: null,
          assembling_place: {
            location_text: ''
          },
          assembling_time: null,
          imgs: []
        }
      }
    },
    computed: {
      deadline () {
        if (this.newGroup.deadline) {
          return moment(this.newGroup.deadline).format('YYYY-MM-DD HH:mm')
        }
        return ''
      },
      assemblingTime () {
        if (this.newGroup.assembling_time) {
          return moment(this.newGroup.assembling_time).format('YYYY-MM-DD HH:mm')
        }
        return ''
      },
      start_date () {
        return moment().toDate()
      },
      validation: function () {
        return {
          name$required: { fulfilled: !!this.newGroup.name.trim(), msg: '团名是必须的' },
          name$max: { fulfilled: this.newGroup.name.trim().length <= 16, msg: '团名16字以内' },
          intro$max: { fulfilled: this.newGroup.intro.trim().length <= 48, msg: '简介48字以内' },
          tip$max: { fulfilled: this.newGroup.tip.trim().length <= 64, msg: '注意事项64字以内' },
          leader_nick_name$required: { fulfilled: !!this.newGroup.leader.nick_name.trim(), msg: '团长昵称是必须的' },
          leader_nick_name$max: { fulfilled: this.newGroup.name.trim().length <= 20, msg: '团长昵称20字以内' },
          leader_phone$required: { fulfilled: !!this.newGroup.leader.phone.trim(), msg: '团长手机是必须的' },
          leader_phone$format: { fulfilled: window.utils.isPhone(this.newGroup.leader.phone.trim()), msg: '团长手机格式错误' },
          participate_min$required: { fulfilled: !!this.newGroup.participate_min, msg: '最少成团人数是必须的' },
          participate_max$required: { fulfilled: !!this.newGroup.participate_max, msg: '最大参团人数是必须的' },
          deadline$required: { fulfilled: !!this.newGroup.deadline, msg: '报名截止时间是必须的' },
          assembling_place$required: { fulfilled: !!this.newGroup.assembling_place.location_text.trim(), msg: '集合地点是必须的' },
          assembling_time$required: { fulfilled: !!this.newGroup.assembling_time, msg: '报名截止时间是必须的' }
        }
      },
      isValid: function () {
        var validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key].fulfilled
        })
      },
      ...mapState(['env', 'submitingForm', 'authMemberByTokenPromise']),
      ...mapGetters(['memberInfo'])
    },
    created () {
      this.authMemberByTokenPromise.then(() => {
        !this.newGroup.leader.nick_name && (this.newGroup.leader.nick_name = this.memberInfo.member_name)
      })
    },
    mounted () {
      if (this.env.isApiCloud) {
        this.addEventListenerFromApiCloud({
          eventName: APICLOUD_OPEN_MAP_DIALOG_PICKED,
          eventHandler: (eventRet) => {
            console.log(eventRet.value)
            // window.alert(eventRet.value)
            if (eventRet.value) {
              this.newGroup.assembling_place.location_text = eventRet.value.addr || (eventRet.value.lon + ',' + eventRet.value.lat)
              this.newGroup.assembling_place.lon = eventRet.value.lon
              this.newGroup.assembling_place.lat = eventRet.value.lat
            }
          }
        })
      }
    },
    beforeDestroy () {
      if (this.env.isApiCloud) {
        this.removeEventListenerFromApiCloud('APICLOUD_OPEN_MAP_DIALOG_PICKED')
      }
      console.log('before destroy')
    },
    watch: {
      submitingForm: function (newSubmitingForm) {
        var self = this
        if (newSubmitingForm) {
          if (this.isValid) {
            console.log(this.newGroup)
            this.saveGroup(this.newGroup).then((success) => {
              success && self.$router.replace('/group/index')
            })
          } else {
            this.submitFormFail().then(() => {
              Object.keys(self.validation).some((key) => {
                var fulfilled = self.validation[key].fulfilled
                if (!fulfilled) {
                  self.toastError(self.validation[key])
                }
                return !fulfilled
              })
            })
          }
        }
      }
    },
    methods: {
      pickLocation () {
        this.sendEventToApiCloud({ eventName: APICLOUD_OPEN_MAP_DIALOG, eventData: this.newGroup.assembling_place })
      },
      triggerDatePicker (id) {
        this.$refs[id].open()
      },
      selectDeadline (d) {
        this.newGroup.deadline = d
      },
      selectassemblingTime (d) {
        this.newGroup.assembling_time = d
      },
      onUploaded (imgUrl) {
        console.log(imgUrl)
        this.newGroup.imgs.push(imgUrl)
      },
      onRemove (imgUrlIndex) {
        console.log(imgUrlIndex)
        this.newGroup.imgs.splice(imgUrlIndex, 1)
      },
      ...mapActions(['toastError', 'addEventListenerFromApiCloud', 'removeEventListenerFromApiCloud', 'sendEventToApiCloud', 'submitForm', 'submitFormFail', 'saveGroup'])
    },
    components: {
      ImageUploader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .group-add {
    width:100%;
    .item-block {
      width:100%;
      padding-bottom:0.2rem;
      background-color: white;
      a.primary{
        color:#418BCA;
        display: block;
        width:2.4rem;
        height:2.4rem;
        line-height:2.4rem;
      }
    }
    .group-imgs {
      padding:0 0.2rem;
    }
    .group-add-actions{
      margin:0.4rem 0;
    }
  }
</style>
