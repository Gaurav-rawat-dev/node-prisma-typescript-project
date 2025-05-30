// const authRoutes = require("./auth")
import authRoutes from "./auth.js"
import {Router} from "express"
import productRoutes from "./products.js"
import addressRoutes from "./address.js"
import cartRoutes from "./cart.js"

const rootRouter = Router()

rootRouter.use("/auth", authRoutes)
rootRouter.use("/product", productRoutes)
rootRouter.use("/address", addressRoutes)
rootRouter.use("/cart", cartRoutes)

export default rootRouter