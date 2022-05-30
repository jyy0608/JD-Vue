// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"
// 在当前模块中引入store
import store from '@/store'

// start：进度条开始；done：进度条结束

// 1:利用axios对象方法create，去创建一个axios实例
// 2:request就是axios，只不过可以配置
const  requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候路径当中会出现api
    baseURL:'/api',
    // 代表请求超时的时间
    timeout:5000,
})

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
// 添加进度条
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象中有一个属性很重要：header请求头
    // 进度条开始东
    if(store.state.detail.uuid_token){
        // 给请求头添加一个字段(userTempId):
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 判断是否需要token
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    nprogress.start()
    return config
});

// 响应拦截器，参数分别为成功的回调和失败的回调
// 添加进度条
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器响应数据回来以后，相应拦截器可以检测到
    // 进度条结束
    nprogress.done()
    return res.data;
}, (err)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('false'))
})


// 对外暴露
export default requests;