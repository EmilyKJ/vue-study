import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

// 创建一个路由对象 并把路由对象暴露出去
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ],
  linkActiveClass: 'mui-active'  // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active

})
