import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

// 全局注入
Vue.use(Vuex)

// 创建Vuex的实例 Store
// 调用Vuex.Store方法，接收一个对象，对象下传入：status，action……
export default new Vuex.Store({
  modules: {
    tab
  }
})