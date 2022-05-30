export default {
    // 对外暴露的对象，可以放置组件复用JS业务逻辑
    methods: {
        geiQian(money) {
            this.money -= money;
            //  $parent：获取到子组件的父组件，可以操作父组件的数据和方法
            this.$parent.money += money;
        }
    }
}