import {get, post, postDefault, put} from "../../request";

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

export function getInterfaceDetail(id: any) {
    return get<API.InterfaceInfoDetail>('/main/userInterfaceInfo/detailwithtotal',id)
}

export function invokeInterface(invokeParams: any) {
    return postDefault('/main/interfaceInfo/invoke',invokeParams)
}
export function getRemCountAndCredits(params: any) {
    return get('/main/userInterfaceInfo/remcountandcredits',params)
}

export function getInterfaceExperience(interfaceInfoId: any) {
    return get('/main/userInterfaceInfo/experience',interfaceInfoId)
}

export function updateInterfaceStatus(dto: API.UpdateStatusDto) {
    return put('/main/interfaceInfo/updateStatus',dto)
}

export function selectSelfInterfaceListByPage(params: any) {
    return get<API.pageResult<API.InterfaceInfo>>('/main/interfaceInfo/self',params)
}

export function userInterfaceInfoAdd(data: any) {
    return post<string>('/audit/audit/interface',data)
}

export function getInterfaceAllAnalyze(data:any){
    return get('/main/analyze/all',data)
}

export function getInterfaceSelfAnalyze(data:any){
    return get('/main/analyze/self',data)
}
