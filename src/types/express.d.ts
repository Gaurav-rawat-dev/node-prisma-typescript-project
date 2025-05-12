import { Interface } from "readline";
import { User } from "../generated/prisma";
import { Express, Request } from "express";
import "express-session";

declare module 'express' {
    export interface Request {
        user: User,
        // session?: {
        //     userId?: string;
        //     createdAt?: string;
        // };
        // requestId?: string;
        // accessToken?: string;
        // refreshToken?: string;
        // files?: Express.Multer.File[];
    }

    export interface TokenPayload {
        userId: number,
        eamil: string,
        createdAt?: number;
    }
}



declare module "express-session" {
  interface SessionData {
    userId: number;
    views: number;
    createdAt: Date
  }

}