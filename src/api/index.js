// 当前模块：API接口进行统一管理
import requests from './request'
import mockrequests from './mockAjax'

// 三级联动的接口
// /api/product/getBaseCategoryList  GET  无参数
export const reqCategoryList = () => {
    // 发请求:axios发请求返回的结果是Promise对象
    return requests({url:'/product/getBaseCategoryList', method:'get'})
}

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => {
    return mockrequests({url:'/banners'})
}

// 获取floor(Home首页轮播图接口)
export const reqGetFloorList = () => {
    return mockrequests({url:'/floors'})
}

// 获取搜索模块数据 
export const reqGetSearchInfo = (params) => {
    // 当前这个接口给服务器传递参数params，至少是一个空对象
    return requests({url:'/list', method:'post', data:params})
}

// 获取产品详情信息接口  
export const reqGoodInfo = (skuid) => {
    return requests({url:`/item/${skuid}`, method:'get'})
}

// 将奖品添加到购物车或者更新商品信息
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({url:`/cart/addToCart/${skuId}/${skuNum}`, method:"post"})
}

// 获取购物车产品信息
export const reqCartList = () => {
    return requests({url:'/cart/cartList', method:'get'})
}

// 删除购物商品接口
export const reqDeleteCartById = (skuId) => {
    return requests({url:`/cart/deleteCart/${skuId}`, method:'delete'})
}

// 切换商品勾选状态
export const reqUpdateCheckedById = (skuId, isChecked) => {
    return requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method:'get'})
}

// 获取验证码
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`, method:'get'})

// 注册
export const reqUserRegister = (data) => requests({url:'/user/passport/register', data, method:'post'})

// 登录
export const reqUserLogin = (data) => requests({url:'/user/passport/login', data, method:'post'})

// 带token获取用户信息
export const reqUserInfo = () => {
    return requests({url:'/user/passport/auth/getUserInfo', method:'get'})
}

// 退出登录
export const reqLogout = () => {
    return requests({url:'/user/passport/logout', method:'get'})
}

// 获取用户地址信息
export const reqAddressInfo = () => {
    return requests({url:'/user/userAddress/auth/findUserAddressList', method:'get'})
}

// 获取商品清单
export const reqOrderInfo = () => requests({url:'/order/auth/trade', method:'get'})

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method:'post'})
}

// 获取支付信息
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`, method:'get'}) 

// 获取支付状态
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`, method:'get'})

// 获取个人中心数据
export const reqMyOrderList = (page, limit) => {
    return requests({url:`/order/auth/${page}/${limit}`, method:'get'})
}