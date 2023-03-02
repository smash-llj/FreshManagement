
//导入请求接口
import { permission } from "@/api/index"
//导入提前定义好的路由
import { menuList } from "@/router/menuList"
import { rulesMenu } from "@/utils/rulesMenu"
//导入基本的路由配置
import router, { baseRouter } from "@/router/index"
import { cloneDeep } from 'lodash'
export default {
  namespaced: true,
  state: {
    menuList: [] //路由存储
  },
  getters: {

  },
  mutations: {
    setMenu(state, data) {
      state.menuList = data
    },
    deleteMenu(state) {
      state.menuList = []
    }

  },
  //定义获取路由方法
  actions: {
    //rootState全局里面的state
    getMenuList({ commit, state, rootState }) {
      return new Promise((resolve, reject) => {
        permission({
          token: rootState.login.userinfo.token,
        }).then(res => {


          //比较前后端路由文件
          let menus = rulesMenu(menuList, res.data.data)
          // console.log("过滤出来的路由", menus);
          let arr = cloneDeep(baseRouter)

          //合并路由
          let routes = arr[0].children;
          //添加动态获取匹配好的路由
          routes.push(...menus)


          //存储动态路由
          commit("setMenu", routes)

          //路由合并
          resolve(arr)
        })
      })

    }
  }
};
 // console.log("获取用户标识", rootState.login.userinfo.token);
          // console.log("----后端返回的动态路由------", res.data.data);
          // console.log("----前端定义的完整路由------", menuList);
          // console.log(res);

            // console.log("获取基本的路由layout-----", arr); //baseRoutes=layout=[ path: '/',component: Layout,children:[{home组件}，{产品管理},{订单管理},...]]
          // console.log("合并路由导航    -----routes", routes);//[{home组件}，{产品管理},{订单管理},...]]