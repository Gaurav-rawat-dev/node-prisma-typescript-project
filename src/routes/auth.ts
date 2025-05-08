import {Router} from "express"

import { signup } from "../controller/auth"

const authRoutes:Router =Router()

authRoutes.get("/signup", signup)

export default authRoutes