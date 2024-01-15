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