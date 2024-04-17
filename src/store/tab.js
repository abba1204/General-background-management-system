// 管理菜单相关数据
export default {
  // 定义数据
  // state对象
  state: {
    isCollapse: false, // 控制菜单展开还是收起
    tabsList: [
      // 默认数据
      {
        // path代表路由
        path: '/',
        name: 'home',
        label: '首页',
        // icon利用了elementUI组件，直接使用ElementUI的字体图标
        icon: 's-home',
        url: 'Home/Home'
      },
    ] //面包屑数据
  },
  mutations: {
    // 修改菜单展开收起的方法
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 获取数据
    selectMenu(state, val) {
      console.log(val, 'val')
      // 默认首页，所以点击首页时不添加
      if (val.name !== 'home') {
        // 判断它不存在
        // findIndex：判断如果存在会返回当前数据的一个索引，不存在会返回-1，用index接收返回值
        const index = state.tabsList.findIndex(item => item.name === val.name)
        // 如果不存在
        if (index === -1) {
          state.tabsList.push(val) //添加数据
        }
      }
    },
    // 用于删除指定的tag数据
    closeTag(state, item) {
      console.log(item, 'item')
      const index = state.tabsList.findIndex(val => val.name === item.name)
      // 调用数组splice方法
      state.tabsList.splice(index, 1)
    }
  }
}