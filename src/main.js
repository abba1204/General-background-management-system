import Vue from 'vue'
import App from './App.vue'
// import { Row, Button } from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入router/默认js文件，不用加后缀
import router from './router'
// tab.js定义函数，在index.js封装，全局注入，在main.js挂载
// store 挂载
import store from './store'

Vue.config.productionTip = false
// 相比Element整个引入，会减小体积
Vue.use(ElementUI)
// 按需引入
// Vue.use(Row)
// Vue.use(Button)

new Vue({
  // router挂载
  router,
  store,
  render: h => h(App)
}).$mount('#app')
