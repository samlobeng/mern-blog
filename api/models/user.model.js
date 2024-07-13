import mongoose from "mongoose";

/**
 * User schema definition
 * 
 * Defines the structure of the User document in the database
 * 
 * @typedef {Object} User
 * @property {string} username - Unique username chosen by the user
 * @property {string} email - User's email address
 * @property {string} password - User's password (hashed for security)
 * @property {Date} createdAt - Timestamp when the user account was created
 * @property {Date} updatedAt - Timestamp when the user account was last updated
 */

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    }}, {timestamps: true}
);

const User = mongoose.model('User',userSchema)

export default User;