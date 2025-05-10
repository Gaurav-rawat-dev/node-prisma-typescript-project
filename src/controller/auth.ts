import { NextFunction, Request, Response } from "express"
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken';
import { prismaClient } from ".."
import { JWT_SECRET } from "../config"
import { HttpExceptions, ErrorCode } from "../exceptions/root";
import { UnauthorizedException, NotFoundException, InvalidPasswordException, InvalidInputExceptions, InternalServerException } from "../exceptions/BadExceptions";
import { UserSignupSchema, UserloginSchema } from "../schema/user";





export const signup = async (req: Request, res: Response, next: NextFunction) => {

    UserSignupSchema.parse(req.body)
    //  const value = (undefined as any).nonExistentProperty;
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
};


export const login = async (req: Request, res: Response, next: NextFunction) => {


   UserloginSchema.parse(req.body)
        const { email, password }: { email: string; password: string } = req.body;

        const normalizedEmail = email.toLowerCase().trim();
        const user = await prismaClient.user.findUnique({ where: { email: normalizedEmail } });

        if (!user) {
            return next(new NotFoundException("User not found", ErrorCode.UNAUTHORIZED));
        }

        const isMatch = await bcryptjs.compare(password, user.password);
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

