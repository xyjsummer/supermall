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
      },
      pullUpLoad:{
        type:Boolean,
        default: false
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
        pullUpLoad:this.pullUpLoad
      })
      //监听滚动位置
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })

      //图片加载之后，对界面进行刷新
      this.scroll.refresh()

      //监听上拉事件
      this.scroll.on('pullingUp',()=>{
        // console.log('上拉加载更多');
        this.$emit('pullingUp')
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
