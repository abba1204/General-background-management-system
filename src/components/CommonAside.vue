<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
    :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <!-- 名称在折叠和展开的不同情况下有不同显示 -->
    <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
    <!-- 对noChildren进行遍历 -->
    <!-- vue中的key用于标记当前元素的唯一性 -->
    <!-- 这个key寻找固定且不变的值 此处name属性唯一，用item.name -->
    <!-- index作用：唯一标志：用于确认点击的唯一、对应组件 -->
    <!-- v-bind:index=>简写:index -->
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <!-- 渲染图标 -->
      <!-- 动态，字符串拼接 -->
      <!-- 模板字符串`` -->
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <!-- 子页面 -->
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<!-- lang="less" scope -->
<style lang="less" scope>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu {
    height: 100vh;
    /* 去掉侧边栏和顶部导航栏之间的缝隙 */
    border-right: none;

    h3 {
      color: #fff;
      text-align: center;
      line-height: 48px;
      font-size: 16px;
      font-weight: 400px;
    }
  }
</style>
<script>
  import Cookie from "js-cookie"
  // 打包出口
  export default {
    // 数据
    data() {
      return {};
    },
    // 方法
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 点击菜单，实现跳转
      clickMenu(item) {
        // console.log(item)
        // 纠正错误逻辑
        // 当页面路由与我们点击的路由不同时，实现跳转
        // $route.path表示当前页路由
        // 前面设置了'/'就等同于'/home'所以也要判断
        if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
          // this指vue实例，会有router属性，path属性给路径实现跳转
          // 想要导航到不同的 URL，使用 router.push 方法。这个方法会向 history 栈添加一个新记录，所以，当用户点击浏览器后退按钮时，可以返回到之前的 URL。
          this.$router.push(item.path)
        }
        // clickMenu时调用mutation
        // 可调用挂载在vue实例的store
        this.$store.commit('selectMenu', item)
      },
    },
    // 计算属性
    computed: {
      //对数据过滤
      // 没有子菜单

      // 起名字
      noChildren() {
        // 依赖menuData的变化进行过滤
        // 使用filter方法，将函数作为参数，对数据数组进行遍历，item会拿到其中某一项，根据true和false判断是否返回
        // item.children不存在,获取该元素，return 
        return this.menuData.filter(item => !item.children)
      },
      // 有子菜单
      // 同理，取反
      hasChildren() {
        return this.menuData.filter(item => item.children)
      },
      menuData() {
        //判断当前数据,如果缓存中没有,从当前的store中获取
        return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
      },
      // 要响应点击按钮时菜单栏的展开折叠变化，在computed下定义方法，引入state
      isCollapse() {
        return this.$store.state.tab.isCollapse
      }
    }
  }
</script>