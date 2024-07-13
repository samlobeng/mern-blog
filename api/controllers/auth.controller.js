import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

// Sign Up route
export const signup = async (req, res, next) => {
       const {username, email, password} = req.body

       if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400, "All fields are required"))
    } 
    const hashedPassword = await bcryptjs.hash(password, 12)

    const newUser = new User({ // Creates user with its username, email and password and later save into the db
        username, 
        email, 
        password: hashedPassword});

    try {
        await newUser.save() // Save the user to the db
        res.json({success:'Signup successful'})
        
    } catch (error) {
        next(error)
    }
}

// Sign in route
export const signin = async (req, res, next) => {
    const {email, password} = req.body // get email and password from the user
    
    if(!email || !password || email ==='' || password === '') { // Check if email and passwords are empty or not entered
        return next(errorHandler(400, 'All fields are required'))
    }
    
    try {
        const validUser = await User.findOne({email}) // Find a particular user with the given email
        if(!validUser){
            return next(errorHandler("404", 'Invalid email or password')) // If user's email is not valid, return an error
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password) // Get the user inputted password and compare it what's in the db
            if (!validPassword) { // if password is invalid, return an error
                return next(errorHandler('401', 'Invalid email or password'));
            }
            const token = jwt.sign( // If user's email and password is valid, then we need to authenticate the user using jwt token
                {id: validUser._id}, // We want to save the id of the user, and based on the id, we can authenticate the user
                process.env.JWT_SECRET,  // A secret key
            )
            const {password: pass, ...rest} = validUser._doc // We don't want to send the password back to the user so we remove the password and return the user without the password
            res.status(200).cookie('access_token', token, { // create a response and add the token to a cookie
                httpOnly: true
            }).json(rest)

    } catch (error) {
        next(error)
    }

}