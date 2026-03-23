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
      await   post.save()
  
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
//previous user will have issue of login 


const updateCrud = asynchandler(async (req ,res)=>{
    const {title,description} = req.body
    const {crudId}  = req.params
    
    
    const creadibility = await Crud.findOne({
        createdBy:req.user?._id,
        id:crudId
    })
    console.log("Checking off creadibility of the post",creadibility)
     
    if(!creadibility){
        throw new ApiError(404,"You have no right to mess with this post")
    }
    
    const post = await Crud.findOneAndUpdate(
        {id:crudId},
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
        "-password -refreshToken -createdBy "
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