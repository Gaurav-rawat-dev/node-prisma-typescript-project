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
    INTERNAL_ERROR = "ERR_500",
    PRODUCT_NOT_FOUND= "PRODUCT NOT AVAILABLE",
    INVALID_INPUTS= "INVALID INPUTS",
    ADDRESS_NOT_FOUND= "ADDRESS NOT FOUnD",
    CART_NOT_FOUND = "CART NOT FOUND"
}