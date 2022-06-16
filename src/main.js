import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/element.js'
import './assets/fonts/iconfont.css'
import './assets/css/index.css'

//全局挂载axios
import axios from 'axios'
Vue.prototype.$http = axios;
//设置默认请求路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/api/';

Vue.config.productionTip = false

const vm = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
//console.log(vm);
