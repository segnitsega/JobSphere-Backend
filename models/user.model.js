const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: String,
    role: {type: String, default: "user"},
}, { timestamps: true })

const user = mongoose.model('user', userSchema)

module.exports = user