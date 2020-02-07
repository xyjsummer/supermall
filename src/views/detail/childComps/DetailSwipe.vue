<template>
  <div class="detail-swipe">
    <swipe v-if="topImages.length" class="detail-swipe">
      <swipe-item v-for="item in topImages">
        <img :src="item" alt="">
      </swipe-item>
    </swipe>
  </div>
</template>

<script>
  import {Swipe,SwipeItem} from '../../../components/common/swipe'

  export default {
    name: "DetailSwipe",
    components:{
      Swipe,SwipeItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swipe{
    height: 300px;
    overflow: hidden;
  }
</style>
