<template>
  <el-form ref="form" label-width="70px" :inline="true" class="login-container" :model="form" :rules="rules">
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit" type="primary">登录</el-button>
    </el-form-item>

  </el-form>

</template>
<script>
  import Mock from 'mockjs'
  import Cookie from 'js-cookie'
  import { getMenu } from '../api'
  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {
              //校验规则:
              required: true, // 表示必填
              trigger: 'blur', // 表示在失去焦点时进行校验判断
              message: '请输入用户名',
            }
          ],
          password: [
            {
              //校验规则:
              required: true, // 表示必填
              trigger: 'blur', // 表示在失去焦点时进行校验判断
              message: '请输入密码',
            }
          ]
        }
      }
    },
    methods: {
      //登录
      submit() {
        // //token信息
        // const token = Mock.Random.guid() //mock生成随机字符串
        // // cookie插件

        //校验通过
        this.$refs.form.validate((valid) => {
          if (valid) {
            getMenu(this.form).then(({ data }) => {
              console.log(data)
              if (data.code === 20000) {
                //讲token信息存入cookie用于不同页面的通信
                Cookie.set('token', data.data.token)
                //获取菜单的数据存入store中
                // data.data.menu
                this.$store.commit('setMenu', data.data.menu)
                // 动态添加路由  //添加当前实例
                this.$route.commit('addMenu', this.$router)
                //跳转到首页
                this.$router.push('/home')
              }
            })
          }
        })

      },
    }
  }

</script>
<style lang="less" scoped>
  .login-container {
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    /* auto左右居中 */
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    text-align: center;

    .login_title {
      text-align: center;
      margin-bottom: 40px;
      color: #505458;
    }

    .el-input {
      width: 198px;
    }

  }
</style>