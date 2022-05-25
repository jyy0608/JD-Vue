import {
    reqGoodInfo,
    reqAddOrUpdateShopCart
} from '@/api'
// 封装游客身份模块uuid--->生成一个随机字符串（固定不变的）
import {
    getUUID
} from '@/utils/uuid_token'

const state = {
    goodInfo: {},
    // 游客的临时身份
    uuid_token: getUUID(),
}
const actions = {
    async getGoodInfo({
        commit
    }, skuid) {
        let result = await reqGoodInfo(skuid)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加进购物车中
    async addOrUpdateShopCart({
        commit
    }, {
        skuId,
        skuNum
    }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // 当前函数如果执行返回Promise
        // 服务器加入购物车成功
        if (result.code == 200) {
            return "OK"
        } else {
            // 加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}

// 简化数据而生
const getters = {
    categoryView(state) {
        // 例如goodInfo初始状态是空对象，因此goodInfo.categoryView得到的时undefined
        // 因此至少返回空对象
        return state.goodInfo.categoryView || {}
    },
    // 产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}