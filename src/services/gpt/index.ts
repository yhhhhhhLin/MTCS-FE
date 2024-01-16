import {post} from "../../request";

export function sendMsgToGpt(msg: API.GptMessageInfo[]) {
    return post<API.GptMessageInfo>('/gpt/gptChat',msg)
}