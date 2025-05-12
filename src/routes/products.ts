import {Router} from "express"
import { errorHandler } from "../error-handler"
import { createProduct, deleteProduct, updateProduct, getProduct, getProductByID} from "../controller/products"
import { auth } from "../middlewares/auth-middleware"
import { AdminMiddleware } from "../middlewares/admin-middleware"


const productRoutes:Router =Router()
productRoutes.post("/",[auth, AdminMiddleware], errorHandler(createProduct))
productRoutes.delete("/:id", [auth, AdminMiddleware], errorHandler(deleteProduct))
productRoutes.put("/:id", [auth, AdminMiddleware], errorHandler(updateProduct))
productRoutes.get("/",[auth, AdminMiddleware], errorHandler(getProduct))
productRoutes.get("/:id", [auth, AdminMiddleware], errorHandler(getProductByID))


export default productRoutes