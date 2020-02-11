import {debounce} from "./utils";
import BackTop from 'components/common/backTop/BackTop'

export const itemListenerMixin = {
  //还可以提取data,methods等
  mounted(){
    let refresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () =>{
      refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}

export const backTopMixin={
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false
    }
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0,0,300)
    },

    isShow(position){
      //设置图标是否可见
      if(-position.y>1000){
        this.isShowBackTop = true;
      }else{
        this.isShowBackTop = false;
      }
    },
  }
}
