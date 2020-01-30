<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import Scroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      }
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      //创建BScroll对象
      this.scroll = new Scroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:true,
        pullUpLoad:true
      })
      //监听滚动位置
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })
    },
    methods:{
      scrollTo(x,y,time){
        this.scroll.scrollTo(x,y,time)
      }
    }

  }
</script>

<style scoped>

</style>
