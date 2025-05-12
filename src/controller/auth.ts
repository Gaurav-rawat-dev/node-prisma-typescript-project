import { NextFunction, Request, Response } from "express"
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken';
import { prismaClient } from ".."
import { JWT_SECRET } from "../config"
import { HttpExceptions, ErrorCode } from "../exceptions/root";
import { UnauthorizedException, NotFoundException, InvalidPasswordException, InvalidInputExceptions, InternalServerException } from "../exceptions/BadExceptions";
import { UserSignupSchema, UserloginSchema } from "../schema/user";
import { sendEmail } from "../helpers.ts/send-email";
import { error } from "console";





export const signup = async (req: Request, res: Response, next: NextFunction) => {
    
    UserSignupSchema.parse(req.body)
    //  const value = (undefined as any).nonExistentProperty;
   try {
     const { name, email, password }: { name: string; email: string; password: string } = req.body;
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await prismaClient.user.findUnique({ where: { email: normalizedEmail } });
    if (existingUser) {
        return next(new UnauthorizedException("User already exists", ErrorCode.USER_EXIST));
    
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await prismaClient.user.create({
        data: {
            name,
            email: normalizedEmail,
            password: hashedPassword,
        },
    });
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
        status: "success",
        data: userWithoutPassword,
    });
   } catch (error) {
    console.log(error, "===========")
        throw new InternalServerException("something is wrong", ErrorCode.INTERNAL_ERROR,error)
   }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {


    UserloginSchema.parse(req.body)
    const { email, password }: { email: string; password: string } = req.body;

    const normalizedEmail = email.toLowerCase().trim();
    const user = await prismaClient.user.findUnique({ where: { email: normalizedEmail } });

    if (!user) {
        return next(new NotFoundException("User not found", ErrorCode.UNAUTHORIZED));
    }

    const isMatch = await bcryptjs.compare(password, user.password as any);
    if (!isMatch) {
        return next(new InvalidPasswordException("Invalid password", ErrorCode.UNAUTHORIZED));
    }  

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET as string,
        { expiresIn: "1h" }
    );  

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
        message: "Login successful",
        user: userWithoutPassword,
        token,
       
    });
};

export const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const isUser: any = await prismaClient.user.findUnique({
        where: { email },
    });

    if (!isUser) {
        return next(new NotFoundException("User not found", ErrorCode.UNAUTHORIZED))
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now


    await prismaClient.otp.create({
        data: {
            email,
            otp,
            expiresAt, // expires in 2 minutes
        },
    });

    await sendEmail(email, `Your OTP is ${otp}`);

    res.status(200).json({ message: 'OTP sent' });
};

export const test = async (req: Request, res: Response, next: NextFunction) => {
    console.log("runnig inside test controller ========")
    res.send(req.session.userId)
    res.status(200).json("everythingis perfect")
}