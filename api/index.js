import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config() // Load environment variables from.env file


// MongoDB connection
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MongoDb is connected");
}).catch(err => console.log(err)); 

const app = express(); // Create Express.js application instance
app.use(express.json())  // Allow to send json to the database

//Server listening on port 3000
app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})

app.use('/api/user', userRoutes )
app.use('/api/auth', authRoutes) // Mount auth routes at /api/auth


/**
 * Error handling middleware function.
 * 
 * Catches and handles errors that occur in the application, sending a JSON response with a status code and error message.
 * 
 * @param {Error} err - The error object that was thrown.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * 
 * @example
 * // Example error response:
 * {
 *   "success": false,
 *   "statusCode": 404,
 *   "message": "Not Found"
 * }
 */
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})