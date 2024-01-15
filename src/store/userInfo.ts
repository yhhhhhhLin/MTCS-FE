import {defineStore} from "pinia";
import {reactive} from "vue";

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


    return {user}
})