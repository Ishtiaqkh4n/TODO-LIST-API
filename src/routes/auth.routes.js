import { Router } from "express";
import {
    registerUser,
    loginUser
} from "../controller/auth.contoller.js"

const router = Router()


router.route("/registerUser").post(registerUser)
router.route("/loginUser").post(loginUser)







export default router