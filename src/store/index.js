import Vue from 'vue'
import Vuex from 'vuex'
import goods from './modules/goods'
import login from "./modules/login"
import menu from "./modules/menu"
import orderDetail from './modules/orderDetail'
//引入vuex数据持久化
import createPersistedstate from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        goods,
        orderDetail,
        login,
        menu
    },
    plugins: [
        //使用vuex持久化插件
        createPersistedstate({
            key: 'goods',
            paths: ['goods', 'orderDetail', "login"]
        })
    ]

})

