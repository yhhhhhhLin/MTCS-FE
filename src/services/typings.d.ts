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


    type GptMessageInfo = {
        role: string
        content: string
    }

    type pageResult<T> = {
        records: T[],
        total: string,
        size: string,
        current: string,
        orders: [],
        optimizeCountSql: boolean,
        searchCount: boolean,
        countId: string,
        maxLimit: string,
        pages: string
    }

    type InterfaceInfo = {
        id: string,
        name: string,
        method: string,
        requestParams: string,
        getRequestParams: string,
        description: string,
        uri :string,
        host: string,
        requestHeader: string,
        responseHeader: string,
        pointsRequired: number
        status: number,
        userId: string,
        createTime: Date,
        updateTime: Date,
    }

}