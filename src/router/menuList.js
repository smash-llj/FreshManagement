export const menuList = [
    {
        path: "/goods", name: "goods", redirect: "/goods/list", meta: { title: "产品管理" }, component: () => import("../views/GoodManger"), children: [
            {
                path: "list", name: "list", meta: { title: "产品列表" }, component: () => import("../views/GoodManger/List")
            },
            {
                path: "category", name: "category", meta: { title: "产品分类" }, component: () => import("../views/GoodManger/Category")
            }, {
                path: "addgoods", name: "addgoods", component: () => import("../views/GoodManger/List/addGoods.vue"), meta: {
                    activeMenu: 'list',
                    title: "添加商品",
                    isShow: true,

                }
            }

        ]
    },
    {
        path: "/orderManger", name: "orderManger", redirect: "/orderManger/orderlist", meta: { title: "订单管理" }, component: () => import("../views/OrderManage"), children: [
            {
                path: "orderlist", name: "orederlist", meta: { title: "订单列表" }, component: () => import("../views/OrderManage/List")
            }, {
                path: "collect", name: "collect", meta: { title: "汇总清单" }, component: () => import("../views/OrderManage/Collect")
            },
            {
                path: "orderdetail", name: "orderdetail", meta: {
                    activeMenu: "orederlist",
                    title: "订单审核",
                    isShow: true,
                }, component: () => import("../views/OrderManage/orderDetail")
            }
        ]
    },
    {
        path: '/advert',
        name: 'advert',
        component: () => import("../views/Advert"),
        redirect: '/advert/list',
        meta: {
            title: "广告分类"
        },
        children: [
            {
                path: 'list',
                name: 'advertlist',
                component: () => import("../views/Advert/List"),
                meta: {
                    title: "广告列表"
                },
            }
        ]

    },
    {
        path: '/system',
        name: 'system',
        component: () => import("../views/SystemManage"),
        redirect: '/system/role',
        meta: {
            title: "系统管理"
        },
        children: [
            {
                path: 'role',
                name: 'role',
                component: () => import("../views/SystemManage/role"),
                meta: {
                    title: "角色管理"
                },
            },
            {
                path: 'department',
                name: 'department',
                component: () => import("../views/SystemManage/department"),
                meta: {
                    title: "部门管理"
                },
            }
        ]

    },

]