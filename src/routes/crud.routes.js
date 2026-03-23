import { Router } from "express"
import { verifiyJWT } from "../middleware/auth.middleware.js"
import {
    createCrud,
    updateCrud,
    getCrud
    
}  from "../controller/crud.controller.js"

import {
    PostCreationValidator,
    PostupdationValidator
} from "../validator/validation.js"

import {validate} from "../middleware/validator.middleware.js"


const router = Router()


router
.route("/createPost")
.post(
    verifiyJWT,
    PostCreationValidator(),
    validate,
    createCrud
    )

router
.route("/updatePost/:crudId")
.post(
    verifiyJWT,
    PostupdationValidator(),
    validate,
    updateCrud
    )

router
.route("/getData")
.get(
    verifiyJWT,
    getCrud
)



export {router} 