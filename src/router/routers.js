// 路由配置信息
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSucess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

export default [{
        name: 'home',
        path: '/home',
        component: Home,
        meta: {
            show: true,
        },
        props($route) {
            return {}
        },
    },
    {
        name: 'search',
        // params参数
        path: '/search/:keyword?',
        // path:'/search',
        component: Search,
        meta: {
            show: true,
        },
        // 路由组件传递props参数
        // 布尔值写法：只对params参数有效
        // props:true,
        // 对象写法：额外给路由组件传递一些props
        /* props:{
            a:1, b:2
        }, */
        // 函数写法：可以将params、query参数通过props传递给路由组件
        /* props($route){
            return {keyword:$route.params.keyword, k:$route.query.k}
        }, */
        /* props({params:{keyword}, query:{categoryName}}){
            return {keyword, categoryName}
        } */
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {
            show: false,
        },
        props($route) {
            return {}
        },
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: {
            show: false,
        },
        props($route) {
            return {}
        },
    },
    {
        // name:'detail',
        path: '/detail/:skuid?',
        // path:'/detail',
        component: Detail,
        meta: {
            show: true,
        }
    },
    {
        path:'/addcartsucess',
        name:'addcartsucess',
        component:AddCartSucess, 
        meta:{
            isShow:true
        }
    },
    {
        path:'/shopcart',
        name:'shopcart',
        component:ShopCart, 
        meta:{
            isShow:true
        }
    },
    // 重定向,在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: '*',
        redirect: '/home'
    },
]