import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asynchandler } from "../utils/asynchandler.js";
import { User } from "../model/user.model.js";




const registerUser = asynchandler(async(req ,res)=>{
    const {username,email,password} = req.body

    const Existeduser = await User.findOne(
        {
            $or:[{username},{email}]
        }
    )
    
    if(Existeduser){
        throw new ApiError(404,"User with username or email already exists try another one")
    }

    const user = await User.create({
        username,
        email,
        password
    })
    
    if(!user){
        throw new ApiError(404,"Something went wrong while creating user")

    }

    const RegisteredUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )


    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            RegisteredUser,
            "User registered Successfully"
        )
    )

})





export {
    registerUser
}