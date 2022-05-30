<template>
    <div>
        <!-- 原生DOM -->
        <button @click="handleer">原生DOM绑定原生事件</button>
        <!-- Event1组件非原生DOM组件，而绑定的click事件并非原生DOM时间，而是自定义事件，此时点击不会有输出 -->
        <!-- <Event1 @click="handler1"></Event1> -->
        <!-- 可以通过修饰符.native变为原生DOM事件，此时有输出 -->
        <Event1 @click.native="handler1"></Event1>

        <!-- 原生DOM -->
        <!-- 给原生DOM绑定自定义事件是没有意义的，因为没有办法触发$emit函数 -->
        <button @xxx="handler2" >原生DOM绑定自定义事件</button>
        <!-- 自定义事件click -->
        <Event2 @click="handler3"></Event2>
        <Event2 @xxx="handler3"></Event2>
    </div>
</template>

<script>
    import Event1 from './Event1.vue'
    import Event2 from './Event2.vue'

    export default {
        name:'EventTest', 
        components:{
            Event1, 
            Event2, 
        },
        methods: {
            handler(event){
                console.log("原生DOM单击事件", event)
            }, 
            handler1(event){
                console.log("event1事件的回调")
            }, 
            // 原生DOM绑定自定义事件
            handler2(){

            },
            // event2自定义事件回调
            handler3(params){
                console.log("event2自定义事件的回调", params)
            },

        },
    }
</script>

<style lang="">

</style>