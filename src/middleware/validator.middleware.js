import { ApiError } from "../utils/api-error.js";
import { validationResult } from "express-validator";


const validate = (req,res,next)=>{

    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }

    const ExtractedErrors = []
    errors.array().map((err)=>{
        ExtractedErrors.push({
            [err.path]:err.msg
        })
    })
    
    throw new ApiError(404,"received data is invalid",ExtractedErrors)


}


export{
    validate
}