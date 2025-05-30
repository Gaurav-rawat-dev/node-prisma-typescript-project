import { NextFunction } from "express";
import { HttpExceptions } from "../exceptions/root";



export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Type guard to check if it's an instance of HttpExceptions
    if (err instanceof HttpExceptions) {
      // const status = typeof err.status === "number" ? err.status : 500;

       // @ts-ignore
      return res.status(err.statusCode).json({
        message: err.message || "Something went wrong",
        errorCode: err.errorCode || "UNKNOWN_ERROR",
        statusCode: err.statusCode,
        errors: err.errors || {},
      });
    } else {
      // For other types of errors (e.g., default errors from express or third-party libs)
      // @ts-ignore 
      return res.status(500).json({
        message: "Internal Server Error",
        errorCode: "UNKNOWN_ERROR",
        status: 500,
        errors: {},
      });
    }
  };