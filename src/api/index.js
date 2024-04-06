import http from '../utils/request'

// 请求首页数据的接口
export const getData = () => {
  // 会返回一个promise对象
  // get第一个参数是接口文档地址，还可以带一个参数
  return http.get('/home/getData')
  // 调用axios实例的get方法
}