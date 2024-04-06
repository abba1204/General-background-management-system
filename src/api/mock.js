import Mock from 'mockjs'
import homeApi from './mockServeData/home'

// 定义mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)
/*
function () {
 // 拦截到请求后的处理逻辑
 console.log('拦截到了')
 return 1
 // return 的值就是data1接收到的值，可以是对象
})
*/