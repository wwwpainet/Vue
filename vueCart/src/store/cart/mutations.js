import * as types from './type'
import Vue from 'vue'
export default {
  /*购物车的商品+1*/
  [types.ADD_GOODS_FROM_CART](state,goods) {
    let item = state.cart[`p${goods.id}`]
    let num =  item.num
    /*更新*/
    /*Obejct.assign浅拷贝，会对对象里存在的属性覆盖，不存在的属性添加*/
    state.cart[`p${goods.id}`] = Object.assign({},item,{num:num+1})
  },
  // 更新购物车
  [types.UPDATE_CART](state) {
    localStorage.setItem('cart',JSON.stringify(state.cart))
  },
  /*添加商品到购物车中*/
  [types.CREATE_GOODS_TO_CART](state,goods) {
    /*以key-value键值对的形式存放在购物车中*/
    Vue.set(state.cart,`p${goods.id}`,goods)
  },
  [types.REDUCE_GOODS_FROM_CART](state,goods) {
    let item = state.cart[`p${goods.id}`]
    let num = item.num
    if(num<=1) return
    state.cart[`p${goods.id}`] = Object.assign({},item,{num:num-1})
  },
  [types.MODIFY_GOODS_NUM_FROM_CART](state,data) {
    let goods = data.goods
    let num = data.num
    let item = state.cart[`p${goods.id}`]
    state.cart[`p${goods.id}`] = Object.assign({},item,{num:num})
  },
  [types.DELETE_GOODS_FROM_CART](state,goods) {
    Vue.delete(state.cart,`p${goods.id}`)
  }
}