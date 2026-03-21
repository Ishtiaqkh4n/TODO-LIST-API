import { ApiResponse } from "../utils/api-response.js";
import { asynchandler } from "../utils/asynchandler.js";


const healthCheck = asynchandler(async(req ,res)=>{
    return res
    .status(200)
    .send(
        new ApiResponse(
            200,
            {},
            "Server is running"
        )
    )


})



export {
    healthCheck
}