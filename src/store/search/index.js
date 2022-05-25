import {reqGetSearchInfo} from '@/api'

// search模块仓库
const state = {
    searchList:{}, 
}
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList
    }
}
const actions = {
    // 获取 search 数据
    async getSearchList({commit}, params={}){
        // params至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code === 200){
            commit('GETSEARCHLIST', result.data)
        }
    }
}
// 计算属性：在项目中，为了简化数据
const getters = {
    // 当前形参state是当前仓库的state
    goodsList(state){
        // 这样书写是有问题的
        // 保证有返回数组
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }
}

export default {
    actions,
    mutations, 
    state, 
    getters,
}