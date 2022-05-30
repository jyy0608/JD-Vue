<template>
    <div style="background-color: #ccc;height: 50px;">
        <span>小明每次花100元</span>
        <button @click="$emit('update:money', money - 100)">花钱</button>
        小明爸爸还剩{{money}}元
    </div>
</template>

<script>
    export default {
        name: 'Child',
        props: ['money'],

    }
</script>