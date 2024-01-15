declare namespace API {

    type BaseResponse<T> = {
        code: number,
        data: T,
        message: string
    }

    type LoginUserInfo = {
        userAccount: string
        userPassword: string
        autoLogin: boolean
    }

    type RegisterUserInfo = {
        userAccount: string
        userPassword: string
        checkPassword: string
    }

    type UserInfo = {
        id: string
        userName: string
        userAccount: string
        userAvatar: string
        userRole: string
        gender: number
        accessKey: string
        secretKey: string
    }

}