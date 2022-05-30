<template>
    <div>
        <h2>这是Event2组件</h2>
        <button @click="$emit('click', '自定义事件click')">分发自定义click事件</button>
        <button @click="$emit('xxx', '自定义事件xxx')">分发自定义xxx事件</button>
    </div>
</template>

<script>
    export default {
        name:'Event2', 

    }
</script>

<style lang="">

</style>