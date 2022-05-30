// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
// 引入配置信息
import routes from './routers'
// 引入store
import store from '@/store'

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
let router =  new VueRouter({
    // 配置路由
    routes, 
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {y: 0}
      },
})

// 路由全局守卫，前置守卫（在路由跳转之前进行判断）
router.beforeEach(async(to, from, next) => {
    /* 
        to：可以获取到跳转到哪
        from：可以获取到从哪个路由来的
        next：放行   
            next()：全部放行    
            next('/login')：放行到指定路由 
            next(false)：中断当前导航，返回到from
    */
    // 用户登陆了不能跳转到Login
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name 
    if(token){
        if(to.path == '/login'){
            next('/')
        } else {
            // 登录，home | search | detail | shopcart
            // 判断是否有用户信息
            if(name){
                next()
            } else {
                // 没有用户信息
                // 派发action获取用户信息
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了
                    // 清除token
                    store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录
        let toPath = to.path
        if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
            // 把未登录的时候想去的信息，存储于地址栏中（路由）
            next('/login?redirect='+toPath)
        } else {
            next()
        }
    }
})

export default router