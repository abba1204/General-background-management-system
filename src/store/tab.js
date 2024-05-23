import Cookie from 'js-cookie'
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
    ], //面包屑数据
    menu: []
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
    },
    //设置menu数据
    //对数据进行缓存,web数据在刷新后会丢失(丢失store内数据),所以要进行数据缓存
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    //动态注册路由
    addMenu(state, router) {
      //容错判断 //判断当前缓存中是否有数据
      if (!Cookie.get('menu')) return
      //数据存在
      const menu = JSON.parse(Cookie.get('menu'))
      // 给当前数据进行数据更新
      state.menu = menu
      //组装动态路由的数据
      const menuArray = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            //数据组装
            item.component = () => import(`../views/${item.url}`) //return一个import调用
            return item
          })
          menuArray.push(...item.children)
        } else {
          //没有子菜单
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      });
      console.log(menuArray, 'menuArray')
      //路由的动态添加
      menuArray.forEach(item => {
        //              主路由,子路由
        router.addRoute('Main', item)
      })
    },

  }
}