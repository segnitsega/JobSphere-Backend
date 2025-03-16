import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: String,
    type: String,
    salary: Number,
    description: String,
    company: String,
    logo: String,
    isBookmarked: Boolean,
    location: String,
    experienceLevel: String,
    currency: String
}, { timestamps: true })

const job = mongoose.model("job", jobSchema)

export default job 

