import { User } from "../model/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken"


const verifiyJWT = asynchandler(async(req ,res ,next)=>{
 
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
    // console.log("token is ",token)
     
    if(!token){
        throw new ApiError(
            404,
            "Unauthorized request"
        )
    }

    const decodedToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    // console.log("decoded token is ",decodedToken)
    if(!decodedToken){
        throw new ApiError(
            404,
            "invalid access token"
        )
    }

    const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
    )
    // console.log("user is ",user)
    req.user = user
    
    next()

})


export {
    verifiyJWT
}