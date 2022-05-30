<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="geiQian(50)">给BABA钱: 100</button>
  </div>
</template>

<script>
  import myMixin from './myMixin/myMixin.js'

  export default {
    name: 'Daughter',
    data() {
      return {
        money: 20000
      }
    },
    mixins:[myMixin],
    /* methods: {
      geiQian(money) {
        this.money -= money;
        //  $parent：获取到子组件的父组件，可以操作父组件的数据和方法
        this.$parent.money += money;
      }
    } */
  }
</script>