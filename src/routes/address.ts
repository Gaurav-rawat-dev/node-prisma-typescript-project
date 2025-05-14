import {Router} from "express"
import { errorHandler } from "../error-handler"
import { addAddress, deleteAddress, listAddress, updateUserAddress} from "../controller/address"
import { auth } from "../middlewares/auth-middleware"
import { AdminMiddleware } from "../middlewares/admin-middleware"


const addressRoutes:Router =Router()
addressRoutes.post("/",[auth, AdminMiddleware], errorHandler(addAddress))
addressRoutes.delete("/:id", [auth, AdminMiddleware], errorHandler(deleteAddress))
addressRoutes.get("/", [auth, AdminMiddleware], errorHandler(listAddress))
addressRoutes.put("/",[auth, AdminMiddleware],  errorHandler(updateUserAddress))



export default addressRoutes