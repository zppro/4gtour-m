<template lang="jade">
  .ticket-item(@click="pick(ticketId)",:class="{ 'ticket-item-active': choosen === ticketId }")
    .ticket-title
      slot(name="title")
    .ticket-price
      slot(name="price")
    .ticket-bid-price
      slot(name="bid-price")
</template>
<script>
  export default {
    props: ['ticketId', 'choosen'],
    methods: {
      pick (ticketId) {
        this.$emit('selectTicket', { ticketId })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.ticket-item {
  width:100%;
  display: inline-flex;
  padding: 0.4rem;
  text-align: left;
  height:3.7rem;
  border-bottom: solid 1px #f4f4f4;
  cursor:pointer;
  .ticket-title{
    font-size:1rem;
    display: inline-block;
    flex : 1;
  }
  .ticket-price{
    font-size:1rem;
    color:#ea5513;
    display: inline-block;
    align-self: flex-end;
  }
  .ticket-bid-price{
    font-size:0.86rem;
    color:#7f7d7d;
    display: inline-block;
    padding-left:0.4rem;
    text-decoration: line-through;
    align-self: flex-end;
  }
}
.ticket-item-active{
  background-color: #fa761d;
  .ticket-title,.ticket-price,.ticket-bid-price {
    color:white;
  }
}
</style>
