<!-- 页面内容 -->
<template>
  <div class="header-container">
    <div class="l-content">
      <!-- 控制菜单的展开和折叠，牵扯到两个组件的变化 -->
      <!-- 通信方式：vuex -->
      <!-- 点击button，触发state修改(tab.js)，调用mutation方法，state发生变化，在aside组件获取，在el-menu组件中使用store中定义的state -->
      <el-button style="margin-right: 20px;" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <!-- 面包屑 -->
      <!-- <span class="text">首页</span> -->
      <!-- separator:分割线 -->
      <el-breadcrumb separator="/">
        <!-- :to= 实现跳转 -->
        <el-breadcrumb-item v-for="item in tags" :key="item.path"
          :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  // 通过辅助函数实现数据活性 =>computed
  import { mapState } from 'vuex'
  export default {
    data() {
      return {}
    },
    methods: {
      //使用button要获取mutation方法 
      // 通过commit调用mutation方法中collapseMenu
      handleMenu() {
        // this.$store.commit()  同步操作
        // this.$store.commit('方法名', 值)【存储】
        this.$store.commit('collapseMenu')
      }
    },
    computed: {
      // 返回一个对象，所以要用扩展运算符(ES6语法，对mapState返回的对象进行解构)
      ...mapState({
        // 给state获取并取别名
        // tags:名称
        // state:函数：带state参数.tab模块.tabsList字段
        tags: state => state.tab.tabsList
      })
    }
  }
</script>
<style lang="less" scoped>
  .header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    /* 主轴上两端显示 */
    justify-content: space-between;
    /* 纵轴上居中显示 */
    align-items: center;

    .text {
      color: #fff;
      font-size: 14px;
      margin-left: 10px;
    }

    .r-content {
      .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    .l-content {
      display: flex;
      align-items: center;

      /* 样式穿刺 */
      /deep/.el-breadcrumb__item {
        .el-breadcrumb__inner {
          font-weight: normal;

          &.is-link {
            color: #666;
          }
        }

        /* 伪类 */
        &:last-child {
          .el-breadcrumb__inner {
            color: #fff;
          }
        }
      }
    }
  }
</style>