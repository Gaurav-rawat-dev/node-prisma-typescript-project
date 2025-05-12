import { Request, Response, NextFunction, RequestHandler } from "express"
import { ErrorCode, HttpExceptions } from "./exceptions/root"
import { InternalServerException, InvalidInputExceptions } from "./exceptions/BadExceptions"
import { ZodError } from "zod";

export const errorHandler = (
  method: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {  // <-- Yeh specify karna zaroori hai
  // @ts-ignore 
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception: HttpExceptions;
      if (error instanceof HttpExceptions) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new InvalidInputExceptions("unprocessable entity", ErrorCode.INVALID_INPUTS, error)
        } else {
          exception = new InternalServerException(
            "Something went wrong!",
            ErrorCode.INTERNAL_ERROR,
            500
          );
        }

      }
      return next(exception);
    }
  };
};
