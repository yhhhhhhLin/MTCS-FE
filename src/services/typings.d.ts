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
        credits: number
    }

    type CreditProduct = {
        id: string
        description: string
        price: number
        integral: number
        picture: string
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

    type InterfaceInfoDetail = {
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
        userAccount: string,
        userName: string,
        createTime: Date,
        updateTime: Date,
        allNum: number,
        remNum: number
    }

    type UpdateStatusDto = {
        interfaceId: number
        status: number
    }

    type AuditInterfaceInfo = {
        id: string;
        apiId: string | null;
        name: string;
        apiDescription: string;
        uri: string;
        host: string;
        method: string;
        requestHeader: string;
        responseHeader: string;
        requestParams: string;
        getRequestParams: string;
        userId: string;
        status: number;
        description: string;
        createTime: string;
        updateTime: string;
        isDelete: number;
    }

    type UserProfileVO = {
        id: number;
        self: boolean;
        userName: string;
        userAvatar: string;
        gender: number | null;
        createTime: string;
        canUseInterfaceNum: string;
        interfaceTransferNum: string;
    }

    type InterfaceInfoVO = {
        id: number;
        name: string;
        method: string;
        requestParams: string;
        getRequestParams: string;
        pointsRequired: number;
        description: string;
        uri: string;
        host: string;
        requestHeader: string;
        responseHeader: string;
        status: number;
        userId: number;
        createTime: Date;
        updateTime: Date;
        allNum: number;
    }


    type genModelInfo = {
        id: number
        infoName: string
        infoDesc: string
        fieldName: string
    }

    type DataModel = {
        needPostExample: boolean;
        needUserExample: boolean;
        groupName: string;
        artifactName: string;
        projectName: string;
        needCors: boolean;
        needBootWeb: boolean;
        needBootAop: boolean;
        needMybatisPlus: boolean;
        needMybatis: boolean;
        needMysql: boolean;
        needRedis: boolean;
        needGson: boolean;
        needFastJson: boolean;
        needHutool: boolean;
        needKnife4j: boolean;
        needLombok: boolean;
    }

    export class CreateCreditOrderDto {
        productId : number;
        num : number
        payType : number
    }

    export class CreditOrder {
        id: number;
        orderNo: string;
        userId: number;
        productId: number;
        orderName: string;
        total: number;
        status: string;
        payType: number;
        productInfo: string;
        addPoints: number;
        expirationTime: number;
        createTime: number;
        updateTime: number;
    }
}