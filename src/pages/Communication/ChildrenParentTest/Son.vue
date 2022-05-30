<template>
  <div style="background: #ccc; height: 50px;">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="geiQian(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
  import myMixin from './myMixin/myMixin.js'

  export default {
    name: 'Son',
    data() {
      return {
        money: 30000
      }
    },
    mixins:[myMixin],
    /* methods: {
      tinghua() {
        console.log('我是小明，我听爸爸的话');
      },
      geiQian(money) {
        this.money -= money;
        //  $parent：获取到子组件的父组件，可以操作父组件的数据和方法
        this.$parent.money += money;
      }
    } */
  }
</script>