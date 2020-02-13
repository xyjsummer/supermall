<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车<span v-show="isShow">({{cartLength}})</span></div>
    </nav-bar>

    <!--列表-->
    <cart-list ></cart-list>

    <!--汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    data(){
      return{
      }
    },
    computed:{
      isShow(){
        return this.$store.state.cartList.length>0
      },
      //mapgetters的两种语法
      // ...mapGetters({
      //   length:cartLength
      // })
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color:white;
    font-weight: 700;
  }

</style>
