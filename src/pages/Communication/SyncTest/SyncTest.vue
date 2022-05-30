<template>
    <div>
        小明的爸爸现在有{{money}}元
        <h2>不使用sync修饰符</h2>
        <!-- 
            :money：是props
            @update:money：是自定义事件
            其实和v-model很相似，可以实现父子组件数据同步
         -->
        <Child :money="money" @update:money="money - $event" ></Child>

        <h2>使用sync修饰符</h2>
        <!-- 
            :money.sync的含义：
                1.父组件向子组件传递props money
                2.给当前子组件绑定了一个自定义事件，且事件名称为update:money
         -->
        <Child2 :money.sync="money" ></Child2>
    </div>
</template>

<script>
    import Child from './Child.vue'
    import Child2 from './Child2.vue'

    export default {
        name:'SyncTset', 
        data() {
            return {
                money:10000,

            }
        },
        components:{
            child, 
            Child2,

        },

    }
</script>