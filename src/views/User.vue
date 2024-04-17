<template>
  <div class="manage">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <!-- 用户的表单信息 -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <!-- 点击后将该属性设置为true，即可见 -->
      <el-button @click="dialogVisible=true" type="primary">
        + 新增
      </el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false
      }
    }
  }
</script>