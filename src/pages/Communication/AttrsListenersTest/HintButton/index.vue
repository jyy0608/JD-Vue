<template>
  <div>
     <a :title="title">
       <!-- 
         v-bind="$attrs"：能绑定所有接收到的数据
         v-on="$listeners"：绑定所有传递过来的所有自定义事件，v-on不能用@替换
        -->
        <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
     </a>
  </div>
</template>

<script>
export default {
  name: "",
  props:['title'],
  mounted(){
    //this.$attrs:可以获取到父亲传递的props数据
    // 对于子组件而言，props与this.$attrs是互为补集
    //this.$attrs是可以获取父亲传递的props数据，如果子组件通过
    //props:[],接受，this.$attrs属性是获取不到的
    console.log(this.$attrs);

    // this.$listeners：可以获取到父组件给子组件传递的自定义事件
    console.log(this.$listeners);
  }
};
</script>

<style scoped></style>
