import {Request, Response} from "express"
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken';
import {prismaClient} from ".."
import { JWT_SECRET } from "../config"
import { HttpExceptions , ErrorCode} from "../exceptions/root";

export const signup =async (req:Request, res:Response)=>{
    const { name, email, password }: { name: string; email: string; password: string } = req.body;
    const user = await prismaClient.user.findFirst({
        where : {email}
    })
    if(user){
        throw new HttpExceptions("User Already Exist", ErrorCode.USER_EXIST,401,email)      
    }

    const hashedPassword:string = await bcryptjs.hash(password, 10)

    const newUser = await prismaClient.user.create({        
        data : {
            name, email, password: hashedPassword
        }
    })

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
        "status" : "success",
        "data" : userWithoutPassword
    })
}


export const login =async (req:Request, res:Response)=>{

    const {  email, password }: {  email: string; password: string } = req.body;

    const user = await prismaClient.user.findFirst({
        where : {email}
    })
    if(!user){
        throw new HttpExceptions("User not found", ErrorCode.USER_NOT_FOUND,400,email)
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        throw new  HttpExceptions("Invalid password", ErrorCode.UNAUTHORIZED, 401, email)
      return;
    }

    const token:string =  jwt.sign(
        { userId: user.id, email: user.email }, // payload
        JWT_SECRET as string,
        { expiresIn: "1h" } // token validity
      );
   

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({
        message: "Login successful", user: userWithoutPassword , token
    })
}

