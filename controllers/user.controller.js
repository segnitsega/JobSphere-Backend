
require('dotenv').config()
const user = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secretKey = process.env.SECRET_KEY
const refreshKey = process.env.REFRESH_KEY
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
        const token = jwt.sign({email: email, role: "user"}, secretKey)
        const refreshToken = jwt.sign({email: email}, refreshKey)

        const hash = await bcrypt.hash(password, saltRound)
        const newUser = new user({
                refreshToken, 
                firstName,
                lastName,
                email,
                password:hash
            })
        await newUser.save()

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }) 
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 10 * 60 * 60,
        })
        
        res.status(201).json({ message: "User successfully signed up" })
        // console.log(`Access token: ${token}`, `Refresh token: ${refreshToken}`)
    } 
    catch(e){
        res.status(500).json({ message: "Failed to signup User", error: e })
    }  
}

const handleLogin = async(req, res) => {
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({ message: "login request body is empty" })
    } 
    const { email, password} = req.body
    const foundUser = await user.findOne({ email })
    if(!foundUser){
        return res.status(404).json({message: "User not found"})
    } 
    bcrypt.compare(password, foundUser.password, async(err, result) => {
        if(result){ 
            const token = jwt.sign({id: foundUser.id, email: foundUser.email, role: foundUser.role}, secretKey) 
            const refreshToken = jwt.sign({id: foundUser.id}, refreshKey)

            //Delete existing token
            // await user.updateOne({ email }, { $unset: { refreshToken: "" } });

             //store refresh token in DB 
            await user.updateOne({email}, { $set: {refreshToken} })

            // save access token on httpOnly cookie
            res.status(201).cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 10 * 60 * 60,
            })  
            // save refresh token on httpOnly cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            }).json({message: "Login Successful", refreshToken: refreshToken});
        } 
        else{
            res.status(401).json({message: "Invalid password"})
        }
    })
 
}


module.exports = { handleSignup, handleLogin } 