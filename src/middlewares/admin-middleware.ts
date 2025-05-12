import { Request, Response, NextFunction } from "express"
import { prismaClient } from ".."
import { UnauthorizedException } from "../exceptions/BadExceptions"
import { ErrorCode } from "../exceptions/root"
export const AdminMiddleware = async(req: Request, res:Response, next:NextFunction)=>{
    const userID = req.user.id
    const user = await prismaClient.user.findFirst({
        where : {
            id :  userID
        }
    })
    if(user?.role == "ADMIN"){
        next()
    }else{
        throw new UnauthorizedException("not authorized", ErrorCode.UNAUTHORIZED)
    }
    
}