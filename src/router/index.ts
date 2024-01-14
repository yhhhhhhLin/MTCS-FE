import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/Index.vue')
    },
    {
        path: '/gptChat',
        name: 'gptChat',
        component: () => import('../views/gptChat/Index.vue')
    },
    {
        path: '/login',
        name: 'userLogin',
        component: () => import('../views/user/Login.vue')
    },
    // 其他匹配不到的跳转到404页面
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/NotFount.vue')
    }
]

// 不用判断登录的跳转白名单
const routerWhitelist = ['/','/login']

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to,from,next) => {
    // 判断是否是白名单，如果不是白名单的地址，那么就要判断是否登录，如果没有登录，就跳转到登录页面
    if(routerWhitelist.includes(to.path)){
        next()
    }
    // 判断是否有登录
    console.log(to)
    console.log(from)
    next()
})

export default router