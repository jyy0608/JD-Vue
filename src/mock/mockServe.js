// 引入mockjs模块
import Mock from "mockjs";
// 把JSON数据引入进来
// webpack默认对外暴露：图片、JSON数据格式
import banners from './banners.json'
import floors from './floors.json'

// mock数据：第一个参数请求地址     第二个参数请求数据
Mock.mock("/mock/banners", {code:200, data:banners})
Mock.mock("/mock/floors", {code:200, data:floors})