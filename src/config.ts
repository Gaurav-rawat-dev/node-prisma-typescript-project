import dotenv from "dotenv"
dotenv.config({path:".env"})

export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET!
export const EMAIL_USER = process.env.EMAIL_USER
export const EMAIL_PASS = process.env.EMAIL_PASS
export const CLIENTID = process.env.CLIENTID as string
export const CLIENT_SECRET = process.env.CLIENT_SECRET as string