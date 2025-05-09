export class HttpExceptions extends Error {
    message: string
    errorCode: string
    statusCode: number
    errors: any

    constructor(message: string, errorCode: string, statusCode: number, errors: any) {
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = errors
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = "USER_404",
    USER_EXIST="USERNAME_UNAVAILABLE",
    UNAUTHORIZED = "AUTH_401",
    INTERNAL_ERROR = "ERR_500"
}