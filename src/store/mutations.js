import {
  ADD_COUNTER,
  ADD_TO_CART
}from './mutaion-types'

export default {
  // mutation的作用只是为了修改state中的属性
  //mutation中的方法尽可能完成单一事件
  [ADD_ACOUNTER](state,payload){
    payload.count += 1;
  },
  [ADD_TO_CART](state,payload){
    state.cartList.push(payload)
  }
}
