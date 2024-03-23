import {postReturnBlob} from "../../request";


export function genProject(data: API.DataModel){
    return postReturnBlob('/gen/generator',data)
}
