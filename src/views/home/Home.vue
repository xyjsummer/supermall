<template>
  <div id="home">
    <!--导航栏-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

   <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
           @scroll="contentScroll" @pullingUp = "loadMore">
     <!--轮播图-->
     <home-swipe :banners="banners" @swipeImageLoad="swipeImageLoad"></home-swipe>
     <!--推荐栏-->
     <home-recommend-view :recommends = 'recommends'></home-recommend-view>
     <!--独立组件的封装-->
     <feature-view></feature-view>
     <!--控制条-->
     <tab-control class="tab-control" :titles="['流行','新款','精选']"
                  @tabClick="tabClick" ref="tabControl"></tab-control>
     <!--商品栏显示-->
     <goods-list :goods="showGoods"></goods-list>
   </scroll>

    <!--组件不能直接监听点击，需要加.native-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import HomeSwipe from './childComps/HomeSwipe'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from '../../components/common/navbar/NavBar'
  import TabControl from '../../components/content/tabControl/TabControl'
  import GoodsList from '../../components/content/goods/GoodList'
  import Scroll from '../../components/common/scroll/Scroll'
  // import BackTop from '../../components/common/backTop/BackTop'

  import {backTopMixin} from "../../common/mixin";

  import {getHomeMultidata} from "../../network/home";
  import {getHomeGoods} from "../../network/home";

  import {debounce} from "../../common/utils";

  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Home",
    components:{
      HomeSwipe,
      HomeRecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop
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
        // isShow:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
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
      //增加防抖动操作(防止多次频繁调用)
      // const refresh = this.debounce(this.$refs.scroll.refresh)
      // const refresh = debounce(this.$refs.scroll.refresh)
      // //利用事件总线监听item中图片加载完成
      // this.$bus.$on('itemImageLoad',()=>{
      //   // this.$refs.scroll.refresh()
      //   refresh()
      // },500)

      //获取tabControl的offsetTop
      //所有的组件都有一个属性$el，这个属性是用于获取组件中的元素的
      // this.tabOffsetTop = this.$refs.tabControl
      //但是这里获取到的信息并不准确（因为图片并未加载）
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    //使用混入，避免重复代码
    mixins:[itemListenerMixin,backTopMixin],
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh();
    },
    deactivated(){
      //保存Y值
      this.saveY = this.$refs.scroll.scroll.y;
      //取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      //防抖函数
      // debounce(func,delay){
      //   let timer = null;
      //   return function(...args){
      //     if(timer) clearTimeout(timer);
      //     timer = setTimeout(()=>{
      //       func.apply(this,args)
      //     },delay)
      //   }
      // },

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
        this.isShow(position);
        //决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = (-position.y) > 1000

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
      },
      swipeImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop);
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

    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
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
