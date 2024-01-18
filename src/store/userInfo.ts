import {defineStore} from "pinia";
import {reactive} from "vue";
import {getUserInfo} from "../services/user";
import {Message} from "@arco-design/web-vue";
import router from "../router";

export const useUserInfoStore = defineStore('user', () => {
    const user = reactive({
        'id': '',
        'userName': '',
        'userAccount': '',
        'userAvatar': '',
        'userRole': '',
        'gender': 0,
        'accessKey': '',
        'secretKey': '',
        'unReadMsgCount': 0
    })

    const storeGetUserInfo = async () => {
        if (user.id) {
            return
        }

        const res = await getUserInfo()
        if (!res.code) {
            const userInfo = res.data
            user.id = userInfo.id
            user.userName = userInfo.userName
            user.userAccount = userInfo.userAccount
            user.userAvatar = userInfo.userAvatar
            user.userRole = userInfo.userRole
            user.gender = userInfo.gender
            user.accessKey = userInfo.accessKey
            user.secretKey = userInfo.secretKey
            // TODO 设置实际未读消息数量
            user.unReadMsgCount = 9
            return
        } else if(res.code === 401) {
            localStorage.removeItem('token')
            router.push('/login')
            Message.error(res.message)
        }
        Message.error(res.message)

    }


    return {user, storeGetUserInfo}
})
