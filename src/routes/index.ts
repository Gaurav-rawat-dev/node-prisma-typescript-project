// const authRoutes = require("./auth")
import authRoutes from "./auth.js"
import {Router} from "express"
import productRoutes from "./products.js"

const rootRouter = Router()

rootRouter.use("/auth", authRoutes)
rootRouter.use("/product", productRoutes)

export default rootRouter