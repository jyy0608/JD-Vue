// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
// 引入配置信息
import routes from './routers'

// 使用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push/repace保存一份
let origePush = VueRouter.prototype.push;
let origeReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来的push方法往哪里跳转（传递哪些参数）
// call与apply区别：
// 相同点:都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点:call与apply传递参数:call传递参数用,隔开, apply方法执行传递数组
VueRouter.prototype.push = function(location, resolve, reject){
    if(resolve && reject){
        // call与apply区别：
        // 相同点:都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点:call与apply传递参数:call传递参数用,隔开, apply方法执行传递数组
        origePush.call(this, location, resolve, reject)
    }else{
        origePush.call(this, location, ()=>{}, ()=>{})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject){
    if(resolve && reject){
        // call与apply区别：
        // 相同点:都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点:call与apply传递参数:call传递参数用,隔开, apply方法执行传递数组
        origeReplace.call(this, location, resolve, reject)
    }else{
        origeReplace.call(this, location, ()=>{}, ()=>{})
    }
}

// 配置路由
export default new VueRouter({
    // 配置路由
    routes, 
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {y: 0}
      },
})