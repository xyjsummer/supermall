<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swipe :top-images="this.topImages"></detail-swipe>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <good-list :goods="recommends" ref="recommend"></good-list>
      </scroll>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

<!--      <toast :message="message" :show="show"></toast>-->
      </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwipe from './childComps/DetailSwipe'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodList from 'components/content/goods/GoodList'
  // import Toast from 'components/common/toast/Toast'

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'

  import {itemListenerMixin} from "common/mixin";
  import {backTopMixin} from "../../common/mixin";
  import {debounce} from "common/utils";

  import {mapActions} from 'vuex'
  // import BackTop from '../../components/common/backTop/BackTop'


  export default {
    name: "detail",
    components:{
      DetailNavBar,
      DetailSwipe,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodList,
      // Toast
      // BackTop
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        itemInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY: null,
        currentIndex:0,
        // isShowBackTop:false
        // message:'',
        // show:false
      }
    },
    created(){
      //保存iid
      this.iid = this.$route.params.iid;
      //请求详情数据
      getDetail(this.iid).then(res =>{
        // console.log(res);
        //根据iid请求详情数据
        const data = res.result;

        this.topImages = data.itemInfo.topImages;

        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
        // console.log(this.goods);

        //获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // console.log(data.shopInfo);

        //保存商品详情数据
        this.detailInfo = data.detailInfo;
        this.itemInfo = data.itemInfo;

        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //取出评论信息
        if(data.rate.cRate!=0){
          this.commentInfo = data.rate.list[0]
        }

        //在上面的数据全部在组件中加载完之后再进行回调
        this.$nextTick(()=>{
          //保证数据存在，根据最新的数据，对应的DOM是已经被渲染出来了
          //但是图片依然是没有加载完（目前获取到的offsetTop不包含其中的图片）
          // this.themeTopYs = [];
          // this.themeTopYs.push(0);
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          // console.log(this.themeTopYs)
        })
      })
      //请求推荐数据
      getRecommend().then(res=>{
        // console.log(res);
        this.recommends = res.data.list
      })

      //进行防抖操作
      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs)
      })
    },
    mounted(){
      //使用下面的混入，进行替代
    },
    mixins:[itemListenerMixin,backTopMixin],
    updated(){
      //保证数据存在
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs)
    },
    destroyed(){
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      ...mapActions(['addCart']),

      addToCart(){
        //获取商品信息
        const product = {};
        product.image = this.topImages[0];
        product.iid = this.iid;
        product.desc = this.detailInfo.desc;
        product.price = this.itemInfo.lowNowPrice;
        product.title = this.itemInfo.title;

        //将商品加入到购物车中
        //import mapActions后，直接进行调用
        this.addCart(product).then(res=>{
          this.$toast.show(res,2000)
        })
      },
      imageLoad(){
        this.$refs.scroll.refresh();

        this.getThemeTopY()
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100);
      },
      contentScroll(position){
        //获取Y
        const positionY =  -position.y
        //和主题中的Y进行对比
        for (let i = 0; i < this.themeTopYs.length; i++) {
          if(this.currentIndex!=i &&((i<this.themeTopYs.length-1 &&positionY>this.themeTopYs[parseInt(i)]&&positionY<this.themeTopYs[parseInt(i)+1])||(i==this.themeTopYs.length-1&&positionY>this.themeTopYs[i]))){
            console.log(i);
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
       this.isShow(position);
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,300)
      }
    }
  }
</script>

<style scoped>
  #detail{
    /*隐藏那四个导航选项*/
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px);
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
