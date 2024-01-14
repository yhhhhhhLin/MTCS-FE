import {defineStore} from "pinia";
import {reactive} from "vue";
import {Message} from "@arco-design/web-vue";

export const userInfoStore = defineStore('user',()=>{
    const user = reactive({
        'id': 0,
        'userName': '',
        'userAccount': '',
        'userAvatar': '',
        'userRole': '',
        'gender': 0,
        'accessKey': '',
        'secretKey': '',
    })

    function getUserInfoById(){
        if(!user.id){
            Message.info('请先登录')
            return user
        }


    }

    return {user,getUserInfoById}
})