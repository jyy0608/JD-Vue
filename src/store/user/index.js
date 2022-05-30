import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/token"
import { set } from "nprogress"

// 登陆与注册
const state = {
    code:'',
    token: getToken(), 
    userInfo:'',
    
}

const actions = {
    async getCode({commit}, phone){
       let result = await reqGetCode(phone)   
       if(result.code == 200){
           commit("GETCODE", result.data);
           return 'OK'
       } else {
           return Promise.reject(new Error('faile'))
       }
    }, 
    // 注册
    async userRegister({commit}, user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录
    async userLogin({commit}, user){
        let result = await reqUserLogin(user)
        if(result.code == 200){
            commit('USERLOGIN', result.data.token)
            setToken(result.data.token)
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code == 200){
            commit('GETUSERINFO', result.data)
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code == 200){
            commit('CLEAR')
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    GETCODE(state, code){
        state.code = code
    }, 
    USERLOGIN(state, token){
        state.token = token
    },
    GETUSERINFO(state, userInfo){
        state.userInfo = userInfo
    }, 
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        removeToken()
    },

}

const getters = {

}

export default {
    state, 
    actions, 
    mutations, 
    getters,
}