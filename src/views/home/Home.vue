<template>
  <div id="home">
    <!--导航栏-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

   <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
           @scroll="contentScroll" @pullingUp = "loadMore">
     <!--轮播图-->
     <home-swiper :banners="banners"></home-swiper>
     <!--推荐栏-->
     <home-recommend-view :recommends = 'recommends'></home-recommend-view>
     <!--独立组件的封装-->
     <feature-view></feature-view>
     <!--控制条-->
     <tab-control class="tab-control" :titles="['流行','新款','精选']"
                  @tabClick="tabClick"></tab-control>
     <!--商品栏显示-->
     <goods-list :goods="showGoods"></goods-list>
   </scroll>

    <!--组件不能直接监听点击，需要加.native-->
    <back-top @click.native="backClick" v-show="isShow"></back-top>

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from '../../components/common/navbar/NavBar'
  import TabControl from '../../components/content/tabControl/TabControl'
  import GoodsList from '../../components/content/goods/GoodList'
  import Scroll from '../../components/common/scroll/Scroll'
  import BackTop from '../../components/common/backTop/BackTop'

  import {getHomeMultidata} from "../../network/home";
  import {getHomeGoods} from "../../network/home";


  export default {
    name: "Home",
    components:{
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        //把请求到的数据保存起来
        banners:[],
        recommends:[],
        //商品信息
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        isShow:false
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){

    },
    methods:{
      //网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.finishPullUp();
        })
      },
      //事件监听方法
      tabClick(index){
        switch (index) {
          case 0:this.currentType = 'pop';
          break;
          case 1:this.currentType = 'new';
          break;
          case 2:this.currentType = 'sell';
          break;
        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,300)
      },
      contentScroll(position){
        //设置图标是否可见
        if(-position.y>1000){
          this.isShow = true;
        }else{
          this.isShow = false;
        }
      },
      finishPullUp(){
        //调用该方法实现多次监听上拉加载更多事件
        this.$refs.scroll.scroll.finishPullUp();
      },
      refresh(){
        //调用重新刷新，防止bug
        this.$refs.scroll.scroll.refresh();
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
        this.refresh();
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color:white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index:9;
  }

  /*设置吸顶效果(但是sticky属性兼容性很差)*/
  .tab-control{
    position: sticky;
    top:44px;
    background-color: #fff;
    z-index:9;
  }

  /*确定滚动窗的位置*/
  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 49px;
  }
  /*动态计算*/
  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/


</style>
