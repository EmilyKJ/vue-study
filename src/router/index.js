import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// 导入对应的路由组件
import HomeContainer from '@/components/tabbar/HomeContainer.vue'
import MemberContainer from '@/components/tabbar/MemberContainer.vue'
import ShopcarContainer from '@/components/tabbar/ShopcarContainer.vue'
import SearchContainer from '@/components/tabbar/SearchContainer.vue'
import NewsList from '@/components/news/NewsList.vue'
import NewsInfo from '@/components/news/NewsInfo.vue'
import PhotoList from '@/components/photo/PhotoList.vue'
import PhotoInfo from '@/components/photo/PhotoInfo.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import GoodsInfo from '@/components/goods/GoodsInfo.vue'
import GoDesc from '@/components/goods/GoodsInfo-godesc.vue'
import GoComment from '@/components/goods/GoodsInfo-gocomment.vue'
Vue.use(Router)

// 创建一个路由对象 并把路由对象暴露出去
export default new Router({
  routes: [
    // { path: '/', redirect: '/home'},
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newsList', component: NewsList },
    { path: '/home/newsInfo/:id', component: NewsInfo },
    { path: '/home/photoList', component: PhotoList },
    { path: '/home/photoInfo/:id', component: PhotoInfo },
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
    { path: '/home/godesc/:id', component: GoDesc, name: 'godesc' },
    { path: '/home/gocomment/:id', component: GoComment, name: 'gocomment' },
    { path: '*', redirect: '/home'}
  ],
  linkActiveClass: 'mui-active'  // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active

})
