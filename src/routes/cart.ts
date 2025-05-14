import {Router} from "express"
import { errorHandler } from "../error-handler"
import { auth } from "../middlewares/auth-middleware"
import { AdminMiddleware } from "../middlewares/admin-middleware"
import { addCart, getCart, deleteCart, changeQuantity } from "../controller/cart"


const cartRoutes:Router =Router()
cartRoutes.post("/",[auth, AdminMiddleware], errorHandler(addCart))
cartRoutes.get("/", [auth, AdminMiddleware], errorHandler(getCart))
cartRoutes.delete("/:id", [auth, AdminMiddleware], errorHandler(deleteCart))
cartRoutes.put("/:id",[auth, AdminMiddleware],  errorHandler(changeQuantity))



export default cartRoutes