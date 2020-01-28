<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  //因为在swiper中存在一个index文件，所以可以一起导出
  import {Swiper,SwiperItem} from '../../../components/common/swiper'
  export default {
    name: "HomeSwiper",
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      SwiperItem,Swiper
    }
  }
</script>

<style scoped>

</style>
