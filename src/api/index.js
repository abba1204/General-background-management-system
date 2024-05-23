import http from '../utils/request'

// 请求首页数据的接口
export const getData = () => {
  // 会返回一个promise对象
  // get第一个参数是接口文档地址，还可以带一个参数
  return http.get('/home/getData')
  // 调用axios实例的get方法
}
export const getUser = (params) => {
  console.log(params, 'params')
  // 返回用户列表
  return http.get('/user/getUser', params)
}

export const addUser = (data) => {
  return http.post('/user/add', data)
}

export const editUser = (data) => {
  return http.post('/user/edit', data)
}
export const delUser = (data) => {
  return http.post('/user/del', data)
}

export const getMenu = (data) => {
  return http.post('/permission/getMenu', data)
}