import {Router} from "express"

import { signup, login } from "../controller/auth"

const authRoutes:Router =Router()

authRoutes.post("/signup", signup)
authRoutes.post("/login", login)

export default authRoutes