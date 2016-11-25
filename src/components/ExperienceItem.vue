<template lang="jade">
  .experience-item
    .item-left
      router-link.member-head-portrait(:to="memberInfoUrl")
        slot(name="member_head_portrait")
    .item-right
      router-link.member-name.text-danger(:to="memberInfoUrl")
        slot(name="member_name")
      .time-description
        slot(name="time_description")
      .category
        slot(name="category")
      .content
        slot(name="content")
        router-link(:to="itemUrl")
          slot(name="details-link")
      .imgs
        slot(name="imgs")
        .clear
      .location
        i.fa.fa-map-marker(aria-hidden="true")
        slot(name="location")
      .actions
        .action.retweets
          i.fa.fa-retweet(aria-hidden="true")
          slot(name="retweets")
        .action.stars
          i.fa.fa-star-o(aria-hidden="true")
          slot(name="stars")
        .action.likes
          i.fa.fa-thumbs-o-up(aria-hidden="true")
            slot(name="likes")
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .experience-item {
    width:100%;
    background-color: white;
    text-align: left;
    min-height:16.425rem;
    margin-bottom: 0.05rem;
    padding:0.75rem;
    .item-left{
      width: 2.1rem;
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
    }
    .item-right{
      position:relative;
      clear:left;
      display: inline-block;
      width: 15.15rem;
      height:100%;
      a.member-name{
        display: block;
        font-size: 0.6rem;
      }
      .time-description{
        margin-top:0.1rem;
        font-size: 0.5rem;
        color:#7c7b7b;
      }
      .category{
        position: absolute;
        right:0.5rem;
        top: 0;
        font-size: 0.6rem;
      }
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
        img{
          float:left;
          width:4.75rem;
          height:4.75rem;
          margin-top:0.225rem;
          margin-right:0.225rem;
        }
        .clear{clear:left;}
      }
      .location{
        display: inline-block;
        margin-top:0.45rem;
        width:6.4rem;
        font-size: 0.5rem;
        color:#7c7b7b;
        span{margin-left:0.225rem;}
      }
      .actions{
        margin-top:0.6rem;
        display: inline-block;
        background-color: #efeff4;
        width:8.3rem;
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
  export default {
    props: ['experienceId'],
    computed: {
      memberInfoUrl () {
        return '/'
      },
      itemUrl () {
        return {path: '/experience-details/' + this.experienceId}
      }
    }
  }
</script>
