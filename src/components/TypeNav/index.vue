<template>
    <div class="type-nav">
        <!-- 事件委派 | 事件委托 -->
        <div class="container" @mouseleave="leaveIndex" @mouseenter="enterShow">
            <h2 class="all">全部商品分类</h2>
            <!-- 过渡动画 -->
            <transition name="sort">
                <!-- 三级联动 -->
                <div class="sort" v-show="show">
                    <div class="all-sort-list2"  @click="goSearch">
                        <div class="item" v-for="(c1, index) in categoryList.slice(0, -1)" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                            <h3 @mouseenter="changeIndex(index)" >
                                <!-- 如果使用声明式导航，可以实现路由的跳转与传参，但是会出现卡顿现象（router-link本质是一各组件，for加载很耗内存） -->
                                <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                                <!-- 编程式导航 -->
                                <a :data-categoryName="c1.categoryName" :data-category1Id = "c1.categoryId">{{c1.categoryName}}</a>
                            </h3>
                            <!-- 二级分类 -->
                            <div class="item-list clearfix" :style="{display:currentIndex == index ? 'block' : 'none'}">
                                <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id = "c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <!-- 三级分类 -->
                                            <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id = "c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    // 引入lodash：是把lodash全部功能引入
    // import _ from 'lodash'
    // 按需加载
    import throttle from 'lodash/throttle';

    export default {
        name:'TypeNav',
        data() {
            return {
                // 存储用户鼠标移上的一级分类位置
                currentIndex:-1,
                show:true,
            }
        },
        mounted(){
            // 当组件挂载完毕
            if (this.$route.path != '/home') {
                this.show = false
            }
        },
        computed:{
            ...mapState({
                // 右侧需要的是一个函数，当使用这个计算函数时，右侧函数会执行一次
                // 注入一个参数state，即为大仓库中的数据
                categoryList:state => state.home.categoryList,
            })
        },
        methods: {
            // 添加一级菜单鼠标移入效果，修改currentIndex属性
            // 加入节流效果
            // throttle中的回调函数别用箭头函数，可能会出现上下文this问题
            changeIndex: throttle(function (index){
                // 正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类都会触发鼠标进入事件
                // 非正常情况（用户操作过快）：只有部分事件触发。如果当前回调函数中有一些大量业务，就会出现卡顿现象
                this.currentIndex = index
            }, 50),  
            // 添加一级菜单鼠标移除效果，修改currentIndex属性
            leaveIndex(){
                this.currentIndex = -1
                if (this.$route.path != '/home') {
                    this.show = false
                }
            },
            //  进行路由跳转的方法
            goSearch(event){
                // 最好的解决方案是编程时导航+事件的委派
                // 利用事件委派的问题：1.点击的一定是a标签  2.如何获取参数 
                // 问题一：使用自定义属性data-categoryName
                // 问题二：
                let element = event.target
                // 节点有一个属性dataset，可以获取节点的自定义标签和属性值
                let {categoryname, category1id, category2id, category3id} = element.dataset
                if(categoryname){
                    // 整理路由跳转的参数
                    let location  = {name:'search'}
                    let query = {categoryName:categoryname};
                    // 一级、二级、三级分类的a
                    if(category1id){
                        query.category1Id = category1id
                    } else if(category2id) {
                        query.category2Id = category2id
                    } else {
                        query.category3Id = category3id
                    }
                    // 判断：如果路由跳转时，带有params参数，也需要传递过去
                    if(this.$route.params){
                        location.params = this.$route.params
                    }
                    location.query = query
                    this.$router.push(location)
                }
            },
            // 鼠标移入时，展示商品分类
            enterShow(){
                this.show = true
            },
        },
    }
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                /* height: 510px; */
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    /* .item:hover{
                        background-color: skyblue;
                    } */
                    .cur{
                        background-color: skyblue
                    }

                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                       /*  &:hover {
                            .item-list {
                                display: block;
                            }
                        } */
                    }
                }
            }

            // 过渡动画的样式
            // 过渡动画开始（进入）
            .sort-enter, .sort-leave-to{
                height: 0px;
            }
            // 过渡动画开始（进入）
            .sort-enter-to, .sort-leave{
                height: 461px;
            }
            // 定义动画事件、速率
            .sort-enter-active, .sort-leave-active{
                transition: all .5s linear;
            }
        }

    }
</style>