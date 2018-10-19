//  入口文件
import Vue from 'vue'
import App from './App'
import router from './router'

//2.1 导入 vue-resource 
import vueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(vueResource)

// 导入所有的 MintUI 组件
// 导入 mint-UI 
import MintUI from 'mint-ui'   // 把 所有的组件都导入进来了
// 这里可以省略 node_modules 这一层目录
import 'mint-ui/lib/style.css'
// 将 MintUI 安装到 Vue 中
Vue.use(MintUI)

// 按需导入 MintUI 中的组件
import { Swipe, SwipeItem } from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);



// vue-cli 项目中引入mui
import './assets/mui/css/mui.min.css'
import './assets/mui/css/icons-extra.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App }, 
  template: '<App/>',
  router  //1.4 挂载 路由对象 到vm 实例上
})
