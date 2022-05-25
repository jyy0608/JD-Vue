// home模块仓库
import { reqCategoryList, reqGetBannerList, reqGetFloorList} from "@/api"

const state = {
    // state中数据默认初始值被瞎写，与服务器（接口）返回的类型一致
    categoryList:[],
    bannerList:[],
    floorList:[],
}
const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList
    }
}
const actions = {
    // 通过api里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code == 200){
            commit("CATEGORYLIST", result.data)
        }
    },
    // 得到Mock模拟的数据
    // async getBannerList(context, value){
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            commit("GETBANNERLIST", result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        if(result.code == 200){
            commit("GETFLOORLIST", result.data)
        }
    },
}
// 计算属性
const getters = {}

export default {
    actions,
    mutations, 
    state, 
    getters,
}