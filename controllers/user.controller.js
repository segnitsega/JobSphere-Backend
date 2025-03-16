
require('dotenv').config()
const user = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secretKey = process.env.SECRET_KEY
const saltRound = 10

const handleSignup = async(req, res) => {
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({ message: "signup request body is empty" })
    }
    const { firstName, lastName, email, password } = req.body
    
    const emailExist = await user.findOne({email})

    if(emailExist){
        return res.status(400).json('Email already used')
    }

    try{
        const hash = await bcrypt.hash(password, saltRound)
        const newUser = new user({ 
                firstName,
                lastName,
                email,
                password:hash
            })
        await newUser.save()
        res.status(201).json({ message: "User successfully signed up" })
    }
    catch(e){
        res.status(500).json({ message: "Failed to signup User", error: e })
    }  
}

export const handleLogin = async(req, res) => {
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({ message: "login request body is empty" })
    }
    const {email, password} = req.body
    const foundUser = await user.findOne({ email })
    if(!foundUser){
        return res.status(404).json({message: "User not found"})
    } 
    bcrypt.compare(password, foundUser.password, (err, result) => {
        if(result){
            const token = jwt.sign({id: foundUser.id, email: foundUser.email, role: foundUser.role}, secretKey) 
            res.status(201).json({message: "Login succesfull", token})
        }
        else{
            res.status(401).json({message: "Invalid password"})
        }
    })
 
}

module.exports = { handleSignup, handleLogin }