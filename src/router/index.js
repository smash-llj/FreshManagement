import Vue from 'vue'
import VueRouter from 'vue-router'
//点击跳转同一个路径
// 在VueRouter上配置路由跳转，在router中的index.js中加上以下代码，注意加在use之前
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return routerPush.call(this, location).catch(err => { })
};

Vue.use(VueRouter)

export const baseRouter = [
    {
        path: "/", component: () => import("../views/Layout"), meta: { title: "首页", needLogin: true }, children: [
            {
                path: '/', name: "home", meta: { title: "首页" }, component: () => import("../views/Home")
            },

        ]
    },
]



const routes = [


    {
        path: "/login",
        name: 'login',
        component: () => import("@/views/Login")
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register")
    }

]
const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // the relevant part
}
export default router