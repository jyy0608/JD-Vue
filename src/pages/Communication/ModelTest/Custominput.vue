<template>
    <div style="background-color: #ccc;height: 50px;" >
        <h2>input包装组件</h2>
        <!-- 
            这里的 :value 是原生DOM标签
                   @input 是原生DOM事件
         -->
        <input type="text" :value="value" @input="$emit('input', $event.target.value)" >
    </div>
</template>

<script>
    export default {
        name:'CustomInput',
        props:['value'],

    }
</script>