import {get, post} from "../../request";

export function getInterfaceList(params: any) {
    return get<API.pageResult<API.InterfaceInfo>>('/main/interfaceInfo/list/page',params)
}

export function adminInterfaceInfoAdd(data: any) {
    return post<number>('/main/interfaceInfo/add',data)
}

export function interfaceInfoUpdate(data: any) {
    return post<boolean>('/main/interfaceInfo/update',data)
}

export function interfaceInfoDelete(data: any) {
    return post<boolean>('/main/interfaceInfo/delete',data)
}