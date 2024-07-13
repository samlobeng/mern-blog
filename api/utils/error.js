/**
 * Creates a new Error object with a custom status code and message.
 *
 * @param {number} statusCode - The HTTP status code for the error.
 * @param {string} message - The error message to be displayed.
 * @returns {Error} A new Error object with the specified status code and message.
 *
 * @example
 * const error = errorHandler(404, 'Resource not found');
 * console.log(error.statusCode); // 404
 * console.log(error.message); // 'Resource not found'
 */


export const errorHandler = (statusCode, message)=>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}