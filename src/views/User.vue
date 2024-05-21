<template>
  <div class="manage">
    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- 用户的表单信息 -->
      <!-- inline使表单域内容在一行显示 -->
      <!-- :before-close="handleClose:为了在关闭表单同时清空表单数据 -->
      <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
        <!-- 定义相关表单域内容 -->
        <!-- label对应表单每一项的名称 -->
        <!-- 将el-form引入rules对象，并对内容添加prop属性：需要检验的字段名-->
        <el-form-item label="姓名" prop="name">
          <!-- 插槽位置写具体内容 -->
          <!-- placeholder：初始在输入框内显示的文字 -->
          <!-- v-model 实现双向数据绑定 -->
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <!-- el-select:下拉选框 -->
          <el-select v-model="form.sex" placeholder="请选择性别">
            <!-- label:显示出来的选项内容，value:具体传回的值 -->
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <!-- 时间控件 -->
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-DD">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
        <!-- 上面dialogVisible = false代表点击按钮，弹窗会消失 -->
        <el-button type="primary" @click="submit">确 定</el-button>
        <!-- 添加submit事件 -->
      </span>
    </el-dialog>
    <div class="manage-header">
      <!-- 点击后将该属性设置为true，即可见 -->
      <el-button @click="handleAdd" type="primary">
        + 新增
      </el-button>
      <el-table :data="tableData" style="width:100%">
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <!-- 自定义列 -->
          <!-- 作用域插槽:在父组件获得子组件的数据 -->
          <template slot-scope="scope">
            <!-- <i></i> -->
            <span>{{ scope.row.sex == 1 ? '男' : '女'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="birth" label="出生日期">
        </el-table-column>
        <el-table-column prop="addr" label="地址">
        </el-table-column>
        <el-table-column prop="addr" label="地址">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import { getUser, addUser, editUser, delUser } from '../api'
  export default {
    data() {
      return {
        dialogVisible: false,
        // 新建form对象，初始时form内内容未空
        form: {
          name: '',
          age: '',
          sex: '',
          birth: '',
          addr: ''
        },
        // rule对象
        rules: {
          name: [
            { required: true, message: '请输入姓名' }//表示必填，message表示没有填写时校验提示的信息
          ],
          age: [
            { required: true, message: '请输入年龄' }//表示必填
          ],
          sex: [
            { required: true, message: '请选择性别' }
          ],
          birth: [
            { required: true, message: '请选择出生日期' }
          ],
          addr: [
            { required: true, message: '请输入地址' }
          ],

        },
        tableData: [],
        modalType: 0 //0表示新增弹窗,1表示编辑
      }
    },
    methods: {
      //提交用户表单//submit事件对应submit方法
      submit() {
        //获取form1
        // 在element ui的el-form组件中，ref时用来获取对该表单组件的引用的属性。通过给el-form添加ref属性，你可以在vue组件中通过引用来访问和操作这个表单组件，而不需要通过DOM查询或其他方式。
        this.$refs.form.validate((valid) => {
          // validate是el-form自带的校验整个表单的方法
          // console.log(valid, 'valid')
          if (valid) {
            if (this.modalType === 0) { //还未插入数据,是新增阶段,表内没有数据
              addUser(this.form).then(() => {
                //重新获取列表接口
                this.getList()
              })
            } else {
              //调用编辑接口
              editUser(this.form).then(() => {
                //重新获取列表接口
                this.getList()
              })
            }
            // 校验通过，后续对表单数据进行处理
            // console.log(this.form, 'form')
            this.$refs.form.resetFields()//清空表单数据
            this.dialogVisible = false//关闭弹窗
          }
        })
      },
      //弹窗关闭时触发
      handleClose() {
        this.$refs.form.resetFields()
        this.dialogVisible = false
      },
      cancel() {
        this.handleClose()
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除该数据,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({ id: row.id }).then(() => { // 传入当前数据id(对象形式) // 唯一标识
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //更新列表
            this.getList()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleEdit(row) {
        this.modalType = 1
        this.dialogVisible = true
        //弹窗内容回显 // 需要对当前行数据进行深拷贝,否则会出错
        this.form = JSON.parse(JSON.stringify(row))
      },
      handleAdd() {
        this.modalType = 0
        this.dialogVisible = true //打开弹窗
      },
      getList() {
        //获取列表的数据
        getUser().then(({ data }) => {
          console.log(data)
          this.tableData = data.list
        })
      }
    },
    mounted() {
      //获取的列表数据
      this.getList()
    }
  }
</script>