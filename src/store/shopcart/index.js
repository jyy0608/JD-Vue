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
    }, 
    // 删除全部勾选产品
    deleteAllCheckedCart({dispatch, getters}){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            PromiseAll.push(promise)
        })
        // Promise.all：如果都成功，结果才为成功
        // 如果有一个失败，即为失败
        return Promise.all(PromiseAll)
    },
    // 修改全选
    updateAllCartIsChecked({dispatch, state}, isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', {skuId:item.skuId, isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },

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