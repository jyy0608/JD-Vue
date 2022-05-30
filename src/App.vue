<template>
  <div>
    <MyHeader></MyHeader>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在登录、注册隐藏 -->
    <!-- <MyFooter v-show="$route.path === '/home' || $route.path === '/search' " ></MyFooter> -->
    <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
</template>

<script>
  // 引入
  import MyHeader from './components/Header'
  import MyFooter from './components/Footer'

  export default {
    name: 'App',
    components: {
      MyHeader,
      MyFooter
    },
    mounted() {
      // 派发一个action || 获取商品分类的三级列表的数据
      this.$store.dispatch('categoryList')
    },
  }
</script>

<style>

</style>