import {get} from "../../request";

export function getInterfaceList(params: any) {
    return get<API.pageResult<API.InterfaceInfo>>('/main/interfaceInfo/list/page',params)
}