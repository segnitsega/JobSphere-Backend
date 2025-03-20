const express = require('express')
const validateUser = require('../middlewares/user.validation')
const { handleSignup, handleLogin } = require('../controllers/user.controller')
const refreshAccessToken = require('../controllers/token.controller')


const userRouter = express.Router()

userRouter.post('/signup', validateUser, handleSignup)
userRouter.post('/login', handleLogin)
userRouter.get('/refreshtoken', refreshAccessToken)

module.exports = userRouter 