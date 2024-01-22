import instance from "./instance.ts";

export async function get<T>(url: string, params?: any): Promise<API.BaseResponse<T>> {
    return (await instance.get(url, {params})).data
}

export async function post<T>(url: string, data?: any,params?: any): Promise<API.BaseResponse<T>> {
    const resp = await instance.post(url, data, {params})
    return resp.data
}

export async function put<T>(url: string, data?: any, params?: any): Promise<API.BaseResponse<T>> {
    const resp = await instance.put(url, data, {params})
    return resp.data
}

export async function del<T>(url: string, params?: any): Promise<API.BaseResponse<T>> {
    const resp = await instance.delete(url, {params})
    return resp.data
}

export async function postDefault(url: string, data?: any,params?: any): Promise<any> {
    const resp = await instance.post(url, data, {params})
    return resp.data
}
