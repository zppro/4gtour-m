<template lang="jade">
  .experience-item
    .item-head
      router-link.member-head-portrait(:to="memberInfoUrl")
        slot(name="member_head_portrait")
      .name-time
        router-link.member-name.text-danger(:to="memberInfoUrl")
          slot(name="member_name")
        .time-description
          slot(name="time_description")
    .item-body
      .content
        slot(name="content")
        router-link(:to="routeItemUrl")
          slot(name="details-link")
      .imgs
        slot(name="imgs")
        .clear
    .item-retweet-root
      slot(name="retweetRoot")
    .item-foot
      .location
        i.fa.fa-map-marker(aria-hidden="true")
        slot(name="location")
      .actions
        .action.retweets(@click="retweet")
          i.fa.fa-retweet(aria-hidden="true")
          slot(name="retweets")
        .action.stars(@click="toggleStar")
          i.fa.fa-star-o(aria-hidden="true" v-if="!experience.stared")
          i.fa.fa-star(aria-hidden="true" v-if="experience.stared")
          slot(name="stars")
        .action.likes(@click="toggleLike")
          i.fa.fa-thumbs-o-up(aria-hidden="true" v-if="!experience.liked")
          i.fa.fa-thumbs-up(aria-hidden="true" v-if="experience.liked")
          slot(name="likes")
      .clear
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .experience-item {
    width:100%;
    background-color: white;
    text-align: left;
    /*min-height:16.425rem;*/
    margin-bottom: 0.05rem;
    padding:0.75rem;
    .item-head{
      width: 100%;
      float:left;
      display: inline-block;
      .member-head-portrait{
        width:1.75rem;
        > img{
          width: 1.75rem;
          height: 1.75rem;
          -moz-border-radius: 0.875rem;
          -webkit-border-radius: 0.875rem;
          border-radius: 0.875rem;
        }
      }
      .name-time{
        display: inline-block;
        margin-left:0.4rem;
        a.member-name{
          display: block;
          font-size: 0.8rem;
          margin-bottom: 0.2rem;
        }
        .time-description{
          margin-top:0.1rem;
          font-size: 0.5rem;
          color:#7c7b7b;
        }
      }
    }
    .item-body{
      position:relative;
      clear:left;
      display: inline-block;
      padding-left:2.15rem;
      width: 100%;
      .content{
        margin-top:0.225rem;
        margin-bottom:0.225rem;
        font-size: 0.65rem;
        color:#000;
        a{
          span{
            margin-left: 0.2rem;
            text-decoration: underline;
          }
        }
      }
      .imgs{
        width: 100%;
        .clear{clear:both;}
      }
    }
    .item-retweet-root{
      width: 100%;
      margin:0.2rem 0;
    }
    .item-foot{
      height:1.2rem;
      margin-top:0.45rem;
      .location{
        display: inline-block;
        width:2.4rem;
        height:1.2rem;
        font-size: 0.5rem;
        color:#7c7b7b;
        span{margin-left:0.225rem;}
      }
      .actions{
        float:right;
        display: inline-block;
        background-color: #efeff4;
        height:1.2rem;
        font-size:0.5rem;
        .action{
          width:2.75rem;
          display: inline-block;
          color:#7c7b7b;
          height:0.6rem;
          margin-top:0.3rem;
          text-align: center;
          cursor: pointer;
          span{padding-left:0.1rem;}
        }
        .retweets{
          border-right: solid 1px #ccc;
        }
        .stars{
          border-right: solid 1px #ccc;
        }
        .likes{
        }
      }
    }
  }
</style>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: ['experience'],
    computed: {
      memberInfoUrl () {
        return '/member-profile/' + this.experience.member_id
      },
      routeItemUrl () {
        return {path: '/experience-details/' + this.experience.id + '/route'}
      },
      ...mapGetters(['isLogined'])
    },
    methods: {
      retweet () {
        if (!this.isLogined) {
          this.login()
        } else {
          this.$router.replace('/experience-retweet/' + this.experience.id)
        }
      },
      toggleLike () {
        if (!this.isLogined) {
          this.login()
        } else {
          this.toggleLikeExperience(this.experience)
        }
      },
      toggleStar () {
        if (!this.isLogined) {
          this.login()
        } else {
          this.toggleStarExperience(this.experience)
        }
      },
      ...mapActions(['login', 'toggleLikeExperience', 'toggleStarExperience'])
    }
  }
</script>
