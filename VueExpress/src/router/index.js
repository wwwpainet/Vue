import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)
import routes from './router'

const router = new Router({
  mode:'history',
  routes
})

// 路由钩子
router.beforeEach(({meta,path},from,next)=>{
  store.dispatch('showProgress',0)
  let {auth=true}=meta   //meta为false则auth为false；否则auth为true
  let isLogin = Boolean(store.state.token) //转换为true or false
    /*
      访问不需要权限的设置meta:false
      注册也要设置成meta:false
  */
  //访问的是需要权限的页面且没有登录
  if(auth&&!isLogin) {
    return next({path:'/login'})
  }

  // 如果登录了以后再访问reg和login则路由到Home
  if(isLogin&&(path=='/login'||path=='/reg')) {
    return next({path:'/admin'})
  }

  // 未登录的情况下访问reg则直接路由
  next()

})

export default router