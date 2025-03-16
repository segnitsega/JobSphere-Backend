require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDb = require('./config/db')

const app = express()
app.use(cors())
app.use(express.json)

const startServer = async() => {
    try{
        await connectDb()
        app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

app.use('/api/jobs', jobRouter)
app.use('/api/user', userRouter)

startServer()