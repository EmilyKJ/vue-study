//  入口文件
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入 vuex
import store from './store'



//2.1 导入 vue-resource 
import vueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(vueResource)

// 导入vue2-preview
import VuePreview from 'vue2-preview'
// 安装
Vue.use(VuePreview)

// 设置所有的根域名
Vue.http.options.root = 'http://027xin.com:8899/';
// 全局设置 post 时候表单数据格式组织形式  application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 导入所有的 MintUI 组件
// 导入 mint-UI 
import MintUI from 'mint-ui'   // 把 所有的组件都导入进来了
// 这里可以省略 node_modules 这一层目录
import 'mint-ui/lib/style.css'
// 将 MintUI 安装到 Vue 中
Vue.use(MintUI)



// 按需导入 MintUI 中的组件
import { Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
// vue-cli 项目中引入mui
import './assets/mui/css/mui.min.css'
import './assets/mui/css/icons-extra.css'


//导入时间格式化组件库moment
import moment from 'moment'
Vue.filter('dateFormat', function(dateStr, pattern = "YYYY-MM-DD hh-mm-ss") {
  return moment(dateStr).format(pattern)
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App }, 
  template: '<App/>',
  router,  //1.4 挂载 路由对象 到vm 实例上
  store  // 将 store 状态管理对象 挂载到 vm 实例上，可以让任何组件都能
})
