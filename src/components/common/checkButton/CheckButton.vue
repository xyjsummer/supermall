<template>
    <div class="check-button" :class="{check:isChecked}">
      <img src="../../../assets/img/cart/tick.png" alt="">
    </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
  .check-button{
    width: 20px;
    height: 20px;
    /*background-color: red;*/
    border-radius: 50%;
    border:2px solid #aaa;
  }
  .check-button img{
    width: 18px;
    height: 18px;
  }
  .check{
    border-color:red;
    background-color: red;
  }
</style>
