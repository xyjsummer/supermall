import {
  ADD_COUNTER,
  ADD_TO_CART
}from './mutaion-types'

export default {
  addCart(context,payload){
    //查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(function (item) {
      return item.iid == payload.iid;
    });
    //如果商品已经存在则数量加1，否则加入新的商品
    if(oldProduct){
      // oldProduct.count++;
      context.commit(ADD_COUNTER,oldProduct)
    }else{
      payload.count = 1;
      // context.cartList.push(payload);
      context.commit(ADD_TO_CART,payload)
    }
  }
}
