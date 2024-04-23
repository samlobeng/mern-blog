import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res, next) => {
       const {username, email, password} = req.body

       if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({error: 'All fields are required'})
    } 
    const hashedPassword = await bcryptjs.hash(password, 12)
    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save()
        res.json({success:'Signup successful'})
        
    } catch (error) {
        res.status(500).json({error: 'Error creating user'})
    }
}