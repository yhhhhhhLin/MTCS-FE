import {get, getDefault, post} from "../../request";

/**
 * 查询所有积分产品
 * @param params
 */
export function getCreditProductList(params: any) {
    return get<API.pageResult<API.CreditProduct>>('/pay/creditProduct/list',params)
}

export function createCreditProductOrder(data: API.CreateCreditOrderDto){
    return post<API.CreditOrder>('/pay/order/credit/create',data)
}

export function payCreditProductOrder(params: any){
    return getDefault('/pay/order/credit/pay',params)
}
