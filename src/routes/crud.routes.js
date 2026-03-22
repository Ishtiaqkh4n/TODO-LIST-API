import { Router } from "express"
import { verifiyJWT } from "../middleware/auth.middleware.js"
import {
    loginUser,
    registerUser
    
}  from "../controller/auth.contoller.js"


const router = Router()








export default router