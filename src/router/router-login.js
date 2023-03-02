import router from "./index";
import store from '@/store'
import { resetRouter } from './index.js'
router.beforeEach((to, from, next) => {
    if (to.matched.length && !to.matched.some(item => item.meta.needLogin)) {
        next()
    } else {
        let token = store.state.login.userinfo.token;
        if (token) {

            //是否有路由导航存储在vuex里面

            if (store.state.menu.menuList.length != 0) {
                next()
            } else {
                store.dispatch("menu/getMenuList").then(baseRouter => {
                    resetRouter() // 重置路由
                    // router.addRoutes(baseRoutes);
                    baseRouter.forEach(ele => {
                        router.addRoute(ele)
                    })
                    next({ ...to, replace: true }) //中断当前导航，执行新的导航
                })
            }

        } else {
            next("/login")
        }
    }
})