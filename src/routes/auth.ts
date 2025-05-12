import {Router} from "express"
import { errorHandler } from "../error-handler"
import { signup, login, test } from "../controller/auth"
import { auth } from "../middlewares/auth-middleware"


const authRoutes:Router =Router()

authRoutes.post("/signup", errorHandler(signup))
authRoutes.post("/login", errorHandler(login))

export default authRoutes