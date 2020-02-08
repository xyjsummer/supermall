import {debounce} from "./utils";

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
