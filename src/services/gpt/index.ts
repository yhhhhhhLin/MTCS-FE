import {post} from "../../request";

export function sendMsgToGpt(msg: API.GptMessageInfo[]) {
    return post('/gpt/gptChat',msg)
}