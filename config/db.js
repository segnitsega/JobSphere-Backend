require('dotenv').config()
const mongoose = require('mongoose')


const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb connected") 
    }
    catch(err){
        console.log("Unable to connect to mongodb", err)
        process.exit(1)
    }

}

module.exports = connectDb
 


