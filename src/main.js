import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/theme/my-theme/index.css'
// import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import global from '../src/global.js'
import * as qiniu from 'qiniu-js'
import 'element-ui/lib/theme-chalk/display.css';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.prototype.$axios = axios;

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(qiniu)
Vue.prototype.$global = global

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
