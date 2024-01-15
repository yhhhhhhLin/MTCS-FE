import instance from "./instance.ts";

export async function get(url: string, params?: any): Promise<API.BaseResponse> {
    return (await instance.get(url, {params})).data
}

export async function post(url: string, data?: any,params?: any): Promise<API.BaseResponse> {
    const resp = await instance.post(url, data, {params})
    return resp.data
}

export async function put(url: string, params?: any, data?: any): Promise<API.BaseResponse> {
    const resp = await instance.put(url, data, {params})
    return resp.data
}

export async function del(url: string, params?: any): Promise<API.BaseResponse> {
    const resp = await instance.delete(url, {params})
    return resp.data
}
