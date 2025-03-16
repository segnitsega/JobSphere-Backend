const express = require('express')
const validateUser = require('../middlewares/user.validation')
const { handleSignup, handleLogin } = require('../controllers/user.controller')


const userRouter = express.Router()

userRouter.post('/signup', validateUser, handleSignup)
userRouter.post('/login', handleLogin)

module.exports = userRouter 