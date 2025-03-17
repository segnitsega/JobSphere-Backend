const mongoose = require("mongoose")

const logoSchema = new mongoose.Schema({
    filename: String,
    filepath: String,
    mimetype: String,
    size: Number
})

module.exports = mongoose.model("logo", logoSchema)
