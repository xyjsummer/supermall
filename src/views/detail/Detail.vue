<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" />
      <scroll class="content" ref="scroll">
        <detail-swipe :top-images="this.topImages"></detail-swipe>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
        <good-list :goods="recommends"></good-list>
      </scroll>
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

  import Scroll from '@/components/common/scroll/Scroll'
  import GoodList from '@/components/content/goods/GoodList'

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'

  import {itemListenerMixin} from "common/mixin";

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
      Scroll,
      GoodList
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[]
      }
    },
    created(){
      //保存iid
      this.iid = this.$route.params.iid;
      //请求详情数据
      getDetail(this.iid).then(res =>{
        console.log(res);
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

        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //取出评论信息
        if(data.rate.cRate!=0){
          this.commentInfo = data.rate.list[0]
        }
      })
      //请求推荐数据
      getRecommend().then(res=>{
        console.log(res);
        this.recommends = res.data.list
      })
    },
    mounted(){
      //使用下面的混入，进行替代
    },
    mixins:[itemListenerMixin],
    destroyed(){
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
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
