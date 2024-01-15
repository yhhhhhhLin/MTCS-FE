declare namespace API {

    type BaseResponse = {
        code: number,
        data: any,
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

}