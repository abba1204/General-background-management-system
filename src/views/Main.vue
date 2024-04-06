<!-- 页面内容 -->
<template>
  <div>

    <el-container>
      <!-- aside去掉宽度设置，则在侧边栏折叠时，右侧部分就能展开，所以设置为auto -->
      <el-aside width="auto">
        <!-- 引入侧边栏组件 -->
        <common-aside />
      </el-aside>
      <el-container>
        <!-- 引入的el-header自带样式，要在el-header中更改 -->
        <el-header>
          <!-- 通用导航栏，独立区域，作为一个组件引入 -->
          <common-header />
        </el-header>
        <el-main>
          <!-- main下面有子路由，所以要给路由出口 -->
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>

        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
export default {
  data() {
    return {}
  },
  // 组件引入
  components: {
    CommonAside,
    CommonHeader
  }
}
</script>

<style scoped>
.el-header {
  padding: 0;
}
</style>