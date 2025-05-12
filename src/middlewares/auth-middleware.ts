import { Request, Response, NextFunction } from "express"
import { UnauthorizedException } from "../exceptions/BadExceptions"
import { ErrorCode } from "../exceptions/root"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"
import { prismaClient } from ".."
import { TokenPayload } from "express"


export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
        return next(new UnauthorizedException("token not found", ErrorCode.UNAUTHORIZED))
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET) as any
        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } })
        if (!user) {
            return next(new UnauthorizedException("token not found", ErrorCode.UNAUTHORIZED))
        }
        req.user = user as any
        next()
    } catch (error) {
        return next(new UnauthorizedException("token not found", ErrorCode.UNAUTHORIZED))
    }
}