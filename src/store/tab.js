// 管理菜单相关数据
export default {
  // 定义数据
  // state对象
  state: {
    isCollapse: false // 控制菜单展开还是收起
  },
  mutations: {
    // 修改菜单展开收起的方法
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  }
}