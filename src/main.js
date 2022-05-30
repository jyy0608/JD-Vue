import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import {
  Button,
  MessageBox
} from 'element-ui'
import VueLazyload from 'vue-lazyload'
// 第一个参数:全局组件的名字;第二个参数:哪个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);
// 全局注册组件
Vue.component(Button.name, Button);
// 挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import mrt from '@/assets/images/goods.png'
// Vue.use实质上是调用了插件对象的install方法
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: mrt
})

// 引入路由
import router from './router'
// 引入仓库
import store from './store';
// 引入MockServe.js----mock数据
import '@/mock/mockServe'
// 引入Swiper样式
import "swiper/css/swiper.css"

Vue.config.productionTip = false

// 统一接口api文件夹里的全部请求函数
import * as API from '@/api'

// 引入表单校验插件
import "@/plugins/validate"

new Vue({
  render: h => h(App),
  // 注册路由
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route、$router信息
  router,
  // 注册仓库：组件实例的身上多了一个属性$store属性
  store,
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
}).$mount('#app')