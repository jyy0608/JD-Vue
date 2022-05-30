<template>
    <div>
        <!-- 三级联动组件:已经注册为全局组件,因此不需要再次引用 -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <TodayRecommend></TodayRecommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor">
        </Floor>
        <Brand></Brand>
    </div>
</template>

<script>
    // 引入其余组件
    import ListContainer from "./ListContainer"
    import TodayRecommend from "./TodayRecommend"
    import Rank from "./Rank"
    import Like from "./Like"
    import Floor from './Floor'
    import Brand from './Brand'
    import {mapState} from 'vuex'

    export default {
        name:'',
        components:{
            ListContainer, TodayRecommend, Rank, Like, Floor, Brand
        },
        mounted() {
            // 派发action获取floor组件数据
            this.$store.dispatch('getFloorList')
            
        },
        computed:{
            ...mapState({
                floorList:state=>state.home.floorList
            })
        }
    }
</script>

<style lang="">
    
</style>