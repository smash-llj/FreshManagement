import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import router from './router/index.js'
import store from "../src/store/index.js";
import "./router/router-login.js"
Vue.config.productionTip = false
import api from "./api/index"
import Breadcrumb from "@/components/Breadcrumb"


import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)
//挂载网络请求方法
Vue.component("Breadcrumb", Breadcrumb)
Vue.prototype.$api = api
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
