<template>
    <div id="detail">
      <detail-nav-bar></detail-nav-bar>
      <detail-swipe :top-images="this.topImages"></detail-swipe>
    </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwipe from './childComps/DetailSwipe'

  import {getDetail} from '../../network/detail'

  export default {
    name: "detail",
    components:{
      DetailNavBar,
      DetailSwipe
    },
    data(){
      return{
        iid:null,
        topImages:[]
      }
    },
    created(){
      //保存iid
      this.iid = this.$route.params.iid;
      //根据iid请求详情数据
      getDetail(this.iid).then(res =>{
        console.log(res);
        this.topImages = res.result.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>

</style>
