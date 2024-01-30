import {get, post} from "../../request";

export function userLogin(loginInfo: API.LoginUserInfo) {
    return post('/main/user/login', {...loginInfo})
}

export function userRegister(registerInfo: API.RegisterUserInfo) {
    return post('/main/user/register', {...registerInfo})
}

export function getUserInfo()  {
    return get<API.UserInfo>('/main/user/get/login')
}

export const getAvatarPath = '/main/user/get/login/avatar'

export function getUserProfile(account: string) {
    return get<API.UserProfileVO>('/main/user/profile/'+account)
}

export function updateUserInfo(userInfo: API.UserInfo){
    return post('/main/user/userupdate',userInfo)
}

export function updateAvatar(avatar: any) {
    return post('/main/user/update/avatar', avatar)
}

export function refreshAkSk(){
    return get('/main/user/updateak')
}