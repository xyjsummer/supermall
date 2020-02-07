import {request} from "./request";
export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

//整合数据，并封装到一个对象上
export class Goods{
  constructor(itemInfo,colums,services){
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = colums;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class GoodsParam{
  constructor(info,rule){
    this.image = info.images? info.images[0]:'';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

