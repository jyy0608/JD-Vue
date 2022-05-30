// Vuex相关配置
import Vue from "vue";
import Vuex from "vuex";

// 使用Vuex插件
Vue.use(Vuex);
// state：仓库存储的数据
// mutations：修改state的唯一手段
// actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
// getters：理解为计算属性，简化仓库数据，额昂组件获取仓库数据更加方便

// 引入小仓库
import home from './home'
import search from "./search"
import detail from './detail'
import shopcart from "./shopcart"
import user from "./user";
import trade from "./trade";

// 对外暴露Store类的实例
export default new Vuex.Store({
    // 实现Vuex仓库模块式开发存储数据
    modules:{
        home, 
        search,
        detail,
        shopcart, 
        user,
        trade, 
        
    }
});

