import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from '@/api'

const state = {
    cartList:[], 

}

const actions = {
    // 获取购物车列表中数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit('GETCARTLIST', result.data)
        }
    }, 
    // 删除购物车某个产品
    async deleteCartListBySkuId({commit}, skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }, 
    // 切换商品勾选状态
    async updateCheckedById({commit}, {skuId, isChecked}){
        let result =  await reqUpdateCheckedById(skuId, isChecked)
        if(result.code == 200){
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    GETCARTLIST(state, cartList){
        state.cartList = cartList
    }, 

}

const getters = {
    // 简化购物车数据
    cartList(state){
        return state.cartList[0] || {}
    }, 

}

export default {
    state, 
    actions, 
    mutations, 
    getters
}