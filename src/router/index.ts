import {createRouter, createWebHistory} from "vue-router";
import {Message} from "@arco-design/web-vue";
import {useUserInfoStore} from "../store/userInfo.ts";

// 需要身份校验的路由地址 默认都会有一个/admin前缀
const adminRouter: any = [
    {
        path: 'interfaceList',
        name: '所有接口',
        component: () => import('../views/admin/interface/list/Index.vue'),
        meta: {
            // 是否保存到菜单栏
            fixedNav: true
        },
    },
    {
        path: 'auditInterfaceList',
        name: '接口审核审批',
        component: () => import('../views/admin/interface/auditList/Index.vue'),
        meta: {
            // 是否保存到菜单栏
            fixedNav: true
        },
    }
]

export const routes: any = [

    {
        path: '/',
        name: '首页',
        component: () => import('../views/Index.vue'),
        meta: {
            // 是否保存到菜单栏
            fixedNav: true,
            icon: "icon-home"
        }
    },
    {
        path: '/user/:account',
        name: '用户信息',
        component: () => import('../views/user/UserInfo.vue'),
    },
    {
        path: '/user/updateInfo',
        name: '更新用户信息',
        component: () => import('../views/user/UpdateInfo.vue'),
    },
    {
        path: '/interface/square',
        name: '接口广场',
        component: () => import('../views/interface/Square.vue'),
        meta: {
            // 是否保存到菜单栏
            fixedNav: true,
            icon: "icon-list"
        }
    },
    {
        path: '/credit/square',
        name: '购买积分',
        component: () => import('../views/credit/Square.vue'),
        meta: {
            // 是否保存到菜单栏
            fixedNav: true,
            icon: "icon-gift"
        }
    },

    {
        path: '/myInterface',
        name: '我发布的接口',
        component: () => import('../views/interface/SelfList.vue'),
        meta: {
            // 是否保存到菜单栏
            fixedNav: true,
            icon: "icon-list"
        }
    },
    {
        path: '/gptChat',
        name: 'GPT聊天',
        component: () => import('../views/gptChat/Index.vue'),
        meta: {
            // 是否保存到菜单栏
            fixedNav: true,
            icon: "icon-computer"
        }
    },
    {
        path: '/admin',
        name: '管理员页面',
        component: () => import('../views/admin/Index.vue'),
        meta: {
            requireAuth: true,
            // 是否保存到菜单栏
            fixedNav: true
        },
        children: adminRouter
    },
    {
      path: '/interface/detail/:id',
      name: '接口详情',
      component: () => import('../views/interface/Detail.vue'),
    },
    {
        path: '/login',
        name: 'userLogin',
        component: () => import('../views/user/LoginAndRegister.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/NotFount.vue'),
    },
]

// 不用判断登录的跳转白名单
export const routerWhitelist = ['/', '/login']

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, _, next) => {

    // 判断是否是白名单，如果不是白名单的地址，那么就要判断是否登录，如果没有登录，就跳转到登录页面
    if (routerWhitelist.includes(to.path)) {
        next()
        return
    }

    // 判断是否有登录
    if (!localStorage.getItem('token')) {
        Message.error('请先登录')
        next('/login')
        return
    }

    // 管理员校验
    const userinfoStore = useUserInfoStore()
    userinfoStore.storeGetUserInfo().then(() => {

        // 判断是否有权限
        if (to.meta.requireAuth) {

            const userRole = userinfoStore.user.userRole;
            console.log('userRole:' + userRole)
            if (userRole !== 'admin') {
                Message.error('权限不足')
                next('/')
                return
            }
        }
        next()
    })


})

export default router