<template>
  <swipe>
    <swipe-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swipe-item>
  </swipe>
</template>

<script>
  //因为在swipe中存在一个index文件，所以可以一起导出
  import {Swipe,SwipeItem} from '../../../components/common/swipe'
  export default {
    name: "HomeSwipe",
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isLoad:false
      }
    },
    components:{
      SwipeItem,Swipe
    },
    methods:{
      imageLoad(){
        if(!this.isLoad){
          //限制只发送一次事件
          this.$emit('swipeImageLoad');
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
