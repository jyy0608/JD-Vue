import Vue from "vue"

// Vue一定暴露了一个对象
let myPlugins = {}

myPlugins.install = fun(Vue, options){
    // Vue.prototype.$bus: 任何组件都能使用
    // Vue.directive();
    // Vue.component
    // Vue.filter
    Vue.directive(options.name, (element, params)=>{
        element.innerHTML = params.value.toUpperCase()
        console.log(params)
    })
}

export default myPlugins