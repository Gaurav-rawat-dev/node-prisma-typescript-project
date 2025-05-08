// const authRoutes = require("./auth")
import authRoutes from "./auth.js"
import {Router} from "express"

const rootRouter = Router()

rootRouter.use("/auth", authRoutes)

export default rootRouter