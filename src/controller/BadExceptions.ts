import { ErrorCode, HttpExceptions } from "../exceptions/root";

export class UnauthorizedException extends HttpExceptions {
  constructor(message: string, errorCode: ErrorCode, errors: any = null) {
    super(message, errorCode, 401, errors);
  }
}

export class NotFoundException extends HttpExceptions {
  constructor(message: string, errorCode: ErrorCode, errors: any = null) {
    super(message, errorCode, 404, errors);
  }
}

export class InvalidPasswordException extends HttpExceptions{
    constructor(message: string, errorCode:ErrorCode, errors:any= null){
        super(message, errorCode,402, errors)
    }
}

export class InvalidInputExceptions extends HttpExceptions{
    constructor(message: string, errorCode: ErrorCode, errors:any=null){
        super(message, errorCode, 405, errors)
    }
}


export class InternalServerException extends HttpExceptions {
  constructor(message: string, errorCode: ErrorCode, errors?: any) {
    super(message, errorCode, 500, errors || null);
  }
}