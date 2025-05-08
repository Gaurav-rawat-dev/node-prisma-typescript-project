import {Request, Response} from "express"
import bcryptjs from "bcryptjs"
// import jwt from "jsonwebtoken"
import {prismaClient} from ".."

export const signup =async (req:Request, res:Response)=>{
    const { name, email, password }: { name: string; email: string; password: string } = req.body;
    const user = await prismaClient.user.findFirst({
        where : {email}
    })
    if(user){
        throw Error("user already exist.")
    }

    const newUser = await prismaClient.user.create({        
        data : {
            name, email, password
        }
    })
    res.json(newUser)
}


