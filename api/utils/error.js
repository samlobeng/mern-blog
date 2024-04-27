export const errorHandler = (statusCode, message)=>{
    const error = new Error();
    error.httpStatusCode = statusCode;
    error.message = message;
    return error;
}