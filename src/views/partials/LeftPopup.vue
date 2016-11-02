<template lang="jade">
    section.leftPopupContent
      .user-info
        .user-head-portrait(v-if="!headPortrait")
          div.fa.fa-user(aria-hidden="true")
        img.user-head-portrait(v-if="headPortrait", :src="headPortrait")
        p
          a.btn.btn-action(v-if="!headPortrait") 点击登录
          a.btn.btn-action(v-if="headPortrait") 安全退出
      .user-actions
        mt-cell(title="我的订单")
        mt-cell(title="关于四季游")
</template>
<style lang="less" scoped>
    .leftPopupContent{
      background-color: #f8f8f8;
      box-shadow: 0.5rem 0 0.5rem #333;
      -moz-box-shadow: 0.5rem 0 0.5rem #333;
      -webkit-box-shadow: 0.5rem 0 0.5rem #333;
      height: 100%;
      .user-info{
        color:white;
        padding: 0.25rem 0;
        .user-head-portrait{
          margin: 0 auto;
          width: 4rem;
          height: 4rem;
          -moz-border-radius: 2rem;
          -webkit-border-radius: 2rem;
          border-radius: 2rem;
          background-color: #ea5513;
          > div{
            font-size:2rem;
            height:100%;
            line-height:4rem;
          }
        }
        p {
          margin:0;
          padding:0.2rem 0;
        }
        a.btn-action{
          background-color: #ea5513;
          color:white;
          padding: 0.2rem 0.4rem;
          font-size:0.75rem;
        }
      }
    }
</style>
<script>
  export default{
    data () {
      return {
        headPortrait: 'http://img2.okertrip.com/05.jpg'
      }
    }
  }
</script>
