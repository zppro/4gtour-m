<template lang="jade">
  .group-add
    .item-block.base-info
      mt-field(label="团名" placeholder="16字以内", :attr="{ maxlength: 16 }" v-model="newGroup.name")
      mt-field(label="简介" placeholder="48字以内", :attr="{ maxlength: 48 }" type="textarea" rows="3" v-model="newGroup.intro")
      mt-field(label="注意事项" placeholder="64字以内", :attr="{ maxlength: 64 }" type="textarea" rows="4" v-model="newGroup.tip")
    .item-block.leader-info
      mt-field(placeholder="团长昵称" v-model="newGroup.leader.nick_name")
      mt-field(placeholder="团长电话" v-model="newGroup.leader.phone")
    .item-block.signup-info
      mt-field(label="最少成团" placeholder="至少两人" v-model="newGroup.participate_min")
      mt-field(label="最大参团" placeholder="本团最多允许报名人数" v-model="newGroup.participate_min")
      mt-field(label="报名截止" v-model="newGroup.deadline" type="date")
    .item-block.assembing-info
      mt-field(label="集合地点" v-model="newGroup.assembing_place")
      mt-field(label="集合时间" v-model="newGroup.assembing_time" type="date")
    .group-imgs
      image-uploader(:all-images="newGroup.imgs" v-on:uploaded="onUploaded" v-on:remove="onRemove")
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import ImageUploader from '../components/ImageUploader.vue'
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
          deadline: '',
          assembing_place: '',
          assembing_time: '',
          imgs: []
        }
      }
    },
    computed: {
      validation: function () {
        return {
          name$required: { fulfilled: !!this.newGroup.name.trim(), tip: '团名是必须的' },
          leader_nick_name$required: { fulfilled: !!this.newGroup.leader.nick_name.trim(), tip: '团长昵称是必须的' },
          leader_phone$required: { fulfilled: !!this.newGroup.leader.phone.trim(), tip: '团长电话是必须的' },
          participate_min$required: { fulfilled: !!this.newGroup.participate_min.trim(), tip: '最少成团人数是必须的' },
          participate_max$required: { fulfilled: !!this.newGroup.participate_max.trim(), tip: '最大参团人数是必须的' },
          deadline$required: { fulfilled: !!this.newGroup.deadline.trim(), tip: '报名截止时间是必须的' },
          assembing_place$required: { fulfilled: !!this.newGroup.deadline.trim(), tip: '集合地点是必须的' },
          assembing_time$required: { fulfilled: !!this.newGroup.deadline.trim(), tip: '报名截止时间是必须的' }
        }
      },
      isValid: function () {
        var validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
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
    watch: {
      submitingForm: function (newSubmitingForm) {
        var self = this
        if (newSubmitingForm) {
          if (this.isValid) {
            console.log(this.newGroup)
            this.saveExperience(this.newExperience).then((success) => {
              success && self.$router.replace('/experience/mine')
            })
          } else {
            this.submitFormFail().then(() => {
              if (!self.validation.content$required) {
                self.toast({msg: '内容是必须的'})
              }
            })
          }
        }
      }
    },
    methods: {
      onUploaded (imgUrl) {
        console.log(imgUrl)
        this.newExperience.imgs.push(imgUrl)
      },
      onRemove (imgUrlIndex) {
        console.log(imgUrlIndex)
        this.newExperience.imgs.splice(imgUrlIndex, 1)
      },
      ...mapActions(['toast', 'submitFormFail', 'saveExperience', 'fetchExperienceInfo'])
    },
    components: {
      ImageUploader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .experience-details-feeling-add {
    width:100%;
    background-color: white;
    padding: 0 0.4rem;
    .experience-content {
      width:100%;
      padding:0.2rem 0;
      textarea{
        width:100%;
        text-align: left;
        border: none;
        font-size:0.8rem;
        height: 6rem;
      }
    }
  }
</style>
