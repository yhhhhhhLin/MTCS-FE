import axios from "axios";
import {Message} from "@arco-design/web-vue";
import router from "../router";


const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_HOST + import.meta.env.VITE_BASE_PRE_URL,
    timeout: 5000,
    // transformResponse: [
    //     (data) => {
    //         return JSON.parse(data)
    //     }
    // ]
})

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    // 添加请求token
    if (token) {
        config.headers.token = token
    }
    return config;
}, function (error) {
    Message.error('请求错误{}', error)
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        Message.error('请先登录')
        router.push('/login')
    }
    if (error.response.status === 403) {
        Message.error('没有权限')
    }
    return Promise.reject(error);
});



export default instance
