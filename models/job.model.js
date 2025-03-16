const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title: String,
    type: String,
    salary: Number,
    description: String,
    company: String,
    logo: String,
    isBookmarked: {type: Boolean, default: false},
    location: String,
    experienceLevel: String,
    currency: String
}, { timestamps: true })

const job = mongoose.model("job", jobSchema)

module.exports = job
