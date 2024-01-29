import {defineStore} from "pinia";
import {reactive} from "vue";
import {getAvatarPath, getUserInfo} from "../services/user";
import {Message} from "@arco-design/web-vue";
import router from "../router";
import instance from "../request/instance.ts";

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
        'avaData': '',
        'unReadMsgCount': 0,
        'credits': 0
    })

    const updateUserInfo = async ()=>{
        clearUserInfo()
        await storeGetUserInfo()
    }

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
            user.credits = userInfo.credits

            // TODO 设置实际未读消息数量
            user.unReadMsgCount = 9

            instance.get(getAvatarPath, {responseType: 'arraybuffer'})
                .then(response => {
                    const base64Image = btoa(
                        new Uint8Array(response.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    user.avaData = `data:${response.headers['content-type']};base64,${base64Image}`;
                })
                .catch(error => {
                    console.error('出错', error);
                });
            return
        } else if(res.code === 401) {
            localStorage.removeItem('token')
            router.push('/login')
            Message.error(res.message)
        }
        Message.error(res.message)

    }

    function clearUserInfo() {
        user.id = ''
        user.userName = ''
        user.userAccount = ''
        user.userAvatar = ''
        user.userRole = ''
        user.gender = 0
        user.accessKey = ''
        user.secretKey = ''
        user.unReadMsgCount = 0
        user.credits = 0
    }


    return {user, storeGetUserInfo,clearUserInfo,updateUserInfo}
})
