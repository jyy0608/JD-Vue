<template>
    <div>
        <h2>深入v-model</h2>
        <input type="text" v-model="msg" >
        <span>xxx</span>
        <br>
        <h2>v-model实现原理（vue2）</h2>
        <!-- 
            原生DOM中是有oninput事件，经常结合表单元素一起使用，当表单元素文本内容发生变化时发出回调
         -->
        <input type="text" :value="msg" @input="msg = $event.target.value" >
         <hr>
        <!-- 深入学习v-model，实现父子组件数据同步（通信） -->
        <!-- 
            :value：是props，父子组件通信
            :input：是自定义事件
            $event：捕获从子组件抛出的值
         -->
        <CustomInput :value="msg" @input="msg = $event" ></CustomInput>
        <!-- 简化 -->
        <CustomInput v-model="msg" ></CustomInput>
    </div>
</template>

<script>
    import CustomInput from './Custominput.vue'

    export default {
        name:'ModelTest',
        components:{
            CustomInput, 
        }, 
        data() {
            return {
                msg:'啊的口号你',

            }
        },
    }
</script>