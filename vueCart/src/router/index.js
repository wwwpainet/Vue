import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import cart from '@/components/cart'

Vue.use(Router)

let router = [
  {
    path: '/',
    name: 'homePage',
    component: homePage
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  }
]
export default new Router({
  mode:'history',
  routes: router, 
  linkActiveClass: 'active'
})
