<template>
  <div class="tabs">
    <!-- closable属性：可关闭标签，此处表示标签名不为home就可以关闭标签 -->
    <!-- effect表示高亮，要判断是否被激活 -->
    <el-tag v-for="(item,index) in tags" :key="item.path" :closable="item.name !==`home`"
      :effect="$route.name===item.name ? `dark` : `plain`" @click="changeMenu(item)" @close="handleClose(item,index)"
      size="small">
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'CommonTag',
    data() {
      return {}
    },
    computed: {
      ...mapState({
        tags: state => state.tab.tabsList
      })
    },
    methods: {
      // 辅助函数
      ...mapMutations(['closeTag']),
      // 点击tag跳转功能
      changeMenu(item) {
        // console.log(item)
        // 旧的跳转方式
        // this.$router.push('/home') //加路径
        this.$router.push({ name: item.name })

      },
      // 点击删除
      handleClose(item, index) {
        // 删除数据
        // 调用store中的mutation
        this.closeTag(item)
        // 判断
        const length = this.tags.length
        // 删除之后的跳转逻辑
        if (item.name !== this.$route.name) {
          return //删除的不是当前已激活的标签，不做任何处理
        }
        // 与length相等表示删除的最后一项，向左移动
        if (index === length) {
          this.$router.push({
            name: this.tags[index - 1].name
          })
        } else {
          this.$router.push({
            name: this.tags[index].name
          })
        }
      }

    }
  }
</script>
<style lang="less" scoped>
  .tabs {
    padding: 20px;

    .el-tag {
      margin-right: 15px;
      cursor: pointer;
    }
  }
</style>