// router相关代码配置
// 模块化代码必须引入
import Vue from 'vue'
import VueRouter from 'vue-router'
// 实际通用后台管理系统中，每个页面对应router中一个路由

// 每一个路由对应一个组件
// 1.创建路由组件
// views文件夹中包含所有组件
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
// 配置router
Vue.use(VueRouter)

// 2.定义路由
// 将路由与组件进行映射
const routes = [
  // 主路由
  {
    // 斜杠代表主路由
    path: '/',
    component: Main,
    //重定向
    redirect: '/home',
    // 嵌套路由
    children: [
      // 子路由
      // 可以不加斜杠
      { path: 'home', name: 'home', component: Home },//首页
      { path: 'user', name: 'user', component: User },//用户管理
      { path: 'mall', name: 'mall', component: Mall },//商品管理
      { path: 'page1', name: 'page1', component: PageOne },//页面一
      { path: 'page2', name: 'page2', component: PageTwo },//页面二
    ]
  },
  /*
  //放到上面
  //  http://localhost:8080/#/home
  { path: '/home', component: Home },
  //  http://localhost:8080/#/user
  { path: '/user', component: User }
  */
]

// 3.要创建router实例
const router = new VueRouter({
  routes //(缩写)，相当于 routes:routes
})
// 将router实例对外暴露
export default router
// 挂载


