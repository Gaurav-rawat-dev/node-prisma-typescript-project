import {Router} from "express"
import { errorHandler } from "../error-handler"
import { signup, login } from "../controller/auth"

const authRoutes:Router =Router()

authRoutes.post("/signup", errorHandler(signup))
authRoutes.post("/login", errorHandler(login))

export default authRoutes