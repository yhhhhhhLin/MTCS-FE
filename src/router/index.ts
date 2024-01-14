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
    // 其他匹配不到的跳转到404页面
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/NotFount.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router