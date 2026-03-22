import { Crud } from "../model/crud.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asynchandler } from "../utils/asynchandler.js";
import mongoose from "mongoose";


const createCrud = asynchandler(async (req ,res)=>{
    const {title,description} = req.body

    const post = await Crud.create({
        title,
        description,
        createdBy:new mongoose.Types.ObjectId(req.user?._id)
    })

    if(!post){
        throw new ApiError(404,"This action cannot be performed right now")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            post,
            "Post created successfully"
        )
    )

})

//how will be post updated??



const updateCrud = asynchandler(async (req ,res)=>{
    const {title,description} = req.body
    const {crudId}  = req.params

    const credibility = await Crud.find({id:crudId})
    
    if(!credibility){
        throw new ApiError(404,"post with this id not found")
    }
    
    const post = await Crud.findByIdAndUpdate(
        crudId,
        {
            title,
            description
        },
        {new:true}
    )
    
    if(!post){
        throw new ApiError(404,"this post cannot be updated try again")
    }

    const updatedPost = await Crud.find({id:crudId}).select(
        "-password refreshToken "
    )

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            updatedPost,
            "Post updated successfully"
        )
    )
})



// const createCrud = asynchandler(async (req ,res)=>{})





export {
    createCrud,
    updateCrud
}    